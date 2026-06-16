# SLR AI Guide

Panduan **Systematic Literature Review** dan **Scoping Review** dengan
bantuan AI — workflow ter-struktur, PRISMA 2020 compliant, ter-integrasi
dengan Claude.

🌐 **Live**: https://slr-research.github.io/

## Tracks Pembelajaran

- **SLR AI** — workflow chat-based klasik (PICO + extraction + meta-analysis)
- **SLR + AI Cowork** — workflow file-based via Claude desktop (hemat token 40-50%)
- **Scoping Review** — JBI Manual Ch.11 + PRISMA-ScR (PCC + EGM)

## Tentang

Project non-profit oleh **RPI Institute** untuk peneliti Indonesia.
Akses gratis, daftar dengan email + password.

## Build (CSS)

Halaman memakai Tailwind + DaisyUI yang **dikompilasi** ke satu file
`assets/css/app.css` (bukan lagi Play CDN `cdn.tailwindcss.com`, yang tidak
ditujukan untuk produksi). Token tema & prose bespoke tetap di `custom.css`.

```bash
npm install            # sekali, ambil toolchain
npm run build:css      # build assets/css/app.css (ter-minify)
npm run watch:css      # rebuild otomatis saat ngoding lokal
```

`assets/css/app.css` **tidak di-commit** (di-`.gitignore`) — GitHub Actions
mem-build ulang setiap deploy (lihat `.github/workflows/pages.yml`). Kelas
Tailwind yang dirakit dinamis di JS (mis. `btn-${accent}`) di-*safelist* di
`tailwind.config.js`; tambah ke sana bila menambah pola kelas dinamis baru.

## Lisensi

Konten modul: © 2026 SLR AI Guide.
