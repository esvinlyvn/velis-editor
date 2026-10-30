# Quy tắc vận hành velis-editor

velis-editor nhận **clip quay thật về bất động sản** (người nói trước máy, quay dự án) và dựng thành video dọc 1080×1920 hoàn chỉnh: cắt nhịp, chữ chốt, bản đồ và minh họa, SFX, màu, kiểm, giao.

File này gom mọi luật người dùng đã yêu cầu cho việc edit BĐS, gỡ chỗ mâu thuẫn giữa các tài liệu, và chỉ rõ luật nào nằm ở đâu. Mỗi luật chỉ có **một nơi sống**: các file khác chỉ dẫn tới đó, không chép lại.

## 1. Thứ tự ưu tiên

Hai chỗ nói khác nhau thì chỗ đứng trên thắng:

1. Lời người dùng trong phiên đang làm.
2. **Bảng luật đã chốt** ở đầu `TALKING-HEAD.md`. Đây là nơi duy nhất ghi luật người dùng chốt qua từng video, có cột nguồn.
3. `clients/<khach>/brand.json`: lựa chọn riêng của khách (màu, LUT, CTA, logo, lịch sử phong cách).
4. File này và `docs/TRINH-BAY.md` (phần hình: hook, minh họa, bố cục đồ họa, học từ AI MASTER).
5. `docs/HAU-KY.md`, `docs/DAC-TA-CHU.md`: đặc tả gốc đo từ video mẫu.
6. `TOOLKIT.md`, `MAP.md`, `text-presets/README.md`, `text-presets/bds/BDS-PRESETS.md`: cách dùng công cụ.

**Ghi luật mới:** người dùng chốt thêm điều gì (khen, chê, sửa), thì sau khi giao video thêm một dòng vào bảng của `TALKING-HEAD.md`, cột Nguồn ghi tên video. Luật mới mâu thuẫn với luật cũ thì sửa dòng cũ, không để hai dòng chọi nhau.

### Mâu thuẫn đã gỡ

| Chủ đề | Tài liệu cũ nói | Áp dụng |
|---|---|---|
| Số chữ một khối | HAU-KY: keyword 1–3 từ | **Luật 1: 2–5 chữ**, không chép nguyên câu |
| Chữ sau người | HAU-KY: tiêu đề lớn đặt sau người | **Luật 11: chỉ sau NGƯỜI**, chỗ nào bị che mất chữ thì không lồng |
| Lớp tối sau chữ | các cách cũ: dải theo khối… | **Luật 13**: gradient cố định từ mép trên, chỉ hiện khi có chữ, các khối liền nhau (nghỉ dưới 1 s) dùng chung một lần phủ |
| CTA cuối video | Vis: không CTA chữ | BĐS: **có CTA** theo `brand.json` của khách (HAU-KY quy tắc 10). Không có thông tin thì hỏi |
| Màu phim | HAU-KY: da ấm, nền tím vàng (phong cách 3 video mẫu) | Chỉ là một gợi ý. Màu theo LUT của khách (mục 7) |
| Đổi phong cách | Luật 5 (khác video trước) và HAU-KY 7 (không trùng quá 2/5 gen) | Gộp: so với **lịch sử của chính khách đó** (mục 6) và bảng 4c |
| SHOTBOOK | TALKING-HEAD 6: theo `brand/VIS-SHOTS.md` | Viết `SHOTBOOK.md` theo mục 3 file này, phương pháp ở `docs/SHOTS.md`. Phần chuyển động camera chỉ áp cho cảnh minh họa và đồ họa, không áp cho cảnh người nói |
| Gạch bỏ | bộ preset có `canh-bao` (gạch ngang), AI MASTER cấm gạch chéo | Gạch **ngang** thẳng cho chữ sai thì được. Không dùng gạch **chéo** trên thẻ, icon. Ý "không nên" thể hiện bằng viền đỏ + ô cấm + chữ mờ (TRINH-BAY mục 2) |
| Mật độ minh họa | HAU-KY: 45–55% không thấy mặt; AI MASTER: ≥ 70% có minh họa | Cả hai: ≥ 70% thời lượng có hình minh họa (tính cả đồ họa trên cảnh người nói), trong đó 45–55% không thấy rõ mặt |
| Khung nhấn và chữ dày | luật 4: gần như mỗi câu một khối chữ; AI MASTER: một khung nhấn mỗi 6–10 s | Không chọi nhau: chữ chốt theo luật 4; khung minh họa (thẻ, sơ đồ) theo TRINH-BAY, đặt dưới khối chữ |
| Nhiều hiệu ứng | bộ quy tắc chọn chữ của Vis: xoay vòng preset, thưởng preset lạ | **Luật 8: mỗi loại thông tin một preset** cố định trong cả video. Xoay vòng là giữa các video, không phải trong một video (mục 4) |

