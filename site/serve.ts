/*
 * Signal — static site server.
 * Serves index.html and all static assets on port 3000.
 * Simple Bun HTTP server — no build step required.
 */

const PORT = 3000;
const HOST = "0.0.0.0";
const ROOT = import.meta.dir;

// MIME types for common static files
const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

function getMime(path: string): string {
  const ext = path.slice(path.lastIndexOf("."));
  return MIME[ext] || "application/octet-stream";
}

// Free port 3000 before binding
const freePort =
  `for _ in $(seq 1 25); do ` +
  `pids=$(lsof -t -iTCP:${String(PORT)} -sTCP:LISTEN 2>/dev/null || true); ` +
  `if [ -z "$pids" ]; then exit 0; fi; ` +
  `kill $pids 2>/dev/null || true; sleep 0.2; ` +
  `done`;

for (let attempt = 1; ; attempt++) {
  await Bun.$`sudo sh -c ${freePort}`.quiet().nothrow();
  try {
    Bun.serve({
      port: PORT,
      hostname: HOST,
      async fetch(req) {
        const url = new URL(req.url);
        let pathname = url.pathname;

        // Normalize: trailing slash → index.html, root → index.html
        if (pathname === "/" || pathname.endsWith("/")) {
          pathname = "/index.html";
        }

        const filePath = ROOT + pathname;
        const file = Bun.file(filePath);

        if (await file.exists()) {
          return new Response(file, {
            headers: { "Content-Type": getMime(pathname) },
          });
        }

        // 404 fallback: serve index.html for SPA-like behavior
        const fallback = Bun.file(ROOT + "/index.html");
        if (await fallback.exists()) {
          return new Response(fallback, {
            status: 404,
            headers: { "Content-Type": "text/html; charset=utf-8" },
          });
        }

        return new Response("Not Found", { status: 404 });
      },
    });
    break;
  } catch (err) {
    if (attempt >= 10) throw err;
    await Bun.sleep(200);
  }
}

console.log(`Signal site serving on http://${HOST}:${String(PORT)}`);
