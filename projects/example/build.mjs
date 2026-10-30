#!/usr/bin/env node
// Project mẫu: clip người nói (talking head) → chữ chốt preset BĐS + lớp tối theo nền + SFX. Đủ luật của TALKING-HEAD.md:
//   không phụ đề chạy (luật 1) · chữ chốt 2–5 chữ, có chữ từ 0,1 s (luật 4) · mỗi loại thông tin một preset (luật 8) ·
//   màu gradient theo nghĩa (luật 6) · lớp tối đo theo nền, trần 0,6, không quầng (luật 13, 15, 18, 19) ·
//   SFX mỗi khối một loại, lớp tiếng phụ, gõ phím theo ký tự, cùng loại cách ≥ 30 s (luật 10, 16, 17; mục 4a).
//
// Chép sang video mới: cp -r projects/example projects/<khach>-<du-an>, rồi thay
//   footage.mp4 (clip đã cắt, -g 30 -keyint_min 30) · voice.wav (tiếng của clip) · transcript.json (scripts/asr/transcribe.py, sửa tay) ·
//   khối KT và LAYER bên dưới · font + preset chính (khác video trước của khách, bảng 4c TALKING-HEAD) · SHOTBOOK.md.
// Tư liệu mẫu: footage là trời dựng bằng ffmpeg (sáng phía trên để lớp tối có việc làm), không có người;
//   giọng Piper vi_VN-vais1000 tạo trên máy (docs/SOURCES.md). Giờ từng chữ lấy bằng transcribe.py, sửa tay ghi trong transcript.json.
//   node projects/example/build.mjs [--no-render]
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildVideo } from "../../scripts/build-video.mjs";
import { scrimPlan } from "../../scripts/text-contrast.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const NAME = path.basename(HERE);
const T = JSON.parse(fs.readFileSync(path.join(HERE, "transcript.json"), "utf8")).chunks;
// W(i, "chữ", n): giờ bắt đầu của chữ thứ n (đếm từ 0) trong cụm i — mọi mốc chữ chốt bám theo lời
const W = (i, w, n = 0) => {
  const hit = T[i].words.filter((x) => x.w.toLowerCase().replace(/[,.?!:]/g, "") === w.toLowerCase());
  if (!hit[n]) throw new Error(`Cụm ${i} không có chữ "${w}" (lần ${n})`);
  return hit[n].s;
};
const r2 = (n) => Math.round(n * 100) / 100;

// Gradient theo nghĩa (c = màu giữa, c2 = màu đáy): vàng→cam số, sản phẩm · xanh ngọc→dương nơi chốn · bạc hà→xanh lá an toàn, ổn
const C = { gold: { c: "#ffd166", c2: "#e8761a" }, sea: { c: "#5ee6f2", c2: "#1f6fd6" }, mint: { c: "#8af5bd", c2: "#27b866" } };
// Mỗi vai một preset cố định cả video (luật 8). Preset chính (M) ≤ 40% số khối.
const M = (k, m, c = C.gold) => ({ p: "tang-truong", o: { k, m, ...c, size: 140 } }); // tiêu đề, preset chính
const G = (k, value, pre = "", suf = "", c = C.gold) => ({ p: "gia-chot", o: { k, value, prefix: pre, suffix: suf, ...c, size: 170 } }); // số đo, giá
const S = (k, m) => ({ p: "chu-bac", o: { k, m, size: 130 } }); // loại căn, tiện ích đơn
const Q = (k, words, step, c = C.gold) => ({ p: "quay-vong", o: { k, words, ...c, size: 130, step: r2(step) } }); // liệt kê
const X = (m) => ({ p: "canh-bao", o: { m, c: "#ff4a3d", size: 120 } }); // "không có / không còn"
const N = (m, c) => ({ p: "nhan-neon", o: { m, ...c, glow: c.c, size: 110 } }); // trạng thái
const Y = (m) => ({ p: "go-chu", o: { m, ...C.gold, size: 84 } }); // câu nói, câu mời (có tiếng gõ phím theo ký tự)
// at(khối, giờ vào, [tiếng SFX lớp 1, vol], thêm) — mỗi khối một tiếng, mỗi tiếng một LOẠI (luật 10)
const at = (cue, t, sfx, extra = {}) => ({ ...cue, at: t, sfx, ...extra });

