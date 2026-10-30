#!/usr/bin/env node
// Palm River · căn T3-22-03 (Tú Phan): clip đã dựng sơ (cảnh nói, lật trang + ảnh tin nhắn, sa bàn, thẻ kết) → thêm chữ chốt kiểu điện ảnh.
//   Phong cách khác clip Tú · Casa Villa: preset dien-anh (chữ rất lớn co chữ từ mờ sang nét, chữ dẫn giãn rộng giữa 2 vạch mảnh),
//   font Archivo 900 + Saira 600, gradient champagne; 5 khoảnh khắc chữ NẰM SAU đối tượng (người / đỉnh tháp sa bàn).
//   Chữ sau đối tượng: scripts/fx/matte.py tách nền từng khung → render xong phủ lại đối tượng gốc lên trên chữ (scripts/fx/behind.mjs).
//   Voice nhận diện bằng scripts/asr/transcribe.py, sửa tay (ưng ý, T3-22-03, che chắn, Thạnh Mỹ Lợi, sold out).
//   ~/.asr/bin/python -I scripts/fx/matte.py projects/palm-river/footage.mp4 work/palm-river/matte <cửa sổ trong BEHIND …>
//   node projects/palm-river/build.mjs [--no-render]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildVideo } from "../../scripts/build-video.mjs";
import { behind } from "../../scripts/fx/behind.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../..");
const T = JSON.parse(fs.readFileSync(path.join(HERE, "transcript.json"), "utf8")).chunks;
const W = (i, w, n = 0) => {
  const hit = T[i].words.filter((x) => x.w.toLowerCase().replace(/[,.?]/g, "").split(" ")[0] === w.toLowerCase());
  if (!hit[n]) throw new Error(`Cụm ${i} không có chữ "${w}" (lần ${n})`);
  return hit[n].s;
};
const r2 = (n) => Math.round(n * 100) / 100;

// Cửa sổ chữ-sau-đối-tượng (giây theo footage) — phải khớp lệnh matte.py ở trên
const MATTE = path.join(ROOT, "work/palm-river/matte");
// song: máy bắt đầu nghiêng lúc ~21,4 s (đỉnh tháp từ y 447 vọt lên 110) → chỉ lồng tới 21,45; mặt nạ tính tới 23,0 nhưng không dùng phần sau
// t22 (11,8–13,9) đã thử: góc máy đó tháp cao tới y ~300, chữ không lên cao hơn vùng an toàn được → tháp che gần hết chữ, bỏ.
const BEHIND = { intro: [0, 4.8], outro: [67.8, 74.6] }; // tháp sa bàn (song, ba, sold): mặt nạ isnet viền vỡ, người dùng chê → bỏ
// Đỉnh đối tượng (y, khung 1080×1920) trung vị trong cửa sổ, đọc từ matte.py; chưa có thì dùng số đo tay
const TOP0 = { intro: 880, song: 450, ba: 500, sold: 360, outro: 760 };
// trung vị trong đúng khoảng [a, b] mà khối chữ hiện
const objTop = (name, a, b) => {
  const f = path.join(MATTE, name + ".json");
  if (!fs.existsSync(f)) return TOP0[name];
  const j = JSON.parse(fs.readFileSync(f, "utf8"));
  const v = j.top.filter((x, i) => x != null && j.start + i / j.fps >= a && j.start + i / j.fps <= b).sort((x, y) => x - y);
  return v[Math.floor(v.length / 2)];
};

const BEHIND_OK_F = path.join(ROOT, "work/palm-river/behind-ok.json");
const BEHIND_OK = fs.existsSync(BEHIND_OK_F) ? JSON.parse(fs.readFileSync(BEHIND_OK_F, "utf8")) : {};

