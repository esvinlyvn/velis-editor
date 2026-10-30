#!/usr/bin/env node
// Huy Trần · Casa Villa song lập, Blanca City: clip POV một cú máy liền (143 s) → chữ chốt kiểu tạp chí + SFX. Không phụ đề, không cắt.
//   Kịch bản cú máy: SHOTBOOK.md. Phong cách khác 3 video trước: preset tap-chi (serif Playfair, chữ khóa nghiêng gradient,
//   hiện theo từ) làm tiêu đề; mỗi loại thông tin một preset (gia-chot số · chu-bac hiện trạng · quay-vong liệt kê · nhan-neon trạng thái · go-chu câu mời).
//   Voice: scripts/asr/transcribe.py, sửa tay (bỏ đoạn lặp ảo 55,4 s; Sơn→Sun, công gian→không gian, bia→bi-a).
//   node projects/huy-tran-casa-villa/build.mjs [--no-render]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildVideo } from "../../scripts/build-video.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const T = JSON.parse(fs.readFileSync(path.join(HERE, "transcript.json"), "utf8")).chunks;
const W = (i, w, n = 0) => {
  const hit = T[i].words.filter((x) => x.w.toLowerCase().replace(/[,.?!]/g, "").split(" ")[0] === w.toLowerCase());
  if (!hit[n]) throw new Error(`Cụm ${i} không có chữ "${w}" (lần ${n})`);
  return hit[n].s;
};
const r2 = (n) => Math.round(n * 100) / 100;

// Gradient: c = màu giữa, c2 = màu đáy. Champagne là màu chính; xanh lá = ổn, an toàn; cam = mốc thời gian, chú ý.
const C = { champ: { c: "#e2b864", c2: "#8f6420" }, jade: { c: "#6fe0a8", c2: "#178a55" }, amber: { c: "#ffb347", c2: "#c4610f" } };
const TC = (k, m, hl, more = {}) => ({ p: "tap-chi", o: { k, m, hl, ...C.champ, size: 150, ...more } });
const G = (k, value, pre = "", suf = "", c = C.champ) => ({ p: "gia-chot", o: { k, value, prefix: pre, suffix: suf, ...c, size: 180 } });
const S = (k, m) => ({ p: "chu-bac", o: { k, m, size: 140 } });
const N = (m, c) => ({ p: "nhan-neon", o: { m, ...c, glow: c.c, size: 120 } });
const Q = (k, words, step, c = C.champ) => ({ p: "quay-vong", o: { k, words, ...c, size: 140, step: r2(step) } });
const at = (cue, t, extra = {}) => ({ ...cue, at: t, ...extra });