## 2. Nhận việc

Đọc tin nhắn và file của người dùng, rồi tự điền các mục sau. Thiếu mục nào **ảnh hưởng tới kết quả** thì hỏi **một lần**, gộp thành một câu. Thiếu mục không quan trọng thì dùng mặc định và ghi giả định vào `projects/<video>/NOTES.md`.

| Mục | Mặc định khi thiếu |
|---|---|
| Khách / kênh (để lấy `clients/<khach>/brand.json`) | **phải hỏi**, vì phong cách và lịch sử theo khách |
| Clip thô | **phải có** |
| Tên dự án, thông tin dự án (giá, vị trí, tiện ích) | lấy từ lời nói. Số liệu không có trong lời và không có trong `info/` thì không tự thêm |
| CTA cuối video | theo `brand.json`. Chưa có thì hỏi |
| Nền tảng đăng | TikTok / Reels / Shorts dọc 1080×1920 |
| Hạn giao | 40–60 phút một video (TALKING-HEAD) |

Thư mục video: `projects/<khach>-<du-an>/`, chép từ `projects/example/`. Thông tin dự án khách gửi để ở `projects/<video>/info/`.

**Không commit clip thô và file render**: chỉ giữ trong `work/` và `build/`, hai thư mục này đã gitignore. Repo chỉ chứa dữ liệu dựng: transcript, template, SHOTBOOK, text-plan, sfx.json, NOTES.

## 3. Quy trình

Làm theo `TALKING-HEAD.md` từ mục 0 đến 6. Phần bổ sung và thứ tự gọn:

1. **Chuẩn bị** (2 phút): đọc bảng luật, `brand.json`, mục 4c của TALKING-HEAD (phong cách đã dùng).
2. **Nhận diện voice** (`scripts/asr/`), cho chạy nền.
3. **Soi clip, cắt** (HAU-KY mục 0 và mục 3):
   - không có quãng im quá khoảng 150 ms;
   - cắt tiếng thở, chỗ ngập ngừng, câu nói hỏng;
   - cứ 2–4 giây hình đổi một lần: punch-in, đổi góc, minh họa, hoặc thêm chữ;
   - giọng không bao giờ đứt khi hình minh họa đè lên.
4. **`transcript.json` theo giờ thật** của bản đã cắt.
5. **Hook 3 giây đầu** theo `docs/TRINH-BAY.md` mục 1: viết `hook.json` với ít nhất 3 phương án, chạy `node scripts/hook-pick.mjs`.
6. **SHOTBOOK.md** viết trước template, theo phương pháp `docs/SHOTS.md`. Gồm:
   - từng đoạn: ý, hình chính (người nói / minh họa / bản đồ), chữ chốt, SFX;
   - chỗ có chữ sau người (luật 11);
   - chỗ dùng bản đồ (`MAP.md`);
   - chỗ chuyển cảnh lớn (flash hoặc light leak, tối đa khoảng 4 lần mỗi 150 giây);
   - minh họa cho từng ý theo bảng "nói gì vẽ nấy" ở TRINH-BAY mục 2, vị trí đồ họa theo luật bố cục ở cùng mục.
7. **Chữ chốt** theo mục 4.
8. **SFX** theo mục 5.
9. **Màu** theo mục 7.
10. **Tự kiểm** theo TALKING-HEAD mục 6 (`lint` 0 error, `kt-check` 100%, snapshot khối đứng yên và khối đang chạy), cộng thêm phần kiểm ở mục 8 file này. **Render một lần** ở cuối.
11. **Giao** theo mục 9 và TRINH-BAY mục 4.

## 4. Chữ chốt

