// goi-sach.mjs — đóng gói bản sạch để giao cho người khác hoặc làm repo thử: không dữ liệu khách, không dây nối repo này.
//   node phat-hanh/goi-sach.mjs [thư-mục-ra]        # mặc định build/goi-sach/bds-editor
// Lấy đúng các file đã commit ở HEAD (git archive), rồi:
//   - bỏ clients/* (trừ _mau), projects/* (trừ example), ảnh chụp video khách trong text-presets/catalog, thư mục phat-hanh/;
//   - đặt text-presets/history.json về rỗng, bỏ dòng video khách ở bảng 4c của TALKING-HEAD;
//   - thay tên khách / slug theo phat-hanh/an-danh.json (file này không đi theo gói);
//   - gỡ luật đồng bộ lõi với repo khác, đổi tên velis-editor → bds-editor (cả thư mục skill);
//   - bỏ nhật ký thực hành (bản dựng cũ, dự án thử) và bảng thử tests/me4real (lời thoại video bên thứ ba);
//   - grep lại: còn sót tên trong "cam" hoặc slug khớp "cam_regex" (projects/ khác example, slug thử nghiệm) thì báo và thoát mã 1.
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
rm("tests/me4real"); // bảng thử dựng từ lời thoại 6 video gốc của bên thứ ba (học ở velis-editor; master dùng test:kiem-chu)
fs.writeFileSync(path.join(OUT, "text-presets/history.json"), '{ "videos": [] }\n');
fs.renameSync(path.join(OUT, ".claude/skills/velis-editor"), path.join(OUT, ".claude/skills/bds-editor"));

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const files = walk(OUT).filter((f) => TEXT.test(f));
const edit = (rel, fn) => { const f = path.join(OUT, rel); fs.writeFileSync(f, fn(fs.readFileSync(f, "utf8"))); };

// Sửa riêng từng file trước khi thay chữ hàng loạt
edit("CLAUDE.md", (s) => s.replace(/ Content tự động cho kênh Vis[^\n]*/, "").replace(/\n- Lõi dựng \(`scripts\/`[^\n]*/, "").replace(/\n- Repo này là nơi brief, học, thử nghiệm[^\n]*/, "")
  .replace(/(\n- Không dùng SFX scribble-2\.)/, "$1\n- Python chạy bằng `~/.asr/bin/python` (trên cloud `.claude/hooks/session-start.sh` tự cài khi mở phiên; chạy trên máy: `HUONG-DAN.md` mục "Chạy trên máy của mình")."));
edit("docs/VAN-HANH.md", (s) => s.replace(/\n## 11\. Lõi chung[\s\S]*$/, "\n").replace(/\n- Lõi dùng chung với repo `edit-bds`[^\n]*/, ""));
edit("TALKING-HEAD.md", (s) => s.split("\n").filter((l) => !CFG.dong_4c.some((slug) => l.startsWith(`| \`${slug}\``)) && !l.includes("velis-editor-master")).join("\n")
  .replace("\n", "\n\n> Bản mẫu này không kèm video thật của khách nào. Mẫu chép đủ luật là `projects/example/`; phần chữ sau người (mục 4b) chưa có trong mẫu, dựng theo mô tả trong file này.\n"));
// nhật ký thực hành (bản dựng cũ, dự án thử): chỉ ở velis-editor, master giữ quy tắc đã chốt
edit("docs/HAU-KY.md", (s) => s.replace(/\n### Bản v7 [\s\S]*?(?=\n## )/, "\n").replace(/\n\| Dự án mẫu theo kiểu "nói trên bản đồ" \|[^\n]*/, ""));
edit("lib/README.md", (s) => s.replace(/ Sửa preset chữ thì chạy thêm `npm run test:me4real`[^.]*\([^)]*\)\./, ""));
edit("text-presets/bds/BDS-PRESETS.md", (s) => s.replace(/Bảng thử cả bộ: `npm run test:me4real`[^\n]*/, "Bảng thử cả bộ: `npm run test:kiem-chu` (mọi preset đã duyệt × 3 bộ câu chữ × 3 cặp font; kt-check + text-ink)."));
edit("MAP.md", (s) => s.replace(/ \(mẫu: `projects\/vanh-dai-2\/map\/nen\.json` ở repo `edit-bds`\)/, "").replace(/\nVí dụ: `projects\/vanh-dai-2[^\n]*/, ""));
edit("TOOLKIT.md", (s) => s.replace(/\n\s*- Ví dụ: `projects\/vanh-dai-2\/build\.mjs` ở repo `edit-bds`\./, ""));
edit("package.json", (s) => { const j = JSON.parse(s); j.name = "bds-editor"; delete j.scripts["test:me4real"]; delete j.repository; delete j.bugs; delete j.homepage; return JSON.stringify(j, null, 2) + "\n"; });

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
// chốt chặn chung: slug dự án ngoài projects/example, slug thử nghiệm (cam_regex)
for (const f of walk(OUT).filter((f) => TEXT.test(f))) {
  const lines = fs.readFileSync(f, "utf8").split("\n");
  lines.forEach((l, i) => { for (const re of CFG.cam_regex.mau) if (new RegExp(re, "i").test(l)) hits.push(`${path.relative(OUT, f)}:${i + 1}: [/${re}/] ${l.trim().slice(0, 120)}`); });
}
const size = execSync(`du -sh "${OUT}"`).toString().split("\t")[0];
if (hits.length) { console.error(`✗ Còn ${hits.length} chỗ sót:\n` + hits.join("\n")); process.exit(1); }
console.log(`✔ ${OUT} · ${walk(OUT).length} file · ${size} · không còn tên trong danh sách cấm`);
