#!/usr/bin/env node
// Kim Thắm · Casa Villa, Blanca City: clip dẫn 2:47 đã dựng sẵn (người nói xen phối cảnh, có chữ in sẵn ở vài đoạn) → chữ chốt + SFX.
//   Theo TALKING-HEAD.md. Không phụ đề, không cắt (không có câu vấp). Kịch bản: SHOTBOOK.md.
//   Chữ: CHỈ bộ preset BĐS text-presets/bds/ (dựng từ video "PRESET CAPTION"), không dùng bộ 60 preset CapCut (người dùng đã dặn).
//   Preset da tang-truong (chữ gradient dâng lên từng ký tự), font Yeseva One / Encode Sans. Dùng linh hoạt cả bộ theo nghĩa từng câu:
//     noi-bat câu đắt nhất · top-list mở danh sách · khoi-noi nhãn "Lý do n" · gia-chot số · toc-do thời gian · ky-niem mốc đã qua ·
//     chuyen-dong so sánh · quay-vong liệt kê · nhan-neon trạng thái · canh-bao "không…" · chu-bac phân khúc · song biển ·
//     ky-thuat nét thiết kế · go-chu câu nói, câu hỏi. Không dùng tung-chu, dia-danh, chuong-moi (ký tự ngẫu nhiên, luật 7).
//   SFX: kho 108 loại (đã nhập đủ bộ của nhánh release + bộ master-video). Lớp 1 mỗi khối một loại riêng, lớp 2 tiếng nhỏ cho
//   chuyển động phụ; cùng loại cách nhau ≥ 30 s; mức đo bằng scripts/qa/sfx-levels.py.
//   Voice: faster-whisper large-v3 trên máy, sửa tay theo glossary.yaml (cụm 17 chạy lại riêng vì VAD bỏ sót).
//   node projects/casa-villa-kim-tham/build.mjs [--no-render]
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildVideo } from "../../scripts/build-video.mjs";
import { scrimPlan } from "../../scripts/text-contrast.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const T = JSON.parse(fs.readFileSync(path.join(HERE, "transcript.json"), "utf8")).chunks;
const W = (i, w, n = 0) => {
  const hit = T[i].words.filter((x) => x.w.toLowerCase().replace(/[,.?!:]/g, "") === w.toLowerCase());
  if (!hit[n]) throw new Error(`Cụm ${i} không có chữ "${w}" (lần ${n})`);
  return hit[n].s;
};
const r2 = (n) => Math.round(n * 100) / 100;

// Gradient theo nghĩa (c = màu giữa, c2 = màu đáy): vàng→cam số, sản phẩm · xanh ngọc→dương nơi chốn, biển · bạc hà→xanh lá an toàn, ổn · san hô→đỏ không còn
const C = { gold: { c: "#ffd166", c2: "#e8761a" }, sea: { c: "#5ee6f2", c2: "#1f6fd6" }, mint: { c: "#62e39c", c2: "#0e7a3f" }, coral: { c: "#ff9a86", c2: "#d6302a" } };
const M = (k, m, c = C.gold) => ({ p: "tang-truong", o: { k, m, ...c, size: 140 } });
const HI = (m, c = C.gold) => ({ p: "noi-bat", o: { m, ...c, size: 160 } });
const TOP = (k, m, sub, c = C.gold) => ({ p: "top-list", o: { k, m, sub, ...c, size: 150 } });
const R = (k, m, hl, c = C.gold) => ({ p: "khoi-noi", o: { k, m, hl, ...c, size: 140 } });
const G = (k, value, pre = "", suf = "", c = C.gold) => ({ p: "gia-chot", o: { k, value, prefix: pre, suffix: suf, ...c, size: 170 } });
const SP = (m, c = C.gold) => ({ p: "toc-do", o: { m, ...c, size: 150 } });
const PAST = (m) => ({ p: "ky-niem", o: { m, size: 140 } });
const VS = (m, m2, c = C.coral) => ({ p: "chuyen-dong", o: { m, m2, ...c, size: 130 } });
const Q = (k, words, step, c = C.gold) => ({ p: "quay-vong", o: { k, words, ...c, size: 130, step: r2(step) } });
const N = (m, c) => ({ p: "nhan-neon", o: { m, ...c, glow: c.c, size: 110 } });
const X = (m) => ({ p: "canh-bao", o: { m, c: "#ff4a3d", size: 120 } });
const S = (k, m) => ({ p: "chu-bac", o: { k, m, size: 130 } });
const K = (m, sub) => ({ p: "ky-thuat", o: { m, sub, ...C.gold, size: 130 } });
const V = (m) => ({ p: "song", o: { m, ...C.sea, size: 130 } });
const Y = (m) => ({ p: "go-chu", o: { m, ...C.gold, size: 84 } });
// at: giờ vào · sfx: [tên, vol] · LOW: 51–63 s nửa trên có thẻ / tựa in sẵn của clip gốc (khung không có người)
//   → đặt giữa thẻ (y 420–860) và logo BLANCA CITY (y ~1380), cỡ nhỏ hơn
const at = (cue, t, sfx, extra = {}) => ({ ...cue, at: t, sfx, ...extra });
const LOW = { top: 900, low: true };

