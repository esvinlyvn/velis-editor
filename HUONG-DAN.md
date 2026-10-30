# Hướng dẫn cho người mới: từ con số 0 tới video đầu tiên

Bộ công cụ này nhận **clip quay thật về bất động sản** (người nói trước máy, cảnh quay dự án) và dựng thành video dọc 1080×1920: cắt nhịp, chữ chốt, minh họa, bản đồ, SFX, màu. Người làm chính là **Claude Code**. Anh/chị gửi clip, nói muốn gì, duyệt bản xem trước và góp ý. Claude ghi lại những gì anh/chị dạy vào repo, nên video sau làm đúng ý hơn video trước.

Sau khi làm theo hướng dẫn này, anh/chị có **một repo riêng của mình**, tự chứa đủ mọi thứ. Repo đó tự học, tự lưu luật, không nối với repo gốc mà anh/chị đã sao ra. Luật anh/chị dạy chỉ nằm trong repo của anh/chị.

Đọc lần lượt từ trên xuống. Mỗi bước có phần **Kiểm** để biết đã xong.

---

## Mục lục

1. [Cần chuẩn bị gì](#1-cần-chuẩn-bị-gì)
2. [Tạo tài khoản GitHub và repo riêng](#2-tạo-tài-khoản-github-và-repo-riêng)
3. [Cài công cụ trên máy](#3-cài-công-cụ-trên-máy)
4. [Lấy bộ công cụ về và biến thành repo của mình](#4-lấy-bộ-công-cụ-về-và-biến-thành-repo-của-mình)
5. [Cài thư viện và dựng thử](#5-cài-thư-viện-và-dựng-thử)
6. [Làm video đầu tiên](#6-làm-video-đầu-tiên)
7. [Dạy luật mới, kỹ năng mới](#7-dạy-luật-mới-kỹ-năng-mới)
8. [Thói quen hằng ngày với Git](#8-thói-quen-hằng-ngày-với-git)
9. [Lỗi hay gặp](#9-lỗi-hay-gặp)
10. [Quyền sử dụng tài nguyên](#10-quyền-sử-dụng-tài-nguyên)
11. [Bảng lệnh nhanh](#11-bảng-lệnh-nhanh)

---

## 1. Cần chuẩn bị gì

| Thứ | Yêu cầu | Ghi chú |
|---|---|---|
| Máy tính | macOS, Linux, hoặc Windows 10/11 có **WSL2** | Windows phải dùng WSL2 (mục 3c): các lệnh trong repo viết cho bash |
| RAM | tối thiểu 8 GB, nên 16 GB | nhận diện giọng nói và render ăn nhiều RAM |
| Ổ trống | khoảng 15 GB | model nhận diện giọng ~3 GB, thư viện ~1 GB, clip và bản render |
| Mạng | cần lúc cài đặt | sau khi cài xong, việc dựng chạy hoàn toàn trên máy |
| Tài khoản Claude | gói **Pro** hoặc **Max** ở [claude.ai](https://claude.ai) | Claude Code dùng tài khoản này. Gói Max làm được nhiều video hơn mỗi ngày |
| Tài khoản GitHub | miễn phí | để lưu repo riêng, có lịch sử, không mất khi hỏng máy |
| Bộ công cụ gốc | file `.zip` hoặc quyền đọc repo, do người giao gửi | xem mục 4 |

**Thời gian:** cài đặt lần đầu khoảng 1–2 giờ (phần lớn là chờ tải). Một video 60–90 giây mất khoảng 40–60 phút, trong đó render khoảng 10 phút.

---

## 2. Tạo tài khoản GitHub và repo riêng

GitHub là nơi cất repo trên mạng. Repo là thư mục dự án có lưu lịch sử mọi lần sửa.

### 2a. Tạo tài khoản

1. Vào [github.com/signup](https://github.com/signup), nhập email, mật khẩu, tên người dùng (ví dụ `nguyenvana`). Tên này sẽ nằm trong đường dẫn repo.
2. Xác nhận email.
3. **Bật xác thực 2 lớp:** ảnh đại diện → **Settings** → **Password and authentication** → **Enable two-factor authentication**. Dùng app như Google Authenticator. Lưu mã khôi phục ở chỗ an toàn.

### 2b. Tạo repo trống, để riêng tư

1. Bấm dấu **+** góc trên phải → **New repository**.
2. **Repository name:** đặt tên tùy ý, ví dụ `bds-editor`.
3. Chọn **Private**. Repo sẽ chứa cấu hình khách và lời thoại, không nên để công khai.
4. **Không** tick "Add a README", "Add .gitignore" hay "license". Repo phải trống hoàn toàn để bước 4 đẩy lên được.
5. Bấm **Create repository**. Chép đường dẫn dạng `https://github.com/<ten-ban>/bds-editor.git`, lát nữa dùng.

> **Vì sao không bấm Fork?** Fork giữ dây nối với repo gốc: GitHub hiện "forked from…", và repo fork của repo riêng tư không chuyển được thành độc lập. Làm theo mục 4 thì repo của anh/chị tách hẳn ra, lịch sử bắt đầu từ chính anh/chị.

**Kiểm:** trang repo mới hiện dòng "Quick setup" và đường dẫn `.git`.

---

## 3. Cài công cụ trên máy

Cần 5 thứ: **Git**, **Node.js 22+**, **FFmpeg**, **Python 3**, **Claude Code**. Làm theo phần đúng hệ điều hành, rồi qua 3d.

Mọi lệnh gõ trong **Terminal**: macOS mở app Terminal; Windows mở "Ubuntu" sau khi cài WSL; Linux mở Terminal.

### 3a. macOS

1. Cài Homebrew (trình cài phần mềm), dán vào Terminal rồi làm theo chỉ dẫn trên màn hình:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
2. Cài các công cụ:
   ```bash
   brew install git node@22 ffmpeg python uv
   ```
3. Nếu `node -v` chưa ra 22, làm theo dòng `echo 'export PATH=…node@22…'` mà brew in ra, rồi mở Terminal mới.

### 3b. Linux (Ubuntu / Debian)

```bash
sudo apt update && sudo apt install -y git ffmpeg python3 python3-venv curl build-essential
```

Node.js 22 cài qua nvm:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

Đóng Terminal, mở lại, rồi:

```bash
nvm install 22
```

uv (trình cài Python nhanh):

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### 3c. Windows: cài WSL2 rồi làm như Linux

1. Mở **PowerShell** bằng quyền Administrator (chuột phải nút Start → Terminal (Admin)), gõ:
   ```powershell
   wsl --install -d Ubuntu
   ```
2. Khởi động lại máy. Mở app **Ubuntu**, đặt tên người dùng và mật khẩu cho Linux.
3. Từ đây làm **y hệt mục 3b** trong cửa sổ Ubuntu.
4. Để repo trong ổ Linux (thư mục `~`), **không** để trong `C:\` (`/mnt/c/...`): chạy chậm hơn nhiều.
5. Mở thư mục Linux từ Windows Explorer: gõ `\\wsl$\Ubuntu\home\<ten>` vào thanh địa chỉ. Dùng cách này để chép clip vào.

### 3d. Claude Code (mọi hệ điều hành, trong Terminal / Ubuntu)

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Mở Terminal mới, gõ `claude`. Lần đầu nó mở trình duyệt để đăng nhập tài khoản Claude. Đăng nhập xong gõ `/exit` để thoát.

### 3e. Cho Git biết anh/chị là ai

```bash
git config --global user.name "Nguyễn Văn A"
```

```bash
git config --global user.email "email-dang-ky-github@example.com"
```

### 3f. Cho máy quyền đẩy lên GitHub

Cách dễ nhất là GitHub CLI:
- macOS: `brew install gh`
- Ubuntu / WSL: `sudo apt install -y gh` (nếu báo không có gói, xem [cli.github.com](https://cli.github.com))

Rồi đăng nhập, chọn **GitHub.com → HTTPS → Login with a web browser**:

```bash
gh auth login
```

```bash
gh auth setup-git
```

**Kiểm:** mỗi lệnh dưới in ra số phiên bản, không báo lỗi. `node -v` phải ≥ 22.

```bash
git --version && node -v && ffmpeg -version | head -1 && python3 --version && claude --version && gh auth status
```

---

## 4. Lấy bộ công cụ về và biến thành repo của mình

### 4a. Lấy bản sao

Chọn **một** trong hai cách, tùy người giao gửi gì.

**Cách 1: được gửi file `.zip`**

```bash
mkdir -p ~/bds-editor && cd ~/bds-editor && unzip ~/Downloads/ten-file.zip
```

(Windows/WSL: chép file zip vào `\\wsl$\Ubuntu\home\<ten>\` trước, rồi đổi `~/Downloads/ten-file.zip` thành `~/ten-file.zip`.)

Nếu giải nén ra thêm một thư mục con bọc ngoài, `cd` vào thư mục con đó. Thư mục đúng là chỗ thấy các file `CLAUDE.md`, `package.json`, `HUONG-DAN.md`.

**Cách 2: được cho quyền đọc repo gốc**

```bash
git clone --depth 1 <duong-dan-repo-goc> ~/bds-editor && cd ~/bds-editor && rm -rf .git
```

`rm -rf .git` xóa lịch sử và dây nối với repo gốc. Từ đây thư mục chỉ còn là file thường.

### 4b. Tạo lịch sử riêng và đẩy lên repo của mình

Đứng trong thư mục `~/bds-editor`, thay đường dẫn bằng repo đã tạo ở mục 2b:

```bash
git init -b main && git add -A && git commit -m "Khởi tạo bộ dựng video BĐS"
```

```bash
git remote add origin https://github.com/<ten-ban>/bds-editor.git && git push -u origin main
```

**Kiểm:** tải lại trang repo trên GitHub, thấy các file. `git remote -v` chỉ có `origin` trỏ về repo của anh/chị.

### 4c. Làm sạch: bỏ dấu vết của repo gốc

Bản sao còn chứa những thứ của người giao: tên repo cũ, dự án và cấu hình khách thật của họ, luật đồng bộ với repo khác của họ. Việc này giao cho Claude. Trong thư mục repo, gõ:

```bash
claude
```

Rồi dán nguyên đoạn dưới (sửa phần trong `< >`):

```
Đây là repo riêng của tôi, chép từ bộ công cụ của người khác. Hãy biến nó thành repo độc lập:
1. package.json: name = "<ten-repo>", repository/bugs/homepage trỏ về https://github.com/<ten-ban>/<ten-repo>.
2. Bỏ mọi luật và hướng dẫn đồng bộ với repo khác: mục "Lõi chung với repo edit-bds" trong docs/VAN-HANH.md,
   dòng "Lõi dựng ... commit core:" trong CLAUDE.md, và các chỗ nhắc edit-bds, Vis, velis-editor
   (đổi thành tên repo của tôi khi cần). Grep kiểm lại: grep -rniE "velis|edit-bds|vis giữ xe" --include=*.md --include=*.mjs --include=*.json .
3. Khách và dự án của người cũ: giữ projects/example và clients/_mau.
   Các projects/ khác: <GIỮ làm mẫu học / XÓA hết>. Nếu xóa thì sửa chỗ "Mẫu chép: projects/huy-tran-casa-villa/"
   trong CLAUDE.md, TALKING-HEAD.md và skill thành projects/example/.
   Xóa clients/<các khách cũ>, xóa các dòng ví dụ của khách cũ ở bảng 4c TALKING-HEAD, đặt text-presets/history.json về { "videos": [] }.
4. Giữ nguyên bảng "Luật người dùng đã chốt" trong TALKING-HEAD.md (đó là kinh nghiệm dùng được), nhưng cột Nguồn đổi thành "mặc định ban đầu".
5. Thêm vào CLAUDE.md: "Python chạy bằng ~/.asr/bin/python" (tôi sẽ cài ở bước sau).
6. Chạy npm install, npm run example, rồi commit "Làm sạch: repo riêng" và push.
Báo tôi những gì đã đổi.
```

> Gợi ý cho mục 3: **giữ** các dự án cũ nếu người giao đồng ý. Đó là mẫu thật để Claude bắt chước (cách cắt, cách đặt chữ, SHOTBOOK). Không công khai repo khi còn dữ liệu khách của người khác.

**Kiểm:** lệnh grep ở bước 2 không còn ra gì ngoài phần lịch sử. Trang GitHub có commit "Làm sạch: repo riêng".

---

## 5. Cài thư viện và dựng thử

Trong thư mục repo:

```bash
npm install
```

```bash
npx hyperframes doctor
```

`doctor` kiểm Chrome, FFmpeg, Node. Báo thiếu Chrome thì chạy `npx hyperframes browser` theo hướng dẫn nó in ra.

Trình duyệt cho script kiểm chữ (`kt-check`):

```bash
npx playwright install --with-deps chromium
```

Môi trường Python cho nhận diện giọng nói và các script kiểm (cài một lần, nằm ngoài repo, ở `~/.asr`):

```bash
uv venv ~/.asr && VIRTUAL_ENV=~/.asr uv pip install faster-whisper numpy imageio pillow
```

Muốn dùng hiệu ứng "chữ nằm sau người" thì cài thêm:

```bash
VIRTUAL_ENV=~/.asr uv pip install "rembg[cpu]" opencv-python-headless
```

Dựng thử video mẫu:

```bash
npm run example
```

**Kiểm:** có file `build/example/output.mp4` dài khoảng 9–10 giây, mở xem được. Lần nhận diện giọng đầu tiên sẽ tải model khoảng 3 GB, đó là chuyện bình thường.

---

## 6. Làm video đầu tiên

### 6a. Chuẩn bị clip

1. Tạo thư mục chứa clip thô, ví dụ `work/anh-tuan-sunrise/`. Thư mục `work/` **không** được đưa lên GitHub (đã nằm trong `.gitignore`), clip nặng để trên máy.
2. Chép clip `.mp4` / `.mov` vào đó. Nhiều clip thì đặt tên theo thứ tự: `01.mp4`, `02.mp4`…
3. Có tài liệu dự án (bảng giá, vị trí, tiện ích, logo) thì chép kèm. Claude chỉ đưa lên video số liệu **có trong lời nói hoặc trong tài liệu này**, không tự bịa.

### 6b. Giao việc cho Claude

```bash
claude
```

Nói tự nhiên, càng rõ càng ít bị hỏi lại. Ví dụ:

```
Edit video cho anh Tuấn, dự án Sunrise Riverside. Clip ở work/anh-tuan-sunrise/.
Khách mới: màu nhấn xanh ngọc #19C3B1, CTA "Nhắn anh Tuấn để nhận bảng giá".
Tài liệu dự án ở work/anh-tuan-sunrise/info/. Đăng TikTok.
```

Những gì Claude cần biết (thiếu thì nó hỏi **một lần**):
- **Khách là ai:** mỗi khách có cấu hình riêng ở `clients/<khach>/brand.json` (màu, LUT, CTA, logo, lịch sử phong cách). Khách mới thì Claude tạo từ `clients/_mau/`.
- **CTA cuối video:** câu kêu gọi, ví dụ "Nhắn tin để nhận bảng giá".
- **Clip:** đường dẫn.

### 6c. Claude sẽ làm gì

Không cần nhớ, chỉ để biết đang tới đâu:
1. Đọc luật (`docs/VAN-HANH.md`, bảng luật ở `TALKING-HEAD.md`, `docs/TRINH-BAY.md`).
2. Nhận diện lời nói, có giờ từng chữ.
3. Soi clip, cắt chỗ im, chỗ vấp, câu hỏng.
4. Chọn hook 3 giây đầu.
5. Viết `SHOTBOOK.md`: kế hoạch từng đoạn gồm chữ chốt, minh họa, bản đồ, SFX.
6. Dựng chữ, minh họa, SFX, chỉnh màu.
7. Tự kiểm: lint, `kt-check`, chụp khung hình, rồi **render một lần**.
8. Gửi bản xem trước kèm danh sách khối chữ.

Thời gian: khoảng 40–60 phút. Anh/chị không cần ngồi canh; Claude có hỏi thì Terminal sẽ dừng lại chờ.

> **Quyền chạy lệnh:** Claude Code xin phép trước khi chạy lệnh hay sửa file. Lần đầu sẽ hỏi nhiều. Đọc lướt rồi chọn "Yes, and don't ask again" cho các lệnh quen thuộc (`node`, `npx hyperframes`, `ffmpeg`, `git`) để đỡ bị hỏi.

### 6d. Xem, góp ý, duyệt

1. Mở bản xem trước trong `build/<video>/`.
2. Góp ý cụ thể, có giây và có lý do thì Claude làm đúng ngay:
   - "Giây 12 chữ che mặt anh Tuấn, dời lên trên."
   - "Chữ GIÁ 3 TỶ 2 màu vàng khó đọc trên nền trời, đổi màu hoặc thêm nền."
   - "Hook đầu chưa đủ gắt, thử câu 'Căn này rẻ hơn thị trường 400 triệu'."
3. Ưng rồi thì nói: **"Duyệt. Commit và push."** Claude sẽ:
   - commit dữ liệu dựng (không commit clip và file render);
   - ghi lịch sử phong cách vào `brand.json` của khách, để video sau của khách này tự đổi kiểu;
   - thêm một dòng vào bảng 4c của `TALKING-HEAD.md`;
   - push lên GitHub.
4. File gửi khách là `build/<video>/output.mp4`.

---

## 7. Dạy luật mới, kỹ năng mới

Mỗi lần mở, Claude Code không nhớ phiên trước. Nó chỉ biết **những gì ghi trong repo**. Vì vậy mọi điều anh/chị dạy phải được **ghi vào file rồi commit**, nếu không thì phiên sau quên.

### 7a. Bản đồ "dạy gì, ghi ở đâu"

| Muốn dạy | Ghi vào | Nói với Claude ví dụ |
|---|---|---|
| Luật chung cho mọi video ("chữ không bao giờ đè lên mặt", "không dùng màu đỏ") | bảng **Luật người dùng đã chốt** đầu `TALKING-HEAD.md` | "Chốt luật: …. Ghi vào bảng luật, nguồn là video này." |
| Điều riêng của một khách (màu, logo, CTA, khách ghét font nào) | `clients/<khach>/brand.json`, ô `ghi_chu` | "Ghi cho khách anh Tuấn: luôn để logo góc trên trái." |
| Cách trình bày, minh họa, hook | `docs/TRINH-BAY.md` | "Thêm vào TRINH-BAY: nói về tiện ích thì hiện icon + khoảng cách phút." |
| Cách vận hành, thứ tự bước, mặc định | `docs/VAN-HANH.md` | "Đổi mặc định: video không quá 75 giây." |
| Kiểu chữ mới | `text-presets/` | "Tạo preset chữ mới tên 'gia-soc' giống mẫu này: …" (gửi ảnh hoặc video) |
| Tiếng SFX mới | `sfx/` qua `scripts/sfx-import.mjs` | "Nhập các file trong ~/Downloads/sfx-moi vào kho SFX." |
| Màu phim (LUT) | `luts/*.cube`, nguồn ghi ở `luts/SOURCES.md` | "Thêm LUT luts/am-ap.cube, cường độ 0,6, làm mặc định cho khách anh Tuấn." |
| Một quy trình hoàn toàn mới (làm video tin tức, video so sánh dự án…) | một **skill** mới ở `.claude/skills/<ten>/SKILL.md` | xem 7c |

### 7b. Câu lệnh mẫu để dạy luật

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

### 7c. Dạy một kỹ năng mới (skill)

Skill là một bản hướng dẫn mà Claude tự mở khi gặp đúng loại việc. Repo đã có sẵn skill `.claude/skills/velis-editor/SKILL.md` cho việc dựng clip BĐS; mở ra xem để biết một skill trông thế nào.

Cách tạo nhanh nhất là nói với Claude:

```
Tạo skill mới tên "video-so-sanh": khi tôi gửi 2 dự án và nói "so sánh", dựng video chia đôi màn hình,
mỗi bên một dự án, có bảng so sánh giá / vị trí / pháp lý ở giữa video, kết bằng CTA của khách.
Dùng lại luật chữ, SFX, kiểm như video thường. Ghi vào .claude/skills/video-so-sanh/SKILL.md, commit và push.
```

Tự viết tay cũng được. Một skill gồm:

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

Phần `description` quyết định **khi nào** Claude dùng skill, nên ghi rõ những câu anh/chị hay nói. Muốn gọi thẳng thì gõ `/video-so-sanh` trong Claude Code.

### 7d. Học từ video mẫu

Thấy video của người khác đẹp, muốn học kiểu trình bày:

```
Đây là video tham khảo: work/mau/video-hay.mp4. Phân tích cách họ làm hook, cách đặt chữ, nhịp cắt,
chuyển cảnh. Cái gì hợp với luật hiện có thì ghi vào docs/TRINH-BAY.md thành mục "Học từ <tên>".
Cái gì trái luật thì liệt kê cho tôi quyết. Không copy nguyên thiết kế của họ.
```

### 7e. Kiểm xem đã "học" chưa

Sau khi dạy, hỏi:

```
Luật về số tiền hiện ghi ở đâu? Đọc lại cho tôi.
```

Rồi xem trên GitHub: commit mới phải có thay đổi đúng file đó. Không có commit nghĩa là chưa lưu.

---

## 8. Thói quen hằng ngày với Git

Không cần học Git sâu, Claude làm hộ. Chỉ cần nhớ 3 điều:

1. **Đầu buổi:** `git pull` để lấy bản mới nhất (nhất là khi dùng nhiều máy).
2. **Cuối mỗi video hay mỗi lần dạy luật:** bảo Claude "commit và push".
3. **Không đưa lên GitHub:** clip thô, file render, khóa API, mật khẩu. `.gitignore` đã chặn `work/`, `build/`, `.env`, `.secrets/`. Thấy Claude định commit file `.mp4` thì dừng nó lại.

Làm trên máy khác: cài như mục 3 và 5, rồi:

```bash
git clone https://github.com/<ten-ban>/bds-editor.git ~/bds-editor && cd ~/bds-editor && npm install
```

Muốn quay lại bản trước khi lỡ dạy sai: "Hoàn tác commit dạy luật vừa rồi" (Claude dùng `git revert`, không mất lịch sử).

---

## 9. Lỗi hay gặp

| Triệu chứng | Cách xử lý |
|---|---|
| `node: command not found` hoặc `node -v` dưới 22 | Mở Terminal mới. Ubuntu/WSL: `nvm install 22 && nvm alias default 22` |
| `git push` hỏi mật khẩu rồi báo lỗi | GitHub không nhận mật khẩu nữa. Chạy `gh auth login` rồi `gh auth setup-git` (mục 3f) |
| `git push` báo `rejected … fetch first` | Có bản mới hơn trên GitHub: `git pull --rebase` rồi push lại |
| `npm run example` báo thiếu Chrome | `npx hyperframes browser`, rồi `npx hyperframes doctor` |
| `kt-check` báo `Executable doesn't exist` | `npx playwright install --with-deps chromium` |
| Nhận diện giọng báo `No module named faster_whisper` | Chạy bằng `~/.asr/bin/python`, không phải `python3`. Chưa cài thì xem mục 5 |
| Nhận diện giọng rất chậm | Bình thường: clip 90 giây mất 3–5 phút trên máy 4 nhân. Đóng bớt app |
| Render báo hết bộ nhớ | Đóng trình duyệt và app nặng. Máy 8 GB thì dựng clip dưới 60 giây |
| Windows: mọi thứ chạy rất chậm | Repo đang nằm ở `/mnt/c/...`. Chuyển vào `~` trong Ubuntu (mục 3c) |
| Chữ tiếng Việt mất dấu, dấu bị cắt | Nói với Claude: "giây X mất dấu chữ Y". Đây là lỗi kiểm có sẵn trong quy trình |
| Claude làm sai một điều đã dặn hôm trước | Điều đó chưa được ghi vào repo. Dạy lại và bảo ghi vào bảng luật (mục 7) |
| Claude Code báo hết lượt dùng | Gói Pro có giới hạn theo giờ. Chờ, hoặc nâng lên Max |

Bí quá thì mở `claude` và tả lỗi kèm nguyên văn thông báo. Claude đọc được lỗi và sửa môi trường hộ.

---

## 10. Quyền sử dụng tài nguyên

Đọc `docs/SOURCES.md` **trước khi làm video cho khách trả tiền**. Một số tài nguyên trong bộ có điều kiện:

- **Thẻ chuyển động và vài script kiểm** lấy từ video-talkcraft, giấy phép **phi thương mại**. Muốn dùng cho video thương mại phải có thư cho phép của tác giả, hoặc không dùng phần đó.
- **Kho SFX** do người giao mua. Hỏi người giao xem giấy phép có cho người khác dùng tiếp không. Nếu không, tự mua gói SFX của mình rồi nhập bằng `node scripts/sfx-import.mjs <thu-muc>`.
- **Font** `@fontsource` (giấy phép OFL): dùng tự do.
- **LUT, nhạc nền, logo** tự thêm: chỉ dùng thứ có quyền, ghi nguồn vào `luts/SOURCES.md` hoặc `docs/SOURCES.md`.

---

## 11. Bảng lệnh nhanh

| Việc | Lệnh |
|---|---|
| Mở Claude trong repo | `cd ~/bds-editor && claude` |
| Lấy bản mới nhất | `git pull` |
| Dựng thử mẫu | `npm run example` |
| Dựng một video, không render | `node projects/<video>/build.mjs --no-render` |
| Dựng và render | `node projects/<video>/build.mjs` |
| Kiểm lỗi template | `cd build/<video> && npx hyperframes lint` |
| Kiểm chữ chốt | `node scripts/qa/kt-check.cjs build/<video>/index.html <composition-id>` |
| Nhận diện giọng | `~/.asr/bin/python -I scripts/asr/transcribe.py clip.mp4 work/asr.json "Tên riêng, địa danh"` |
| Kiểm hình đứng im | `~/.asr/bin/python scripts/qa/motion_check.py build/<video>/output.mp4` |
| Kiểm môi trường | `npx hyperframes doctor` |

Phần lớn thời gian không cần gõ các lệnh này: nói với Claude là đủ. Bảng để tra khi muốn tự làm hoặc khi cần kiểm Claude.

---

## Đọc thêm khi đã quen

| File | Nội dung |
|---|---|
| `docs/VAN-HANH.md` | quy tắc vận hành, thứ tự ưu tiên, mâu thuẫn đã gỡ |
| `TALKING-HEAD.md` | bảng luật đã chốt, quy trình 40–60 phút, các bẫy kỹ thuật |
| `docs/TRINH-BAY.md` | hook 3 giây, minh họa "nói gì vẽ nấy", bố cục đồ họa |
| `TOOLKIT.md` | công cụ dựng, template, âm thanh |
| `MAP.md` | dựng bản đồ |
| `text-presets/QUY-TAC-CHU.md` | chọn kiểu chữ theo vai |
