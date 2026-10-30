# Tú · Casa Villa Blanca City

Clip tự quay của Tú, dài 96 giây: Tú cầm máy nói trước nhà mẫu Casa Villa. Giữ nguyên cảnh quay, chỉ thêm chữ chốt (preset BĐS), SFX nhẹ và một cú đẩy máy che vết cắt. Không phụ đề.

## Voice

- Nhận diện bằng faster-whisper `large-v3`, chạy trên máy (CPU, int8, có `word_timestamps`), rồi sửa tay các chỗ sai:
  - sông lập → song lập
  - liên kê → liền kề
  - dựng tích → diện tích
  - lỗ giới → lộ giới
  - bên vẫn → bền vững
- `transcript.json` giữ giờ từng chữ (`words[]`). `build.mjs` đặt mốc chữ chốt theo giờ chữ thật qua hàm `W(i, "chữ")`, không ước lượng theo ký tự.
- **Cắt câu nói vấp:** clip gốc có câu "Và đợt này nếu anh chị nhà mình quan tâm đến" bị bỏ dở ở 83,1 s, tiếp theo là đoạn hậu trường có chữ in sẵn "Chưa quay xong / Kêu về rầu 😂😂" (88–91,33 s), rồi câu nói lại ở 91,40 s.
  - Đã giữ [0, 82,83 s] và [91,40, 95,4 s] của clip gốc.
  - 82,83 s là khoảng lặng trước chữ "ha" đệm dính vào câu vấp. 91,40 s là khung sạch đầu tiên, cũng là lúc tiếng nói lại bắt đầu (ASR đặt sớm 0,36 s).
  - Chỗ nối có fade âm 20–33 ms, và máy đẩy vào 6% đúng khung nối.
- **Khung hình:** nguồn quay 20 fps không đều. Đã ép về 30 fps trước khi cắt, để hình và tiếng dài bằng nhau (86,83 s). Keyframe mỗi 30 khung (`-g 30`), để HyperFrames tua không bị đứng hình.

## Chữ chốt

- **Font:** Big Shoulders Display 900 cho chữ chính (condensed, đặt cỡ to vẫn gọn trên đầu), Unbounded 700 cho chữ dẫn.
  - Đã loại: Phudu (lệch dấu hỏi chữ "SỞ"), Bricolage ("DÀI" thành "DAÌ"), Dela Gothic (mất dấu mũ).
  - Font truyền qua tham số `display`/`sans` của `BDS.make`. `.bds` tự khai báo `--display`/`--sans`, nên biến đặt ở `:root` không có tác dụng.
  - Template chờ tải đủ font, kể cả bộ ký tự tiếng Việt, rồi mới dựng khối. Đo bằng font dự phòng thì khối bị co nhỏ sai.
- **Preset:**
  - `khoi-noi` là mẫu chính, thêm mới vào thư viện: chữ dẫn trong nhãn gradient, chữ chính lật lên lần lượt từng ký tự, chữ khóa tô gradient. `tieu-de-kep` đã dùng ở clip Quỳnh Quỳnh nên không lặp.
  - `gia-chot`: số chạy cho 200 m², hơn 300 m², 50 mét.
  - `quay-vong`: 3 loại hình; để ở / kinh doanh; nghỉ dưỡng / ven biển.
  - `canh-bao`: LIỀN KỀ đã bán hết; nơi khác không sở hữu lâu dài.
- **Màu ưu tiên gradient** (anh/chị đã chốt): chữ khóa gradient dọc 3 điểm. Vàng → cam là con số và sản phẩm, xanh ngọc → xanh dương là nơi chốn, bạc hà → xanh lá là an toàn, san hô → đỏ là không còn. Chữ thường trắng → bạc.
- **Mật độ:** 33 khối, gần như mỗi câu một khối, có chữ ngay từ 0,1 s.
- **Vị trí:** dải trời top 250, căn giữa khung 1080, rộng tối đa 940. Cỡ mặc định 140, khối nào rộng quá thì tự co.
- **Không đặt class `slot` cho ô chứa** trong template: trùng class nội bộ của `quay-vong`. Template dùng `kt-slot`.
- **SFX:** `build.mjs` sinh từ danh sách chữ chốt (`gainDb` 6) và ghi ra `sfx.json`, không sửa tay file này.
  - Mở đầu có `whoosh-heavy`. Mỗi khối có `whoosh-soft` lúc vào, rồi `pop` (khi cả cụm là chữ khóa) hoặc `text-tick` lúc chữ đáp xong.
  - `quay-vong` có `swipe` mỗi lần đổi chữ. `gia-chot` có `meter` khi số chạy và `cash` khi số chốt. `canh-bao` có `error-soft` lúc bị gạch. Kết thúc có `shimmer` (1 s, không bị cắt ở cuối video).

## Tự kiểm trước khi giao

- `node scripts/qa/kt-check.cjs build/tu-casa-villa/index.html tu` tua tới lúc từng khối đứng yên rồi kiểm:
  - lệch tâm không quá 8 px
  - không tràn vùng an toàn
  - mọi ký tự hiện đủ
  - số mờ / bóng không ra ngoài khung hình
  - không có 2 khối cùng hiện
  - Kết quả lần cuối: 39/39 lượt đạt.
- Xem bằng mắt lúc khối đứng yên (33 khung), đối chiếu vị trí đầu Tú, và chụp liên tiếp khung trong lúc chữ đang chạy hiệu ứng.
- **Âm:** tách SFX bằng cách lấy tiếng tổng trừ voice, rồi đo từng tiếng.
  - SFX có đỉnh từ -10 đến -14 dB, ngang mức giọng nói.
  - Đỉnh tổng -1,6 dBFS, đạt mức -1,5 của TOOLKIT.
  - Đo kênh trái. Gộp stereo thành mono bằng ffmpeg sẽ cộng thêm khoảng 3 dB, làm sai kết quả.
