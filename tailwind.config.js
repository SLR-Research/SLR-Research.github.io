/** @type {import('tailwindcss').Config} */

// DaisyUI semantic colors that the app builds into class names dynamically at
// runtime (e.g. `btn-${accent}`, `text-${accent}`, `radio-${accent}` where
// accent comes from the track API). Tailwind's content scanner only sees static
// strings, so every dynamic combination must be safelisted or the purge step
// removes it and the styling silently breaks.
//
// Current backend accents (model/track.go): info, primary, secondary, warning,
// accent, success. The full palette is listed for future-proofing — extra
// unused classes are harmless, a missing one is a visual regression.
const COLORS = ["primary", "secondary", "accent", "neutral", "info", "success", "warning", "error"];

const dynamicSafelist = [];
COLORS.forEach((c) => {
  dynamicSafelist.push(
    // track-card icon / button / radio accents (register, enroll, select-track)
    `text-${c}`,
    `bg-${c}`,
    `bg-${c}/5`,
    `bg-${c}/10`,
    `bg-${c}/20`,
    `border-${c}`,
    `btn-${c}`,
    `badge-${c}`,
    `radio-${c}`,
    `alert-${c}`,
    // radio-card hover / checked states (register/index.html, enroll/index.html)
    `hover:border-${c}/50`,
    `has-[:checked]:border-${c}`,
    `has-[:checked]:bg-${c}/5`,
  );
});

// Non-color classes only ever applied via JS (classList / className concat),
// so never present as static literals for the scanner.
const jsOnlySafelist = [
  "badge-ghost",
  "badge-outline",
  "btn-outline",
  "btn-success",
  "btn-error",
  "opacity-50",
  "bg-error/20",
  "text-warning",
  "text-error",
];

module.exports = {
  content: [
    "./*.html",
    "./login/*.html",
    "./register/*.html",
    "./profile/*.html",
    "./profile-complete/*.html",
    "./select-track/*.html",
    "./enroll/*.html",
    "./pending-approval/*.html",
    "./modul/*.html",
    "./privacy/*.html",
    "./terms/*.html",
    "./home/*.html",
    "./admin/**/*.html",
    // Shared JS that builds markup with class literals. app.js is dead code
    // (unreferenced) → excluded.
    "./assets/js/auth.js",
    "./assets/js/api.js",
    "./assets/js/config.js",
    "./assets/js/ui.js",
    "./assets/js/admin-nav.js",
  ],
  safelist: [...dynamicSafelist, ...jsOnlySafelist],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  // Match the previous CDN setup: daisyUI default light + dark themes, with the
  // bespoke OKLCH token overrides applied afterward via custom.css.
  daisyui: {
    themes: ["light", "dark"],
    darkTheme: "dark",
    logs: false,
  },
};
