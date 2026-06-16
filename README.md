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
npm run build          # build CSS + copy vendor bundles (Chart.js)
npm run watch:css      # rebuild CSS otomatis saat ngoding lokal
```

Output build **tidak di-commit** (di-`.gitignore`) — GitHub Actions mem-build
ulang setiap deploy (lihat `.github/workflows/pages.yml`):

- `assets/css/app.css` — Tailwind + DaisyUI ter-kompilasi. Kelas Tailwind yang
  dirakit dinamis di JS (mis. `btn-${accent}`) di-*safelist* di
  `tailwind.config.js`; tambah ke sana bila ada pola kelas dinamis baru.
- `assets/js/vendor/chart.umd.min.js` — Chart.js (di-*vendor* dari `node_modules`
  oleh `scripts/vendor.mjs`, bukan CDN). Dipakai hanya di dashboard admin. Untuk
  update: `npm i -D chart.js@<versi> && npm run build:vendor`.

## Lisensi

Konten modul: © 2026 SLR AI Guide.
