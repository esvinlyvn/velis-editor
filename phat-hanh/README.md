# Phát hành gói sạch (chỉ có ở repo này, không đi theo gói)

Người mới nhận bộ công cụ qua **repo mẫu** `esvinlyvn/velis-editor-xuan` (private, bật Template repository). Repo mẫu chỉ chứa **gói sạch**: không dữ liệu khách, không nối với velis-editor. Người mới tạo repo riêng từ repo mẫu rồi đọc `HUONG-DAN.md` trong đó.

## Gói sạch là gì

`goi-sach.mjs` tạo gói từ các file đã commit ở HEAD của velis-editor, ghi ra `build/goi-sach/bds-editor/` (không lên GitHub).

Gói bỏ:
- `clients/*` trừ `_mau`, `projects/*` trừ `example` (clip, ảnh, lời thoại, cấu hình khách);
- ảnh chụp video khách trong `text-presets/catalog/`;
- thư mục `phat-hanh/` này (có `an-danh.json` ghi tên khách thật).

Gói sửa:
- tên khách, tên người, tên dự án, slug trong tài liệu và code mẫu → tên trung tính (bảng `thay` trong `an-danh.json`);
- bảng 4c của TALKING-HEAD để trống, `text-presets/history.json` rỗng;
- gỡ luật đồng bộ lõi với repo khác; `velis-editor` → `bds-editor`, kể cả thư mục skill;
- thêm vào CLAUDE.md dòng "Python chạy bằng `~/.asr/bin/python`".

Cuối cùng script grep lại danh sách `cam`. Còn sót thì in ra và thoát mã 1: thêm cặp thay vào `an-danh.json` rồi chạy lại. **Có khách hay dự án mới thì thêm tên người, tên dự án, slug của họ vào `thay`, `cam` (và `dong_4c` nếu có dòng ở bảng 4c)** trước khi cập nhật repo mẫu.

**Giới hạn:** TALKING-HEAD chỉ tới code mẫu trong vài dự án khách (chữ sau người, lớp tối, danh sách SFX). Gói không có các dự án đó, nên người nhận phải để Claude dựng lại theo mô tả. Gói có ghi chú việc này ở đầu TALKING-HEAD.

## Thiết lập repo mẫu (một lần)

1. Repo `velis-editor-xuan` trên GitHub → **Settings → General** → tick **Template repository**.
2. Kiểm repo đang **Private**.

## Cập nhật repo mẫu

Khi velis-editor có luật hay công cụ mới muốn người mới sau được hưởng. Mở phiên claude.ai/code trên velis-editor, nói:

```
Chạy node phat-hanh/goi-sach.mjs. Nếu sạch, cập nhật repo esvinlyvn/velis-editor-xuan: thay toàn bộ nội dung nhánh main
bằng thư mục build/goi-sach/bds-editor (giữ lịch sử của repo mẫu, không mang lịch sử velis-editor), commit và push.
```

Người đã tạo repo từ bản cũ không bị ảnh hưởng: repo của họ đã tách riêng.

## Giao cho người mới

1. Repo mẫu → **Settings → Collaborators** → **Add people** → nhập tên GitHub hoặc email của người nhận → quyền **Read**.
2. Người nhận chấp nhận lời mời, rồi làm theo `HUONG-DAN.md` mục 3: **Use this template → Create a new repository**, chọn tài khoản của họ, **Private**.
3. Họ báo đã tạo xong thì vào lại **Collaborators** → **Remove** họ. Repo của họ vẫn còn nguyên.

Không cho quyền Write, Maintain hay Admin: người nhận chỉ cần đọc để tạo repo từ mẫu.

Trước khi giao, xem `docs/SOURCES.md`. Gói có kho SFX đã mua và thẻ chuyển động video-talkcraft (phi thương mại). Phải chắc mình có quyền đưa hai thứ này cho người khác.

## Tự thử như người mới

Đã làm tới bước có repo `velis-editor-xuan`. Làm tiếp `HUONG-DAN.md` mục 4 trên chính repo mẫu (môi trường, setup script với `cd velis-editor-xuan`, phiên đầu tiên), rồi thử một clip ở mục 5.

Khi thử, **không commit gì vào repo mẫu** (dữ liệu khách thử, `clients/`, `projects/`). Video thử xong bảo Claude đừng commit, hoặc thử trên một repo tạo từ mẫu (Use this template, như người mới).

Chỗ nào khó hiểu hay bị vướng thì sửa `HUONG-DAN.md` ở **velis-editor**, đóng gói lại và cập nhật repo mẫu.
