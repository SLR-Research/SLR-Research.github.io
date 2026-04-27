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
        window.location.href = "/slr-frontend/login/";
        return false;
      }
      return true;
    },

    // requireGuest: redirect ke /modul/?slug=home kalau sudah login. Pakai di /login, /register.
    requireGuest() {
      if (this.isLoggedIn()) {
        const u = this.getUser();
        const dest = (u && u.selected_track) ? "/slr-frontend/modul/?slug=home" : "/slr-frontend/select-track/";
        window.location.href = dest;
        return false;
      }
      return true;
    },

    async logout() {
      try { await window.Api.post("/logout"); } catch (_) { /* best-effort */ }
      this.clear();
      window.location.href = "/slr-frontend/login/";
    },
  };

  window.Auth = Auth;
})();
