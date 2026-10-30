// goi-sach.mjs — đóng gói bản sạch để giao cho người khác hoặc làm repo thử: không dữ liệu khách, không dây nối repo này.
//   node phat-hanh/goi-sach.mjs [thư-mục-ra]        # mặc định build/goi-sach/bds-editor
// Lấy đúng các file đã commit ở HEAD (git archive), rồi:
//   - bỏ clients/* (trừ _mau), projects/* (trừ example), ảnh chụp video khách trong text-presets/catalog, thư mục phat-hanh/;
//   - đặt text-presets/history.json về rỗng, bỏ dòng video khách ở bảng 4c của TALKING-HEAD;
//   - thay tên khách / slug theo phat-hanh/an-danh.json (file này không đi theo gói);
//   - gỡ luật đồng bộ lõi với repo khác, đổi tên velis-editor → bds-editor (cả thư mục skill);
//   - grep lại: còn sót tên nào trong an-danh.json "cam" thì báo và thoát mã 1.
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OUT = path.resolve(process.argv[2] || path.join(ROOT, "build/goi-sach/bds-editor"));
const CFG = JSON.parse(fs.readFileSync(path.join(ROOT, "phat-hanh/an-danh.json"), "utf8"));
const TEXT = /\.(md|mjs|cjs|js|py|json|html|css|txt|ya?ml|sh)$/i;

if (execSync("git status --porcelain", { cwd: ROOT }).toString().trim()) console.warn("⚠ Có thay đổi chưa commit: gói chỉ lấy HEAD.");
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
execSync(`git archive HEAD | tar -x -C "${OUT}"`, { cwd: ROOT, shell: "/bin/bash" });

const rm = (p) => fs.rmSync(path.join(OUT, p), { recursive: true, force: true });
for (const d of ["clients", "projects"]) for (const e of fs.readdirSync(path.join(OUT, d))) if (!["_mau", "example"].includes(e)) rm(`${d}/${e}`);
for (const e of fs.readdirSync(path.join(OUT, "text-presets/catalog"))) if (/\.(jpe?g|png|mp4)$/i.test(e)) rm(`text-presets/catalog/${e}`);
rm("phat-hanh");
fs.writeFileSync(path.join(OUT, "text-presets/history.json"), '{ "videos": [] }\n');
fs.renameSync(path.join(OUT, ".claude/skills/velis-editor"), path.join(OUT, ".claude/skills/bds-editor"));

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const files = walk(OUT).filter((f) => TEXT.test(f));
const edit = (rel, fn) => { const f = path.join(OUT, rel); fs.writeFileSync(f, fn(fs.readFileSync(f, "utf8"))); };

// Sửa riêng từng file trước khi thay chữ hàng loạt
edit("CLAUDE.md", (s) => s.replace(/ Content tự động cho kênh Vis[^\n]*/, "").replace(/\n- Lõi dựng \(`scripts\/`[^\n]*/, ""));
edit("docs/VAN-HANH.md", (s) => s.replace(/\n## 11\. Lõi chung[\s\S]*$/, "\n").replace(/\n- Lõi dùng chung với repo `edit-bds`[^\n]*/, ""));
edit("TALKING-HEAD.md", (s) => s.split("\n").filter((l) => !CFG.dong_4c.some((slug) => l.startsWith(`| \`${slug}\``))).join("\n")
  .replace("\n", "\n\n> Gói này không kèm các dự án `projects/video-mau-*` (là dữ liệu khách). Chỗ nào nhắc tới thì dựng lại theo mô tả trong file này, mẫu khung ở `projects/example/`.\n"));
edit("MAP.md", (s) => s.replace(/ \(mẫu: `projects\/vanh-dai-2\/map\/nen\.json` ở repo `edit-bds`\)/, "").replace(/\nVí dụ: `projects\/vanh-dai-2[^\n]*/, ""));
edit("TOOLKIT.md", (s) => s.replace(/\n\s*- Ví dụ: `projects\/vanh-dai-2\/build\.mjs` ở repo `edit-bds`\./, ""));
edit("package.json", (s) => { const j = JSON.parse(s); j.name = "bds-editor"; delete j.repository; delete j.bugs; delete j.homepage; return JSON.stringify(j, null, 2) + "\n"; });

for (const f of files) {
  if (!fs.existsSync(f)) continue;
  let s = fs.readFileSync(f, "utf8"), t = s;
  for (const [a, b] of CFG.thay) t = t.split(a).join(b);
  if (t !== s) fs.writeFileSync(f, t);
}

const hits = [];
for (const f of walk(OUT).filter((f) => TEXT.test(f))) {
  const lines = fs.readFileSync(f, "utf8").split("\n");
  lines.forEach((l, i) => { for (const w of CFG.cam) if (l.toLowerCase().includes(w.toLowerCase())) hits.push(`${path.relative(OUT, f)}:${i + 1}: [${w}] ${l.trim().slice(0, 120)}`); });
}
const size = execSync(`du -sh "${OUT}"`).toString().split("\t")[0];
if (hits.length) { console.error(`✗ Còn ${hits.length} chỗ sót:\n` + hits.join("\n")); process.exit(1); }
console.log(`✔ ${OUT} · ${walk(OUT).length} file · ${size} · không còn tên trong danh sách cấm`);