const KT = [
  // B1 Mở: 30 tỷ, câu hỏi, 4 lý do (Kim Thắm đứng trước căn villa)
  at(HI("VỚI 30 TỶ"), 0.1, ["sub-hit", 0.9]),
  at(M("Mua đất Vũng Tàu", "TỰ XÂY BIỆT THỰ"), W(0, "mua") - 0.1, ["text-tick", 0.46]),
  at(M("Vì sao chọn", "CASA VILLA", C.sea), W(1, "tại") - 0.1, ["ting-2", 0.6]),
  at(TOP("Có", "4 LÝ DO", "khách chọn Casa"), W(2, "4") - 0.3, ["pop-multi", 0.37]),
  // B2 Lý do 1: khan hiếm
  at(R("LÝ DO 1", "KHAN HIẾM", "KHAN HIẾM"), W(3, "đầu") + 0.02, ["open", 0.27]),
  at(G("CASA CÓ", 939, "", " CĂN"), W(3, "939") - 0.3, ["counter-roll", 0.33]),
  at(G("CHỈ CHIẾM", 10, "", "%"), W(3, "chiếm") - 0.2, ["meter", 0.46]),
  at(Q("3 loại hình", ["NHÀ PHỐ", "SONG LẬP", "ĐƠN LẬP"], 0.8), W(4, "nhà") - 0.15, ["click", 0.35]),
  at(G("DIỆN TÍCH ĐẾN", 266, "130–", " m²"), W(4, "từ") - 0.2, ["coin", 0.22]),
  at(V("HÀNG BIỂN"), W(5, "quan") - 0.1, ["whoosh-soft", 0.41]),
  at(N("SỞ HỮU LÂU DÀI", C.mint), W(5, "sở") - 0.1, ["neon-on", 0.56]),
  at(Y("Còn bao nhiêu quỹ đất lâu dài?"), W(6, "quỹ") - 0.6, ["type", 0.3], { out: W(6, "nữa") + 0.4 }),
  // B3 Lý do 2 (chữ in sẵn của clip: "200 mẫu nhà" dải dưới 33–39 s, "Thiết kế hoàn mỹ" 39–42 s, thẻ 42–48 s → bỏ trống 39–48 s)
  at(R("LÝ DO 2", "KHÁC BIỆT", "KHÁC BIỆT"), W(7, "khác") - 0.3, ["thock", 0.21]),
  at(K("ĐỘC BẢN", "mỗi căn một phong cách"), W(7, "phong") - 0.2, ["shimmer", 0.3]),
  at(K("Mái vòm", "cảm hứng châu Âu"), W(8, "mái") - 0.1, ["slide", 0.6], { out: 39.0 }),
  at(M("Những nét", "ĐẶC SẮC"), W(11, "đặc") - 0.3, ["sparkle", 0.63], { out: 50.3 }),
  // B4 Lý do 3: giá trị sống
  at(R("LÝ DO 3", "GIÁ TRỊ SỐNG", "GIÁ TRỊ SỐNG", C.mint), W(12, "giá") - 0.3, ["open-2", 0.37], LOW),
  at(M("Khách ở ngay", "ĐỐI DIỆN DỰ ÁN", C.mint), W(12, "đối") - 0.4, ["pin-drop-3", 1.0], LOW),
  at(M("Chiều nào cũng", "CHẠY BỘ", C.sea), W(13, "chạy") - 0.3, ["whoosh-fast", 0.56], LOW),
  at(SP("17 THÁNG"), W(14, "17") - 0.3, ["step", 0.9], { ...LOW, out: 63.25 }), // 59–63 s tựa "Casa Villa…" in sẵn kéo xuống giữa khung → không thêm khối
  at(M("Thu hút", "LƯỢNG KHÁCH LỚN"), W(15, "lượng") - 0.3, ["chart-up", 0.9]),
  at(M("Hoàn toàn bị", "THUYẾT PHỤC", C.mint), W(15, "hoàn") - 0.2, ["success", 0.39]),
  at(PAST("20/10"), W(16, "20") - 0.2, ["rewind", 0.76]),
  at(S("Xuống tiền", "BIỆT THỰ SONG LẬP"), W(16, "xuống") - 0.2, ["pen-click", 0.33]),
  // B5 30 tỷ vs không gian Blanca
  at(Y("“Có 30 tỷ, xây biệt thự”"), W(17, "30") - 0.6, ["type", 0.3]),
  at(S("Biệt thự", "HOÀNH TRÁNG"), W(18, "hoành") - 0.2, ["camera", 0.21]),
  at(VS("CÓ BIỆT THỰ", "THIẾU KHÔNG GIAN"), W(18, "không") - 0.2, ["whoosh-double", 0.38]),
  at(G("CÔNG VIÊN SUN WORLD", 15, "", " HA", C.mint), W(19, "15") - 0.3, ["reward", 0.79]),
  at(M("Con cháu", "CHƠI CẢ NGÀY", C.mint), W(19, "chơi") - 0.6, ["pop", 0.73]),
  at(V("TTTM VEN BIỂN"), W(20, "trung") - 0.1, ["swipe", 0.42]),
  at(S("Thương hiệu", "HERMÈS"), W(21, "hermès") - 0.3, ["ting", 0.3]),
  at(S("Khách sạn 5 sao", "MARRIOTT"), W(22, "khách") - 0.1, ["bell", 0.37]),
  at(Q("Thể thao", ["TENNIS", "BÓNG ĐÁ", "PICKLEBALL"], 0.8), W(23, "tennis") - 0.15, ["toggle", 0.26]),
  at(M("Công viên", "NGAY SAU NHÀ", C.sea), W(24, "công") - 0.1, ["door-open", 0.24]),
  at(G("BÃI TẮM RIÊNG", 900, "", " MÉT", C.sea), W(25, "900") - 0.3, ["line-draw", 0.74]),
  at(X("30 TỶ TỰ TẠO RA"), W(26, "30") - 0.2, ["error-soft", 0.48]),
  at(M("Còn ở Blanca", "THÌ CÓ THỂ", C.mint), W(27, "blanca") - 0.4, ["unlock", 0.22]),
  // B6 Nhà nghỉ dưỡng bỏ trống vs dòng tiền
  at(M("Căn nhà để", "THƯ GIÃN"), W(28, "thư") - 0.3, ["page-turn", 0.42]),
  at(X("PHẦN LỚN KHÔNG Ở"), W(29, "phần") - 0.1, ["crumple", 0.17]),
  at(N("THÊM CHI PHÍ", C.coral), W(30, "chi") - 0.3, ["receipt", 0.29]),
  at(X("ĐÁNG KHÔNG?"), W(31, "không") - 0.5, ["wrong-buzzer", 0.9]),
  at(M("Ở Blanca", "KHÁC HẲN", C.mint), W(32, "blanca") - 0.2, ["bass-drop", 0.9]),
  at(M("Tạo ra", "DÒNG TIỀN"), W(33, "dòng") - 0.2, ["cash", 0.29]),
  at(N("KHÁCH CÓ SẴN", C.mint), W(34, "dòng") - 0.1, ["check", 0.24]),
  at(M("Sun tạo ra", "CỘNG ĐỒNG CƯ DÂN", C.sea), W(34, "cộng") - 0.3, ["confirm", 0.59]),
  at(N("CHỈ VIỆC KHAI THÁC", C.mint), W(35, "khai") - 0.3, ["coin-shake", 0.21]),
  // B7 Lý do 4: duy trì giá trị
  at(R("LÝ DO 4", "DUY TRÌ GIÁ TRỊ", "GIÁ TRỊ"), W(36, "duy") - 0.4, ["title-in", 0.4]),
  at(S("Sở hữu lâu dài", "THIẾT KẾ ĐỘC BẢN"), W(37, "sở") - 0.3, ["paper-rustle", 0.38]),
  at(M("Truyền đời này", "QUA ĐỜI SAU"), W(38, "truyền") - 0.2, ["lock", 0.31], { out: 144.0 }),
  at(Q("Cần", ["CHĂM SÓC", "VỆ SINH", "CÂY XANH", "AN NINH"], (W(39, "an") - W(39, "chăm")) / 3), W(39, "chăm") - 0.15, ["beep", 0.41]),
  at(N("VẬN HÀNH HẠNG A", C.mint), W(40, "đơn") - 0.2, ["stamp", 0.36]),
  at(X("LO LẮNG"), W(41, "lo") - 0.2, ["error-soft-2", 0.42]),
  // B8 Chốt, mời đi xem
  at(Y("Chọn cả môi trường sống"), W(42, "chọn") - 0.1, ["type", 0.3]),
  at(Q("Để", ["NGHỈ DƯỠNG", "GIỮ TÀI SẢN"], W(43, "giữ") - W(43, "nghỉ")), W(43, "nghỉ") - 0.15, ["toggle", 0.3]),
  at(M("Cùng em Thắm", "ĐI XEM THỰC TẾ"), W(44, "đi") - 0.2, ["knock", 0.24], { out: 999 }),
].map((c, i, a) => {
  const out = r2(c.out ?? (a[i + 1] ? a[i + 1].at - 0.2 : 999));
  return { ...c, at: r2(c.at), out, top: c.top ?? 250, o: { ...c.o, hold: r2(out - c.at) } };
});

