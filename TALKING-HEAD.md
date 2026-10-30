# Quy trình dựng clip quay thật (talking head) + chữ chốt preset BĐS

Áp dụng khi người dùng gửi một clip quay sẵn: sale, môi giới, người nói trước dự án. Việc của mình là giữ nguyên cảnh quay, thêm chữ chốt, SFX, và cắt chỗ hỏng.

Mẫu để chép: **`projects/example/`** (đủ mọi luật dưới đây, đã qua lint, `kt-check` 100%, `motion_check`, `sfx-levels`; đọc `SHOTBOOK.md` của nó).
- `build.mjs`: hàm `W(i, "chữ")` lấy giờ từng chữ, danh sách khối chữ `KT` (mỗi khối kèm tiếng SFX), lớp tiếng phụ `LAYER`, đo nền `scrimPlan`, chặn SFX lặp loại.
- `template.html`: lớp tối `#scrim` / `#scrim-low`, ô chữ `kt-slot`, chờ font tiếng Việt, tự co chữ, đăng ký timeline sau khi dựng.
- Có thêm `hook.json`, `text-plan.json`, `SHOTBOOK.md` làm mẫu cho các bước hook, chọn chữ, kịch bản cú máy.
- Có chữ nằm sau người thì chép thêm phần `BEHIND` của `projects/palm-river/`.

## Luật người dùng đã chốt (đọc trước, các mục sau chi tiết hơn)

| # | Luật | Nguồn |
| --- | --- | --- |
| 1 | Không phụ đề chạy; chữ chốt 2–5 chữ, không chép nguyên câu | Quỳnh Quỳnh |
| 2 | Không để chữ che người; đầu người nằm dưới khối chữ | Quỳnh Quỳnh |
| 3 | Chữ dẫn ôm sát chữ chính, chỉ chừa đủ để không đè dấu | Quỳnh Quỳnh |
| 4 | Chữ dày: gần như mỗi câu một khối, có chữ ngay từ 0,1 s | Tú Casa Villa |
| 5 | Mỗi video một phong cách khác (preset chính + font + cách hiện chữ), không lặp video trước (bảng ở mục 4c) | Tú Casa Villa |
| 6 | Màu chữ ưu tiên gradient | Tú Casa Villa |
| 7 | Không dùng hiệu ứng hiện ký tự ngẫu nhiên hay vụn (nhìn như lỗi) | Tú Casa Villa |
| 8 | Không "spam" một hiệu ứng: mỗi loại thông tin một preset | Palm River |
| 9 | Chữ dẫn đủ to, không vạch gạch 2 bên | Palm River |
| 10 | SFX: mỗi khối chữ một tiếng, không tiếng nào trùng loại; không để quá ít, không lặp một tiếng | Palm River + Huy Trần |
| 11 | Chữ nằm sau đối tượng: chỉ sau NGƯỜI; chỗ nào bị che mất chữ thì không lồng | Palm River |
| 12 | Chữ nghiêng không được xén mép | Huy Trần |
| 13 | Lớp tối sau chữ: gradient **từ đỉnh video kéo xuống tới cạnh dưới phần chữ, mờ dần ngay từ mép trên** (đậm nhất ở đỉnh, nhạt liên tục xuống, hết ~160 px dưới chữ; không đậm đều rồi mới nhạt), hình dạng cố định cho cả video; **chỉ hiện khi có chữ**, mờ vào/ra theo đoạn, các khối liền nhau (nghỉ < 1 s) dùng chung một lần phủ. Khối đặt giữa/dưới khung có dải phủ riêng | Huy Trần, Kim Thắm |
| 14 | Tự kiểm đủ mục 6 rồi mới giao | Tú Casa Villa |
| 15 | Chữ không được chìm vào nền, và không phủ khi không cần: đo nền sau từng khối, độ đậm lớp phủ theo nền (sáng thì đậm, tối thì nhẹ); nền đã đủ tương phản thì không phủ; phủ tối đa chưa đủ thì viền tối đậm hơn | Kim Thắm |
| 16 | Chữ có hiệu ứng gõ (`go-chu`) đi với tiếng gõ phím chạy đúng nhịp từng ký tự, không phải một tiếng lẻ | Kim Thắm |
| 17 | Dùng kho SFX cho rộng: mỗi khối một loại riêng, thêm lớp tiếng nhỏ cho chuyển động phụ (chữ quay-vong đổi, số chốt, nét gạch, cú chuyển cảnh của clip) | Kim Thắm |
| 18 | Chỉ MỘT lớp làm tối và KHÔNG quầng sáng: lớp phủ gradient lo tương phản; chữ không mang quầng nào (bóng tối loang, glow cùng màu, neon, text-shadow đỏ của canh-bao…), chỉ giữ viền tối mảnh 1–2 px để tách nét | Kim Thắm |
| 19 | Video không được tối đi vì chữ: lớp phủ tối đa 0,6; clip điện thoại nhạt thì pha màu nhẹ (tăng tương phản, độ bão hòa) trước khi phủ chữ | Kim Thắm |

