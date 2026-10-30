# velis-editor: dựng video BĐS từ clip quay thật

Repo này chỉ làm một việc: nhận clip quay thật về bất động sản (người nói trước máy, quay dự án), dựng thành video dọc 1080×1920. Content tự động cho kênh Vis giữ xe nằm ở repo `edit-bds` (nhánh `claude/lucid-cray-hwgt06`), không làm ở đây.

Đọc theo thứ tự:
1. `docs/VAN-HANH.md`: quy tắc vận hành, thứ tự ưu tiên tài liệu, các mâu thuẫn đã gỡ.
2. `TALKING-HEAD.md`: bảng **luật người dùng đã chốt** (nơi duy nhất ghi luật mới) và quy trình 40–60 phút. Mẫu chép: `projects/huy-tran-casa-villa/`.
3. `docs/TRINH-BAY.md`: hook 3 giây, minh họa "nói gì vẽ nấy", bố cục đồ họa, các mục kiểm phần hình.
4. `TOOLKIT.md`, `MAP.md`, `docs/SHOTS.md`, `text-presets/QUY-TAC-CHU.md` khi tới bước tương ứng.

Luật nền:
- Mỗi video là một thư mục `projects/<khach>-<du-an>/`, chép từ `projects/example/`. Cấu hình riêng của khách nằm ở `clients/<khach>/brand.json`.
- Build: `node projects/<video>/build.mjs [--no-render]`. Kết quả ở `build/<video>/`. Render **một lần** ở cuối.
- Trước render: `npx hyperframes lint` 0 error, `kt-check` 100%, đã xem snapshot. Sau render: đo âm theo VAN-HANH mục 5, chạy `scripts/qa/motion_check.py` và các mục kiểm của TRINH-BAY mục 3.
- Mọi bước chạy trên máy, không gọi API ngoài, không commit khóa. Không commit clip thô và file render (`work/`, `build/`).
- Không dùng SFX scribble-2.
- Lõi dựng (`scripts/`, `sfx/`, `text-presets/`) có chung gốc với repo `edit-bds`. Sửa lõi thì commit riêng, message bắt đầu bằng `core:`, để repo kia lấy về được (`docs/VAN-HANH.md` mục 11).
- Người dùng chốt luật mới thì ghi vào bảng của `TALKING-HEAD.md` kèm nguồn.