// ---------- Tương phản chữ / nền (TALKING-HEAD luật 15): đo nền sau từng khối → độ phủ lớp tối cần có ----------
// màu đại diện của chữ chính: màu giữa của gradient (c); chữ bạc, chữ trắng, chữ đỏ của canh-bao lấy màu thật
const TXT = (c) => (c.p === "chu-bac" ? "#c9ced6" : c.p === "canh-bao" ? "#ff6a5e" : c.p === "ky-niem" ? "#ffffff" : c.o.c ?? "#ffffff");
const VDUR = T.at(-1).end;
// Pha màu nhẹ cho clip gốc (TALKING-HEAD luật 19): clip điện thoại hơi nhạt, chữ + lớp phủ làm tổng thể tối → tăng tương phản,
// độ bão hòa trước khi phủ chữ. Bản pha để ở work/ (không commit), làm lại khi footage.mp4 mới hơn.
const GRADE = "eq=contrast=1.08:saturation=1.12";
const FOOT = path.join(HERE, "../../work/casa-villa-kim-tham/footage-graded.mp4");
if (!fs.existsSync(FOOT) || fs.statSync(FOOT).mtimeMs < fs.statSync(path.join(HERE, "footage.mp4")).mtimeMs) {
  fs.mkdirSync(path.dirname(FOOT), { recursive: true });
  execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-i", path.join(HERE, "footage.mp4"), "-vf", GRADE, "-c:v", "libx264", "-crf", "16", "-preset", "medium",
    "-g", "30", "-keyint_min", "30", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", FOOT]);
}
// Mục tiêu tương phản khi chữ đã có viền tối 1 px (tách nét): chữ chính ≥ 2,6 : 1, chữ dẫn trắng ≥ 3,5 : 1;
// lớp phủ tối đa 0,6 để video không tối; nền quá sáng thì viền đậm hơn (class hard).
const CON = scrimPlan(FOOT, KT, { dur: VDUR, color: TXT, heroMin: 2.6, leadMin: 3.5, maxA: 0.6 });
KT.forEach((c, i) => { c.scrim = CON[i].a; if (CON[i].warn) c.hard = true; });
console.log("tương phản (nền p80 → độ phủ cần → tỷ lệ đạt):\n" + KT.map((c, i) => `  ${c.at.toFixed(1).padStart(6)} ${(c.o.m ?? c.o.words?.[0] ?? c.o.value + "").toString().padEnd(22)} nền ${CON[i].lum.toFixed(2)} → phủ ${CON[i].a.toFixed(2)} → ${CON[i].ratio}:1${CON[i].warn ? "  ⚠ nền quá sáng: phủ tối đa + viền tối" : ""}`).join("\n"));