**Mục tiêu: 40–60 phút một video.** Chỉ render một lần ở cuối. Mỗi lần render clip 90 s mất khoảng 10 phút. Tất cả khâu kiểm khác làm trên snapshot và script, không cần render.

## 0. Trước khi làm (2 phút)

- `git pull` nhánh đang làm. Có session khác đẩy song song lên cùng nhánh, cả thư viện `text-presets/bds/` lẫn project trùng tên.
- Xem clip đã có project chưa: `ls projects`, `git log --oneline -15`. Có rồi thì sửa project đó, không tạo bản thứ hai.
- Xem các video trước đã dùng preset nào:
  `grep -rhoE 'p: "[a-z-]+"|BDS.make\("[a-z-]+"|p: MAIN' projects/*/build.mjs projects/*/template.html | sort | uniq -c`
  - **Mẫu chính không được lặp lại** mẫu của video trước (người dùng đã nhắc). Đổi cả font chính.

## 1. Nhận diện voice (5 phút, chạy nền)

```bash
~/.asr/bin/python -I scripts/asr/transcribe.py clip.mp4 work/asr.json "Tên dự án, chủ đầu tư, địa danh"
```

- Cài đặt xem ở đầu `scripts/asr/transcribe.py`.
- Trong lúc chờ, làm bước 2.
- Clip ngắn chỉ vài câu và người dùng đã đưa lời thoại thì bỏ qua ASR. Đặt mốc bằng đường năng lượng, xem mục 3.

## 2. Soi clip, tìm chỗ cắt (5 phút)

- **Sheet 1 khung/giây, có in giờ trên từng khung:**
  `ffmpeg -i clip.mp4 -vf "fps=1,scale=160:-1,drawtext=text='%{pts\:hms}':x=4:y=4:fontsize=14:fontcolor=yellow:box=1,tile=8x12" -frames:v 1 sheet.png`
- **Tìm:**
  - câu nói vấp hoặc nói lại (ASR ra hai câu giống nhau)
  - đoạn hậu trường có chữ in sẵn trên hình (ví dụ "Chưa quay xong")
  - đoạn ra khỏi khung hình ở cuối
  - khoảng lặng dài
- **Cắt đúng biên:** điểm cắt đặt ở khoảng lặng (đo năng lượng 50 ms, xem mục 3) và ở khung sạch đầu tiên. Soi từng khung quanh điểm cắt bằng `select='between(t,a,b)'`, `tile`.
- **Ép 30 fps cố định trước khi cắt, keyframe mỗi giây.** Clip điện thoại hay quay khung hình không đều; cắt thẳng thì hình lệch tiếng.

  ```bash
  ffmpeg -i clip.mp4 -filter_complex "[0:v]fps=30,split[a][b];[a]trim=start_frame=0:end_frame=N1,setpts=PTS-STARTPTS[v1];[b]trim=start_frame=N2:end_frame=N3,setpts=PTS-STARTPTS[v2];[v1][v2]concat=n=2:v=1:a=0[v]" -map "[v]" -c:v libx264 -crf 23 -g 30 -keyint_min 30 -pix_fmt yuv420p -movflags +faststart -an footage.mp4
  ```

  - Audio cắt cùng mốc (`atrim`), fade 20–30 ms ở chỗ nối, ra `voice.wav` mono 48 kHz.
  - So `ffprobe` độ dài footage và voice: phải bằng nhau.
