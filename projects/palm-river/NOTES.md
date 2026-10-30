# Palm River · căn T3-22-03 (Tú Phan)

Clip đã dựng sơ, dài 77,7 s. `footage.mp4` là bản gốc 1080×1920 từ Drive ("Phân tích căn T3.22.03 tại Palm River", HEVC), chuyển H.264 30 fps 7 Mbps 2 pass để dưới 100 MB; tiếng khớp `voice.wav` (lệch 0 s).

| Giây | Cảnh |
| --- | --- |
| 0–5 | Tú nói ở sảnh |
| 5,2–9,0 | Lật trang + ảnh tin nhắn có sẵn chữ "T3-22-03" |
| 9–67,8 | Sa bàn, giọng đọc lồng |
| 67,8–74,6 | Tú nói |
| 74,6–77,7 | Thẻ kết "XEM THÊM TẠI…" |

Giữ nguyên cảnh, không cắt. Thêm chữ chốt kiểu điện ảnh và SFX. Không phụ đề, không đè chữ lên ảnh tin nhắn và thẻ kết.

## Phong cách (khác clip Tú · Casa Villa)

- **Preset:** `dien-anh` (thêm mới vào thư viện).
  - Chữ chính rất lớn, co chữ từ rộng về và từ mờ sang nét (dời x từng ký tự, không tween `letterSpacing`), trôi phóng chậm khi đứng yên.
  - Chữ dẫn to (0,32 em), giãn rộng, **không vạch gạch 2 bên** (anh/chị đã nhắc).
- **Font:** Archivo 900 + Saira 600, đã kiểm dấu tiếng Việt. Kanit bị loại vì mất dấu ngã ("HỮU" thành "HƯU").
- **Màu gradient:** champagne là màu chính; xanh trời cho view, sông, nơi chốn; đỏ ruby cho SOLD OUT / ĐÃ HẾT.
- **Dải tối mờ sau mỗi khối,** hiện và tắt cùng khối.
  - Chữ đặt ở vòng trần nâu tối (y ≈ 400), dưới đĩa đèn trắng (y 0–340).
  - Đoạn người nói thì đặt theo đỉnh đầu.

## Bản 2: sửa theo góp ý ("spam SFX, spam một hiệu ứng, tách nền tệ")

- **Chữ:** mỗi loại thông tin một preset.
  - `dien-anh` chỉ 6 khoảnh khắc chính.
  - `gia-chot` cho số: TẦNG 22 / 20 / 30, 86 m², 76 m², HƠN 120 m².
  - `chu-bac` cho tiện ích và loại căn.
  - `quay-vong` cho các nơi nhìn ra và các trục căn.
  - `nhan-neon` cho KHÔNG BỊ CHE CHẮN và SOLD OUT.
  - `canh-bao` gạch "TẦNG 30" khi Tú nói đã hết.
  - `go-chu` cho câu hỏi.
  - Nhãn neon và chữ gõ cũng tô gradient.
- **SFX:** 12 tiếng, mỗi tiếng một loại, không lặp. Không gắn tiếng cho từng khối.
- **Tách nền:**
  - Bỏ lồng sau tháp: mặt nạ isnet viền vỡ.
  - Mặt nạ người làm lại: trung bình 3 khung, co vào 2 px, guided filter.
  - Khối lồng không dùng dải tối nữa (từng gây quầng sáng quanh đầu).

## Chữ nằm sau đối tượng (bản 1, phần tháp đã bỏ)

**1. Tách nền:** `scripts/fx/matte.py` (rembg chạy trên máy). Mặt nạ nằm ở `work/` (không commit), render lại thì phải chạy lại:

```bash
~/.asr/bin/python -I scripts/fx/matte.py projects/palm-river/footage.mp4 work/palm-river/matte intro:u2net_human_seg:0:4.8 outro:u2net_human_seg:67.8:74.6 song:isnet-general-use:19.8:23.0 sold:isnet-general-use:53.2:54.7 ba:isnet-general-use:29.0:32.6
```

**2. Đặt chữ:** template đo dòng chữ chính thật rồi đặt sao cho phần dưới chữ (`behindFrac`) nằm sau đỉnh đối tượng. Đỉnh đối tượng là trung vị trong đúng khoảng thời gian khối hiện.
- Người: 40%. Riêng outro, Tú đứng giữa khung nên chỉ 30%.
- Tháp: 35%.

**3. Kiểm đọc được** trước khi render:

```bash
~/.asr/bin/python -I scripts/fx/behind-check.py build/palm-river/index.html palm work/palm-river/matte work/palm-river/behind-ok.json
```

- Ký tự nào bị che quá 55% ở bất kỳ khung nào, hoặc cả cụm bị che trung bình quá 25%, thì không lồng; khối đó thành chữ nổi bình thường.
- Kết quả: CĂN ƯNG Ý 54%, VIEW SÔNG 46%, CHỈ 3 CĂN 36%, PALM RIVER 46%, TÚ PHAN 34% → lồng.
- SOLD OUT (85% / 46%) → không lồng.
- TẦNG 22 đã thử: tháp cao tới y 300, chữ không lên cao hơn vùng an toàn được → bỏ.

**4. Composite:** render xong, `scripts/fx/behind.mjs` phủ đối tượng gốc (footage × mặt nạ) lên `output.mp4` trong các cửa sổ đạt. Bản trước khi phủ lưu ở `output-raw.mp4`.
- Cửa sổ "VIEW SÔNG" chỉ tới 21,45 s: lúc ~21,4 s máy bắt đầu nghiêng, đỉnh tháp vọt từ y 447 lên 110.
- Footage không được zoom hay lia trong các cửa sổ này, không thì đối tượng phủ lên sẽ lệch.

## SFX

`build.mjs` sinh ra `sfx.json`:
- `title-in` / `reveal` cho mỗi khối;
- `boom-heavy` khi chữ lồng sau đối tượng;
- `ting` cho số;
- `stamp` cho SOLD OUT / ĐÃ HẾT;
- `shimmer` ở thẻ kết.