const KT = [
  at(M("Với 3 tỷ", "MUA NHÀ Ở ĐÂU?"), 0.1, ["whoosh-heavy", 1.0]), // có chữ ngay từ 0,1 s; tiếng mở bật ngay (reveal khởi đầu chậm, đo ra nhỏ)
  at(M("Dự án", "VƯỜN MÂY", C.sea), W(1, "dự") - 0.3, ["title-in", 0.4]),
  at(G("CÁCH TRUNG TÂM", 15, "", " PHÚT", C.sea), W(1, "cách") - 0.1, ["meter", 0.4]),
  at(G("CĂN HỘ", 70, "", " m²"), W(2, "căn") - 0.1, ["counter-roll", 0.33]),
  at(S("Thiết kế", "2 PHÒNG NGỦ"), W(2, "2") - 0.2, ["scribble", 0.35]),
  at(Q("Tiện ích", ["HỒ BƠI", "PHÒNG GYM", "CÔNG VIÊN"], (W(3, "công") - W(3, "hồ")) / 2), W(3, "hồ") - 0.15, ["swipe", 0.4]),
  at(X("PHÍ ẨN"), W(4, "phí"), ["error-soft", 0.42]),
  at(N("ĐÃ CÓ SỔ HỒNG", C.mint), W(5, "hồng") + 0.3, ["stamp", 0.36]), // vào ngay sau khi nói xong "hồng": tiếng stamp không đè lời
  at(Y("Nhắn em nhận bảng giá"), W(6, "bảng") - 0.1, ["type", 0.3], { out: 999 }), // out 999 = giữ tới hết video
].map((c, i, a) => {
  // tắt trước khối sau 0,35 s: mờ ra (0,3 s) xong rồi khối sau mới vào, không có lúc hai khối cùng hiện
  const out = r2(c.out ?? (a[i + 1] ? a[i + 1].at - 0.35 : 999));
  return { ...c, at: r2(c.at), out, top: c.top ?? 250, o: { ...c.o, hold: r2(out - c.at) } };
});

// ---------- Lớp tối theo nền (luật 13, 15, 19): đo nền sau từng khối → độ phủ cần có ----------
// màu đại diện của chữ chính: màu giữa của gradient (c); chữ bạc, chữ đỏ của canh-bao lấy màu thật
const TXT = (c) => (c.p === "chu-bac" ? "#c9ced6" : c.p === "canh-bao" ? "#ff6a5e" : c.o.c ?? "#ffffff");
const VDUR = T.at(-1).end;
// Pha màu nhẹ trước khi phủ chữ (luật 19). Bản pha để ở work/ (không commit), tự làm lại khi footage.mp4 mới hơn.
const GRADE = "eq=contrast=1.08:saturation=1.12";
const FOOT = path.join(HERE, `../../work/${NAME}/footage-graded.mp4`);
if (!fs.existsSync(FOOT) || fs.statSync(FOOT).mtimeMs < fs.statSync(path.join(HERE, "footage.mp4")).mtimeMs) {
  fs.mkdirSync(path.dirname(FOOT), { recursive: true });
  execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-i", path.join(HERE, "footage.mp4"), "-vf", GRADE, "-c:v", "libx264", "-crf", "16", "-preset", "medium",
    "-g", "30", "-keyint_min", "30", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", FOOT]);
}
// Chữ đã có viền tối 1 px: chữ chính ≥ 2,6 : 1, chữ dẫn trắng ≥ 3,5 : 1; phủ tối đa 0,6; nền quá sáng thì viền đậm hơn (class hard)
const CON = scrimPlan(FOOT, KT, { dur: VDUR, color: TXT, heroMin: 2.6, leadMin: 3.5, maxA: 0.6 });
KT.forEach((c, i) => { c.scrim = CON[i].a; if (CON[i].warn) c.hard = true; });
console.log("tương phản (nền p80 → độ phủ cần → tỷ lệ đạt):\n" + KT.map((c, i) => `  ${c.at.toFixed(1).padStart(6)} ${(c.o.m ?? c.o.words?.[0] ?? c.o.value + "").toString().padEnd(22)} nền ${CON[i].lum.toFixed(2)} → phủ ${CON[i].a.toFixed(2)} → ${CON[i].ratio}:1${CON[i].warn ? "  ⚠ nền quá sáng: phủ tối đa + viền tối" : ""}`).join("\n"));