- **Che vết cắt:** đẩy máy 6% đúng khung nối (`#cam` scale), kèm `whoosh-fast`.

## 3. transcript.json theo giờ thật

- Lấy `words[]` từ ASR. Sửa lỗi chính tả (danh sách ở `transcribe.py`). Trừ thời lượng đoạn đã cắt.
- **Giờ chữ ngay sau vết cắt:** đối chiếu năng lượng giọng, vì ASR có thể đặt sớm khoảng 0,3 s:
  `ffmpeg -ss A -t 1.4 -i clip.mp4 -vn -af "highpass=f=200,lowpass=f=3500,asetnsamples=2205,astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level:file=-" -f null -`
- `silencedetect` và `align.mjs` không dùng được với clip quay ngoài trời: nền ồn, không có khoảng lặng rõ.

## 4. Chữ chốt (15 phút)

**Không phụ đề chạy.** Chữ chốt đã mang ý chính, còn phụ đề dải dưới thì che người.

- **Mật độ:** gần như mỗi câu một khối, khoảng 1 khối mỗi 2–3 s.
  - Có chữ ngay từ 0,1 s (intro không được trống).
  - Chữ chốt 2–5 chữ, không chép nguyên câu.
- **Preset:**
  - Tiêu đề chính dùng preset chính của video (chưa dùng ở video trước, xem bảng 4c), chiếm không quá khoảng 40% số khối.
  - Số đo dùng `gia-chot` (200 m², 50 MÉT).
  - Liệt kê dùng `quay-vong`.
  - "Không còn / không có" dùng `canh-bao`.
  - **Không dùng `tung-chu`, `dia-danh`:** giữa lúc chạy hiệu ứng, ký tự hiện ngẫu nhiên hoặc vụn, nhìn như lỗi.
- **Màu ưu tiên gradient:** `c` là màu giữa, `c2` là màu đáy. Màu theo nghĩa:
  - vàng → cam: con số, sản phẩm
  - xanh ngọc → xanh dương: nơi chốn
  - bạc hà → xanh lá: an toàn, dễ
  - san hô → đỏ: không còn
- **Chữ phụ (chữ dẫn) đủ to, không vạch gạch 2 bên** (người dùng đã chốt).
- **Không "spam" một hiệu ứng chữ:** mỗi loại thông tin một preset (người dùng đã chốt).
  - Số đo dùng `gia-chot`. Tiện ích / loại căn dùng `chu-bac`. Liệt kê dùng `quay-vong`.
  - Trạng thái dùng `nhan-neon`. "Đã hết" dùng `canh-bao` (gạch đỏ). Câu hỏi dùng `go-chu`.
