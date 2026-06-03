# MetaEditor 5 — Android UI 📱

Rekreasi UI mobile **MetaEditor 5** (IDE untuk MQL5) dalam satu file HTML.
Antarmuka **Bahasa Inggris** (seperti aplikasi asli), komentar kode **Bahasa Indonesia**.

> ⚠️ **Catatan penting:** Kompilasi `.mq5` di sini **disimulasikan** (validasi sintaks dasar + output mirip MetaEditor). Kompilasi `.mq5` → `.ex5` yang **sungguhan** hanya bisa dilakukan oleh MetaEditor resmi di Windows — itu mustahil dijalankan di browser/Cloudflare.

---

## ✨ Fitur

- **Tampilan persis MetaEditor 5 Android**: top bar, tab dokumen, gutter nomor baris, status bar, bottom navigation, side drawer.
- **Editor MQL5** dengan **syntax highlighting** (keyword, type, string, angka, komentar, preprocessor, fungsi), auto-indent, Tab = 3 spasi, dan **toolbar tombol koding** (`{ } ( ) ; = " < > //` dll) untuk mengetik cepat di HP.
- **New file**: Expert Advisor, Custom Indicator, Script, atau file kosong (semua template `.mq5` siap pakai).
- **Compile (F7)** & **Check Syntax** dengan **Toolbox** output bergaya MetaEditor (error/warning/success).
- **Find** dalam kode.
- **Menu MT5 → Tools → Options → Expert Advisors** lengkap:
  - ✅ **Allow algorithmic trading**
  - ✅ **Allow WebRequest for listed URL** (+ editor daftar URL: tambah/hapus)
  - Disable algorithmic trading when the **account / profile / symbol or period** is changed
  - **Allow DLL imports**
  - Tab tambahan: **General**, **Editor**, **Compiler** (Optimize O2, Treat warnings as errors, Debug info)
- **Persisten**: file & opsi tersimpan di `localStorage`.
- 100% **offline / single-file** (tanpa CDN) → aman di preview sandbox.

---

## 📁 Struktur

```
metaeditor5-android/
├── public/
│   ├── index.html        # Aplikasi (untuk Pages / preview)
│   └── _headers          # Security headers untuk Pages
├── worker/
│   ├── index.html        # Salinan app (di-import oleh worker)
│   ├── worker.js         # Cloudflare Worker (menyajikan HTML)
│   └── wrangler.toml     # Config Worker
├── pages-wrangler.toml   # Config Pages (opsional)
├── deploy.sh             # Skrip deploy cepat
├── package.json
└── README.md
```

---

## 🚀 Deploy ke Cloudflare

### Prasyarat
```bash
npm install -g wrangler
wrangler login
```

### Opsi A — Cloudflare **Workers**
```bash
# dari folder metaeditor5-android/
cp public/index.html worker/index.html      # sinkronkan app terbaru
wrangler deploy --config worker/wrangler.toml
# atau:
./deploy.sh worker
```
Hasil: `https://metaeditor5-android.<akun>.workers.dev`
Rute tambahan: `/healthz`, `/api/version`.

### Opsi B — Cloudflare **Pages** (statis, paling mudah)
```bash
wrangler pages deploy public --project-name metaeditor5-android
# atau:
./deploy.sh pages
```
Atau lewat dashboard Cloudflare Pages → upload folder `public/`.

### Lewat npm scripts
```bash
npm run dev            # jalankan Worker lokal
npm run deploy:worker  # deploy Worker
npm run deploy:pages   # deploy Pages
npm run preview        # preview statis di http://localhost:8080
```

---

## 🧪 Coba lokal tanpa deploy
Buka `public/index.html` langsung di browser HP/desktop, atau:
```bash
npx http-server public -p 8080 -o
```

---

## 🗺️ Cara pakai menu Options › Expert Advisors
1. Tap ☰ (kiri atas) **atau** tombol **Options** di bawah.
2. Buka tab **Expert Advisors**.
3. Aktifkan **Allow algorithmic trading** dan/atau **Allow WebRequest for listed URL**.
4. Saat WebRequest aktif, tambahkan URL host EA Anda di daftar.
5. Tekan **OK** untuk menyimpan (tersimpan otomatis di perangkat).
6. Saat **Compile**, jika kode memakai `WebRequest()` tapi opsinya mati, akan muncul *warning* — persis perilaku MetaEditor.
