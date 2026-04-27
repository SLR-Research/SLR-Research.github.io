// Frontend public config — diset di runtime via window globals.
// Aman untuk expose karena:
// - Google OAuth Client ID: public by design, security via origin whitelist.
// - SLR_API_BASE: public URL backend.
//
// Update file ini saat OAuth Client ID di-create di GCP Console:
//   APIs & Services → Credentials → OAuth 2.0 Client IDs → Web Client →
//   copy "Client ID" (format: "<NUMBER>-<HASH>.apps.googleusercontent.com")

(function () {
  // Backend URL (override otomatis di api.js — ini hanya kalau perlu paksa).
  // window.SLR_API_BASE = "https://slr-gocroot-tn6sjkbgbq-et.a.run.app";

  // Google OAuth Web Client ID. Empty = Google Sign-In button tidak render.
  window.GOOGLE_CLIENT_ID = "869589888449-nob7dsiq3h9f8qfjau8g58dn1fsc989m.apps.googleusercontent.com";
})();