- **Lớp tối sau chữ** (người dùng đã chốt, luật 13 và 15):
  - **Hình dạng cố định, chuyển mềm:** đậm nhất ở đỉnh video (y 0), mờ dần ngay từ mép trên, liên tục xuống tới hết khoảng 160 px dưới khối chữ thấp nhất. Độ phủ theo (1 − f)^1,6, dựng bằng JS với 25 điểm màu: dốc ngay từ đỉnh, về 0 êm ở đáy. Không làm dải hở phía trên chữ, không đậm đều rồi mới nhạt (người dùng đã nhắc cả hai). Không dùng gradient vài điểm màu tuyến tính: chỗ gãy độ dốc hiện thành vệt cắt ngang (người dùng đã chê). Khối đặt ở giữa hoặc dưới khung có dải phủ riêng, hai đầu cũng mượt.
  - **Chỉ hiện khi có chữ:** mờ vào 0,55 s (bắt đầu 0,45 s trước khối), mờ ra 0,6 s sau khối, ease `sine.inOut`. Các khối liền nhau (nghỉ dưới 1 s) giữ phủ liên tục, chỉ chuyển độ đậm. Đoạn trống (clip có chữ in sẵn, hết lời) không phủ.
  - **Độ đậm theo nền:** `scripts/text-contrast.mjs` (`scrimPlan`) đo nền tại vùng chữ ở 3 khung của mỗi khối (phân vị 80 độ sáng). Từ đó tính độ phủ cần để chữ chính đạt ≥ 2,6 : 1 (màu giữa của gradient) và chữ dẫn trắng đạt ≥ 3,5 : 1; ngưỡng thấp hơn WCAG vì chữ đã có viền tối 1 px tách nét. Template đổi độ phủ thành opacity theo độ phủ của gradient tại tâm khối. Độ phủ cần dưới 0,08 (nền đã đủ tương phản: cảnh đêm, phòng tối) thì không phủ.
  - **Trần độ phủ 0,6** (luật 19): phủ đậm hơn thì cả video tối. Nền quá sáng chưa đạt ngưỡng (trời trắng, tường trắng: thường gặp) thì viền tối đậm hơn 1,5–2 px (class `hard`), không phủ thêm. `build.mjs` in bảng tương phản từng khối để soát.
  - **Không chồng bóng, không quầng** (luật 18): gỡ mọi `drop-shadow` / `text-shadow` loang rộng của CSS preset, cả tối lẫn sáng cùng màu (noi-bat, chuyen-dong, toc-do, quay-vong, gia-chot, khoi-noi, nhan-neon, song, ky-thuat, ky-niem, quầng đỏ của canh-bao). Viền mảnh đặt trên ô `.kt-slot` vì `BDS.in` tween `filter: blur` trên khối và dòng chữ, đặt ở đó sẽ bị ghi đè.
  - **Pha màu clip** (luật 19): `eq=contrast=1.08:saturation=1.12` trước khi phủ chữ, bản pha để ở `work/`; đo nền trên bản đã pha.
  - Mẫu: `#scrim`, `#scrim-low` trong `projects/example/template.html`.
- **Mỗi video một phong cách khác:** đổi preset chính, font, cách hiện chữ.
- **Khoảng cách dòng:** chữ dẫn ôm sát chữ chính, không đè dấu. Preset tự làm việc này (snug), không chỉnh tay.
- **Vị trí:**
  - Dải trời: top 250, căn giữa khung 1080, rộng tối đa 940, cỡ mặc định 140, tự co khi rộng quá.
  - Đầu người phải nằm dưới khối chữ. Mặt sát ống kính, đầu lên cao thì giảm cỡ, hoặc dùng `zone: "low"` (dải áo vest: top 1250, x 140–940).
- **Font:**
  - Đã kiểm dấu tiếng Việt, dùng được: Big Shoulders Display, Unbounded, Archivo, Saira, Playfair Display (cả nghiêng), Plus Jakarta Sans, Be Vietnam Pro, Exo 2, Inter Tight, Encode Sans, Lora, Yeseva One, Roboto Slab, Bitter, Merriweather.
  - Sai dấu, loại: Phudu (dấu hỏi "SỞ" lệch), Bricolage ("DÀI" thành "DAÌ"), Dela Gothic (mất dấu mũ), Kanit và Fraunces (mất dấu ngã).
  - Chữ nghiêng tô gradient: mỗi từ cần đệm 2 bên rộng (`tap-chi` đã làm), không thì nền cắt theo khung xén mất mép chữ.
  - Font mới: dựng bảng thử bằng chính các cụm chữ của video trước khi chọn.

## 4a. SFX: dày theo khối chữ, mỗi tiếng một loại

