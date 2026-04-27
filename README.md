# SLR Frontend — GitHub Pages (LOCAL-ONLY scaffold)

Frontend statis untuk `slr-gocroot` backend. Pattern strict GoCroot:
**vanilla HTML + Tailwind CDN + Alpine/vanilla JS, no build step**.

> ⚠️ **LOCAL-ONLY** — repo ini belum di-init git, belum di-push.
> Production `slr.rumahpublikasi.id` SEKARANG dilayani `webapp/` (Gin + SSR).
> Jangan deploy / push tanpa konfirmasi cutover.

## 🏗️ Stack

| Layer | Tool |
|---|---|
| Markup | Vanilla HTML (multi-page, tiap fitur folder + `index.html`) |
| Styling | Tailwind CSS via CDN + DaisyUI 4 |
| Scripting | Vanilla ES6+ (no bundler, no npm) |
| Auth | PASETO token di `localStorage` + `Authorization: Bearer` |
| Backend | `slr-gocroot` (Google Cloud Functions gen2) |
| Hosting | GitHub Pages (gratis, custom domain) |
| Build | **None** — push ke main = deploy |

## 📁 Struktur

```
slr-frontend/
├── index.html                  # landing
├── login/index.html            # /login/
├── register/index.html         # /register/
├── select-track/index.html     # /select-track/
├── home/index.html             # /home/ (daftar modul)
├── modul/index.html            # /modul/?slug=xxx
├── admin/
│   ├── dashboard/index.html
│   ├── users/index.html        (TODO)
│   └── progress/index.html     (TODO)
├── assets/
│   ├── css/custom.css          # port dari webapp/static/css/
│   ├── js/
│   │   ├── api.js              # fetch wrapper (window.Api)
│   │   ├── auth.js             # token + redirect helpers (window.Auth)
│   │   └── app.js              # legacy app.js (port dari webapp/)
│   └── images/
├── CNAME                       # slr.rumahpublikasi.id
├── .nojekyll                   # disable jekyll processing
└── .github/workflows/pages.yml # auto-deploy
```

## 🚀 Local development

Tidak butuh build. Cukup serve folder via static server:

```bash
# Opsi 1: Python
cd slr-frontend && python3 -m http.server 5173

# Opsi 2: Go (kalau sudah install slr-gocroot)
cd slr-frontend && go run github.com/eliben/static-server@latest -port 5173
```

Buka `http://localhost:5173`. API base default = `http://localhost:8080` (slr-gocroot dev).

Override base URL kalau backend di port lain:
```html
<script>window.SLR_API_BASE = "http://localhost:9000";</script>
<script src="/assets/js/api.js"></script>
```

## 🔌 Integrasi backend

| Frontend page | Backend endpoint | Method | Auth |
|---|---|---|---|
| `/login/` | `/login` | POST | guest |
| `/register/` | `/register` | POST | guest |
| `/select-track/` | `/api/track` | POST | required |
| `/home/` | `/home` | GET | required |
| `/modul/?slug=X` | `/modul/X` | GET | required |
| `/admin/dashboard/` | `/admin/dashboard` | GET | admin |

CORS di `slr-gocroot/config/cors.go` harus whitelist origin frontend
(`http://localhost:5173` untuk dev, `https://slr.rumahpublikasi.id` untuk prod).

## 🌐 Domain

`CNAME` = `slr.rumahpublikasi.id`. Setelah push + Pages enabled:

1. DNS provider: tambah `CNAME slr → <username>.github.io.`
2. GitHub repo Settings → Pages → Custom domain = `slr.rumahpublikasi.id`
3. Enable HTTPS (auto-provisioned via Let's Encrypt)

⚠️ **Konflik production**: domain ini sekarang di webapp/. Cutover butuh:
- Backend `slr-gocroot` siap di GCF + production data ter-migrate
- DNS update (ada downtime singkat saat propagasi)

## 🛡️ Security notes

- Token PASETO di `localStorage` → rentan XSS. **Selalu** pakai `textContent`
  untuk inject user data, **never** `innerHTML` kecuali source trusted
  (e.g. server-rendered markdown dari admin).
- CORS bukan security boundary — backend tetap harus validate token tiap request.
- `/modul/index.html` pakai `innerHTML` untuk render HTML markdown — aman karena
  konten markdown di-curate admin via DB, bukan user-submitted.

## 📋 Status scaffold

- ✅ Landing, login, register, select-track, home, modul, admin/dashboard
- ⏸️ TODO: admin/users, admin/progress
- ⏸️ TODO: profile page
- ⏸️ TODO: dark mode toggle (struktur `data-theme` udah siap)
- ⏸️ TODO: error boundary halaman 404