const KT = [
  // B1 Mặt tiền
  at(TC("Blanca City · Sun Vũng Tàu", "BIỆT THỰ SONG LẬP", "SONG LẬP"), 0.1),
  at(N("SỞ HỮU LÂU DÀI", C.jade), W(1, "sở") - 0.1),
  at(G("CÁCH BIỂN CHỈ", 800, "700–", " m"), W(1, "700") - 0.4),
  at(G("ĐẤT 10 × 20", 200, "", " m²"), W(2, "diện") - 0.1),
  at(TC("Thiết kế", "1 HẦM · 3 LẦU", "HẦM LẦU"), W(3, "thiết") - 0.1),
  at(N("THỨ 7 NÀY BÀN GIAO", C.amber), W(3, "thứ") - 0.1),
  at({ p: "go-chu", o: { m: "Cùng em đi xem thực tế nha!", ...C.champ, size: 96 } }, W(4, "cùng") - 0.1),
  // B2 Hầm
  at(TC("Tầng dưới", "KHU VỰC HẦM", "HẦM"), W(5, "khu") - 0.2),
  at(S("Bàn giao thô", "TỰ HOÀN THIỆN"), W(6, "bàn") - 0.1),
  at(TC("Phần hầm", "TỰ CHỌN CÔNG NĂNG", "CÔNG NĂNG"), W(8, "công") - 0.2),
  at(TC("Hầm làm", "PHÒNG GIẢI TRÍ", "GIẢI TRÍ"), W(9, "phòng") - 0.2),
  at(Q("Như là", ["KARAOKE", "PHÒNG BI-A"], W(10, "phòng") - W(10, "karaoke")), W(10, "karaoke") - 0.15),
  at(S("Tầng trên", "PHÒNG NGỦ"), W(12, "bố") - 0.2),
  // B3 Sân sau
  at(TC("Khu vực", "PHÍA SAU", "PHÍA SAU"), W(13, "khu") - 0.1),
  at(TC("Không gian", "CỬA MỞ", "CỬA MỞ"), W(15, "không") - 0.1),
  at(TC("Nhìn", "CỰC KỲ ĐẸP", "ĐẸP"), W(16, "cực") - 0.1),
  // B4 Thương hiệu, tiến độ
  at(TC("Thiết kế · thương hiệu", "SUN GROUP", "SUN"), W(17, "sản") - 0.1),
  at(S("Đi xem thực tế", "CÙNG EM HUY"), W(19, "liên") - 0.2),
  at(G("HOÀN THIỆN SAU", 17, "", " THÁNG", C.amber), W(21, "hoàn") - 0.1),
  at(TC("Từ 2025 tới nay", "GẦN NHƯ XONG HẾT", "XONG"), W(22, "2025") - 0.2),
  at(N("THỨ 7 NHẬN NHÀ", C.amber), W(23, "thứ") - 0.1),
  at(N("CÓ THÔNG BÁO LÀM SỔ", C.jade), W(24, "thông") - 0.3),
  // B5 Trục Hàng Điều
  at(G("VỈA HÈ TRƯỚC NHÀ", 6, "4–", " MÉT"), W(26, "4") - 0.4),
  at(TC("Trục chính dự án", "HÀNG ĐIỀU", "HÀNG ĐIỀU"), W(28, "hàng") - 0.15),
  at(Q("Từ đây", ["ĐƯỜNG 3/2", "QUẸO PHẢI", "BIỂN CHÍ LINH"], (W(33, "biển") - W(31, "đường")) / 2), W(31, "đường") - 0.15),
  at(G("THỨ 7 NÀY BÀN GIAO", 400, "", " CĂN", C.amber), W(34, "bàn") - 0.3),
  // B6 Giá, liên hệ
  at(TC("Đi xem thực tế", "CÙNG EM HUY", "HUY"), W(37, "liên") - 0.2),
  at(S("Gửi bảng giá", "CHI TIẾT TỪNG CĂN"), W(39, "gửi") - 0.1),
  at(G("1 CĂN SONG LẬP KHOẢNG", 27, "", " TỶ"), W(41, "khoảng") - 0.2),
  at(TC("Xem nhà · nhận bảng giá", "LIÊN HỆ HUY", "HUY"), W(42, "cho") + 0.6, { out: 999 }),
].map((c, i, a) => {
  const out = r2(c.out ?? (a[i + 1] ? a[i + 1].at - 0.2 : 999));
  return { ...c, at: r2(c.at), out, o: { ...c.o, hold: r2(out - c.at) } };
});