// ---------- SFX (TALKING-HEAD 4a) ----------
// Lớp 1: tiếng của từng khối, khai trong KT. Lớp 2: tiếng nhỏ cho chuyển động phụ — chữ quay-vong đổi, số chạy xong,
// nét gạch đỏ của canh-bao, cú chuyển cảnh của clip (chỗ không có khối chữ trong ±0,6 s), tiếng kết.
const base = (n) => n.replace(/-\d+$/, "");
const find = (m) => { const c = KT.find((c) => c.o.m === m || c.o.k === m); if (!c) throw new Error(`Không có khối "${m}"`); return c; };
const qv = (k, j) => { const c = find(k); return c.at + 0.15 + j * c.o.step; }; // lúc chữ thứ j của quay-vong dâng lên
const LAYER = [
  [find("CÁCH TRUNG TÂM").at + 0.95, "coin", 0.4, "15 phút chốt số"],
  [find("CĂN HỘ").at + 0.95, "punch", 0.39, "70 m² chốt số"],
  [qv("Tiện ích", 1), "pen-click", 0.35, "quay-vong → PHÒNG GYM"], // tiếng gọn: whoosh đè mất chữ "gym"
  [qv("Tiện ích", 2), "snap", 0.2, "quay-vong → CÔNG VIÊN"],
  [find("PHÍ ẨN").at + 0.9, "paper-tear", 0.6, "gạch đỏ"],
  [VDUR - 0.15, "sparkle", 0.5, "kết"], // trước khi hết lời: sau đó không còn giọng để so mức
];
const SFX = [
  ...KT.map((c) => ({ at: r2(c.at + (c.p === "gia-chot" ? 0.05 : 0)), name: c.sfx[0], vol: c.sfx[1], why: c.o.m ?? c.o.words?.join(" / ") ?? `${c.o.k} ${c.o.value}`,
    // chữ gõ (go-chu): tiếng phím chạy đúng nhịp từng ký tự hiện ra (preset gõ 0,06 s một ký tự) — luật 16
    ...(c.p === "go-chu" ? { run: { n: [...new Intl.Segmenter("vi", { granularity: "grapheme" }).segment(c.o.m)].length, step: 0.06, names: ["type", "type-3"] } } : {}) })),
  ...LAYER.map(([t, name, vol, why]) => ({ at: r2(t), name, vol, why })),
].sort((a, b) => a.at - b.at);
// Chặn lặp: hai tiếng cùng loại (cùng tên gốc) phải cách nhau ≥ 30 s
const dup = SFX.flatMap((s, i) => SFX.slice(0, i).filter((p) => base(p.name) === base(s.name) && s.at - p.at < 30).map((p) => `${p.name} ${p.at} → ${s.name} ${s.at}`));
if (dup.length) throw new Error("SFX lặp loại trong 30 s:\n" + dup.join("\n"));
fs.writeFileSync(path.join(HERE, "sfx.json"), JSON.stringify({ gainDb: 6, minGap: 0.35, cues: SFX }, null, 1) + "\n");

buildVideo(import.meta.url, {
  fonts: [["yeseva-one", [400]], ["encode-sans", [600, 700]], ["be-vietnam-pro", [900]], ["dancing-script", [700]]], // be-vietnam-pro, dancing-script: font dự phòng trong CSS preset BĐS (lint)
  noCap: T.map((c) => c.i), // không phụ đề chạy (luật 1): mọi cụm đều tắt phụ đề
  endStart: 0,
  tail: 1.1,
  html: (html, out) => {
    fs.copyFileSync(FOOT, path.join(out, "assets/footage.mp4")); // bản đã pha màu
    console.log(KT.map((c) => `${c.at}–${c.out} ${c.p} ${c.o.k ?? ""} / ${c.o.m ?? c.o.words ?? c.o.value} · ${c.sfx[0]}`).join("\n"));
    return html.replace("{{KT}}", JSON.stringify(KT));
  },
});
