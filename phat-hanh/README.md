# Gói sạch (chỉ có ở repo này, không đi theo gói)

Cách giao cho người mới, ai làm gì: **`GIAO-NGUOI-MOI.md`**. File này chỉ nói gói sạch được tạo thế nào.

`goi-sach.mjs` tạo gói từ các file đã commit ở HEAD của velis-editor, ghi ra `build/goi-sach/bds-editor/` (không lên GitHub). Gói được đẩy lên repo mẫu `esvinlyvn/velis-editor-master` (`GIAO-NGUOI-MOI.md` mục E).

```
node phat-hanh/goi-sach.mjs [thư-mục-ra]
```

Gói bỏ:
- `clients/*` trừ `_mau`, `projects/*` trừ `example` (clip, ảnh, lời thoại, cấu hình khách);
- ảnh chụp video khách trong `text-presets/catalog/`;
- thư mục `phat-hanh/` này (có `an-danh.json` ghi tên khách thật).

Gói sửa:
- tên khách, tên người, tên dự án, slug trong tài liệu và code mẫu → tên trung tính (mảng `thay` trong `an-danh.json`, theo thứ tự, cụm dài trước);
- bảng 4c của TALKING-HEAD để trống, `text-presets/history.json` rỗng;
- gỡ luật đồng bộ lõi với repo khác; `velis-editor` → `bds-editor`, kể cả thư mục skill;
- thêm vào CLAUDE.md dòng "Python chạy bằng `~/.asr/bin/python`".

Cuối cùng script grep lại mảng `cam` (không phân biệt hoa thường). Còn sót thì in từng chỗ và thoát mã 1. Có khách hay dự án mới thì thêm tên người, tên dự án, slug vào `thay` và `cam`; có dòng ở bảng 4c thì thêm slug vào `dong_4c`.

**Giới hạn:** TALKING-HEAD chỉ tới code mẫu trong vài dự án khách (chữ sau người, lớp tối, danh sách SFX). Gói không có các dự án đó, nên người nhận phải để Claude dựng lại theo mô tả. Gói có ghi chú việc này ở đầu TALKING-HEAD.
