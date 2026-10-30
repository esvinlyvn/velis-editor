# Phát hành gói sạch (chỉ có ở repo này, không đi theo gói)

`goi-sach.mjs` tạo bản bộ công cụ **không có dữ liệu khách** để giao cho người mới hoặc tự chạy thử như người mới. Người nhận đọc `HUONG-DAN.md` trong gói.

Gói bỏ:
- `clients/*` trừ `_mau`, `projects/*` trừ `example` (clip, ảnh, lời thoại, cấu hình khách);
- ảnh chụp video khách trong `text-presets/catalog/`;
- thư mục `phat-hanh/` này (có `an-danh.json` ghi tên khách thật).

Gói sửa:
- tên khách, slug dự án trong tài liệu → `Khách N`, `video-mau-N` (bảng `an-danh.json`);
- bảng 4c của TALKING-HEAD để trống, `text-presets/history.json` rỗng;
- gỡ luật đồng bộ lõi với repo khác; `velis-editor` → `bds-editor`, kể cả thư mục skill.

Cuối cùng script grep lại danh sách `cam`. Còn sót thì in ra và thoát mã 1: thêm cặp thay vào `an-danh.json` rồi chạy lại. Có khách mới thì thêm tên và slug của họ vào `thay`, `cam`, `dong_4c`.

**Giới hạn:** TALKING-HEAD chỉ tới code mẫu trong vài dự án khách (chữ sau người, lớp tối, danh sách SFX). Gói không có các dự án đó, nên người nhận phải để Claude dựng lại theo mô tả. Gói có ghi chú việc này ở đầu TALKING-HEAD.

## Tự chạy thử trên cloud của Claude, như một người mới

Làm trên tài khoản của chính mình, để thấy người mới sẽ gặp gì.

### 1. Tạo repo thử

GitHub → **+** → **New repository** → tên `bds-editor-thu` → **Private** → không tick README, .gitignore, license → **Create repository**.

### 2. Cho Claude quyền vào repo thử

[github.com/apps/claude](https://github.com/apps/claude) → **Configure** → tài khoản của mình → **Repository access** → thêm `bds-editor-thu` → **Save**.

### 3. Đóng gói và đẩy lên repo thử

Ở [claude.ai/code](https://claude.ai/code), mở phiên trên repo **velis-editor** rồi dán:

```
Chạy node phat-hanh/goi-sach.mjs. Nếu sạch, gắn repo <ten-ban>/bds-editor-thu (quyền push), đẩy nguyên thư mục
build/goi-sach/bds-editor thành commit đầu tiên "Khởi tạo bộ dựng video BĐS" lên nhánh main của repo đó
(git init mới trong thư mục gói, không mang lịch sử velis-editor). Không đẩy gì khác.
```

Muốn có file zip để gửi người khác thì thêm: "Nén gói thành bds-editor.zip và gửi tôi". Gói khoảng 50 MB, gửi qua Google Drive.

### 4. Từ đây làm như người mới

Mở `HUONG-DAN.md` trong repo `bds-editor-thu` và làm từ **mục 4**: tạo môi trường, setup script (tên repo là `bds-editor-thu`), phiên đầu tiên, rồi thử một clip ở mục 5.

Ghi lại chỗ nào khó hiểu hay bị vướng, rồi sửa `HUONG-DAN.md` ở **velis-editor** (không sửa ở repo thử) và đóng gói lại.

### 5. Giao cho người mới

- **Chuyển repo:** đóng gói vào một repo mới như bước 1–3, rồi **Settings → General → Transfer ownership** sang tài khoản người nhận. Người nhận làm theo HUONG-DAN mục 3 cách 1.
- **Gửi zip:** gửi link Google Drive của `bds-editor.zip`. Người nhận làm theo HUONG-DAN mục 3 cách 2.

Trước khi giao: xem `docs/SOURCES.md`. Gói có kho SFX đã mua và thẻ chuyển động video-talkcraft (phi thương mại). Phải chắc mình có quyền đưa hai thứ này cho người khác.
