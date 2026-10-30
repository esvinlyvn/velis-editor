#!/usr/bin/env node
// lib/build.mjs — dựng MỌI video từ dữ liệu: node lib/build.mjs projects/<video> [--no-render]
//   Đầu vào (repo): projects/<video>/plan.json + transcript.json (+ SHOTBOOK.md, NOTES.md, info/).
//   Đầu vào (không commit): work/<video>/footage.mp4, voice.wav [, music.*, matte/].  Đầu ra: build/<video>/.
//   Không có code riêng cho từng video: muốn đổi cách dựng thì sửa thư viện lib/ (áp cho mọi video sau) hoặc dữ liệu plan.json.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadPlan, resolveBlocks, resolveSfx, SFX_ROLES } from "./plan.mjs";
import { duck, beatGrid } from "./music.mjs";
import { sfxHtml } from "../scripts/sfx-cues.mjs";
import { scrimPlan } from "../scripts/text-contrast.mjs";
import { behind } from "../scripts/fx/behind.mjs";
import { loudnormMix } from "../scripts/build-video.mjs";

const LIB = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(LIB, "..");
const dirArg = process.argv.slice(2).find((a) => !a.startsWith("--"));
if (!dirArg) { console.error("Cách dùng: node lib/build.mjs projects/<video> [--no-render]"); process.exit(1); }
const DIR = path.resolve(dirArg);
const RENDER = !process.argv.includes("--no-render");
const r2 = (n) => Math.round(n * 1000) / 1000;
const rel = (p) => path.relative(ROOT, p);

const P = loadPlan(DIR);
const { plan, T, st, brand } = P;
const slug = plan.video ?? path.basename(DIR);
const WORK = path.join(ROOT, "work", slug), OUT = path.join(ROOT, "build", slug);
const media = { footage: path.join(WORK, "footage.mp4"), voice: path.join(WORK, "voice.wav"), ...Object.fromEntries(Object.entries(plan.media ?? {}).map(([k, v]) => [k, v && path.resolve(ROOT, v)])) };
for (const k of ["footage", "voice"]) if (!fs.existsSync(media[k])) throw new Error(`Thiếu ${k}: ${rel(media[k])} (clip thô để ở work/, không commit)`);
const ff = (args) => execFileSync("ffmpeg", ["-loglevel", "error", "-y", ...args]);
const probe = (f) => Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString());

