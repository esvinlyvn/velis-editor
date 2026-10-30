# SHOTBOOK · Project mẫu

Project mẫu để chép khi làm video mới (`cp -r projects/example projects/<khach>-<du-an>`). Đi đủ quy trình TALKING-HEAD mục 0–6 trên một clip ngắn 17 s, mỗi bước để lại file thật: `transcript.json`, `hook.json`, `text-plan.json`, `SHOTBOOK.md`, `build.mjs`, `sfx.json` (sinh ra), `template.html`.

**Tư liệu mẫu**, không phải của khách nào:
- `footage.mp4`: trời và dãy nhà dựng bằng ffmpeg, máy đẩy vào chậm và lắc ngang nhẹ. Nửa trên sáng, để lớp tối đo theo nền (luật 15, 19) có việc thật để làm. **Không có người**, nên các luật về đầu người (luật 2, 11) phải kiểm trên clip thật.
- `voice.wav`: giọng Piper `vi_VN-vais1000-medium` tạo trên máy (nguồn ở `docs/SOURCES.md`), 7 câu, nghỉ 0,4 s giữa câu.
- `transcript.json`: chạy `scripts/asr/transcribe.py` rồi sửa tay đúng như video thật: "tiện ít" → tiện ích, "cung viên" → công viên, "phát phí" → pháp lý, "70m2" → 70 m².

## Hook (TRINH-BAY mục 1)

`hook.json`, chạy `scripts/hook-pick.mjs`: **question 87** · number 74 · title bị loại (tắt tiếng không hiểu).
- Câu mở là câu hỏi lựa chọn ("Với 3 tỷ, mua nhà ở đâu?"), từ khóa đỉnh "3 tỷ" ở 0,26 s, đáp án "Vườn Mây" ở 2,8 s.
- Dựng bằng khối chữ chốt có chữ ngay từ 0,1 s; đáp án lộ ra ở khối 2 (bookend). Đồ họa hook riêng (`text-presets/hooks/`) chưa có trong repo; dựng khi video thật đầu tiên cần.

## Nhịp và khối chữ

| Đoạn | Lời | Khối chữ (preset) | SFX lớp 1 · lớp 2 |
|---|---|---|---|
| 0,1–1,35 | Với ba tỷ, mua nhà ở đâu? | Với 3 tỷ / MUA NHÀ Ở ĐÂU? (`tang-truong`, preset chính) | whoosh-heavy |
| 1,7–2,8 | Dự án Vườn Mây | Dự án / VƯỜN MÂY (`tang-truong`, xanh: nơi chốn) | title-in |
| 3,1–4,3 | cách trung tâm 15 phút | CÁCH TRUNG TÂM / 15 PHÚT (`gia-chot`) | meter · coin lúc số chốt |
| 4,7–6,1 | căn hộ 70 m² | CĂN HỘ / 70 m² (`gia-chot`) | counter-roll · punch lúc số chốt |
| 6,5–7,7 | có 2 phòng ngủ | Thiết kế / 2 PHÒNG NGỦ (`chu-bac`) | scribble |
| 8,1–10,4 | hồ bơi, phòng gym, công viên | Tiện ích / HỒ BƠI → PHÒNG GYM → CÔNG VIÊN (`quay-vong`) | swipe · whoosh-tech-2, snap lúc đổi chữ |
| 10,7–12,0 | không có phí ẩn | PHÍ ẨN gạch đỏ (`canh-bao`) | error-soft · paper-tear lúc gạch |
| 12,3–13,4 | pháp lý đã có sổ hồng | ĐÃ CÓ SỔ HỒNG (`nhan-neon`, xanh lá: an toàn) | stamp |
| 13,7–hết | nhắn em nhận bảng giá | Nhắn em nhận bảng giá (`go-chu`) | type chạy theo 21 ký tự · sparkle lúc gõ xong |

- 9 khối / 15 s lời: gần như mỗi câu một khối (luật 4). Preset chính 2/9 khối (≤ 40%).
- Khối trước tắt sớm 0,35 s trước khối sau: mờ ra xong mới vào khối mới, không có lúc hai khối cùng hiện.
- 15 tiếng SFX, 15 loại khác nhau; `build.mjs` tự báo lỗi nếu hai tiếng cùng loại cách nhau dưới 30 s.

## Chỗ chọn khác gợi ý của pick-text (QUY-TAC-CHU bước 4)

| Khối | pick-text gợi ý | Dùng | Lý do |
|---|---|---|---|
| k1 câu hỏi | `go-chu` | `tang-truong` | khối mở cần to, có chữ từ 0,1 s; `go-chu` để dành cho câu mời cuối (mỗi vai một preset) |
| k2 tên dự án | `chu-bac` | `tang-truong` | tên dự án là tiêu đề, dùng preset chính; `chu-bac` đã dành cho loại căn |
| k3, k4 số | `noi-bat` | `gia-chot` | TALKING-HEAD mục 4: số đo dùng `gia-chot` (số chạy, chốt đúng lúc nói) |
| k5 loại căn | `can-ho-cao-cap` (L60) | `chu-bac` | TALKING-HEAD mục 4: loại căn dùng `chu-bac`; mẫu L60 mang font riêng, không trùng cặp font video |
| k9 câu mời | `comment-bao-gia` (L60) | `go-chu` | luật 16: chữ gõ đi với tiếng gõ phím theo ký tự; L60 mang font riêng |

## Lớp tối, màu

- Nền sáng (độ sáng p80 khoảng 0,55) → độ phủ chạm trần 0,6 ở hầu hết khối; khối nào vẫn chưa đủ tương phản thì viền tối đậm hơn (class `hard`), không phủ thêm (luật 15, 19). Bảng tương phản in ra khi build.
- Pha màu `eq=contrast=1.08:saturation=1.12` trước khi phủ chữ (bản pha ở `work/example/`).
- Gradient theo nghĩa: vàng → cam số; xanh ngọc → dương nơi chốn; bạc hà → xanh lá an toàn; đỏ "không có".
- Font: Yeseva One (chữ chính) + Encode Sans (chữ dẫn), đã kiểm dấu. Video thật đổi cặp font và preset chính so với video trước của khách (luật 5).

## Kiểm (lần dựng gần nhất)

- `npx hyperframes lint`: 0 error.
- `kt-check`: 11/11 khối đạt.
- Snapshot đứng yên 9 khối, snapshot lúc chạy 2 khối: không ký tự ngẫu nhiên, dấu đủ, không hai khối chồng nhau.
- `motion_check.py`: 静止 PASS.
- `sfx-levels.py`: SFX ổn; độ to bản trộn −14,0 LUFS, đỉnh −3,0 dBTP (build tự chuẩn hóa bản trộn).
- Nhận diện giọng trên bản dựng ra đúng lời.
