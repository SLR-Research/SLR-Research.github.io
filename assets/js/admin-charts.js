// Admin dashboard charts (Chart.js, loaded only here). Built entirely from the
// existing /admin/dashboard response — no backend change. Colors are read from
// the live DaisyUI OKLCH theme tokens, so charts match the purple palette and
// auto-recolor when the theme toggles between light/dark.
(function () {
  "use strict";

  // Read a DaisyUI theme token (e.g. --p = "38.6% 0.0825 286.4") as an oklch() string.
  function tok(name, alpha) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    if (!v) return "#888888";
    return alpha != null ? `oklch(${v} / ${alpha})` : `oklch(${v})`;
  }

  let charts = [];
  let lastData = null;

  function destroy() {
    charts.forEach((c) => { try { c.destroy(); } catch (_) {} });
    charts = [];
  }

  function palette() {
    return {
      pending: tok("--wa"), trial: tok("--in"), expired: tok("--er"), approved: tok("--su"),
      active: tok("--su"), inactive: tok("--er"),
      codeActive: tok("--p"), codeInactive: tok("--b3"),
      text: tok("--bc", 0.7), grid: tok("--bc", 0.08), ring: tok("--b1"),
    };
  }

  const donutOpts = (p) => ({
    responsive: true, maintainAspectRatio: false, cutout: "62%",
    plugins: {
      legend: { position: "bottom", labels: { color: p.text, boxWidth: 12, padding: 14, font: { size: 12 } } },
      tooltip: { displayColors: false },
    },
  });

  function render(d) {
    if (!window.Chart || !d) return;
    destroy();
    const p = palette();
    Chart.defaults.font.family = getComputedStyle(document.body).fontFamily || "Inter, sans-serif";
    Chart.defaults.color = p.text;

    const funnel = document.getElementById("chart-funnel");
    if (funnel) {
      charts.push(new Chart(funnel, {
        type: "bar",
        data: {
          labels: ["Pending", "Trial Aktif", "Trial Expired", "Approved"],
          datasets: [{
            data: [d.pending_enrollments || 0, d.active_trials || 0, d.expired_trials || 0, d.approved_enrollments || 0],
            backgroundColor: [p.pending, p.trial, p.expired, p.approved],
            borderRadius: 6, borderWidth: 0, barThickness: 22,
          }],
        },
        options: {
          indexAxis: "y", responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { displayColors: false } },
          scales: {
            x: { beginAtZero: true, ticks: { precision: 0, color: p.text }, grid: { color: p.grid } },
            y: { ticks: { color: p.text }, grid: { display: false } },
          },
        },
      }));
    }

    const users = document.getElementById("chart-users");
    if (users) {
      charts.push(new Chart(users, {
        type: "doughnut",
        data: {
          labels: ["Aktif", "Nonaktif"],
          datasets: [{ data: [d.active_users || 0, d.inactive_users || 0], backgroundColor: [p.active, p.inactive], borderColor: p.ring, borderWidth: 2 }],
        },
        options: donutOpts(p),
      }));
    }

    const codes = document.getElementById("chart-codes");
    if (codes) {
      const total = d.total_invite_codes || 0, act = d.active_invite_codes || 0;
      charts.push(new Chart(codes, {
        type: "doughnut",
        data: {
          labels: ["Aktif", "Nonaktif"],
          datasets: [{ data: [act, Math.max(0, total - act)], backgroundColor: [p.codeActive, p.codeInactive], borderColor: p.ring, borderWidth: 2 }],
        },
        options: donutOpts(p),
      }));
    }
  }

  function renderDashboardCharts(d) { lastData = d; render(d); }

  // Recolor when the theme toggles (admin-nav theme button flips data-theme).
  new MutationObserver((muts) => {
    if (muts.some((m) => m.attributeName === "data-theme") && lastData) render(lastData);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  window.renderDashboardCharts = renderDashboardCharts;
})();
