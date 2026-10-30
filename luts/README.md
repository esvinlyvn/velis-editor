# LUT màu

Thư mục chứa file `.cube` dùng để chỉnh màu clip quay. Luật dùng nằm ở `docs/VAN-HANH.md` mục 7.

- **Áp lên clip trước khi dựng**, không áp lên chữ và đồ họa. Cường độ 50–80% bằng cách trộn với bản gốc:
  ```
  ffmpeg -i work/<video>/cut.mp4 -filter_complex "[0:v]split[a][b];[b]lut3d=file=luts/<ten>.cube:interp=tetrahedral[g];[a][g]blend=all_expr='A*(1-0.65)+B*0.65'" -c:a copy work/<video>/graded.mp4
  ```
  Đổi `0.65` theo `lut.cuong_do` trong `brand.json` của khách.
- Trước khi dựng, chụp 3 khung có mặt người, so trước và sau: da phải tự nhiên, vùng sáng không bị cháy.
- Một video dùng một LUT.
- Mỗi file thêm vào phải ghi nguồn và giấy phép trong `luts/SOURCES.md`. Chỉ dùng LUT có quyền sử dụng.
