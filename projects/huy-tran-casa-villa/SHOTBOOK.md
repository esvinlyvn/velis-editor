# SHOTBOOK · Huy Trần · Casa Villa song lập, Blanca City

Clip quay góc nhìn thứ nhất (POV), một cú máy liền, dài 143 s: Huy cầm máy đi từ mặt tiền vào hầm, các tầng, ra sân sau, rồi ra trục đường Hàng Điều, quay lại mặt tiền. Không thấy mặt người nói, chỉ có tay chỉ.

Giữ nguyên cảnh quay, không cắt (không có câu vấp). Ba quãng lặng 25,6–29,2 s, 61,8–65,9 s, 123,7–127,5 s là lúc Huy đang đi, máy vẫn lia, nên giữ.

Camera của chính clip luôn chuyển động, nên không thêm camera đẩy (không có đoạn đứng im; xác nhận bằng `motion_check.py` sau render).

**Phong cách khác 3 video trước** (Quỳnh Quỳnh dùng `tieu-de-kep`, Tú Casa Villa dùng `khoi-noi`, Palm River dùng `dien-anh`):
- Kiểu **tạp chí nhà đẹp**, preset mới `tap-chi`: chữ chính Playfair Display (serif), chữ khóa nghiêng tô gradient vàng champagne; hiện theo TỪ, dâng lên lần lượt.
- Chữ dẫn: Plus Jakarta Sans.
- Màu gradient: vàng champagne là màu chính; xanh lá = ổn / an toàn; cam = mốc thời gian, chú ý.

## 3.1 Bảng nhịp bố cục

| Bối cảnh | Mốc | Người nói ở đâu | Kiểu chứa | Thẻ chính |
|---|---|---|---|---|
| B1 Mặt tiền | @0–@4 (0–25,6 s) | vắng (POV) | toàn khung | tap-chi "BIỆT THỰ SONG LẬP" → gia-chot 200 m² |
| B2 Hầm, bàn giao thô | @5–@12 (29–59 s) | vắng | toàn khung | chu-bac "TỰ HOÀN THIỆN", quay-vong karaoke / bi-a |
| B3 Sân sau, cửa mở | @13–@16 (60–70 s) | vắng | toàn khung | tap-chi "PHÍA SAU", "CỬA MỞ" |
| B4 Thương hiệu, tiến độ | @17–@24 (70–98 s) | vắng | toàn khung | tap-chi "SUN GROUP", gia-chot 17 tháng, nhãn bàn giao / làm sổ |
| B5 Trục Hàng Điều | @25–@35 (98–124 s) | vắng | toàn khung | gia-chot vỉa hè 4–6 m, quay-vong 3/2 → biển Chí Linh, gia-chot 400 căn |
| B6 Giá, liên hệ | @36–@42 (127–143 s) | vắng | toàn khung | gia-chot 27 tỷ → tap-chi "LIÊN HỆ HUY" |

Mỗi loại thông tin một preset, không lặp một hiệu ứng cả video:
- `tap-chi`: tiêu đề chính.
- `gia-chot`: số đếm lên.
- `chu-bac`: hiện trạng / công năng.
- `quay-vong`: liệt kê.
- `nhan-neon`: trạng thái (sở hữu lâu dài, bàn giao, làm sổ).
- `go-chu`: câu mời "Cùng em đi xem thực tế".

Ranh giới bối cảnh: clip là một cú máy liền nên đúng thể loại "lia trong thế giới dài". Không thêm chuyển cảnh; chữ của bối cảnh cũ thoát hẳn (từng từ rơi xuống) trước khi chữ bối cảnh mới vào.

## 3.2 Từng bối cảnh

**B1 Mặt tiền.** Ý đồ: giới thiệu sản phẩm, rồi chốt các con số đầu tiên. Chuỗi tiếp sức: tiêu đề → nhãn → số → số.