Đã chỉnh qua 2 lần. Palm River: gắn cùng một tiếng cho mọi khối → "spam, nhức đầu". Huy Trần: 13 tiếng cho 30 khối → "hơi ít". Luật đúng:
- **Mỗi khối chữ một tiếng**, cộng tiếng cho các khoảnh khắc trên hình (bước vào nhà, chuyển chữ của `quay-vong`).
- **Không có 2 tiếng cùng loại** (cùng tên gốc) trong một video. Video dài hơn số loại hợp nghĩa thì cho phép lặp, nhưng 2 lần dùng cùng một loại phải cách nhau ít nhất 30 s.
- **Kho rộng, dùng rộng:** kho có 108 loại (bộ `release` + bộ master-video). Mỗi khối chữ một loại riêng. Thêm lớp tiếng nhỏ cho chuyển động phụ: chữ `quay-vong` đổi, số `gia-chot` chạy xong, nét gạch của `canh-bao`, cú chuyển cảnh trong clip gốc (chỗ không có khối chữ trong ±0,6 s).
- **Chữ gõ (`go-chu`) đi với tiếng gõ phím chạy theo ký tự:** cue `run` của `scripts/sfx-cues.mjs` (`{ name: "type", run: { n: số ký tự, step: 0.06, names: ["type", "type-3"] } }`) ghép n tiếng phím đúng nhịp chữ hiện thành một file.
- **Cân mức trước khi render:** đo đỉnh từng tiếng (sau `gainDb` và limiter, trong 0,7 s đầu) so với RMS giọng tại chỗ đó, đích là đỉnh SFX ≈ RMS giọng + 2 dB. Tiếng khởi đầu chậm (`reveal`, `riser`, `line-draw`) đo ở 0,7 s đầu sẽ ra NHỎ, nên đổi sang tiếng bật ngay.
- Chọn tiếng theo nghĩa của khối chữ (cột `use` trong `sfx/catalog.json`). Ví dụ đã dùng:
  - mở đầu: `reveal`, `whoosh-heavy`
  - vào nhà: `door-open`
  - chữ gõ: `type`
  - số đếm lên: `meter`, `tick`
  - chốt diện tích / tiền: `coin`, `cash`
  - nhiều mục bật ra: `pop-multi`
  - mốc thời gian: `notify`
  - nhãn "ổn": `confirm`, `check`
  - lựa chọn: `toggle`
  - ý tưởng: `ding-idea`
  - liệt kê: `swipe`
  - ánh bạc quét: `scribble`
  - khung trượt: `slide`
  - đẹp: `shimmer`, `camera`
  - tên dự án: `title-in`
  - liên hệ: `open`, `send`
  - nhận nhà: `knock`
  - tăng: `chart-up`
  - giấy tờ, bảng giá: `paper-rustle`
  - SOLD OUT: `stamp`
  - bị gạch: `error-soft`
  - kết: `sparkle`
  - Tránh: tiếng có giọng người (`wow`, `cheer`, `bruh`) và tiếng hài.
- **Mức** (`gainDb` 6): `vol` 0,3–0,5 cho đa số; tiếng dài hoặc chói (`type`, `cash`) khoảng 0,3. Sau render chạy `sfx-levels.py`: không tiếng nào NHỎ / TO.
- Hai tiếng cách nhau ít nhất 0,6 s (`minGap`).
- **Khối trước tắt trước khối sau 0,35 s** (`out = at khối sau − 0,35`): khối mờ ra mất 0,3 s, tắt muộn hơn thì hai khối cùng hiện trong lúc chuyển. `kt-check` chỉ đo lúc khối đứng yên nên không bắt được lỗi này; soi bằng snapshot lúc chuyển (mục 6 bước 4).
- `build.mjs` liệt kê thẳng danh sách SFX (mẫu ở `projects/example`), không sinh vòng lặp gắn cùng một tiếng.
- **SFX không được đè lời:** tiếng rơi đúng lúc nói một từ khóa (tên, số, tiếng nước ngoài) làm từ đó nghe sai. Sau render chạy nhận diện giọng trên `output.mp4`: từ nào đúng ở `voice.wav` mà sai ở bản dựng là bị SFX che, dời tiếng sau từ đó hoặc đổi sang tiếng gọn (click, snap) thay cho whoosh.

## 4b. Chữ nằm sau đối tượng (hiệu ứng điện ảnh)

Mẫu chép: `projects/palm-river/` (build.mjs có `BEHIND`, `behindFrac`, đọc `behind-ok.json`; template đặt khối theo `objTop`).