// SFX: mỗi khối chữ một tiếng, mỗi tiếng một LOẠI khác nhau (không lặp, TALKING-HEAD.md 4a); người dùng thấy 13 tiếng là ít → 31 tiếng.
const find = (m) => KT.find((c) => c.o.m === m || c.o.k === m);
const SFX = [
  // B1 Mặt tiền
  [0.1, "reveal", 0.42, "tiêu đề mở"],
  [find("SỞ HỮU LÂU DÀI").at + 0.05, "confirm", 0.55, "nhãn sở hữu lâu dài"],
  [find("CÁCH BIỂN CHỈ").at + 0.05, "tick", 0.35, "700–800 m đếm lên"],
  [find("ĐẤT 10 × 20").at + 0.95, "coin", 0.42, "200 m² chốt số"],
  [find("1 HẦM · 3 LẦU").at + 0.1, "pop-multi", 0.5, "1 hầm · 3 lầu"],
  [find("THỨ 7 NÀY BÀN GIAO").at + 0.05, "notify", 0.65, "mốc bàn giao"],
  [find("Cùng em đi xem thực tế nha!").at, "type", 0.32, "gõ câu mời"],
  [W(4, "vào") + 0.1, "door-open", 0.45, "bước vào nhà"],
  // B2 Hầm
  [find("KHU VỰC HẦM").at, "whoosh-soft", 0.4, "xuống hầm"],
  [find("TỰ HOÀN THIỆN").at + 0.1, "scribble", 0.35, "ánh bạc: bàn giao thô"],
  [find("TỰ CHỌN CÔNG NĂNG").at + 0.1, "toggle", 0.45, "chọn công năng"],
  [find("PHÒNG GIẢI TRÍ").at + 0.1, "ding-idea", 0.4, "ý tưởng: phòng giải trí"],
  [find("Như là").at + 0.15, "swipe", 0.4, "karaoke → bi-a"],
  [find("PHÒNG NGỦ").at + 0.1, "slide", 0.4, "tầng trên phòng ngủ"],
  // B3 Sân sau
  [find("PHÍA SAU").at, "whoosh-double", 0.45, "ra phía sau"],
  [find("CỬA MỞ").at, "shimmer", 0.4, "không gian cửa mở"],
  [find("CỰC KỲ ĐẸP").at + 0.1, "camera", 0.5, "cực kỳ đẹp: chụp ảnh"],
  // B4 Thương hiệu, tiến độ
  [find("SUN GROUP").at, "title-in", 0.42, "Sun Group"],
  [find("CÙNG EM HUY").at + 0.1, "open", 0.5, "cùng em Huy"],
  [find("HOÀN THIỆN SAU").at + 0.05, "meter", 0.4, "17 tháng đếm lên"],
  [find("GẦN NHƯ XONG HẾT").at + 0.1, "success", 0.35, "gần như xong hết"],
  [find("THỨ 7 NHẬN NHÀ").at + 0.05, "knock", 0.5, "nhận nhà"],
  [find("CÓ THÔNG BÁO LÀM SỔ").at + 0.05, "check", 0.45, "làm sổ"],
  // B5 Trục Hàng Điều
  [find("VỈA HÈ TRƯỚC NHÀ").at + 0.05, "scroll", 0.35, "vỉa hè 4–6 m"],
  [find("HÀNG ĐIỀU").at, "ting", 0.4, "trục Hàng Điều"],
  [find("Từ đây").at + 0.15, "whoosh-fast", 0.35, "đường 3/2 → biển"],
  [KT.find((c) => c.p === "gia-chot" && c.o.k === "THỨ 7 NÀY BÀN GIAO").at + 0.05, "chart-up", 0.4, "400 căn"],
  // B6 Giá, liên hệ
  [KT.filter((c) => c.o.m === "CÙNG EM HUY")[1].at + 0.1, "send", 0.45, "đi xem thực tế cùng Huy"],
  [find("CHI TIẾT TỪNG CĂN").at + 0.1, "paper-rustle", 0.4, "gửi bảng giá"],
  [find("1 CĂN SONG LẬP KHOẢNG").at + 0.95, "cash", 0.3, "27 tỷ"],
  [find("LIÊN HỆ HUY").at, "sparkle", 0.8, "kết: liên hệ Huy"],
].map(([at, name, vol, why]) => ({ at: r2(at), name, vol, why })).sort((a, b) => a.at - b.at);
fs.writeFileSync(path.join(HERE, "sfx.json"), JSON.stringify({ gainDb: 6, minGap: 0.35, cues: SFX }, null, 1) + "\n");

buildVideo(import.meta.url, {
  fonts: [["playfair-display", [700, 800]], ["plus-jakarta-sans", [700]], ["be-vietnam-pro", [900]]], // be-vietnam-pro: font dự phòng trong CSS preset BĐS (lint)
  noCap: T.map((c) => c.i),
  endStart: 0,
  tail: 0,
  html: (html, out) => {
    fs.copyFileSync(path.join(HERE, "footage.mp4"), path.join(out, "assets/footage.mp4"));
    console.log(KT.map((c) => `${c.at}–${c.out} ${c.p} ${c.o.k ?? ""} / ${c.o.m ?? c.o.words ?? c.o.value}`).join("\n"));
    return html.replace("{{KT}}", JSON.stringify(KT));
  },
});
