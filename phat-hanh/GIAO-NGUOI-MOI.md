# Giao bộ công cụ cho người mới: ai làm gì

File này chỉ có ở velis-editor, không đi theo gói. Người mới đọc `HUONG-DAN.md` trong repo của họ; số bước dưới đây khớp với số bước trong file đó.

- **Repo mẫu:** `esvinlyvn/velis-editor-master` (private, bật Template repository). Chỉ chứa gói sạch: không dữ liệu khách, không nối với velis-editor.
- **Người mới** tạo repo riêng từ repo mẫu, chạy trên cloud của Claude bằng tài khoản Claude của chính họ.

---

## A. Việc của mình, làm một lần

| # | Việc | Cách làm |
|---|---|---|
| A1 | Bật repo mẫu | `velis-editor-master` → **Settings → General** → tick **Template repository**. Kiểm repo đang **Private** |
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
| **4** | | Môi trường: chỉ chọn Network **Full** (repo tự cài mọi thứ khi mở phiên, không dán script) |
| **5** | | Làm video đầu tiên: clip lên Google Drive, gửi link, góp ý, duyệt (phiên đầu chờ vài phút để tự cài) |
| **6** | | Dạy luật, kỹ năng mới trong repo của họ. Không ảnh hưởng gì tới mình |

Chỉ cho quyền **Read**, không cho Write, Maintain hay Admin. Đừng quên bước 2c: người còn trong danh sách Collaborators sẽ thấy mọi bản cập nhật sau của repo mẫu.

---

## C. Khi người mới hỏi, mình hỗ trợ thế nào

Repo của họ là private của họ, mình **không xem được**. Muốn mình xem thì họ chụp màn hình, hoặc tạm mời mình vào repo của họ (**Settings → Collaborators**, quyền Read).

| Họ báo | Trả lời |
|---|---|
| Không thấy nút Use this template | Chưa chấp nhận lời mời, hoặc A1 chưa bật Template repository |
| Không thấy repo của mình khi tạo phiên | Chưa cài Claude GitHub App cho repo đó (bước 3) |
| Hook cài đặt báo lỗi đầu phiên | Network chưa để **Full** (bước 4). Sửa rồi mở phiên mới |
| Không tải được model, clip | Network chưa để **Full** |
| Link Drive tải về file HTML | Chưa để "Bất kỳ ai có đường liên kết" |
| Mất file video | Máy ảo đã bị xóa. Lần sau tải về ngay khi Claude gửi |
| Muốn bản mới có luật mình vừa thêm | Mình cập nhật master trước (mục E), rồi làm mục F: mời lại quyền Read, họ làm bước 8 của `HUONG-DAN.md` (gộp bản mới, giữ luật và video riêng của họ), xong thì gỡ quyền |

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

## E. Cập nhật repo mẫu (velis-editor → velis-editor-master)

Ba tầng (luật 24 `TALKING-HEAD.md`): **velis-editor** brief, học, thử nghiệm → chốt quy tắc / kỹ năng → đẩy lên **velis-editor-master** (bản mẫu chuẩn) → các **repo con** tạo và cập nhật từ master.

1. Có khách hay dự án mới kể từ lần trước: thêm tên người, tên dự án, slug vào `phat-hanh/an-danh.json` (`thay`, `cam`, `dong_4c`). Bỏ qua thì script vẫn chặn tên đã có trong `cam` và mọi slug ngoài `projects/example` (`cam_regex`), nhưng tên mới viết thường trong câu thì không.
2. Mở phiên claude.ai/code trên velis-editor và nói:
   ```
   Cập nhật repo mẫu: node phat-hanh/cap-nhat-mau.mjs
   ```
   Script đóng gói sạch (`goi-sach.mjs`), so với master, commit **nối tiếp** lịch sử master rồi push. Muốn xem trước khác biệt: thêm `--thu`.
3. Gói báo "Còn N chỗ sót" thì master chưa bị đụng tới. Đọc danh sách, thêm cặp thay hoặc sửa tận nguồn ở velis-editor (ví dụ slug nháp trong chú thích code), chạy lại.

Không ghi đè lịch sử master (repo con gộp bản mới nhờ lịch sử nối tiếp). `--lam-moi` (xoá lịch sử, một commit mới) chỉ dùng khi lịch sử cũ đã lọt thứ không được có, và trước khi có repo con nào gộp từ master.

## F. Cập nhật một repo con từ master

Repo con là repo riêng của người khác (tạo từ master bằng "Use this template"), mình không push vào được. Khi master có bản mới:

1. Master → **Settings → Collaborators** → mời lại người đó, quyền **Read** (như B 2a).
2. Người đó mở phiên trên repo của họ và dán câu ở `HUONG-DAN.md` **bước 7** (Claude gộp bản mới, giữ luật và dự án riêng của họ, chạy kiểm rồi push).
3. Họ báo xong thì **Remove** người đó khỏi Collaborators (như B 2c).

Luật / kỹ năng người con tự dạy chỉ ở repo của họ. Muốn đưa lên master cho mọi người: họ gửi nội dung luật, mình dạy lại ở velis-editor (thử, chốt) rồi làm mục E.

Chi tiết gói sạch bỏ và sửa những gì: `phat-hanh/README.md`.
