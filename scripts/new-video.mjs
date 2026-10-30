#!/usr/bin/env node
// Tạo video mới: node scripts/new-video.mjs <kenh>-<du-an> [--kenh <kenh>] [--recipe R1] [--style S1]
//   → projects/<video>/plan.json (khung rỗng) + work/<video>/ (bỏ footage.mp4, voice.wav vào đây; không commit).
//   Không chép video cũ: mọi cách dựng nằm ở lib/ (lib/README.md).
import fs from "node:fs";
import path from "node:path";
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const a = process.argv.slice(2), slug = a.find((x) => !x.startsWith("--")), opt = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
if (!slug || !/^[a-z0-9-]+$/.test(slug)) { console.error("Cách dùng: node scripts/new-video.mjs <kenh>-<du-an> [--kenh k] [--recipe R1] [--style S1] (chữ thường, số, gạch nối)"); process.exit(1); }
const P = path.join(ROOT, "projects", slug);
if (fs.existsSync(P)) { console.error(`Đã có ${path.relative(ROOT, P)}`); process.exit(1); }
fs.mkdirSync(path.join(P, "info"), { recursive: true });
fs.mkdirSync(path.join(ROOT, "work", slug), { recursive: true });
const plan = { video: slug, kenh: opt("--kenh", slug.split("-")[0]), recipe: opt("--recipe", "R1"), style: opt("--style", "S1"),
  roles: {}, hook_peak: null, blocks: [], sfx_layer: [] };
fs.writeFileSync(path.join(P, "plan.json"), JSON.stringify(plan, null, 1) + "\n");
fs.writeFileSync(path.join(P, "NOTES.md"), `# ${slug}\n\nNguồn số liệu, mặc định đã dùng, điều người dùng dặn riêng.\n`);
console.log(`✔ projects/${slug}/plan.json · bỏ clip vào work/${slug}/footage.mp4 và voice.wav · rồi làm theo lib/README.md`);