- **Nguồn preset:** bộ 60 (`text-presets/presets.mjs`), bộ BĐS 18 (`text-presets/bds/`), thẻ bám lời (`text-presets/vis-cards.mjs`, hợp cho đoạn mở 3 giây và câu cao trào).
- **Gán vai:** mỗi khối chữ gắn một vai (bảng vai trong `text-presets/QUY-TAC-CHU.md`): số tiền, địa danh, tiện ích, pháp lý, so sánh, cảnh báo…
- **Luật 8, một loại thông tin một preset:** trong một video, cùng một vai luôn dùng cùng một preset. Ví dụ mọi số tiền dùng `gia-chot`, mọi địa danh dùng `dia-danh`. Chạy `node text-presets/pick-text.mjs projects/<video>/text-plan.json` với `"mode": "bds"` để script giữ cố định theo vai và tránh lặp phong cách của khách.
- **Một preset chính** cho khối chữ thường (cột "Preset chính" ở bảng 4c), khác video trước của cùng khách.
- **Chữ dày (luật 4):** gần như mỗi câu một khối, có chữ ngay từ giây 0,1.
- **Cấm theo luật:**
  - Không hiệu ứng ký tự ngẫu nhiên hay vụn (luật 7). Vì vậy trong velis-editor không dùng `chuong-moi` của bộ BĐS (chữ dẫn giải mã ký tự) và các kiểu `popRand`, `scatter` của bộ 60.
  - Không vạch gạch hai bên chữ dẫn (luật 9). Preset có trang trí `rules` (`b-number`, `b-location`, `d-counter`) phải tắt phần trang trí đó hoặc chọn preset khác.
  - Không xén mép chữ nghiêng (luật 12).
- **Màu (luật 6):** chữ chính ưu tiên gradient. Màu nhấn lấy từ `brand.json`.
- **Đọc được (luật 15):** đo nền sau từng khối bằng `scripts/bg-sample.py` và `contrastPlan`. Chữ chính phải đạt tương phản ≥ 3:1, chữ dẫn trắng ≥ 4,5:1. Phủ tối tối đa mà vẫn chưa đủ thì thêm viền tối sát chữ.
- **Vị trí (luật 2, 3):** không che người, đầu người nằm dưới khối chữ. Chữ dẫn ôm sát chữ chính, chỉ chừa đủ để không đè dấu.

## 5. Âm thanh

- **Voice** theo HAU-KY mục 7: chuẩn −14 LUFS, LRA 3–4,5 LU, highpass 80 Hz, de-ess nhẹ, nén ratio 3–4.
- **SFX:**
  - mỗi khối chữ một tiếng, hai khối liền nhau không trùng loại tiếng (luật 10);
  - không để quá ít, không lặp một tiếng;
  - dùng rộng kho SFX, thêm lớp tiếng nhỏ cho chuyển động phụ: chữ quay vòng, số chốt, nét gạch, chuyển cảnh (luật 17);
  - chữ gõ đi với tiếng gõ phím đúng nhịp từng ký tự (luật 16).
- **Kiểm âm:** `python3 -I scripts/qa/sfx-levels.py`: đỉnh ≤ −1,5 dBFS, không có tiếng lúc nhỏ lúc to; SFX không vượt đỉnh voice.
- **Nhạc nền:** chỉ dùng khi khách gửi hoặc trong `brand.json` có, và phải có quyền sử dụng.

## 6. Phong cách và lịch sử theo khách

Mỗi khách (sale, kênh, dự án) có `clients/<khach>/brand.json`, mẫu ở `clients/_mau/`:
- màu nhấn, cặp font ưu tiên (nếu có);
- LUT, CTA, logo;
- **lịch sử**: mỗi video ghi lại preset chính, font, cách hiện chữ, lớp tối.

Video mới phải khác video trước **của cùng khách** ở ít nhất 3 trong 5 "gen": preset chính, font chữ chính, font chữ dẫn, cách hiện chữ, kiểu lớp tối. Bảng 4c của TALKING-HEAD vẫn ghi tất cả các video để nhìn toàn cục.

## 7. Màu và LUT

Hiện repo chưa có LUT. Khi thêm, theo các luật sau (chi tiết trong `luts/README.md`):
1. Áp LUT lên **clip quay** trước khi dựng, bằng ffmpeg `lut3d`. Không áp lên chữ và đồ họa.
2. Một video dùng một LUT, cường độ 50–80%. Da người phải trông tự nhiên: soi ít nhất 3 khung có mặt người trước khi render.
3. LUT mặc định của khách ghi trong `brand.json`. Khách chưa có thì chỉ cân màu nhẹ (cân trắng, tương phản, làm nét nhẹ) theo HAU-KY mục 6, không ép tông tím vàng.
4. Chỉ dùng file `.cube` có quyền sử dụng. Ghi nguồn vào `luts/SOURCES.md`.