// ---------- màu clip: pha nhẹ (luật 19) hoặc LUT của kênh (VAN-HANH 7), bản pha để ở work/ ----------
let FOOT = media.footage;
const lut = brand?.lut?.file && path.join(ROOT, "luts", brand.lut.file);
if (plan.grade || lut) {
  FOOT = path.join(WORK, "footage-graded.mp4");
  const stale = !fs.existsSync(FOOT) || fs.statSync(FOOT).mtimeMs < Math.max(fs.statSync(media.footage).mtimeMs, fs.statSync(path.join(DIR, "plan.json")).mtimeMs);
  if (stale) {
    const k = brand?.lut?.cuong_do ?? 0.65;
    const vf = lut ? `split[a][b];[b]lut3d=file=${lut}:interp=tetrahedral[g];[a][g]blend=all_expr='A*(1-${k})+B*${k}'${plan.grade ? "," + plan.grade : ""}` : plan.grade;
    fs.mkdirSync(WORK, { recursive: true });
    ff(["-i", media.footage, ...(lut ? ["-filter_complex", `[0:v]${vf}`] : ["-vf", vf]), "-c:v", "libx264", "-crf", "16", "-preset", "medium", "-g", "30", "-keyint_min", "30", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", FOOT]);
  }
}

// ---------- khối chữ, tương phản, chữ sau người ----------
const { KT, warn } = resolveBlocks(P);
const VDUR = probe(media.voice), DURATION = Math.round((VDUR + (plan.tail ?? 0.3)) * 100) / 100;
const TXT = (c) => (c.p === "chu-bac" ? "#c9ced6" : c.p === "ky-niem" ? "#ffffff" : c.o.c ?? "#ffffff");
const CON = scrimPlan(FOOT, KT, { dur: VDUR, color: TXT, heroMin: 2.6, leadMin: 3.5, maxA: 0.6 });
KT.forEach((c, i) => { c.scrim = CON[i].a; if (CON[i].warn) c.hard = true; });

const BEHIND = plan.behind ?? {}, okF = path.join(WORK, "behind-ok.json");
const behindOk = fs.existsSync(okF) ? JSON.parse(fs.readFileSync(okF, "utf8")) : {};
const objTop = (name, a, b) => {
  const f = path.join(WORK, "matte", name + ".json");
  if (!fs.existsSync(f)) return plan.behind_top?.[name];
  const j = JSON.parse(fs.readFileSync(f, "utf8"));
  const v = j.top.filter((x, i) => x != null && j.start + i / j.fps >= a && j.start + i / j.fps <= b).sort((x, y) => x - y);
  return v[Math.floor(v.length / 2)];
};
for (const c of KT) {
  if (!c.behind) continue;
  const top = behindOk[c.behind] === false ? null : objTop(c.behind, c.at, c.out);
  if (top == null) { warn.push(`khối "${c.o.m ?? c.p}": chữ sau người "${c.behind}" chưa có mặt nạ/đỉnh đầu hoặc không đạt kiểm đọc → chữ nổi bình thường`); delete c.behind; continue; }
  c.objTop = top; c.narrow = top + 60 > 700;
}

// ---------- nhạc (M5) + montage theo phách ----------
let musicHtml = "";
const mus = plan.music ?? (brand?.nhac ? { file: brand.nhac } : null);
if (mus?.montage?.length) {
  if (!mus.bpm) throw new Error("music.montage cần music.bpm");
  for (const [a, b] of mus.montage) {
    const cuts = beatGrid(mus.bpm, { offset: mus.offset ?? 0, from: a, to: b, every: mus.every ?? 4 });
    console.log(`montage ${a}–${b}s: ${cuts.length} cú cắt theo phách → ${cuts.join(", ")}`);
    (plan.sfx_layer ??= []).push(...cuts.map((t) => ({ at: t, role: SFX_ROLES.formulas.montage[0].role, vol: SFX_ROLES.formulas.montage[0].vol, why: "cắt montage theo phách" })));
  }
}

// ---------- công thức (lib/recipes.json): in khung thời lượng gợi ý để đối chiếu ----------
const RECIPES = JSON.parse(fs.readFileSync(path.join(LIB, "recipes.json"), "utf8"));
const R = plan.recipe && RECIPES[plan.recipe];
if (plan.recipe && !R) throw new Error(`recipe "${plan.recipe}" không có trong lib/recipes.json (${Object.keys(RECIPES).filter((k) => !k.startsWith("_")).join(", ")})`);
if (R) {
  let t = 0;
  console.log(`công thức ${plan.recipe} · ${R.ten}: ` + R.khung.map(([k, f]) => `${k} ${t.toFixed(0)}–${(t += f * DURATION).toFixed(0)}s`).join(" · "));
  const roles = new Set(KT.map((c) => c.role));
  const miss = R.vai_uu_tien.filter((v) => !roles.has(v));
  if (miss.length) warn.push(`công thức ${plan.recipe} nên có vai: ${miss.join(", ")}`);
}

// ---------- SFX ----------
const S = resolveSfx(P, KT);
warn.push(...S.warn);

// ---------- dựng thư mục build ----------
fs.rmSync(OUT, { recursive: true, force: true });
for (const d of ["assets/fonts", "assets/vendor"]) fs.mkdirSync(path.join(OUT, d), { recursive: true });
let fonts = "";
const fam = {}, loads = [];
const embed = ([pkg, weights], role) => {
  const dir = path.join(ROOT, "node_modules/@fontsource", pkg);
  if (!fs.existsSync(dir)) throw new Error(`Chưa cài font @fontsource/${pkg} (npm install)`);
  for (const w of weights) {
    const css = fs.readFileSync(path.join(dir, `${w}.css`), "utf8");
    fam[role] ??= /font-family:\s*'([^']+)'/.exec(css)[1];
    fonts += css.replace(/url\(\.\/files\/([^)]+\.woff2)\) format\('woff2'\),\s*url\([^)]+\) format\('woff'\)/g, (_, f) => (fs.copyFileSync(path.join(dir, "files", f), path.join(OUT, "assets/fonts", f)), `url(assets/fonts/${f}) format('woff2')`));
    if (role) loads.push(`${String(w).includes("italic") ? "italic " : ""}${parseInt(w)} 100px "${fam[role]}"`);
  }
};
embed(st.display, "display"); embed(st.sans, "sans"); embed(st.script, "script");
embed(["be-vietnam-pro", [900]], null); // font dự phòng trong CSS preset BĐS (lint)
fs.copyFileSync(path.join(ROOT, "node_modules/gsap/dist/gsap.min.js"), path.join(OUT, "assets/vendor/gsap.min.js"));
fs.copyFileSync(FOOT, path.join(OUT, "assets/footage.mp4"));
ff(["-i", media.voice, "-af", "loudnorm=I=-14:TP=-1.5:LRA=9", "-ar", "48000", path.join(OUT, "assets/voice.wav")]);
if (mus) {
  const f = path.resolve(ROOT, mus.file);
  const d = duck(f, T, path.join(OUT, "assets/music.wav"), { dur: DURATION, bed_db: mus.bed_db, duck_db: mus.duck_db });
  musicHtml = `<audio id="music" src="assets/music.wav" data-start="0" data-duration="${DURATION}" data-track-index="8" data-volume="1"></audio>`;
  console.log(`nhạc: ${rel(f)} · hạ dưới ${d.spans} quãng nói`);
}