1. **Chỉ lồng sau NGƯỜI**, lúc máy đứng yên. Tháp / vật thể tách bằng isnet ra viền vỡ, người dùng chê "tách nền tệ" → không dùng.
2. **Tách nền** `scripts/fx/matte.py`:
   - Người dùng `u2net_human_seg` (0,6 s/khung). Vật thể / tháp dùng `isnet-general-use` (1,6 s/khung).
   - Chỉ chạy các cửa sổ 2–5 s, chạy nền trong lúc làm chữ.
   - Xem `top` trong `<tên>.json`: đỉnh đối tượng vọt lên đột ngột là máy nghiêng hoặc lia → cắt cửa sổ trước lúc đó.
3. **Đặt chữ:** phần dưới chữ chính nằm sau đỉnh đối tượng.
   - Người lệch một bên: 40%. Người đứng giữa khung: 30% (không thì đầu che mất chữ giữa).
4. **Kiểm đọc được** `scripts/fx/behind-check.py`: ký tự nào bị che quá 55%, hoặc cả cụm trung bình quá 25%, thì **không lồng** (người dùng đã chốt). Khối đó thành chữ nổi.
5. **Composite** `scripts/fx/behind.mjs`, gọi sau render.
6. **Khối lồng không dùng dải tối sau chữ.** Dải tối không phủ lên người được phủ lại, nên quanh người thành quầng sáng (lỗi đã gặp). Thay bằng bóng chữ đậm.
7. **Mặt nạ (matte.py) đã có:** trung bình 3 khung (hết nhấp nháy), co vào 2 px (không lấn ra nền), guided filter bám viền tóc thật. Trước khi render, ghép thử 1 khung và phóng to vùng viền đầu để soi.

## 4c. Phong cách đã dùng (video sau chọn khác)

| Video | Preset chính | Font chữ chính / chữ dẫn | Cách hiện chữ | Lớp tối |
| --- | --- | --- | --- | --- |
| `qq-casa-villa` (Quỳnh Quỳnh) | `tieu-de-kep` | Be Vietnam Pro | mờ → nét | dải trên |
| `tu-casa-villa` (Tú) | `khoi-noi` | Big Shoulders Display / Unbounded | lật từng ký tự, nhãn màu | dải trên |
| `palm-river` (Tú Phan) | `dien-anh` | Archivo / Saira | co chữ từ mờ sang nét, chữ sau người | dải theo khối (đã bỏ, xem luật 13) |
| `huy-tran-casa-villa` (Huy Trần) | `tap-chi` | Playfair Display nghiêng / Plus Jakarta Sans | từng từ dâng lên, serif kiểu tạp chí | gradient từ mép trên |
| `casa-villa-kim-tham` (Kim Thắm) | `tang-truong` + 14 preset BĐS theo nghĩa (không dùng bộ 60 CapCut) | Yeseva One / Encode Sans | từng ký tự dâng lên; nhãn khoi-noi cho 4 lý do, số đếm, VHS cho mốc 20/10 | gradient từ mép trên |

Video sau: chọn preset chính chưa có trong bảng (vd. `chu-bac`, `ky-thuat`, `chuong-moi`, `song`, hoặc thêm preset mới vào `text-presets/bds/`), font chưa dùng, rồi thêm một dòng vào bảng.

## 5. Bẫy kỹ thuật (mỗi cái từng tốn hàng giờ)

