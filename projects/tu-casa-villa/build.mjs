#!/usr/bin/env node
// Tú · Casa Villa Blanca City: clip tự quay (Tú nói trước nhà mẫu) + chữ chốt preset BĐS + SFX nhẹ. Không phụ đề.
//   Voice nhận diện bằng faster-whisper large-v3 chạy trên máy, sửa tay lỗi (song lập, liền kề, diện tích, lộ giới, bền vững).
//   footage.mp4 / voice.wav: clip gốc ép 30 fps (keyframe mỗi 30 khung, -g 30), cắt 82,83–91,40 s: câu "Và đợt này…" nói dở + đoạn hậu trường "Chưa quay xong", lấy câu nói lại.
//   Mốc chữ chốt lấy theo giờ từng chữ trong transcript.json (words[]), không ước lượng theo ký tự.
//   node projects/tu-casa-villa/build.mjs [--no-render]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildVideo } from "../../scripts/build-video.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const T = JSON.parse(fs.readFileSync(path.join(HERE, "transcript.json"), "utf8")).chunks;
// W(i, "chữ", n): giờ bắt đầu nói chữ thứ n (từ 0) khớp "chữ" trong cụm i
const W = (i, w, n = 0) => {
  const hit = T[i].words.filter((x) => x.w.toLowerCase().replace(/[,.]/g, "").split(" ")[0] === w.toLowerCase());
  if (!hit[n]) throw new Error(`Cụm ${i} không có chữ "${w}" (lần ${n})`);
  return hit[n].s;
};
const r2 = (n) => Math.round(n * 100) / 100;
// Màu chữ ưu tiên gradient: c = màu giữa, c2 = màu đáy (preset tự pha phần sáng phía trên)
const C = { gold: { c: "#ffc533", c2: "#ff7a00" }, blue: { c: "#4fd8ff", c2: "#2563ff" }, green: { c: "#5cf0a0", c2: "#0f9a4c" }, red: { c: "#ff6b6b", c2: "#d01f3c" }, tile: { c: "#ff8a5c", c2: "#d4371c" } };
// Mẫu chính: khoi-noi (chữ dẫn trong nhãn màu + cụm chính lớn, chữ khóa tô màu). tieu-de-kep đã dùng ở clip Quỳnh Quỳnh.
// Màu theo nghĩa: vàng = con số/sản phẩm, xanh dương = nơi chốn/thương hiệu, xanh lá = an toàn/dễ, đỏ = không còn/không có.
const K = (k, m, hl, c = C.gold, more = {}) => ({ p: "khoi-noi", o: { k, m, hl, ...c, ...more } });
const at = (cue, t) => ({ ...cue, at: t });

