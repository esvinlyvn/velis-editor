# Casa Villa · Blanca City · Kim Thắm

Clip gốc của Kim Thắm (Google Drive, "Kim tham.mp4", 720×1280, 2:47) được giữ nguyên hình và tiếng. Phần phủ thêm là chữ chốt và SFX theo `TALKING-HEAD.md`. Không phụ đề. Kịch bản dựng: `SHOTBOOK.md`.

- `footage.mp4` và `voice.wav`: hình và tiếng gốc của clip (giọng có lẫn nhạc nền).
- `transcript.json`: faster-whisper large-v3 chạy trên máy, có giờ từng chữ, sửa tay theo `glossary.yaml`.
  - Đoạn 71,7–78,2 s bị VAD bỏ sót nên chạy lại riêng.
  - **Cần Thắm xác nhận:** "công viên đi bộ" (Whisper nghe thành "dạ bộ"). Trên màn hình chỉ ghi "Công viên / NGAY SAU NHÀ".
- `build.mjs`: danh sách khối chữ `KT`, mỗi khối kèm một tiếng SFX. `sfx.json` sinh lại mỗi lần build.

```bash
node projects/casa-villa-kim-tham/build.mjs --no-render
node scripts/qa/kt-check.cjs build/casa-villa-kim-tham/index.html kim
node projects/casa-villa-kim-tham/build.mjs            # → build/casa-villa-kim-tham/output.mp4
```
