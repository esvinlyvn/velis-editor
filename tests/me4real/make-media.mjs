#!/usr/bin/env node
// Media tổng hợp cho bảng thử bộ ME4REAL (không phải mẫu phong cách): work/me4real/{footage.mp4, voice.wav}.
//   npm run test:me4real → build/me4real/index.html; kt-check: node scripts/qa/kt-check.cjs build/me4real/index.html me4real
//   tests/me4real/ref.json ghi khung gốc tương ứng từng khối ("video:giây") để so bằng mắt.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const W = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../work/me4real");
fs.mkdirSync(W, { recursive: true });
const ff = (a) => execFileSync("ffmpeg", ["-loglevel", "error", "-y", ...a]);
ff(["-f", "lavfi", "-i", "gradients=s=1080x1920:d=56:r=30:c0=0x8a96a6:c1=0x3e4a5c:speed=0.01", "-pix_fmt", "yuv420p", "-c:v", "libx264", "-crf", "30", path.join(W, "footage.mp4")]);
ff(["-f", "lavfi", "-i", "aevalsrc='0.2*sin(2*PI*180*t)':s=48000:d=55", path.join(W, "voice.wav")]);
console.log("✔ work/me4real: footage.mp4, voice.wav");