// Chữ chốt theo lời, gần như mỗi câu một khối. out mặc định = 0,2 s trước khối kế tiếp.
//   zone "low": đặt ở dải áo vest (top 1250, x 140–940) khi đầu Tú lên cao.
const KT = [
  at(K("Sau lưng Tú", "17 THÁNG TRƯỚC", "17"), 0.1),
  at(K("Đây chỉ là", "BÃI ĐẤT TRỐNG", "TRỐNG"), W(0, "chỉ") - 0.1),
  at(K("Qua bàn tay", "SUN GROUP", "SUN GROUP", C.blue), W(1, "sun") - 0.25),
  at(K("Đã kiến tạo", "THÀNH PHỐ BIỂN", "BIỂN", C.blue), W(1, "thành") - 0.15),
  at(K("Mang tên", "BLANCA CITY", "BLANCA CITY", C.blue), W(1, "blanca") - 0.1),
  at(K("Vũng Tàu, nay thuộc", "TP. HỒ CHÍ MINH", "HỒ CHÍ MINH", C.blue), W(2, "thuộc") - 0.15),
  at(K("Đây là dòng", "CASA VILLA", "CASA VILLA"), W(3, "dòng") - 0.1),
  { p: "quay-vong", o: { k: "Casa Villa có", words: ["3 LOẠI HÌNH", "LIỀN KỀ", "SONG LẬP", "ĐƠN LẬP"], ...C.gold, step: r2((W(4, "biệt", 1) - W(3, "3")) / 3) }, at: W(3, "3") - 0.15 },
  { p: "canh-bao", o: { m: "LIỀN KỀ", ...C.red, size: 170 }, at: W(5, "liền") - 0.1 },
  at(K("Chỉ còn", "SONG LẬP · ĐƠN LẬP", "SONG LẬP · ĐƠN LẬP"), W(6, "chỉ") - 0.1),
  at(K("Căn này là", "BIỆT THỰ SONG LẬP", "SONG LẬP"), W(7, "căn") - 0.1),
  { p: "gia-chot", o: { k: "ĐẤT NGANG 10 × DÀI 20", value: 200, suffix: " m²", ...C.gold, size: 170 }, at: W(8, "diện") - 0.15 },
  { p: "gia-chot", o: { k: "DIỆN TÍCH XÂY DỰNG", prefix: "HƠN ", value: 300, suffix: " m²", ...C.gold, size: 160 }, at: W(9, "diện") - 0.2 },
  { p: "quay-vong", o: { k: "Mua về để", words: ["Ở", "KINH DOANH"], ...C.gold, step: r2(W(10, "cho") - W(10, "ở")) }, at: W(10, "ở") - 0.15 },
  at(K("Vỉa hè", "RẤT RỘNG", "RỘNG"), W(11, "vỉa") - 0.15),
  at(K("Tuyến đường", "RẤT TO", "TO"), W(12, "tuyến") - 0.15),
  { p: "gia-chot", o: { k: "LỘ GIỚI LÊN TỚI", value: 50, suffix: " MÉT", ...C.gold, size: 170 }, at: W(13, "lộ") - 0.2 },
  at(K("Công viên nước", "SUN WORLD", "SUN WORLD", C.blue), W(15, "công") - 0.15),
  at(K("Rộng tới", "15 HECTA", "15"), W(16, "15") - 0.1),
  at(K("Mỗi ngày đón", "3–5 NGÀN KHÁCH", "3–5 NGÀN"), W(16, "mỗi") - 0.1),
  at(K("Nên cho thuê", "CỰC KỲ DỄ", "DỄ", C.green), W(17, "cho") - 0.15),
  { p: "quay-vong", o: { k: "Từ Bắc tới Nam", words: ["NHIỀU ĐÔ THỊ", "NGHỈ DƯỠNG", "VEN BIỂN"], ...C.blue, step: 1.75 }, at: W(18, "từ") - 0.1 },
  at(K("Nhưng ở nơi khác", "NHÀ PHỐ THẤP TẦNG", "THẤP TẦNG", C.red), W(21, "nhưng") - 0.05),
  { p: "canh-bao", o: { m: "SỞ HỮU LÂU DÀI", ...C.red, size: 150 }, at: W(22, "không") - 0.9 },
  at(K("Tại", "BLANCA CITY", "BLANCA CITY", C.blue), W(23, "tại") - 0.1),
  at(K("Nhà phố đều", "SỞ HỮU LÂU DÀI", "LÂU DÀI", C.green), W(24, "đều") - 0.2),
  at(K("Rất là", "AN TOÀN", "AN TOÀN", C.green), W(25, "an") - 0.25),
  at(K("Thiết kế", "RẤT ĐẸP", "ĐẸP"), W(26, "thiết") - 0.15),
  at(K("Phong cách", "ĐỊA TRUNG HẢI", "ĐỊA TRUNG HẢI"), W(27, "phong") - 0.15),
  at(K("Tường trắng", "MÁI NGÓI ĐỎ", "ĐỎ", C.tile), W(28, "màu") - 0.1),
  at(K("Bền theo thời gian", "KHÓ PHAI MÀU", "KHÓ PHAI"), W(29, "bền") - 0.15),
  at(K("Anh chị quan tâm", "DÒNG THẤP TẦNG?", "THẤP TẦNG"), W(30, "và") + 0.12),
  at(K("Liên hệ ngay", "TÚ", "TÚ", C.gold), W(31, "liên") - 0.35),
].map((c, i, a) => ({ ...c, at: r2(c.at), out: r2(c.out ?? (a[i + 1] ? a[i + 1].at - 0.2 : 99)) }));
// Điểm nối sau khi cắt câu nói vấp → cú đẩy máy che vết cắt
const CUT = 82.833;

