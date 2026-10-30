# SHOTBOOK · Kim Thắm · Casa Villa, Blanca City

Clip 2:47 (720×1280, đã dựng sẵn). Kim Thắm đứng nói trước căn Casa Villa, xen flycam, phối cảnh, nội thất và pháo hoa. Clip gốc đã có chữ in sẵn ở vài đoạn:
- 33–39 s: thẻ "200 mẫu nhà độc bản" ở dải dưới.
- 39–42 s: "Thiết kế hoàn mỹ".
- 42–48 s: thẻ "Đảm bảo riêng tư", khung Instagram.
- 50–57 s: thẻ Blanca City ở nửa trên.
- 57–63 s: tựa "Casa Villa tài sản bền vững…".
- 114 s: "DTS 260m2" ở dải dưới.

Giữ nguyên cảnh và tiếng. Không cắt (không có câu vấp), không phụ đề.

**Chọn chữ:** chỉ dùng bộ preset BĐS `text-presets/bds/` (dựng từ video "PRESET CAPTION"). Không dùng bộ 60 preset CapCut (`presets.mjs`) theo lời dặn của người dùng.

- Lập `text-plan.json`, gắn vai cho từng câu, chạy `pick-text.mjs` để lấy gợi ý, rồi duyệt lại theo TALKING-HEAD.
- Preset da là `tang-truong`: chữ gradient dâng lên từng ký tự.
- Font: Yeseva One (chữ chính) và Encode Sans (chữ dẫn).
- Các preset khác dùng theo nghĩa từng câu:
  - `noi-bat`: câu mở "VỚI 30 TỶ".
  - `top-list`: "4 LÝ DO".
  - `khoi-noi`: nhãn "LÝ DO 1–4".
  - `gia-chot`: số (939 căn, 10%, 266 m², 15 ha, 900 mét).
  - `toc-do`: 17 tháng.
  - `ky-niem`: mốc 20/10.
  - `chuyen-dong`: "CÓ BIỆT THỰ / THIẾU KHÔNG GIAN".
  - `quay-vong`: liệt kê.
  - `nhan-neon`: trạng thái.
  - `canh-bao`: các cụm "không…".
  - `chu-bac`: phân khúc (song lập, Hermès, Marriott).
  - `song`: biển.
  - `ky-thuat`: nét thiết kế (độc bản, mái vòm).
  - `go-chu`: câu hỏi, câu trích.
- Không dùng `tung-chu`, `dia-danh`, `chuong-moi`: ký tự hiện ngẫu nhiên, sai luật 7.
- `tieu-de-kep` và `khoi-noi` từng là preset chính của video trước. Ở đây `khoi-noi` chỉ làm nhãn "LÝ DO n", không làm da.

**Màu gradient theo nghĩa:**
- vàng → cam: số, sản phẩm
- xanh ngọc → dương: nơi chốn, biển
- xanh lá: ổn (đậm hơn để không chìm trên tường trắng)
- đỏ: không còn

**SFX:** ưu tiên bộ master-video (`sfx/SOURCES.md`). Mỗi khối một tiếng, tiếng cùng loại cách nhau ≥ 30 s. Mức đã đo bằng `sfx-levels.py`.

## Bảng nhịp bố cục

| Bối cảnh | Mốc | Người nói | Vị trí chữ | Thẻ chính |
|---|---|---|---|---|
| B1 Mở | @0–@2 (0–11 s) | đứng giữa, đầu y ~1180 | dải trên, top 250 | gia-chot 30 TỶ → tang-truong CASA VILLA → 4 LÝ DO |
| B2 Lý do 1 khan hiếm | @3–@6 (11–31 s) | đứng giữa → flycam | dải trên | 939 CĂN, 10%, quay-vong loại hình, SỞ HỮU LÂU DÀI |
| B3 Lý do 2 khác biệt | @7–@11 (31–51 s) | phối cảnh | dải trên; trống 39–48 s (chữ in sẵn) | ĐỘC BẢN, Mái vòm, ĐẶC SẮC |
| B4 Lý do 3 giá trị sống | @12–@16 (51–74 s) | thẻ Blanca / người đi | top 900 lúc 51–63 s (giữa thẻ in sẵn và logo), rồi dải trên | GIÁ TRỊ SỐNG, 17 THÁNG, THUYẾT PHỤC, 20/10 |
| B5 30 tỷ vs Blanca | @17–@27 (74–111 s) | flycam, phối cảnh | dải trên | KHÔNG GIAN, 15 HA, MARRIOTT, 900 MÉT, THÌ CÓ THỂ |
| B6 Dòng tiền | @28–@35 (111–136 s) | nội thất, flycam | dải trên | KHÔNG Ở, ĐÁNG KHÔNG?, DÒNG TIỀN, KHAI THÁC |
| B7 Lý do 4 duy trì giá trị | @36–@41 (136–154 s) | nội thất → người nói | dải trên | QUA ĐỜI SAU, quay-vong chăm sóc…, HẠNG A |
| B8 Chốt | @42–@44 (154–167 s) | đứng giữa | dải trên | go-chu, quay-vong, ĐI XEM THỰC TẾ |

- Lớp tối `#scrim`: gradient cố định từ mép trên, hết ngay dưới khối thấp nhất của dải trên. Khối ở dải dưới (51–63 s, khung là đồ họa của clip, không có người) dùng bóng chữ đậm.
- Clip là cảnh đã dựng, máy luôn chuyển, nên không thêm camera đẩy.