| Bẫy | Cách tránh |
| --- | --- |
| Font khai báo cho video không được dùng | Truyền `display` / `sans` vào `BDS.make` (template mẫu đã làm) |
| Chữ bị co nhỏ sai | Chờ tải font, gồm cả bộ ký tự tiếng Việt, trước khi dựng: `document.fonts.load(…, "ĐẤT TRỐNG ỞỮỰ…")` |
| `quay-vong` lệch, mất chữ | Ô chứa trong template **không được** đặt class `slot`. Dùng `kt-slot` |
| Số mờ của `gia-chot` tràn khung | `.bds-gia-chot .bg { font-size: 1.12em }` |
| Lint error `font_family_without_font_face: be vietnam pro` | Thêm `["be-vietnam-pro", [900]]` vào `fonts` (font dự phòng trong CSS preset) |
| SFX dài bị cắt ở cuối video | Tiếng kết ngắn (`shimmer` 1 s), hoặc tăng `tail` |
| Lint `gsap_timeline_registered_before_async_build` | Gán `window.__timelines[id] = tl` ở CUỐI callback dựng chữ (sau khi chờ font), rồi `window.__hfForceTimelineRebind?.()` |
| Lint `gsap_non_transform_motion` (tween `letterSpacing`) | Giãn hoặc co chữ bằng `x` của từng ký tự (`dien-anh` đã làm) |
| Chữ dẫn ngắn tụt vào khe giữa các chữ dòng dưới ("T4 VÀ 05") | Đã sửa trong `snug`: chữ dẫn không thấp hơn mặt chữ hoa của cả dòng dưới |
| Chữ dẫn đè dấu chữ nghiêng / chữ in hoa | Đã sửa trong `snug`: đo theo chữ đang hiển thị (uppercase), bề ngang theo mực thật, xét cả dấu sát mép 0,35 em |
| `pkill -f …` giết luôn shell đang chạy lệnh | Dừng render bằng TaskStop; còn sót thì `pgrep -f "hyperframes render" \| xargs -r kill` |
| Số mờ sau `gia-chot` lệch với font serif | `.bds-gia-chot .bg { display: none }` |
| Khối chữ hiện lúc cảnh trước (ảnh chụp, thẻ) chưa hết | Đặt `at` sau mốc chuyển cảnh (xem sheet có in giờ) |
| Đo âm lệch +3 dB | Đọc kênh trái MP4, không `-ac 1` |
| HyperFrames cảnh báo keyframe thưa | `-g 30 -keyint_min 30` khi encode footage |

## 6. Tự kiểm rồi mới render, rồi mới giao

1. `npx hyperframes lint` phải 0 error.
2. `node scripts/qa/kt-check.cjs build/<v>/index.html <composition-id>`: lệch tâm, tràn vùng an toàn, ký tự chưa hiện đủ, lớp trang trí ra ngoài khung, khối chồng nhau. Phải đạt 100%.
3. Snapshot từng khối lúc đứng yên (`at + 1.0`), cắt dải trên rồi xếp lưới để soi khoảng cách tới đầu người:
   `node -e` đọc `KT` trong `index.html` → `npx hyperframes snapshot --no-end --at …`
4. Snapshot liên tiếp 6–8 khung trong lúc chữ đang chạy hiệu ứng (`at + 0.05…0.6`) cho 2–3 khối: không ký tự ngẫu nhiên, không chữ vụn.
5. Viết `SHOTBOOK.md` trước template, theo `docs/VAN-HANH.md` mục 3 và phương pháp ở `docs/SHOTS.md`. Render **một lần**, rồi chạy `python3 scripts/qa/motion_check.py build/<v>/output.mp4` (phần 静止 phải PASS) và `python3 -I scripts/qa/sfx-levels.py build/<v> projects/<v>`: đỉnh ≤ -1,5 dBFS, không tiếng NHỎ/TO. Cắt 6 khung từ MP4 để đối chiếu với snapshot.
6. Nén bản xem trước (`-crf 22 -preset veryfast`), gửi, commit và push.

## 7. Lần đầu (Tú · Casa Villa) mất 4–5 tiếng vì

- Làm trùng việc với một session song song: không `git pull` và không xem project đã có trước khi bắt tay.
- Không đọc preset BĐS có sẵn, nên người dùng phải nhắc.
- Giao khi chưa tự kiểm. Lỗi font không được dùng, trùng class `slot`, chữ hiện ngẫu nhiên đều chỉ lộ ra khi người dùng xem.
- Render khoảng 8 lần, mỗi lần 10 phút, chỉ để sửa từng lỗi nhỏ. Lẽ ra kiểm bằng snapshot và script trước rồi render một lần.
