# Giao bộ công cụ cho người mới: ai làm gì

File này chỉ có ở velis-editor, không đi theo gói. Người mới đọc `HUONG-DAN.md` trong repo của họ; số bước dưới đây khớp với số bước trong file đó.

- **Repo mẫu:** `esvinlyvn/velis-editor-xuan` (private, bật Template repository). Chỉ chứa gói sạch: không dữ liệu khách, không nối với velis-editor.
- **Người mới** tạo repo riêng từ repo mẫu, chạy trên cloud của Claude bằng tài khoản Claude của chính họ.

---

## A. Việc của mình, làm một lần

| # | Việc | Cách làm |
|---|---|---|
| A1 | Bật repo mẫu | `velis-editor-xuan` → **Settings → General** → tick **Template repository**. Kiểm repo đang **Private** |
| A2 | Kiểm quyền tài nguyên | Đọc `docs/SOURCES.md`. Gói có kho SFX đã mua và thẻ chuyển động video-talkcraft (phi thương mại). Chắc giấy phép cho phép đưa cho người khác trước khi mời ai |
| A3 | Thử một lượt như người mới | Đã làm (repo thử tạo từ mẫu, chạy được trên cloud) |

---

## B. Mỗi lần giao cho một người

| Bước | Mình làm | Người mới làm (`HUONG-DAN.md`) |
|---|---|---|
| **0** | Gửi người mới link tới `HUONG-DAN.md` (xem mục D) hoặc chép nội dung bước 1–5 cho họ | |
| **1** | Chờ | Có tài khoản Claude **Pro/Max** và GitHub. **Gửi mình tên GitHub** |
| **2a** | Repo mẫu → **Settings → Collaborators → Add people** → nhập tên GitHub của họ → quyền **Read** → gửi lời mời | |
| **2b** | Chờ | Chấp nhận lời mời → **Use this template → Create a new repository** → tài khoản của họ, **Private** → báo mình đã tạo xong |
| **2c** | Repo mẫu → **Settings → Collaborators** → **Remove** người đó. Repo của họ vẫn còn nguyên | |
| **3** | | Vào claude.ai/code, kết nối GitHub, cài **Claude GitHub App** cho repo của họ |
| **4** | | Tạo môi trường: Network **Full**, dán nguyên **setup script** (không sửa chữ nào) |
| **5** | | Mở phiên trên repo của họ, dán câu kiểm đầu tiên. Xong khi example render được và có file video gửi về |
| **6** | | Làm video đầu tiên: clip lên Google Drive, gửi link, góp ý, duyệt |
| **7** | | Dạy luật, kỹ năng mới trong repo của họ. Không ảnh hưởng gì tới mình |

Chỉ cho quyền **Read**, không cho Write, Maintain hay Admin. Đừng quên bước 2c: người còn trong danh sách Collaborators sẽ thấy mọi bản cập nhật sau của repo mẫu.

---

## C. Khi người mới hỏi, mình hỗ trợ thế nào

Repo của họ là private của họ, mình **không xem được**. Muốn mình xem thì họ chụp màn hình, hoặc tạm mời mình vào repo của họ (**Settings → Collaborators**, quyền Read).

| Họ báo | Trả lời |
|---|---|
| Không thấy nút Use this template | Chưa chấp nhận lời mời, hoặc A1 chưa bật Template repository |
| Không thấy repo của mình khi tạo phiên | Chưa cài Claude GitHub App cho repo đó (bước 3) |
| "Script cài đặt thất bại" đầu phiên | Họ chép thiếu hoặc sửa setup script. Dán lại nguyên đoạn ở bước 4, mở phiên mới |
| Không tải được model, clip | Network chưa để **Full** |
| Link Drive tải về file HTML | Chưa để "Bất kỳ ai có đường liên kết" |
| Mất file video | Máy ảo đã bị xóa. Lần sau tải về ngay khi Claude gửi |
| Muốn bản mới có luật mình vừa thêm | Họ đã tách riêng, không tự nhận được. Hoặc họ tự dạy Claude luật đó, hoặc làm lại bước 2 thành một repo mới (mất những gì họ đã dạy) |

---

## D. Gửi hướng dẫn cho người mới

Người mới chưa có repo thì chưa đọc được `HUONG-DAN.md` trong đó. Gửi trước cho họ một trong hai:
- Đoạn tin nhắn ngắn dưới đây, rồi để họ đọc `HUONG-DAN.md` sau khi tạo repo (bước 2).
- Hoặc file `HUONG-DAN.md` (tải từ repo mẫu: mở file → nút **Download raw file**).

```
Chào anh/chị, để dùng bộ dựng video BĐS:
1. Cần tài khoản Claude gói Pro hoặc Max (claude.ai) và tài khoản GitHub (github.com/signup).
2. Gửi em tên người dùng GitHub. Em sẽ mời vào repo mẫu.
3. Nhận email mời → Accept → bấm "Use this template" → "Create a new repository", chọn Private, đặt tên tùy ý.
4. Báo em là xong. Từ đó mở file HUONG-DAN.md trong repo của anh/chị và làm tiếp từ bước 3.
```

---

## E. Cập nhật repo mẫu

Khi velis-editor có luật hay công cụ mới muốn người mới **sau này** được hưởng.

1. Có khách hay dự án mới kể từ lần trước: thêm tên người, tên dự án, slug vào `phat-hanh/an-danh.json` (các mảng `thay`, `cam`, `dong_4c`). Bỏ qua bước này thì script vẫn chặn được tên đã có trong `cam`, nhưng tên mới thì không.
2. Mở phiên claude.ai/code trên velis-editor và nói:
   ```
   Chạy node phat-hanh/goi-sach.mjs. Nếu sạch, cập nhật repo esvinlyvn/velis-editor-xuan: thay toàn bộ nội dung nhánh main
   bằng thư mục build/goi-sach/bds-editor (giữ lịch sử của repo mẫu, không mang lịch sử velis-editor), commit và push.
   ```
3. Script báo "Còn N chỗ sót" thì chưa cập nhật gì. Đọc danh sách sót, thêm cặp thay vào `an-danh.json`, chạy lại.

Người đã tạo repo từ bản cũ không bị ảnh hưởng. Chi tiết gói sạch bỏ và sửa những gì: `phat-hanh/README.md`.