// SFX lớp 1: một tiếng mỗi khối, liệt kê ngay trong KT, mỗi khối một LOẠI riêng (55 loại, không loại nào lặp).
// SFX lớp 2 (TOOLKIT 6.1 "SFX dày và tinh"): tiếng nhỏ cho chuyển động phụ — chữ quay-vong đổi, số chạy xong, nét gạch đỏ
// của canh-bao, cú chuyển cảnh trong clip gốc (chỗ không có khối chữ nào trong ±0,6 s). Tiếng cùng loại phải cách nhau ≥ 30 s.
const base = (n) => n.replace(/-\d$/, "");
const find = (m) => { const c = KT.find((c) => c.o.m === m || c.o.k === m); if (!c) throw new Error(`Không có khối "${m}"`); return c; };
const qv = (k, j) => { const c = find(k); return c.at + 0.15 + j * c.o.step; }; // lúc chữ thứ j của quay-vong dâng lên
const LAYER = [
  [qv("3 loại hình", 1), "whoosh-tech-2", 0.54, "quay-vong → SONG LẬP"],
  [qv("3 loại hình", 2), "snap", 0.2, "quay-vong → ĐƠN LẬP"],
  [find("CASA CÓ").at + 0.95, "punch", 0.39, "939 chốt số"],
  [33.3, "zoom-in", 0.37, "clip: cắt sang phối cảnh"],
  [39.1, "page-turn-2", 0.25, "clip: sang thẻ Thiết kế hoàn mỹ"],
  [72.3, "slide-2", 0.3, "clip: sang flycam"],
  [find("CÔNG VIÊN SUN WORLD").at + 0.95, "sub-hit-2", 0.45, "15 ha chốt số"],
  [89.6, "whoosh-heavy", 0.9, "clip: pháo hoa sang phối cảnh"],
  [qv("Thể thao", 1), "whoosh-tech-3", 0.3, "quay-vong → BÓNG ĐÁ"],
  [qv("Thể thao", 2), "snap", 0.24, "quay-vong → PICKLEBALL"],
  [find("30 TỶ TỰ TẠO RA").at + 0.9, "paper-tear", 0.28, "gạch đỏ"],
  [110.9, "zoom-in-2", 0.43, "clip: sang biệt thự đêm"],
  [find("PHẦN LỚN KHÔNG Ở").at + 0.9, "scribble", 0.36, "gạch đỏ"],
  [find("ĐÁNG KHÔNG?").at + 0.9, "slash", 0.39, "gạch đỏ"],
  [qv("Cần", 1), "whoosh-tech-4", 0.35, "quay-vong → VỆ SINH"],
  [qv("Cần", 2), "snap", 0.2, "quay-vong → CÂY XANH"],
  [qv("Cần", 3), "step-2", 0.88, "quay-vong → AN NINH"],
  [find("LO LẮNG").at + 0.9, "scribble", 0.36, "gạch đỏ"],
  [qv("Để", 1), "click-2", 0.28, "quay-vong → GIỮ TÀI SẢN"],
];
const SFX = [
  ...KT.map((c) => ({ at: r2(c.at + (c.p === "gia-chot" ? 0.05 : 0)), name: c.sfx[0], vol: c.sfx[1], why: c.o.m ?? c.o.words?.join(" / ") ?? `${c.o.k} ${c.o.value}`,
    // chữ gõ (go-chu): tiếng phím chạy đúng nhịp từng ký tự hiện ra (preset gõ 0,06 s một ký tự)
    ...(c.p === "go-chu" ? { run: { n: [...new Intl.Segmenter("vi", { granularity: "grapheme" }).segment(c.o.m)].length, step: 0.06, names: ["type", "type-3"] } } : {}) })),
  ...LAYER.map(([t, name, vol, why]) => ({ at: r2(t), name, vol, why })),
].sort((a, b) => a.at - b.at);
const dup = SFX.flatMap((s, i) => SFX.slice(0, i).filter((p) => base(p.name) === base(s.name) && s.at - p.at < 30).map((p) => `${p.name} ${p.at} → ${s.name} ${s.at}`));
if (dup.length) throw new Error("SFX lặp loại trong 30 s:\n" + dup.join("\n"));
fs.writeFileSync(path.join(HERE, "sfx.json"), JSON.stringify({ gainDb: 6, minGap: 0.35, cues: SFX }, null, 1) + "\n");

buildVideo(import.meta.url, {
  fonts: [["yeseva-one", [400]], ["encode-sans", [600, 700]], ["be-vietnam-pro", [900]]], // be-vietnam-pro: font dự phòng trong CSS preset BĐS (lint)
  noCap: T.map((c) => c.i),
  endStart: 0,
  tail: 0,
  html: (html, out) => {
    fs.copyFileSync(FOOT, path.join(out, "assets/footage.mp4")); // bản đã pha màu
    console.log(KT.map((c) => `${c.at}–${c.out} ${c.p} ${c.o.k ?? ""} / ${c.o.m ?? c.o.words ?? c.o.value} · ${c.sfx[0]}`).join("\n"));
    return html.replace("{{KT}}", JSON.stringify(KT));
  },
});
