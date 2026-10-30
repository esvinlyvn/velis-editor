#!/usr/bin/env node
// Quỳnh Quỳnh · Casa Villa Blanca City: clip quay thật + chữ chốt preset BĐS + SFX nhẹ. Không phụ đề: chữ chốt đã mang ý chính.
//   footage.mp4 = clip gốc cắt ở 8,27 giây (bỏ 1 giây cuối out frame), giữ khung cuối thêm 1,25 giây, không tiếng.
//   voice.wav   = tiếng của clip gốc, cùng đoạn cắt.
//   node projects/qq-casa-villa/build.mjs [--no-render]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildVideo } from "../../scripts/build-video.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));

buildVideo(import.meta.url, {
  fonts: [["be-vietnam-pro", [600, 700, 800, 900]]],
  endStart: 0,
  tail: 1.25,
  noCap: [0, 1, 2, 3, 4, 5],
  html: (html, out) => (fs.copyFileSync(path.join(HERE, "footage.mp4"), path.join(out, "assets/footage.mp4")), html),
});
