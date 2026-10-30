# lib/ — thư viện dựng (thay cho "chép video mẫu")

Mỗi video chỉ là **dữ liệu**: `projects/<video>/plan.json` + `transcript.json` (+ `SHOTBOOK.md`, `NOTES.md`, `info/`). Mọi code dựng nằm ở đây và dùng chung. Muốn đổi cách dựng cho mọi video sau thì sửa thư viện; muốn đổi một video thì sửa `plan.json` của nó. Không chép `build.mjs` hay `template.html` của video nào.

```
node scripts/new-video.mjs <kenh>-<du-an> --recipe R1 --style S1   # tạo projects/<video>/plan.json + work/<video>/
# bỏ clip vào work/<video>/footage.mp4 (đã cắt) và voice.wav; transcript.json vào projects/<video>/
node lib/build.mjs projects/<video> --no-render    # dựng + in bảng khối chữ, tương phản, cảnh báo luật
npx hyperframes lint build/<video>                  # 0 error
node scripts/qa/kt-check.cjs build/<video>/index.html <video>   # 100%
node scripts/qa/density.mjs build/<video>          # không quãng trống > 3 s
node lib/build.mjs projects/<video>                # render một lần + chuẩn hóa âm lượng
```

Kiểm thư viện sau mỗi lần sửa: `npm run demo` (dựng `tests/demo` bằng media tổng hợp, không render).

## Thành phần

| File | Vai trò |
| --- | --- |
| `build.mjs` | Lệnh dựng duy nhất: pha màu / LUT, đo tương phản, chữ sau người, nhạc, SFX, font, render, chuẩn hóa âm lượng |
| `plan.mjs` | Đọc `plan.json` → dòng thời gian khối chữ + SFX; kiểm luật 1, 4, 7, 8, số liệu khớp lời, cụm cao-trao đủ lâu |
| `template.html` | Template chung: lớp tối theo nền (luật 13, 15, 18, 19), chế độ nền mờ, chữ sau người, ô chữ tự co |
| `music.mjs` | Nhạc nền: hạ dưới giọng theo giờ lời nói (ducking), lưới phách cho montage |
| `styles.json` | Tổ hợp phong cách S1–S5 (preset chính, cặp font, cách hiện, lớp tối) |
| `palettes.json` | Màu gradient + bộ màu theo nghĩa (main, so, an-toan, noi-chon, thoi-gian, phu-dinh) |
| `sfx-roles.json` | Vai SFX → tên trong kho; vai chữ → vai SFX; 6 công thức tổ hợp tiếng |
| `recipes.json` | Công thức khung video R1, R2, R5, R6, R7 |

Nguồn phương pháp: `docs/PHONG-CACH-ME4REAL.md` (mã K, H, C, I, T, A, E, R dùng trong các file trên).

## plan.json

```json
{
  "video": "kenh-du-an",
  "kenh": "kenh",
  "recipe": "R1",
  "style": "S5",
  "roles": { "con-so-tien": "gia-chot", "trang-thai": "nhan-neon", "cao-trao": "cao-trao", "cta": "go-chu" },
  "hook_peak": "0:view",
  "grade": "eq=contrast=1.08:saturation=1.12",
  "blocks": [
    { "role": "mo-dau", "at": 0.1, "o": { "m": "VEN SÔNG" } },
    { "role": "con-so-tien", "at": "0:3", "shift": -0.3, "o": { "k": "GIÁ CHỈ", "value": 3, "suffix": " TỶ" } },
    { "role": "trang-thai", "at": "1:sở", "color": "an-toan", "o": { "m": "SỞ HỮU LÂU DÀI" } },
    { "role": "cao-trao", "at": "2:mà", "o": { "lines": [
      { "parts": [{ "t": "mà còn", "v": "dem" }, { "t": "mở ra", "v": "khoa" }], "at": "2:mà" },
      { "t": "Ven Sông", "v": "cam", "at": "2:ven" },
      { "t": "hiếm có", "v": "chot", "at": "2:hiếm" } ] } }
  ],
  "sfx_layer": [{ "at": 12.4, "role": "chuyen-canh", "why": "cú chuyển cảnh trong clip" }]
}
```

| Trường | Ý nghĩa |
| --- | --- |
| `style` | Mã trong `styles.json`, hoặc `{ "base": "S4", "scrim": "mo", "palette": "bac-xanh", "display": [...], "sans": [...] }` để đổi từng gen. Luật 5: khác video trước cùng kênh ≥ 3/5 gen |
| `roles` | Vai chữ → preset, lấy từ `pick-text.mjs` (mode `bds`). Vai `chot-y` mặc định là preset chính của style. Luật 8: một vai một preset |
| `blocks[].at` | Số giây, hoặc `"cụm:chữ"` (`"3:sở"`, lần thứ hai `"3:sở#1"`); mốc theo chữ tự lùi `shift` (mặc định −0,1 s) |
| `blocks[].out` | Bỏ trống = tắt trước khối sau 0,35 s; khối cuối giữ tới hết |
| `blocks[].color` | Tên nghĩa trong bộ màu (`so`, `an-toan`, `noi-chon`, `thoi-gian`, `phu-dinh`) hoặc tên màu; mặc định `main` (hoặc `mau_nhan` của brand.json) |
| `blocks[].sfx` | `"auto"` (mặc định: chọn theo vai, không lặp loại trong 30 s), `["tên", vol]` ghi tay, hoặc `null` |
| `blocks[].top`, `size`, `p` | Vị trí y (mặc định 250; ≥ 900 = dải dưới), cỡ chữ, preset ghi đè |
| `blocks[].behind`, `behindFrac` | Chữ sau người: tên cửa sổ trong `plan.behind` (`{ "intro": [0, 4.8] }`); mặt nạ ở `work/<video>/matte/` (TALKING-HEAD 4b) |
| `o` | Tham số preset (`text-presets/bds/BDS-PRESETS.md`); `cao-trao` dùng `lines` với vai `dem` / `khoa` / `cam` / `chot` |
| `hook_peak` | Mốc đỉnh hook: tiếng chốt của công thức "bùng mở" rơi đúng đây, tiếng dâng chạy trước 1,6 s |
| `music` | `{ "file": "work/<video>/music.mp3", "bed_db": -6, "duck_db": -20, "bpm": 120, "montage": [[15, 32]] }`; chỉ khi có nhạc có quyền dùng |
| `info_numbers` | Số lấy từ `info/` mà lời không nói (để kiểm số liệu không báo nhầm) |
| `media` | Ghi đè đường dẫn `footage` / `voice` (mặc định `work/<video>/`) |

## Thêm vào thư viện

- **Preset chữ mới:** `text-presets/bds/` (commit `core:`), thêm cỡ mặc định vào `SIZE` trong `plan.mjs`, thêm vai vào `pick-text.mjs`.
- **Tổ hợp phong cách mới** người dùng đã duyệt: thêm `S6…` vào `styles.json`.
- **Công thức khung mới:** thêm vào `recipes.json`.
- **Luật mới** của người dùng: ghi vào bảng luật `TALKING-HEAD.md` trước, rồi mới sửa code ở đây cho khớp.
