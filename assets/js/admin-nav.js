// Shared admin navbar — rendered into <div id="admin-nav"></div>.
// Replaces the ~30-line navbar block that was copy-pasted (and had drifted)
// across all six admin pages. Adds a mobile hamburger (the horizontal menu
// overflowed on small screens) and a theme toggle (dark mode was previously
// only reachable on /modul).
//
// Active item is derived from location.pathname. User name/initials come from
// Auth.getUser(). This file is scanned by Tailwind (tailwind.config.js content).
(function () {
  "use strict";

  const ITEMS = [
    { href: "/admin/dashboard/", icon: "dashboard", label: "Dashboard" },
    { href: "/admin/users/", icon: "group", label: "Users" },
    { href: "/admin/enrollments/", icon: "how_to_reg", label: "Enrollments" },
    { href: "/admin/invite-codes/", icon: "vpn_key", label: "Invite Codes" },
    { href: "/admin/progress/", icon: "trending_up", label: "Progress" },
  ];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function isActive(href) {
    let p = location.pathname.replace(/index\.html$/, "");
    if (p.charAt(p.length - 1) !== "/") p += "/";
    if (href === "/admin/users/" && p.indexOf("/admin/users-detail") === 0) return true;
    return p === href;
  }

  function items() {
    return ITEMS.map((it) =>
      '<li><a href="' + it.href + '" class="' + (isActive(it.href) ? "active" : "") + '">' +
      '<span class="material-symbols-outlined text-sm">' + it.icon + "</span> " + it.label + "</a></li>"
    ).join("");
  }

  function render() {
    const mount = document.getElementById("admin-nav");
    if (!mount) return;
    const u = (window.Auth && Auth.getUser && Auth.getUser()) || {};
    const initials = esc((u.name || "?").slice(0, 2).toUpperCase());
    const name = u.name ? esc(u.name) : "—";

    mount.className = "navbar bg-base-100 border-b border-base-200 sticky top-0 z-40";
    mount.innerHTML =
      '<div class="flex-1 items-center">' +
        // Mobile hamburger (lg:hidden)
        '<div class="dropdown lg:hidden">' +
          '<label tabindex="0" class="btn btn-ghost btn-sm btn-circle" aria-label="Menu"><span class="material-symbols-outlined">menu</span></label>' +
          '<ul tabindex="0" class="menu menu-sm dropdown-content mt-2 z-50 p-2 shadow-lg bg-base-100 rounded-box w-56 border border-base-200">' + items() + "</ul>" +
        "</div>" +
        '<a href="/admin/dashboard/" class="flex items-center gap-2 px-2">' +
          '<span class="material-symbols-outlined text-primary">admin_panel_settings</span>' +
          '<span class="font-bold text-lg">Admin Panel</span>' +
        "</a>" +
      "</div>" +
      '<div class="flex-none items-center gap-1">' +
        '<ul class="menu menu-horizontal px-1 gap-1 hidden lg:flex">' + items() + "</ul>" +
        '<div class="divider divider-horizontal mx-0 hidden lg:flex"></div>' +
        '<div class="flex items-center gap-2 px-2">' +
          '<div class="avatar placeholder">' +
            '<div class="bg-neutral text-neutral-content rounded-full w-8"><span class="text-xs font-bold">' + initials + "</span></div>" +
          "</div>" +
          '<span class="text-sm font-medium hidden sm:inline">' + name + "</span>" +
        "</div>" +
        '<button id="admin-theme-toggle" class="btn btn-ghost btn-sm btn-circle" aria-label="Tema"><span class="material-symbols-outlined" id="admin-theme-icon">dark_mode</span></button>' +
        '<a href="/modul/?slug=home" class="btn btn-ghost btn-sm" title="Kembali ke App"><span class="material-symbols-outlined text-sm">arrow_back</span></a>' +
        '<button id="admin-logout" class="btn btn-ghost btn-sm" title="Logout"><span class="material-symbols-outlined text-sm">logout</span></button>' +
      "</div>";

    const icon = document.getElementById("admin-theme-icon");
    const sync = () => { icon.textContent = document.documentElement.getAttribute("data-theme") === "dark" ? "light_mode" : "dark_mode"; };
    sync();
    document.getElementById("admin-theme-toggle").addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("slr_theme", next); } catch (_) {}
      sync();
    });
    document.getElementById("admin-logout").addEventListener("click", () => { if (window.Auth) Auth.logout(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();

  window.AdminNav = { render: render };
})();