// Gradient: c = màu giữa, c2 = màu đáy (preset tự pha phần sáng). Champagne là màu chính của video.
const C = { champ: { c: "#e9c27a", c2: "#9c6a22" }, sky: { c: "#8fd3ff", c2: "#2f6fd0" }, jade: { c: "#7de3b5", c2: "#1d8a5e" }, ruby: { c: "#ff8a7a", c2: "#c01f3a" } };
const D = (k, m, hl, c = C.champ, more = {}) => ({ p: "dien-anh", o: { k, m, hl, ...c, ...more } });
const at = (cue, t, extra = {}) => ({ ...cue, at: t, ...extra });
const G = (k, value, pre = "", suf = "", c = C.champ) => ({ p: "gia-chot", o: { k, value, prefix: pre, suffix: suf, ...c, size: 190 } });
const S = (k, m) => ({ p: "chu-bac", o: { k, m, size: 150 } });
const N = (m, c) => ({ p: "nhan-neon", o: { m, ...c, glow: c.c, size: 130 } });
// Chữ chốt: mỗi preset một vai, không một hiệu ứng lặp cả video (người dùng chê "spam").
//   dien-anh = 6 khoảnh khắc chính · gia-chot = số đếm lên · chu-bac = ánh bạc (tiện ích, loại căn) · quay-vong = liệt kê
//   nhan-neon = trạng thái (không che chắn, sold out) · canh-bao = "TẦNG 30" bị gạch khi đã hết · go-chu = câu hỏi.
// behind: tên cửa sổ → phần dưới chữ chính (behindFrac) nằm sau đỉnh đầu; chỉ lồng sau NGƯỜI (tháp sa bàn tách nền xấu, đã bỏ).
const KT = [
  at(D("Palm River · review", "CĂN ƯNG Ý", "ƯNG Ý", C.champ, { size: 230 }), 0.15, { behind: "intro", behindFrac: 0.4, out: 4.75 }),
  at({ p: "go-chu", o: { m: "Vì sao khách ưng ý?", ...C.champ, size: 110 } }, 9.05), // ảnh tin nhắn (5,2–9,0 s) có sẵn "T3-22-03": không đè chữ lên ảnh
  at(G("CĂN T3-22-03", 22, "TẦNG "), W(3, "đây") - 0.2),
  at(S("Bước xuống 2 tầng", "TIỆN ÍCH"), W(4, "xuống") + 0.1),
  at(G("TẦNG TIỆN ÍCH", 20, "TẦNG "), W(5, "tầng") - 0.2),
  at(D("Tầm view rất đẹp", "VIEW SÔNG", "SÔNG", C.sky, { size: 250 }), W(6, "tầm") - 0.1),
  at(N("KHÔNG BỊ CHE CHẮN", C.jade), W(7, "không") - 0.1),
  { p: "quay-vong", o: { k: "Nhìn ra", words: ["THỦ THIÊM", "THẠNH MỸ LỢI", "SÔNG SÀI GÒN"], ...C.sky, size: 150, step: 0.9 }, at: W(8, "thủ") - 0.15 },
  at(D("Mặt view này", "CHỈ 3 CĂN", "3 CĂN", C.champ, { size: 230 }), W(10, "mặt") - 0.1),
  at(S("Riêng căn này", "CĂN GÓC 2PN"), W(12, "nhưng") + 0.05),
  at(G("TIM TƯỜNG", 86, "", " m²"), W(13, "86") - 0.25),
  at(G("THÔNG THỦY", 76, "", " m²"), W(13, "76") - 0.25),
  at(G("CÁC CĂN CÒN LẠI", 120, "HƠN ", " m²"), W(14, "diện") - 0.1),
  { p: "quay-vong", o: { k: "Trục căn", words: ["T3 · 03", "T4 · 05"], ...C.champ, size: 170, step: r2(W(17, "t4") - W(16, "t3")) }, at: W(16, "t3") - 0.15 },
  at(N("SOLD OUT", C.ruby), W(18, "đã") + 0.05),
  at(G("HÔM TRƯỚC CHỈ CÒN", 30, "TẦNG "), W(19, "còn") - 0.2),
  { p: "canh-bao", o: { m: "TẦNG 30", ...C.ruby, size: 180 }, at: W(20, "sold") - 0.95 }, // gạch đỏ đúng lúc "sold out"
  at(D("Review", "VÌ SAO ĐẸP?", "ĐẸP"), W(21, "review") - 0.1),
  at(S("Khách có được", "CĂN ƯNG Ý"), W(22, "căn") - 0.6),
  at(D("Quan tâm dự án", "PALM RIVER", "PALM RIVER", C.champ, { size: 210 }), W(23, "palm") - 0.35, { behind: "outro", behindFrac: 0.3 }),
  at(D("Inbox ngay", "TÚ PHAN", "TÚ PHAN", C.champ, { size: 230 }), W(23, "inbox") - 0.05, { behind: "outro", behindFrac: 0.3, out: 74.5 }),
].map((c) => (c.behind && BEHIND_OK[c.behind] === false ? { ...c, behind: undefined, behindFrac: undefined } : c)) // không đạt kiểm đọc được → chữ nổi bình thường
 .map((c, i, a) => {
  const out = r2(c.out ?? (a[i + 1] ? a[i + 1].at - 0.2 : 74.5));
  const cue = { ...c, at: r2(c.at), out, o: { ...c.o, hold: r2(out - c.at) } };
  if (c.behind) cue.objTop = objTop(c.behind, cue.at, out); // template đặt khối theo dòng chữ chính thật
  cue.narrow = cue.objTop != null && cue.objTop + 60 > 700; // khối lồng sau người (thấp): ô x 60–940 ngay từ đầu; khối khác template tự đo
  return cue;
});