// SFX sinh theo chữ chốt (ghi ra sfx.json mỗi lần build). pr: độ ưu tiên khi 2 tiếng sát nhau (< minGap) → giữ tiếng ưu tiên cao.
const cues = [{ at: 0.05, name: "whoosh-heavy", vol: 0.55, pr: 3, why: "intro: chữ đầu tiên vào" }, { at: CUT, name: "whoosh-fast", vol: 0.5, pr: 2, why: "đẩy máy che vết nối" }];
KT.forEach((c, i) => {
  const big = c.o.hl && c.o.hl === c.o.m;
  if (c.p === "khoi-noi") {
    if (i) cues.push({ at: c.at, name: "whoosh-soft", vol: 0.34, pr: 1, why: `${c.o.k} / ${c.o.m}` });
    cues.push({ at: c.at + 0.5, name: big ? "pop" : "text-tick", vol: big ? 0.85 : 0.6, pr: 2, why: `${c.o.m} chữ đáp xong` });
  }
  if (c.p === "quay-vong") c.o.words.forEach((w, j) => cues.push({ at: c.at + 0.15 + j * c.o.step, name: "swipe", vol: 0.4, pr: 2, why: `${c.o.k} → ${w}` }));
  if (c.p === "canh-bao") cues.push({ at: c.at, name: "whoosh-soft", vol: 0.34, pr: 1, why: `${c.o.m} hiện trắng` }, { at: c.at + 0.9, name: "error-soft", vol: 0.6, pr: 3, why: `${c.o.m} bị gạch đỏ` });
  if (c.p === "gia-chot") cues.push({ at: c.at + 0.05, name: "meter", vol: 0.5, pr: 2, why: "số chạy lên" }, { at: c.at + 0.95, name: "cash", vol: 0.5, pr: 3, why: `${c.o.value}${c.o.suffix} chốt` });
});
cues.push({ at: KT.at(-1).at + 0.5, name: "shimmer", vol: 0.75, pr: 3, why: "LIÊN HỆ TÚ (tiếng ngắn 1 s, không bị cắt ở cuối video)" });
cues.sort((a, b) => a.at - b.at);
const kept = [];
for (const c of cues) {
  const last = kept.at(-1);
  if (last && c.at - last.at < 0.36) { if (c.pr > last.pr) kept[kept.length - 1] = c; continue; }
  kept.push(c);
}
fs.writeFileSync(path.join(HERE, "sfx.json"), JSON.stringify({ gainDb: 6, minGap: 0.35, cues: kept.map(({ pr, ...c }) => ({ ...c, at: r2(c.at) })) }, null, 1) + "\n");

buildVideo(import.meta.url, {
  fonts: [["big-shoulders-display", [800, 900]], ["unbounded", [600, 700]], ["be-vietnam-pro", [900]]], // be-vietnam-pro: font dự phòng trong CSS preset BĐS, lint đòi có @font-face
  noCap: T.map((c) => c.i),
  endStart: 0,
  tail: 0.9,
  html: (html, out) => {
    fs.copyFileSync(path.join(HERE, "footage.mp4"), path.join(out, "assets/footage.mp4"));
    console.log(KT.map((c) => `${c.at}–${c.out} ${c.p} ${c.o.k ?? ""}/${c.o.m ?? c.o.words}`).join("\n"));
    return html
      .replace("{{KT}}", JSON.stringify(KT))
      .replaceAll("{{CUT}}", String(CUT));
  },
});