| Mốc lời | Lớp | Đối tượng | Động tác | Phối hợp với ai |
|---|---|---|---|---|
| @0 đầu | chủ thể | tap-chi "Blanca City · Sun Vũng Tàu / BIỆT THỰ SONG LẬP" | từ dâng lên lần lượt | — |
| @1:"sở hữu lâu dài" | chủ thể | nhan-neon xanh "SỞ HỮU LÂU DÀI" | bật nghiêng rồi chớp | thay tiêu đề |
| @1:"700" | chủ thể | gia-chot "CÁCH BIỂN 700–800 m" | số chạy | thay nhãn |
| @2:"10" | chủ thể | gia-chot "ĐẤT 10 × 20 / 200 m²" | số chạy | thay số trước |
| @3:"1 hầm" | chủ thể | tap-chi "Thiết kế / 1 HẦM · 3 LẦU" | từ dâng lên | thay số |
| @3:"bàn giao" | chủ thể | nhan-neon cam "THỨ 7 BÀN GIAO" | bật | thay tiêu đề |
| @4 | chủ thể | go-chu "Cùng em đi xem thực tế nha!" | gõ chữ | mở đường vào nhà |

**B2 Hầm.** Ý đồ: nhà bàn giao thô, hầm làm phòng giải trí.

| Mốc lời | Lớp | Đối tượng | Động tác | Phối hợp với ai |
|---|---|---|---|---|
| @5:"hầm" | chủ thể | tap-chi "Tầng dưới / KHU VỰC HẦM" | từ dâng lên | — |
| @6:"bàn giao" | chủ thể | chu-bac "Bàn giao thô / TỰ HOÀN THIỆN" | ánh bạc quét | thay tiêu đề |
| @9:"phòng giải trí" | chủ thể | tap-chi "Hầm làm / PHÒNG GIẢI TRÍ" | từ dâng lên | — |
| @10 | chủ thể | quay-vong "Như là / KARAOKE → PHÒNG BI-A" | chữ thay nhau | thay tiêu đề |
| @12:"phòng ngủ" | chủ thể | chu-bac "Tầng trên / PHÒNG NGỦ" | ánh bạc | — |

**B3 Sân sau.** Ý đồ: không gian mở, đẹp. tap-chi "Khu vực / PHÍA SAU" → tap-chi "Không gian / CỬA MỞ".

**B4 Thương hiệu, tiến độ.**
- tap-chi "Thiết kế · thương hiệu / SUN GROUP"
- chu-bac "Đi xem thực tế / CÙNG EM HUY"
- gia-chot "HOÀN THIỆN SAU / 17 THÁNG"
- tap-chi "Từ 2025 / GẦN NHƯ XONG HẾT"
- nhan-neon cam "THỨ 7 NHẬN NHÀ"
- nhan-neon xanh "CÓ THÔNG BÁO LÀM SỔ"

**B5 Trục Hàng Điều.**
- gia-chot "VỈA HÈ TRƯỚC NHÀ / 4–6 MÉT"
- tap-chi "Trục chính / HÀNG ĐIỀU"
- quay-vong "Từ đây / ĐƯỜNG 3/2 → QUẸO PHẢI → BIỂN CHÍ LINH"
- gia-chot "THỨ 7 NÀY BÀN GIAO / 400 CĂN"

**B6 Giá, liên hệ.**
- tap-chi "Đi xem thực tế / CÙNG EM HUY"
- chu-bac "Gửi bảng giá / CHI TIẾT TỪNG CĂN"
- gia-chot "1 CĂN SONG LẬP KHOẢNG / 27 TỶ"
- tap-chi "Xem nhà · nhận bảng giá / LIÊN HỆ HUY"

## SFX

Khoảng 13 tiếng, mỗi tiếng một loại, chỉ ở khoảnh khắc chính, không lặp (luật trong TALKING-HEAD.md mục 4a).

## Chưa làm được

- **Chữ nằm sau đối tượng:** clip không có người trong khung; mặt tiền nhà / tòa nhà mà tách bằng isnet thì viền vỡ (đã bị chê ở Palm River). Nên không lồng.
- **Nhãn bám theo vật đang chỉ tay** (callout gắn vào cầu thang, cửa…): máy cầm tay rung và đi liên tục, nhãn sẽ trôi lệch khỏi vật. Thay bằng chữ chốt ở dải trên.
