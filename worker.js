/**
 * MetaEditor 5 (Android UI) — Cloudflare Worker
 * --------------------------------------------------
 * Worker ini menyajikan halaman HTML mobile MetaEditor 5.
 * HTML di-embed sebagai modul agar Worker bisa berdiri sendiri
 * (tanpa butuh KV / R2 / assets binding).
 *
 * Deploy:
 *   npm i -g wrangler
 *   wrangler login
 *   wrangler deploy
 */

import html from "./index.html";

// Header keamanan dasar + cache
const SECURITY_HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  // App single-file, jadi cukup ketat. Inline script diizinkan karena semua di satu file.
  "Content-Security-Policy":
    "default-src 'self'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; connect-src 'self'; base-uri 'none'; frame-ancestors 'self'",
  "Cache-Control": "public, max-age=300",
};

export default {
  /**
   * @param {Request} request
   * @param {Record<string, unknown>} env
   * @param {ExecutionContext} ctx
   */
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Health check sederhana (berguna untuk uptime monitor)
    if (url.pathname === "/healthz") {
      return new Response("ok", {
        headers: { "Content-Type": "text/plain", "Cache-Control": "no-store" },
      });
    }

    // Endpoint info (versi build)
    if (url.pathname === "/api/version") {
      return Response.json({
        app: "MetaEditor 5 Android UI",
        build: "4280",
        engine: "cloudflare-worker",
        ts: new Date().toISOString(),
      });
    }

    // Hanya GET/HEAD untuk halaman
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    // Semua rute lain → kirim aplikasi (SPA single-file)
    return new Response(html, { headers: SECURITY_HEADERS });
  },
};