// SFX: chỉ ở khoảnh khắc chính, MỖI TIẾNG MỘT LOẠI, không lặp (người dùng chê một tiếng lặp mãi nhức đầu).
const find = (m) => KT.find((c) => (c.o.m ?? c.o.words?.[0] ?? "") === m || c.o.k === m || c.o.words?.includes(m));
const SFX = [
  [0.1, "whoosh-heavy", 0.45, "intro: tiêu đề sau lưng Tú"],
  [find("Vì sao khách ưng ý?").at, "type", 0.5, "gõ câu hỏi"],
  [find("CĂN T3-22-03").at + 0.05, "meter", 0.45, "TẦNG 22 đếm lên"],
  [find("VIEW SÔNG").at, "shimmer", 0.45, "VIEW SÔNG"],
  [find("KHÔNG BỊ CHE CHẮN").at + 0.05, "confirm", 0.55, "nhãn không bị che chắn"],
  [find("Nhìn ra").at + 0.15, "swipe", 0.4, "Thủ Thiêm → Thạnh Mỹ Lợi → Sài Gòn"],
  [find("CHỈ 3 CĂN").at, "boom-heavy", 0.3, "CHỈ 3 CĂN"],
  [find("TIM TƯỜNG").at + 0.95, "coin", 0.5, "86 m² chốt số"],
  [find("SOLD OUT").at + 0.05, "stamp", 0.45, "SOLD OUT"],
  [find("TẦNG 30").at + 0.9, "error-soft", 0.45, "TẦNG 30 bị gạch"],
  [find("PALM RIVER").at, "title-in", 0.45, "PALM RIVER"],
  [74.62, "sparkle", 0.5, "thẻ kết"],
].map(([at, name, vol, why]) => ({ at: r2(at), name, vol, why })).sort((a, b) => a.at - b.at);
fs.writeFileSync(path.join(HERE, "sfx.json"), JSON.stringify({ gainDb: 6, minGap: 0.35, cues: SFX }, null, 1) + "\n");

buildVideo(import.meta.url, {
  fonts: [["archivo", [900]], ["saira", [600]], ["be-vietnam-pro", [900]]], // be-vietnam-pro: font dự phòng trong CSS preset BĐS (lint)
  noCap: T.map((c) => c.i),
  endStart: 0,
  tail: 0,
  html: (html, out) => {
    fs.copyFileSync(path.join(HERE, "footage.mp4"), path.join(out, "assets/footage.mp4"));
    console.log(KT.map((c) => `${c.at}–${c.out} ${c.o.k} / ${c.o.m}${c.behind ? ` [sau ${c.behind}, đỉnh ${c.objTop}]` : ""}`).join("\n"));
    return html.replace("{{KT}}", JSON.stringify(KT));
  },
});

// Chữ sau đối tượng: phủ đối tượng gốc (footage × mặt nạ) lên output.mp4 trong từng cửa sổ — chỉ cửa sổ đã qua kiểm đọc được
//   (scripts/fx/behind-check.py → work/palm-river/behind-ok.json; cửa sổ false = mặt nạ che mất chữ → để chữ nổi bình thường)
if (!process.argv.includes("--no-render")) {
  const okF = path.join(ROOT, "work/palm-river/behind-ok.json");
  if (!fs.existsSync(okF)) throw new Error("Chưa kiểm chữ-sau-đối-tượng: chạy scripts/fx/behind-check.py trước khi render");
  const ok = JSON.parse(fs.readFileSync(okF, "utf8"));
  behind(path.join(ROOT, "build/palm-river"), path.join(HERE, "footage.mp4"), MATTE, Object.fromEntries(Object.entries(BEHIND).filter(([k]) => ok[k])));
}
