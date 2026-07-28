#!/usr/bin/env bash
# Publish the Signal static landing page.
# No build step — the site is pure HTML/CSS/JS served by Bun.
# Starts the server on port 3000, taking over from any previous instance.
set -euo pipefail
cd "$(dirname "$0")"

umask 002
mkdir -p .run

# Ensure Bun is available
command -v bun >/dev/null 2>&1 || { echo "bun is required"; exit 1; }

# Start server in background
setsid nohup bun run start > .run/server.log 2>&1 < /dev/null &

# Wait for server to respond
for _ in $(seq 1 50); do
  if curl -sf -o /dev/null http://localhost:3000; then
    echo "site published; serving on port 3000"
    exit 0
  fi
  sleep 0.2
done
echo "warning: published, but the server isn't responding — check .run/server.log" >&2
exit 1
