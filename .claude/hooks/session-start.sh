#!/bin/bash
# Cài đặt tự động khi mở phiên Claude Code (cloud và máy cá nhân), thay cho cài tay:
#   ffmpeg · Python cho nhận diện giọng / tách người (~/.asr: faster-whisper, rembg…) · node_modules · Chromium (máy cá nhân).
# Chạy mỗi lần mở phiên; phần đã cài xong thì bỏ qua (so mã băm). Lỗi thì in cách sửa, không chặn phiên.
set -uo pipefail
cd "${CLAUDE_PROJECT_DIR:-.}"
HOOK=.claude/hooks/session-start.sh
CLOUD=$([ "${CLAUDE_CODE_REMOTE:-}" = "true" ] && echo 1 || echo 0)
loi() { echo "⚠ $1" >&2; }

# ffmpeg: gói hệ thống. Cloud tự cài; máy cá nhân chỉ nhắc (cần quyền quản trị)
if ! command -v ffmpeg >/dev/null; then
  if [ "$CLOUD" = 1 ]; then apt-get update -qq && apt-get install -y -qq ffmpeg || loi "không cài được ffmpeg"
  else loi "Thiếu ffmpeg: macOS 'brew install ffmpeg' · Ubuntu/WSL 'sudo apt install -y ffmpeg' (HUONG-DAN, Chạy trên máy của mình)"; fi
fi

# Python ~/.asr: cài lại khi hook này đổi (danh sách gói nằm ngay dưới)
ASR="$HOME/.asr"; asr_hash="$ASR/.session-start.sha256"
if ! sha256sum --check --status "$asr_hash" 2>/dev/null && ! shasum -a 256 --check --status "$asr_hash" 2>/dev/null; then
  rm -f "$asr_hash"
  export PATH="$HOME/.local/bin:$PATH"
  command -v uv >/dev/null || python3 -m pip install -q --user uv || loi "Thiếu uv: macOS 'brew install uv' · Linux 'curl -LsSf https://astral.sh/uv/install.sh | sh'"
  if command -v uv >/dev/null; then
    { [ -x "$ASR/bin/python" ] || uv venv -q "$ASR"; } &&
    VIRTUAL_ENV="$ASR" uv pip install -q faster-whisper numpy imageio pillow "rembg[cpu]" opencv-python-headless &&
    { sha256sum "$HOOK" 2>/dev/null || shasum -a 256 "$HOOK"; } > "$asr_hash" || loi "chưa cài xong ~/.asr (Python): mở phiên lại hoặc nhờ Claude chạy $HOOK"
  fi
fi

# node_modules (+ Chromium cho kiểm chữ trên máy cá nhân): cài lại khi package.json / package-lock.json / hook đổi
npm_hash=node_modules/.session-start.sha256
if ! sha256sum --check --status "$npm_hash" 2>/dev/null && ! shasum -a 256 --check --status "$npm_hash" 2>/dev/null; then
  rm -f "$npm_hash"
  if npm install --no-audit --no-fund; then
    [ "$CLOUD" = 1 ] || npx playwright install chromium || loi "chưa tải được Chromium: chạy 'npx playwright install --with-deps chromium'"
    { sha256sum "$HOOK" package.json package-lock.json 2>/dev/null || shasum -a 256 "$HOOK" package.json package-lock.json; } > "$npm_hash"
  else loi "npm install lỗi: kiểm Node 22 ('node -v') rồi mở phiên lại"; fi
fi
exit 0
