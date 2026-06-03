#!/usr/bin/env bash
# ===========================================================
# Skrip deploy MetaEditor 5 Android UI ke Cloudflare
# Pakai:  ./deploy.sh worker   |   ./deploy.sh pages
# ===========================================================
set -euo pipefail

TARGET="${1:-worker}"

# Pastikan wrangler tersedia
if ! command -v wrangler >/dev/null 2>&1; then
  echo "wrangler belum terpasang. Memasang via npm..."
  npm i -g wrangler
fi

# Login bila belum
if ! wrangler whoami >/dev/null 2>&1; then
  echo "Silakan login ke Cloudflare..."
  wrangler login
fi

case "$TARGET" in
  worker)
    echo "==> Sinkronkan index.html ke folder worker/"
    cp public/index.html worker/index.html
    echo "==> Deploy ke Cloudflare Workers"
    wrangler deploy --config worker/wrangler.toml
    ;;
  pages)
    echo "==> Deploy ke Cloudflare Pages"
    wrangler pages deploy public --project-name metaeditor5-android
    ;;
  *)
    echo "Target tidak dikenal: $TARGET (gunakan 'worker' atau 'pages')"
    exit 1
    ;;
esac

echo "Selesai."
