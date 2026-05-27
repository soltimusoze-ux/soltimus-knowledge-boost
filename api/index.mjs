// Vercel Node serverless function — entry point for all SSR / server-function /
// server-route requests on Vercel. Wraps the TanStack Start SSR fetch handler
// built into dist/server/server.js by `vite build` (with @cloudflare/vite-plugin
// disabled via vite.config.ts when VERCEL=1).
//
// vercel.json rewrites every request to /api, and lists dist/server/** under
// functions.includeFiles so the bundle ships with this function.

export const config = { runtime: "nodejs20.x" };

let handlerPromise;

async function getHandler() {
  if (!handlerPromise) {
    handlerPromise = import("../dist/server/server.js").then(
      (m) => m.default ?? m,
    );
  }
  return handlerPromise;
}

function buildRequest(req) {
  const proto = req.headers["x-forwarded-proto"] ?? "https";
  const host = req.headers["x-forwarded-host"] ?? req.headers.host;
  const url = `${proto}://${host}${req.url}`;

  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (Array.isArray(v)) v.forEach((vv) => headers.append(k, vv));
    else if (v != null) headers.set(k, String(v));
  }

  const method = req.method ?? "GET";
  const init = { method, headers };
  if (method !== "GET" && method !== "HEAD") {
    init.body = req;
    init.duplex = "half";
  }
  return new Request(url, init);
}

async function writeResponse(webRes, res) {
  res.statusCode = webRes.status;
  webRes.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  if (!webRes.body) {
    res.end();
    return;
  }
  const reader = webRes.body.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    res.write(value);
  }
  res.end();
}

export default async function handler(req, res) {
  try {
    const entry = await getHandler();
    const request = buildRequest(req);
    const response = await entry.fetch(request, {}, {});
    await writeResponse(response, res);
  } catch (error) {
    console.error("[vercel] SSR handler failed:", error);
    res.statusCode = 500;
    res.setHeader("content-type", "text/html; charset=utf-8");
    res.end("<h1>500 — Internal Server Error</h1>");
  }
}
