# Hướng dẫn cho người mới: từ con số 0 tới video đầu tiên

Bộ công cụ này nhận **clip quay thật về bất động sản** (người nói trước máy, cảnh quay dự án) và dựng thành video dọc 1080×1920: cắt nhịp, chữ chốt, minh họa, bản đồ, SFX, màu. Người làm chính là **Claude Code**. Anh/chị gửi clip, nói muốn gì, duyệt bản xem trước và góp ý. Claude ghi lại những gì anh/chị dạy vào repo, nên video sau làm đúng ý hơn video trước.

Bộ công cụ được giao dưới dạng **gói sạch**: không có dữ liệu hay clip của khách nào, không nối với repo của người giao. Sau khi làm theo hướng dẫn, anh/chị có **một repo riêng**. Luật anh/chị dạy chỉ nằm trong repo đó.

Có hai nơi để chạy:
- **Cloud của Claude** (claude.ai/code): không cài gì lên máy, dùng được cả trên điện thoại. **Nên bắt đầu ở đây.**
- **Máy của mình:** nhanh hơn với clip dài, giữ clip trên máy. Làm khi đã quen.

Đọc lần lượt. Mỗi bước có phần **Kiểm** để biết đã xong.

---

## Mục lục

1. [Cần chuẩn bị gì](#1-cần-chuẩn-bị-gì)
2. [Tạo tài khoản GitHub](#2-tạo-tài-khoản-github)
3. [Đưa gói sạch vào repo riêng](#3-đưa-gói-sạch-vào-repo-riêng)
4. [Chạy trên cloud của Claude](#4-chạy-trên-cloud-của-claude)
5. [Làm video đầu tiên](#5-làm-video-đầu-tiên)
6. [Dạy luật mới, kỹ năng mới](#6-dạy-luật-mới-kỹ-năng-mới)
7. [Chạy trên máy của mình](#7-chạy-trên-máy-của-mình)
8. [Lỗi hay gặp](#8-lỗi-hay-gặp)
9. [Quyền sử dụng tài nguyên](#9-quyền-sử-dụng-tài-nguyên)
10. [Bảng lệnh nhanh](#10-bảng-lệnh-nhanh)

---

## 1. Cần chuẩn bị gì

| Thứ | Yêu cầu | Ghi chú |
|---|---|---|
| Tài khoản Claude | gói **Pro** hoặc **Max** ở [claude.ai](https://claude.ai) | Claude Code (cả cloud lẫn máy) dùng tài khoản này. Gói Max làm được nhiều video hơn mỗi ngày |
| Tài khoản GitHub | miễn phí | nơi cất repo riêng |
| Lời mời vào repo mẫu | người giao mời tài khoản GitHub của anh/chị | xem mục 3 |
| Nơi để clip | Google Drive hoặc Dropbox | khi chạy trên cloud, Claude tải clip từ link |
| Máy tính | chỉ cần trình duyệt nếu chạy cloud | chạy trên máy thì xem yêu cầu ở mục 7 |

**Thời gian:** thiết lập lần đầu khoảng 30 phút trên cloud. Một video 60–90 giây mất khoảng 40–60 phút, trong đó render khoảng 10 phút.

---

## 2. Tạo tài khoản GitHub

GitHub là nơi cất repo trên mạng. Repo là thư mục dự án có lưu lịch sử mọi lần sửa.

1. Vào [github.com/signup](https://github.com/signup), nhập email, mật khẩu, tên người dùng (ví dụ `nguyenvana`). Tên này sẽ nằm trong đường dẫn repo.
2. Xác nhận email.
3. **Bật xác thực 2 lớp:** ảnh đại diện → **Settings** → **Password and authentication** → **Enable two-factor authentication**. Dùng app như Google Authenticator. Lưu mã khôi phục ở chỗ an toàn.

**Kiểm:** đăng nhập GitHub được, có hỏi mã 2 lớp.

---

## 3. Đưa gói sạch vào repo riêng

Người giao giữ một **repo mẫu** chứa gói sạch. Anh/chị tạo repo riêng của mình từ repo mẫu đó.

1. Gửi tên tài khoản GitHub cho người giao. Người giao mời anh/chị vào repo mẫu.
2. Mở email từ GitHub (hoặc [github.com/notifications](https://github.com/notifications)) → **Accept invitation**.
3. Trong repo mẫu, bấm nút xanh **Use this template** → **Create a new repository**.
4. **Owner:** chọn tài khoản của anh/chị. **Repository name:** đặt tên, ví dụ `bds-editor`. Chọn **Private**. Để trống ô "Include all branches".
5. Bấm **Create repository**.
6. Báo người giao là đã tạo xong. Người giao sẽ gỡ anh/chị khỏi repo mẫu; repo của anh/chị không bị ảnh hưởng gì.

Repo vừa tạo thuộc hẳn về anh/chị: lịch sử bắt đầu từ chính anh/chị, không ghi "forked from", không nối với repo mẫu. Người giao không có quyền gì trên đó.

> **Đừng bấm Fork.** Fork giữ dây nối với repo mẫu, và bị xóa theo khi anh/chị mất quyền vào repo mẫu.

**Kiểm:** repo mới nằm dưới tên tài khoản của anh/chị, là **Private**, có các file `CLAUDE.md`, `HUONG-DAN.md`, `package.json`.

---

## 4. Chạy trên cloud của Claude

Cloud của Claude là một máy ảo dựng sẵn. Mỗi phiên làm việc lấy repo từ GitHub về, làm xong thì đẩy lên lại. **Máy ảo bị xóa sau khi phiên kết thúc**: thứ gì chưa push lên GitHub hoặc chưa tải về là mất.

### 4a. Cho Claude quyền vào repo

1. Vào [claude.ai/code](https://claude.ai/code), đăng nhập tài khoản Claude.
2. Làm theo hướng dẫn kết nối GitHub (hoặc vào [claude.ai/connect-github](https://claude.ai/connect-github)).
3. Khi GitHub hỏi cài **Claude GitHub App**, chọn **Only select repositories** rồi chọn đúng repo của anh/chị. Cài sau cũng được, ở [github.com/apps/claude](https://github.com/apps/claude) → **Configure**.

### 4b. Tạo môi trường (một lần)

Môi trường quyết định máy ảo được cài gì và được vào mạng nào.

1. Ở claude.ai/code, mở menu **môi trường cloud** (cạnh tên phiên, hoặc lúc chọn repo cho phiên mới) → tạo môi trường mới, hoặc chọn môi trường rồi bấm **Edit**.
2. Đặt tên, ví dụ `dung-video`.
3. **Network access** (quyền vào mạng): chọn **Full** cho đơn giản. Muốn chặt hơn thì chọn **Limited**, để nguyên ô **Allow package managers**, rồi thêm vào **Allowed domains**:
   ```
   huggingface.co
   *.hf.co
   astral.sh
   github.com
   objects.githubusercontent.com
   drive.google.com
   drive.usercontent.google.com
   *.dropboxusercontent.com
   ```
   (Hugging Face để tải model nhận diện giọng nói; Google Drive, Dropbox để tải clip.)
4. **Setup script** (chạy mỗi khi mở phiên mới): dán nguyên đoạn dưới, không cần sửa gì. Dòng cuối tự tìm thư mục repo, nên dùng được với mọi tên repo.
   ```bash
   #!/bin/bash
   set -e
   command -v ffmpeg >/dev/null || (apt-get update -qq && apt-get install -y -qq ffmpeg)
   command -v uv >/dev/null || curl -LsSf https://astral.sh/uv/install.sh | sh
   export PATH="$HOME/.local/bin:$PATH"
   uv venv -q ~/.asr
   VIRTUAL_ENV=~/.asr uv pip install -q faster-whisper numpy imageio pillow "rembg[cpu]" opencv-python-headless
   for d in */; do [ -f "$d/package.json" ] && (cd "$d" && npm ci --no-audit --no-fund); done; true
   ```
5. Lưu.

### 4c. Mở phiên

1. Ở claude.ai/code bấm tạo phiên mới, chọn **repo của anh/chị** và **môi trường `dung-video`**.
2. Chờ máy ảo khởi động và chạy setup script (vài phút lần đầu).

### 4d. Phiên đầu tiên: kiểm môi trường

Dán vào khung chat:

```
Đây là repo dựng video BĐS của tôi, lần đầu chạy trên cloud. Hãy:
1. Đọc CLAUDE.md và HUONG-DAN.md.
2. Chạy npm run example. Báo kết quả và gửi tôi file build/example/output.mp4.
3. Kiểm ~/.asr/bin/python import được faster_whisper, rembg.
4. Nếu thiếu gì, cài cho phiên này và nói tôi cần thêm dòng nào vào setup script.
```

**Kiểm:** Claude báo `npm run example` render được (video khoảng 9–10 giây) và gửi file vào khung chat.

> **Quyền chạy lệnh:** Claude có thể hỏi trước khi chạy lệnh hay sửa file. Đọc lướt rồi cho phép. Muốn ít bị hỏi, hỏi Claude "làm sao để bớt bị hỏi quyền?".

---

## 5. Làm video đầu tiên

### 5a. Đưa clip lên

1. Tải clip `.mp4` / `.mov` lên Google Drive (hoặc Dropbox). Nhiều clip thì bỏ chung một thư mục, đặt tên theo thứ tự: `01.mp4`, `02.mp4`…
2. Chuột phải → **Chia sẻ** → **Bất kỳ ai có đường liên kết** → **Người xem** → **Sao chép đường liên kết**.
3. Tài liệu dự án (bảng giá, vị trí, tiện ích, logo) để cùng thư mục. Claude chỉ đưa lên video số liệu **có trong lời nói hoặc trong tài liệu này**, không tự bịa.

> Clip của khách là dữ liệu riêng. Chỉ chia sẻ link trong lúc làm, xong thì tắt chia sẻ. Claude để clip trong `work/`, thư mục này **không bao giờ** được đưa lên GitHub.

### 5b. Giao việc

Mở phiên mới (mục 4c) và nói tự nhiên, càng rõ càng ít bị hỏi lại:

```
Edit video cho anh Tuấn, dự án Sunrise Riverside.
Clip: <link Google Drive>. Tài liệu dự án: <link>.
Khách mới: màu nhấn xanh ngọc #19C3B1, CTA "Nhắn anh Tuấn để nhận bảng giá". Đăng TikTok.
```

Những gì Claude cần biết (thiếu thì nó hỏi **một lần**):
- **Khách là ai:** mỗi khách có cấu hình riêng ở `clients/<khach>/brand.json` (màu, LUT, CTA, logo, lịch sử phong cách). Khách mới thì Claude tạo từ `clients/_mau/`.
- **CTA cuối video:** câu kêu gọi, ví dụ "Nhắn tin để nhận bảng giá".
- **Clip:** link.

### 5c. Claude sẽ làm gì

Không cần nhớ, chỉ để biết đang tới đâu:
1. Đọc luật (`docs/VAN-HANH.md`, bảng luật ở `TALKING-HEAD.md`, `docs/TRINH-BAY.md`).
2. Tải clip, nhận diện lời nói có giờ từng chữ. Lần đầu mỗi phiên phải tải model khoảng 3 GB, mất vài phút.
3. Soi clip, cắt chỗ im, chỗ vấp, câu hỏng.
4. Chọn hook 3 giây đầu.
5. Viết `SHOTBOOK.md`: kế hoạch từng đoạn gồm chữ chốt, minh họa, bản đồ, SFX.
6. Dựng chữ, minh họa, SFX, chỉnh màu.
7. Tự kiểm (lint, `kt-check`, chụp khung hình), rồi **render một lần**.
8. Gửi bản xem trước vào khung chat, kèm danh sách khối chữ.

Thời gian khoảng 40–60 phút. Không cần ngồi canh; đóng tab rồi quay lại sau cũng được, phiên vẫn chạy.

### 5d. Xem, góp ý, duyệt

1. Bấm vào thẻ file trong khung chat để xem hoặc tải bản xem trước.
2. Góp ý cụ thể, có giây và có lý do thì Claude làm đúng ngay:
   - "Giây 12 chữ che mặt anh Tuấn, dời lên trên."
   - "Chữ GIÁ 3 TỶ 2 màu vàng khó đọc trên nền trời, đổi màu hoặc thêm nền."
   - "Hook đầu chưa đủ gắt, thử câu 'Căn này rẻ hơn thị trường 400 triệu'."
3. Ưng rồi thì nói: **"Duyệt. Gửi bản cuối, rồi commit và push."** Claude sẽ:
   - gửi file MP4 bản cuối. **Tải về ngay**, vì máy ảo sẽ bị xóa;
   - commit dữ liệu dựng (không commit clip và file render);
   - ghi lịch sử phong cách vào `brand.json` của khách, để video sau của khách này tự đổi kiểu;
   - thêm một dòng vào bảng 4c của `TALKING-HEAD.md`;
   - push lên GitHub.

---

## 6. Dạy luật mới, kỹ năng mới

Mỗi phiên Claude bắt đầu trắng trơn. Nó chỉ biết **những gì ghi trong repo**. Vì vậy mọi điều anh/chị dạy phải được **ghi vào file, commit và push**, nếu không thì phiên sau quên.

### 6a. Dạy gì, ghi ở đâu

| Muốn dạy | Ghi vào | Nói với Claude ví dụ |
|---|---|---|
| Luật chung cho mọi video ("chữ không bao giờ đè lên mặt", "không dùng màu đỏ") | bảng **Luật người dùng đã chốt** đầu `TALKING-HEAD.md` | "Chốt luật: …. Ghi vào bảng luật, nguồn là video này." |
| Điều riêng của một khách (màu, logo, CTA, khách ghét font nào) | `clients/<khach>/brand.json`, ô `ghi_chu` | "Ghi cho khách anh Tuấn: luôn để logo góc trên trái." |
| Cách trình bày, minh họa, hook | `docs/TRINH-BAY.md` | "Thêm vào TRINH-BAY: nói về tiện ích thì hiện icon + khoảng cách phút." |
| Cách vận hành, thứ tự bước, mặc định | `docs/VAN-HANH.md` | "Đổi mặc định: video không quá 75 giây." |
| Kiểu chữ mới | `text-presets/` | "Tạo preset chữ mới tên 'gia-soc' giống mẫu này: …" (gửi ảnh hoặc link video) |
| Tiếng SFX mới | `sfx/` qua `scripts/sfx-import.mjs` | "Tải các file ở <link> rồi nhập vào kho SFX." |
| Màu phim (LUT) | `luts/*.cube`, nguồn ghi ở `luts/SOURCES.md` | "Thêm LUT ở <link> tên am-ap, cường độ 0,6, làm mặc định cho khách anh Tuấn." |
| Một quy trình hoàn toàn mới (video tin tức, video so sánh dự án…) | một **skill** mới ở `.claude/skills/<ten>/SKILL.md` | xem 6c |

### 6b. Câu mẫu để dạy luật

Nói ngay khi thấy, lúc góp ý video:

```
Từ giờ trở đi: số tiền luôn viết "3,2 tỷ" chứ không viết "3.200.000.000".
Chốt thành luật vào bảng của TALKING-HEAD.md, nguồn là video anh-tuan-sunrise. Commit và push.
```

Luật mới **trái** với luật cũ thì nói rõ để Claude sửa dòng cũ, không để hai dòng chọi nhau:

```
Bỏ luật 9 (không vạch gạch hai bên chữ dẫn). Giờ tôi muốn có vạch gạch mảnh. Sửa lại dòng đó.
```

Thứ tự ưu tiên khi hai chỗ nói khác nhau: **lời anh/chị trong phiên đang làm** > bảng luật `TALKING-HEAD.md` > `brand.json` của khách > `docs/VAN-HANH.md`, `docs/TRINH-BAY.md` > các tài liệu còn lại. Chi tiết ở `docs/VAN-HANH.md` mục 1.

### 6c. Dạy một kỹ năng mới (skill)

Skill là một bản hướng dẫn mà Claude tự mở khi gặp đúng loại việc. Repo có sẵn skill `.claude/skills/bds-editor/SKILL.md` cho việc dựng clip BĐS; mở ra xem để biết một skill trông thế nào.

Cách nhanh nhất là nói với Claude:

```
Tạo skill mới tên "video-so-sanh": khi tôi gửi 2 dự án và nói "so sánh", dựng video chia đôi màn hình,
mỗi bên một dự án, có bảng so sánh giá / vị trí / pháp lý ở giữa video, kết bằng CTA của khách.
Dùng lại luật chữ, SFX, kiểm như video thường. Ghi vào .claude/skills/video-so-sanh/SKILL.md, commit và push.
```

Tự viết tay cũng được (trên GitHub: **Add file → Create new file**, gõ tên `.claude/skills/video-so-sanh/SKILL.md`):

```markdown
---
name: video-so-sanh
description: Dựng video so sánh hai dự án BĐS ... Dùng khi người dùng nói "so sánh", "đặt cạnh nhau" ...
---

# video-so-sanh

1. Đọc luật: docs/VAN-HANH.md, bảng luật TALKING-HEAD.md.
2. ...các bước...

Không làm:
- ...
```

Phần `description` quyết định **khi nào** Claude dùng skill, nên ghi rõ những câu anh/chị hay nói. Muốn gọi thẳng thì gõ `/video-so-sanh`.

### 6d. Học từ video mẫu

```
Đây là video tham khảo: <link>. Phân tích cách họ làm hook, đặt chữ, nhịp cắt, chuyển cảnh.
Cái gì hợp với luật hiện có thì ghi vào docs/TRINH-BAY.md thành mục "Học từ <tên>".
Cái gì trái luật thì liệt kê cho tôi quyết. Không copy nguyên thiết kế của họ.
```

### 6e. Kiểm xem đã "học" chưa

Mở **phiên mới** và hỏi:

```
Luật về số tiền hiện ghi ở đâu? Đọc lại cho tôi.
```

Phiên mới trả lời đúng nghĩa là đã lưu. Trên GitHub, tab **Commits** phải có commit sửa đúng file đó.

### 6f. Lỡ dạy sai

"Hoàn tác commit dạy luật vừa rồi." Claude dùng `git revert`, không mất lịch sử.

---

## 7. Chạy trên máy của mình

Khi đã quen cloud, chạy trên máy giúp clip dài nhanh hơn và clip không phải lên mạng. Cùng một repo, cùng luật: làm ở đâu cũng được, miễn là **pull trước khi làm, push sau khi xong**.

### 7a. Yêu cầu

| Thứ | Yêu cầu |
|---|---|
| Hệ điều hành | macOS, Linux, hoặc Windows 10/11 có **WSL2** (các lệnh trong repo viết cho bash) |
| RAM | tối thiểu 8 GB, nên 16 GB |
| Ổ trống | khoảng 15 GB |

### 7b. Cài công cụ

Mọi lệnh gõ trong **Terminal** (macOS: app Terminal; Windows: app Ubuntu sau khi cài WSL).

**macOS:** cài Homebrew rồi các công cụ:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

```bash
brew install git node@22 ffmpeg python uv gh
```

Nếu `node -v` chưa ra 22, làm theo dòng `echo 'export PATH=…node@22…'` mà brew in ra rồi mở Terminal mới.

**Windows:** mở PowerShell quyền Administrator, chạy `wsl --install -d Ubuntu`, khởi động lại máy, mở app Ubuntu, rồi làm như Linux. Để repo trong `~` của Ubuntu, **không** để trong `/mnt/c/...` (chạy rất chậm). Mở thư mục Ubuntu từ Explorer: gõ `\\wsl$\Ubuntu\home\<ten>`.

**Linux (Ubuntu / Debian):**

```bash
sudo apt update && sudo apt install -y git ffmpeg python3 python3-venv curl build-essential gh
```

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

Đóng Terminal, mở lại:

```bash
nvm install 22 && curl -LsSf https://astral.sh/uv/install.sh | sh
```

**Claude Code** (mọi hệ điều hành):

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Mở Terminal mới, gõ `claude`, đăng nhập theo trình duyệt, rồi `/exit`.

**Git và GitHub:**

```bash
git config --global user.name "Nguyễn Văn A" && git config --global user.email "email-github@example.com"
```

```bash
gh auth login && gh auth setup-git
```

(Chọn **GitHub.com → HTTPS → Login with a web browser**.)

### 7c. Lấy repo về và cài thư viện

```bash
git clone https://github.com/<ten-ban>/bds-editor.git ~/bds-editor && cd ~/bds-editor && npm install
```

```bash
npx hyperframes doctor && npx playwright install --with-deps chromium
```

```bash
uv venv ~/.asr && VIRTUAL_ENV=~/.asr uv pip install faster-whisper numpy imageio pillow "rembg[cpu]" opencv-python-headless
```

```bash
npm run example
```

**Kiểm:** có `build/example/output.mp4` khoảng 9–10 giây.

### 7d. Làm việc trên máy

- Chép clip vào `work/<ten-video>/` (thư mục này không lên GitHub).
- `cd ~/bds-editor && git pull && claude`, rồi giao việc như mục 5b, thay link bằng đường dẫn `work/...`.
- Bản xem trước và bản cuối nằm ở `build/<video>/output.mp4`.
- Xong thì bảo Claude "commit và push", để phiên cloud lần sau cũng biết.

---

## 8. Lỗi hay gặp

| Triệu chứng | Cách xử lý |
|---|---|
| Cloud: Claude báo không thấy repo, không push được | Kiểm Claude GitHub App đã cài cho đúng repo chưa (mục 4a) |
| Cloud: setup script báo lỗi | Đọc dòng lỗi, sửa ở **Edit** môi trường → Setup script, rồi mở phiên mới |
| Cloud: không tải được clip hay model, báo bị chặn tên miền | Network access chưa cho tên miền đó: thêm vào Allowed domains, hoặc chọn Full (mục 4b) |
| Cloud: link Google Drive tải về file HTML nhỏ | Link chưa để "Bất kỳ ai có đường liên kết" (mục 5a) |
| Cloud: mất file render | Máy ảo đã bị xóa. Lần sau tải về ngay khi Claude gửi. Dữ liệu dựng đã push thì bảo Claude render lại |
| `node: command not found` hoặc `node -v` dưới 22 | Mở Terminal mới. Ubuntu/WSL: `nvm install 22 && nvm alias default 22` |
| `git push` hỏi mật khẩu rồi báo lỗi | GitHub không nhận mật khẩu nữa: `gh auth login` rồi `gh auth setup-git` |
| `git push` báo `rejected … fetch first` | Có bản mới hơn trên GitHub (thường do phiên cloud vừa push): `git pull --rebase` rồi push lại |
| `kt-check` báo `Executable doesn't exist` | Trên máy: `npx playwright install --with-deps chromium` |
| `No module named faster_whisper` | Chạy bằng `~/.asr/bin/python`, không phải `python3` |
| Nhận diện giọng rất chậm | Bình thường: clip 90 giây mất 3–5 phút trên 4 nhân |
| Chữ tiếng Việt mất dấu, dấu bị cắt | Nói với Claude: "giây X mất dấu chữ Y". Đây là lỗi có mục kiểm trong quy trình |
| Claude làm sai điều đã dặn hôm trước | Điều đó chưa được ghi vào repo. Dạy lại và bảo ghi vào bảng luật (mục 6) |
| Claude báo hết lượt dùng | Gói Pro có giới hạn theo giờ. Chờ, hoặc nâng lên Max |

Bí thì tả lỗi cho Claude, kèm nguyên văn thông báo. Claude đọc lỗi và tự sửa môi trường được, hoặc chỉ anh/chị chỗ cần bấm.

---

## 9. Quyền sử dụng tài nguyên

Đọc `docs/SOURCES.md` **trước khi làm video cho khách trả tiền**. Một số tài nguyên trong gói có điều kiện:

- **Thẻ chuyển động và vài script kiểm** lấy từ video-talkcraft, giấy phép **phi thương mại**. Dùng cho video thương mại thì phải có thư cho phép của tác giả, hoặc không dùng phần đó.
- **Kho SFX** do người giao mua. Hỏi người giao xem giấy phép có cho anh/chị dùng không. Nếu không, tự mua gói SFX rồi nhập bằng `node scripts/sfx-import.mjs <thu-muc>`.
- **Font** `@fontsource` (giấy phép OFL): dùng tự do.
- **LUT, nhạc nền, logo** tự thêm: chỉ dùng thứ có quyền, ghi nguồn vào `luts/SOURCES.md` hoặc `docs/SOURCES.md`.

---

## 10. Bảng lệnh nhanh

Phần lớn thời gian chỉ cần nói với Claude. Bảng này để tra khi muốn tự làm hoặc kiểm Claude.

| Việc | Lệnh |
|---|---|
| Dựng thử mẫu | `npm run example` |
| Dựng một video, không render | `node projects/<video>/build.mjs --no-render` |
| Dựng và render | `node projects/<video>/build.mjs` |
| Kiểm lỗi template | `cd build/<video> && npx hyperframes lint` |
| Kiểm chữ chốt | `node scripts/qa/kt-check.cjs build/<video>/index.html <composition-id>` |
| Nhận diện giọng | `~/.asr/bin/python -I scripts/asr/transcribe.py clip.mp4 work/asr.json "Tên riêng, địa danh"` |
| Kiểm hình đứng im | `~/.asr/bin/python scripts/qa/motion_check.py build/<video>/output.mp4` |
| Kiểm môi trường | `npx hyperframes doctor` |

## Đọc thêm khi đã quen

| File | Nội dung |
|---|---|
| `docs/VAN-HANH.md` | quy tắc vận hành, thứ tự ưu tiên, mâu thuẫn đã gỡ |
| `TALKING-HEAD.md` | bảng luật đã chốt, quy trình 40–60 phút, các bẫy kỹ thuật |
| `docs/TRINH-BAY.md` | hook 3 giây, minh họa "nói gì vẽ nấy", bố cục đồ họa |
| `TOOLKIT.md` | công cụ dựng, template, âm thanh |
| `MAP.md` | dựng bản đồ |
| `text-presets/QUY-TAC-CHU.md` | chọn kiểu chữ theo vai |
