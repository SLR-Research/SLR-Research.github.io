// PASETO token storage + auth helpers (frontend side).
// Pattern: token disimpan di localStorage, dikirim via Authorization Bearer.
// Cookie HttpOnly tidak bisa cross-origin antara Pages → GCF, jadi pakai LS.
//
// Trade-off: rentan XSS. Mitigasi: jangan inject untrusted HTML, escape semua
// user-content, pakai textContent (bukan innerHTML) kecuali confirmed safe.

(function () {
  "use strict";

  const KEY_TOKEN = "slr_token";
  const KEY_USER = "slr_user";

  const Auth = {
    getToken() {
      return localStorage.getItem(KEY_TOKEN);
    },

    setToken(token) {
      if (token) localStorage.setItem(KEY_TOKEN, token);
    },

    getUser() {
      const raw = localStorage.getItem(KEY_USER);
      try { return raw ? JSON.parse(raw) : null; } catch { return null; }
    },

    setUser(user) {
      if (user) localStorage.setItem(KEY_USER, JSON.stringify(user));
    },

    clear() {
      localStorage.removeItem(KEY_TOKEN);
      localStorage.removeItem(KEY_USER);
    },

    isLoggedIn() {
      return !!this.getToken();
    },

    // requireLogin: redirect ke /login/ kalau belum login. Pakai di top-of-page
    // di halaman protected (home, modul, admin).
    requireLogin() {
      if (!this.isLoggedIn()) {
        window.location.href = "/login/";
        return false;
      }
      return true;
    },

    // requireProfile: chain after requireLogin. Kalau affiliation empty,
    // redirect ke /profile-complete/. Pakai di /select-track/, /modul/, /admin/.
    requireProfile() {
      if (!this.requireLogin()) return false;
      const u = this.getUser() || {};
      if (!u.affiliation || u.affiliation.trim().length < 2) {
        window.location.href = "/profile-complete/";
        return false;
      }
      return true;
    },

    // requireGuest: redirect ke flow yang sesuai kalau sudah login.
    // Order: profile-complete (kalau no affiliation) → select-track (kalau no track) → modul home
    requireGuest() {
      if (this.isLoggedIn()) {
        window.location.href = this.nextDest();
        return false;
      }
      return true;
    },

    // nextDest: tentukan halaman tujuan berdasarkan kelengkapan profil.
    // Dipakai setelah login/register/SSO success.
    nextDest() {
      const u = this.getUser() || {};
      if (!u.affiliation || u.affiliation.trim().length < 2) return "/profile-complete/";
      if (!u.selected_track) return "/select-track/";
      return "/modul/?slug=home";
    },

    async logout() {
      try { await window.Api.post("/logout"); } catch (_) { /* best-effort */ }
      this.clear();
      window.location.href = "/login/";
    },
  };

  window.Auth = Auth;
})();
