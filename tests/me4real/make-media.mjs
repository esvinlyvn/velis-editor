#!/usr/bin/env node
// Media cho bảng thử bộ ME4REAL: work/me4real/{footage.mp4, voice.wav}.
//   Có 6 video mẫu ME4REAL ở work/me4real/goc/<1-6>.mp4 thì nền mỗi khối là một khung SẠCH (không chữ) của video gốc (tests/me4real/bg.json)
//   → phép đo tương phản và thang xử lý luật 18 chạy trên cảnh thật; không có thì dùng nền gradient tổng hợp.
//   npm run test:me4real → build/me4real/index.html; ref.json ghi khung gốc có chữ tương ứng để so bằng mắt.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const HERE = path.dirname(fileURLToPath(import.meta.url)), W = path.resolve(HERE, "../../work/me4real"), GOC = process.env.ME4REAL_GOC ?? path.join(W, "goc");
fs.mkdirSync(W, { recursive: true });
const ff = (a) => execFileSync("ffmpeg", ["-loglevel", "error", "-y", ...a]);
const bg = JSON.parse(fs.readFileSync(path.join(HERE, "bg.json"), "utf8")), D = 2.6, DUR = 0.3 + bg.length * D + 1;
if (fs.existsSync(path.join(GOC, "1.mp4"))) {
  const list = [];
  bg.forEach((s, i) => {
    const [v, t] = s.split(":"), f = path.join(W, `bg${i}.png`);
    ff(["-ss", t, "-i", path.join(GOC, `${v}.mp4`), "-frames:v", "1", "-vf", "crop=380:672:98:48,scale=1080:1920:flags=lanczos", f]);
    list.push(`file '${f}'\nduration ${i === 0 ? 0.3 + D : i === bg.length - 1 ? D + 1 : D}`);
  });
  list.push(`file '${path.join(W, `bg${bg.length - 1}.png`)}'`);
  fs.writeFileSync(path.join(W, "list.txt"), list.join("\n"));
  ff(["-f", "concat", "-safe", "0", "-i", path.join(W, "list.txt"), "-vf", "fps=30,format=yuv420p", "-c:v", "libx264", "-crf", "20", path.join(W, "footage.mp4")]);
  console.log("✔ nền: khung sạch của video gốc");
} else ff(["-f", "lavfi", "-i", `gradients=s=1080x1920:d=${DUR}:r=30:c0=0x8a96a6:c1=0x3e4a5c:speed=0.01`, "-pix_fmt", "yuv420p", "-c:v", "libx264", "-crf", "30", path.join(W, "footage.mp4")]);
ff(["-f", "lavfi", "-i", `aevalsrc='0.2*sin(2*PI*180*t)':s=48000:d=${DUR - 0.5}`, path.join(W, "voice.wav")]);
console.log("✔ work/me4real: footage.mp4, voice.wav");
