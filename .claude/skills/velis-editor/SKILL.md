---
name: velis-editor
description: Dựng video bất động sản từ clip quay thật (sale hoặc chủ đầu tư nói trước máy, quay dự án) thành video dọc 1080×1920 hoàn chỉnh: cắt nhịp, chữ chốt theo preset, chữ sau người, bản đồ, minh họa, SFX, màu/LUT, kiểm và giao. Dùng khi người dùng gửi clip thô (.mp4/.mov) về dự án, căn hộ, khu đất, hoặc nói "edit video này", "dựng clip cho anh X", "thêm chữ, bản đồ cho video BĐS", "làm như video Casa Villa". Không dùng cho content tự động của kênh Vis giữ xe.
---

# velis-editor

Mọi luật nằm trong repo; skill này chỉ là đường đi. Làm theo thứ tự, mỗi bước mở đúng tài liệu được chỉ.

1. **Đọc luật:** `docs/VAN-HANH.md` và `docs/TRINH-BAY.md` (toàn bộ), bảng luật đầu `TALKING-HEAD.md`, mục 4c của TALKING-HEAD (phong cách đã dùng).
2. **Nhận việc:** điền bảng ở VAN-HANH mục 2. Thiếu tên khách hay CTA thì hỏi **một lần**, gộp thành một câu. Thiếu phần khác thì dùng mặc định và ghi vào `NOTES.md`.
   Mở `clients/<khach>/brand.json`; khách mới thì tạo từ `clients/_mau/`.
3. **Dựng:** làm theo VAN-HANH mục 3, gồm voice, cắt, transcript, hook 3 giây (`scripts/hook-pick.mjs`), SHOTBOOK có minh họa theo TRINH-BAY, chữ chốt, SFX, màu. Chữ chốt chọn theo `text-presets/QUY-TAC-CHU.md`, chạy `pick-text.mjs` ở `mode: "bds"`.
4. **Kiểm** theo TALKING-HEAD mục 6, VAN-HANH mục 8 và TRINH-BAY mục 3, rồi **render một lần**.
5. **Giao** theo VAN-HANH mục 9: gửi bản xem trước nén nhẹ kèm danh sách khối chữ. Người dùng duyệt xong mới commit, ghi lịch sử khách, thêm dòng vào bảng 4c.
6. **Học từ phản hồi:** điều người dùng sửa mà là ý muốn chung thì thêm thành luật vào bảng của TALKING-HEAD, kèm nguồn.

Không làm:
- Không thêm số liệu, tên riêng không có trong lời nói hay trong `info/`.
- Không đặt chữ hay đồ họa che mặt, che miệng.
- Không dùng hiệu ứng ký tự ngẫu nhiên.
- Không render nhiều lần để thử; dùng snapshot.
- Không commit clip thô.