const comp = slug.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
const bds = (f) => fs.readFileSync(path.join(ROOT, "text-presets/bds", f), "utf8");
const html = fs.readFileSync(path.join(LIB, "template.html"), "utf8")
  .replace("{{TITLE}}", () => slug)
  .replaceAll("{{COMP}}", comp)
  .replace("{{FONTS}}", () => fonts)
  .replace("{{BDS_CSS}}", () => `<style>\n${bds("bds-presets.css")}</style>`)
  .replace("{{BDS_JS}}", () => `<script>\n${bds("bds-presets.js")}</script>`)
  .replaceAll("{{DURATION}}", String(DURATION))
  .replace("{{VOICE_DUR}}", String(r2(VDUR)))
  .replace("{{SFX}}", () => sfxHtml(S.cues, OUT, { gainDb: 6, minGap: 0.35 }))
  .replace("{{MUSIC}}", () => musicHtml)
  .replace("{{KT}}", () => JSON.stringify(KT))
  .replace("{{STYLE}}", () => JSON.stringify({ display: fam.display, sans: fam.sans, script: fam.script, loads, scrim: st.scrim ?? "gradient" }));
fs.writeFileSync(path.join(OUT, "index.html"), html);
fs.writeFileSync(path.join(OUT, "blocks.json"), JSON.stringify({ duration: DURATION, blocks: KT.map(({ o, ...c }) => ({ ...c, text: o.m ?? o.lines ?? o.words ?? o.value })), sfx: S.cues }, null, 1));

console.log(`✔ ${rel(OUT)}/index.html · ${DURATION}s · phong cách ${st.id ?? st.ten ?? "riêng"} (${st.main}, ${fam.display} / ${fam.sans}, lớp tối ${st.scrim ?? "gradient"}) · ${KT.length} khối · ${S.cues.length} SFX`);
for (const c of KT) console.log(`  ${String(c.at).padStart(6)}–${String(c.out).padEnd(6)} ${c.p.padEnd(12)} ${(c.role ?? "").padEnd(12)} ${String(c.o.m ?? c.o.lines?.map((L) => L.t ?? L.parts.map((x) => x.t).join(" ")).join(" / ") ?? c.o.words?.join(" / ") ?? c.o.value)}  phủ ${c.scrim.toFixed(2)}${c.objTop != null ? ` · sau người (đỉnh ${c.objTop})` : ""}`);
if (warn.length) console.log("\nCẢNH BÁO:\n- " + warn.join("\n- "));

if (RENDER) {
  execFileSync("npx", ["hyperframes", "render", "-o", "output.mp4"], { cwd: OUT, stdio: "inherit", env: { ...process.env, HYPERFRAMES_NO_TELEMETRY: "1" } });
  const wins = Object.fromEntries(Object.entries(BEHIND).filter(([k]) => KT.some((c) => c.behind === k && c.objTop != null)));
  if (Object.keys(wins).length) {
    if (!fs.existsSync(okF)) throw new Error("Chưa kiểm chữ-sau-người: chạy scripts/fx/behind-check.py trước khi render");
    behind(OUT, FOOT, path.join(WORK, "matte"), wins);
  }
  if (plan.loudnorm !== false) loudnormMix(path.join(OUT, "output.mp4")); // bản trộn về −14 LUFS, đỉnh ≤ −1,5 dBTP (VAN-HANH 5)
  console.log("Tiếp: python3 -I scripts/qa/sfx-levels.py, rồi nhận diện giọng trên output.mp4 để chắc SFX không che lời (TALKING-HEAD 4a)");
}
