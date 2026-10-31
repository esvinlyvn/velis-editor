// cap-nhat-mau.mjs — đưa quy tắc / kỹ năng đã chốt ở velis-editor lên repo mẫu chuẩn velis-editor-master (luật 24).
//   node phat-hanh/cap-nhat-mau.mjs              # đóng gói sạch → commit nối tiếp lên master → push
//   node phat-hanh/cap-nhat-mau.mjs --thu        # chỉ đóng gói + so khác biệt, không commit / push
//   node phat-hanh/cap-nhat-mau.mjs --lam-moi    # xoá sạch lịch sử master, thay bằng một commit (chỉ khi lịch sử cũ lọt dữ liệu không được có)
// Gói hỏng (còn tên khách, slug ngoài projects/example, slug thử nghiệm) thì dừng, không đụng tới master.
// Commit NỐI TIẾP lịch sử master (không ghi đè) để các repo con gộp được bản cập nhật (HUONG-DAN bước 7).
import { execFileSync, execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const REPO = "https://github.com/esvinlyvn/velis-editor-master";
const GOI = path.join(ROOT, "build/goi-sach/bds-editor"), MAU = path.join(ROOT, "build/repo-mau");
const arg = new Set(process.argv.slice(2));
const git = (args, opt = {}) => execFileSync("git", args, { cwd: MAU, encoding: "utf8", ...opt }).trim();

execFileSync("node", [path.join(ROOT, "phat-hanh/goi-sach.mjs"), GOI], { stdio: "inherit" }); // thoát mã 1 nếu gói chưa sạch → dừng ở đây
const nguon = execSync("git rev-parse --short HEAD", { cwd: ROOT }).toString().trim();

// bản làm việc của master: clone một lần, các lần sau lấy bản mới nhất
if (!fs.existsSync(path.join(MAU, ".git"))) execFileSync("git", ["clone", "-q", REPO, MAU], { stdio: "inherit" });
git(["fetch", "-q", "origin", "main"]);
const coLichSu = git(["ls-remote", "--heads", "origin", "main"]) !== "";
if (arg.has("--lam-moi") || !coLichSu) { git(["checkout", "-q", "--orphan", "moi"]); git(["rm", "-rqf", "--ignore-unmatch", "."]); }
else git(["checkout", "-q", "-B", "main", "origin/main"]);

// thay toàn bộ nội dung bằng gói (giữ .git)
for (const e of fs.readdirSync(MAU)) if (e !== ".git") fs.rmSync(path.join(MAU, e), { recursive: true, force: true });
fs.cpSync(GOI, MAU, { recursive: true, filter: (f) => !f.split(path.sep).includes(".git") });
git(["add", "-A"]);
const khac = git(["status", "--porcelain"]);
if (!khac) { console.log("✔ master đã đúng bản này, không có gì mới"); process.exit(0); }
console.log(git(["diff", "--cached", "--stat"]).split("\n").slice(-1)[0]);
if (arg.has("--thu")) { console.log(`(thử) chưa commit: ${MAU}`); process.exit(0); }

const msg = `Cập nhật từ velis-editor@${nguon}: quy tắc / kỹ năng đã chốt`;
git(["-c", "user.name=esvinlyvn", "-c", "user.email=info@velisrealty.vn", "commit", "-q", "-m", msg]);
if (arg.has("--lam-moi") && coLichSu) { git(["branch", "-M", "main"]); git(["push", "-q", "--force-with-lease", "origin", "main"]); }
else { git(["branch", "-M", "main"]); git(["push", "-q", "origin", "main"]); }
console.log(`✔ ${REPO} · ${git(["log", "--oneline", "-1"])}`);