## 8. Kiểm bổ sung

Ngoài TALKING-HEAD mục 6:
- **Hình đứng im:** `python3 scripts/qa/motion_check.py build/<video>/output.mp4`, phần 静止 phải PASS. Kiểm nhanh không cần Python: `ffmpeg -i build/<video>/output.mp4 -vf freezedetect=n=0.003:d=0.8 -f null -`.
- **Các mục kiểm phần hình** ở TRINH-BAY mục 3: quét vùng chữ, chuyển cảnh, miệng, hook, % minh họa, loudnorm, SFX.
- **Dấu tiếng Việt:** ở mọi khối có hộp, viền hoặc gradient, chụp lúc đứng yên và soi dấu (Ắ, Ầ, Ữ, Ạ, Ặ).
- **Bản đồ:** đúng vị trí; nhãn địa danh đúng chính tả.
- **Số liệu và tên riêng** trên chữ khớp lời nói. Không tự thêm số không có nguồn.

## 9. Giao

1. Nén bản xem trước (`-crf 22 -preset veryfast`), gửi kèm danh sách khối chữ (thời điểm, chữ, preset).
2. Người dùng duyệt xong thì:
   - commit dữ liệu dựng;
   - thêm một dòng vào bảng 4c của TALKING-HEAD;
   - ghi lịch sử vào `brand.json` của khách;
   - chạy `pick-text.mjs --commit`.
3. Người dùng sửa gì mà đó là ý muốn chung (không chỉ riêng video này) thì thêm thành luật (mục 1).

## 10. Giữ repo sẵn sàng phát hành

Giữ các điều sau ngay từ bây giờ để sau này tách ra dễ:
- Không ghi cứng tên người, kênh, thương hiệu trong code hay tài liệu chung. Mọi thứ riêng của khách nằm trong `clients/`.
- Đường dẫn trong code đều tương đối với gốc repo. Không phụ thuộc thư mục ngoài repo.
- Lõi dùng chung với repo `edit-bds` (Vis) sửa theo luật `core:` ở mục 11.
- **Tài nguyên bên ngoài đã có quyền dùng.** Chứng từ ghi ở `docs/SOURCES.md`; khi phát hành bản đóng gói phải giữ file này:
  - thẻ chuyển động và script lấy từ video-talkcraft (`docs/shots/`, `scripts/qa/motion_check.py`, `frame_signature.py`): đã được tác giả cho phép;
  - gói SFX "Motion Design Sound Effects": đã mua và được phép dùng.

  Trước khi phát hành cho người khác, đọc lại điều khoản để chắc quyền đó bao gồm việc phân phối lại cho người dùng thứ ba. Nếu không, mỗi người tự nhập SFX bằng `sfx-import.mjs`.
- Font `@fontsource` (OFL) phát hành kèm được.
- Cửa vào là skill `.claude/skills/velis-editor/`; luật nằm trong `docs/`; mẫu cấu hình ở `clients/_mau/`; README hướng dẫn cài đặt cho người mới. Thông tin và cấu hình khách thật (`clients/<khach>/`, `projects/<khach>-*`) là dữ liệu riêng: khi phát hành cho người ngoài, tách sang repo dữ liệu riêng hoặc bỏ ra.

## 11. Lõi chung với repo edit-bds

`scripts/`, `sfx/`, `text-presets/` có chung gốc với repo `edit-bds` (kênh Vis). Hai repo phát triển riêng, chỉ trao đổi sửa lỗi lõi:
1. Sửa lõi thì commit **riêng**, chỉ gồm file lõi. Message bắt đầu bằng `core:`.
2. Lấy sửa lỗi từ repo kia về:
   ```
   git remote add vis https://github.com/esvinlyvn/edit-bds.git   # một lần
   git fetch vis claude/lucid-cray-hwgt06
   git log vis/claude/lucid-cray-hwgt06 --oneline --grep '^core:'
   git cherry-pick <sha>
   ```
   Lấy xong thì chạy lại phần kiểm (build `--no-render` một video, lint, `kt-check`).
3. Không lấy commit không có tiền tố `core:` từ repo kia.
