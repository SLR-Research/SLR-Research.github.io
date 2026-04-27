// API client wrapper untuk slr-gocroot backend.
// Pattern gocroot: vanilla fetch + JSON, no axios/no library.
//
// Base URL berbeda per environment (lokal dev vs production GCF).
// Override via window.SLR_API_BASE sebelum load script ini kalau perlu.

(function () {
  "use strict";

  const DEFAULT_BASE = (() => {
    if (window.SLR_API_BASE) return window.SLR_API_BASE;
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return "http://localhost:8080";
    }
    // Production GCF gen2 (asia-southeast2, project slr-ai-492413).
    return "https://slr-gocroot-tn6sjkbgbq-et.a.run.app";
  })();

  const Api = {
    base: DEFAULT_BASE,

    // request: low-level fetch wrapper. Inject Authorization header otomatis
    // kalau token tersimpan di localStorage.
    async request(method, path, body) {
      const headers = { "Content-Type": "application/json" };
      const token = window.Auth && window.Auth.getToken();
      if (token) headers["Authorization"] = "Bearer " + token;

      const opts = { method, headers };
      if (body !== undefined) opts.body = JSON.stringify(body);

      const res = await fetch(this.base + path, opts);

      // 401 = token expired / invalid → kick to login.
      if (res.status === 401 && window.Auth) {
        window.Auth.clear();
        if (!path.startsWith("/login") && !path.startsWith("/register")) {
          window.location.href = "/login/";
          return;
        }
      }

      const ct = res.headers.get("Content-Type") || "";
      const data = ct.includes("application/json") ? await res.json() : await res.text();

      // 409 dengan field `redirect` = backend minta navigasi (e.g. select-track
      // belum dipilih). Auto-follow biar UX smooth.
      if (res.status === 409 && data && data.redirect) {
        window.location.href = data.redirect;
        return;
      }

      if (!res.ok) {
        const err = new Error((data && data.message) || ("HTTP " + res.status));
        err.status = res.status;
        err.data = data;
        throw err;
      }
      return data;
    },

    get(path) { return this.request("GET", path); },
    post(path, body) { return this.request("POST", path, body); },
    put(path, body) { return this.request("PUT", path, body); },
    del(path) { return this.request("DELETE", path); },
  };

  window.Api = Api;
})();
