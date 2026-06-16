// Shared UI helpers — floating toast + promise-based confirm modal.
// Replaces native alert()/confirm() (jarring, unstyled) and the per-page
// showSuccess/showError reimplementations. Uses only daisyUI classes already
// in the compiled bundle; this file is scanned by Tailwind (tailwind.config.js
// content) so its static classes survive purge.
(function () {
  "use strict";

  function ensureToastContainer() {
    let c = document.getElementById("ui-toast");
    if (!c) {
      c = document.createElement("div");
      c.id = "ui-toast";
      c.className = "toast toast-top toast-end";
      c.style.zIndex = "9999";
      document.body.appendChild(c);
    }
    return c;
  }

  // toast(message, type) — type ∈ success | error | warning | info
  function toast(msg, type) {
    type = type || "success";
    const c = ensureToastContainer();
    const el = document.createElement("div");
    el.className = "alert alert-" + type + " shadow-lg animate-fade-in";
    el.setAttribute("role", type === "error" ? "alert" : "status");
    const span = document.createElement("span");
    span.textContent = msg;
    el.appendChild(span);
    c.appendChild(el);
    const ttl = type === "error" ? 4500 : 2800;
    setTimeout(() => {
      el.style.transition = "opacity .3s ease";
      el.style.opacity = "0";
      setTimeout(() => el.remove(), 320);
    }, ttl);
  }

  // confirm({title, message, confirmText, cancelText, danger}) -> Promise<boolean>
  // Resolves true on confirm, false on cancel / backdrop / ESC.
  function confirm(opts) {
    opts = opts || {};
    const danger = !!opts.danger;
    return new Promise((resolve) => {
      const dlg = document.createElement("dialog");
      dlg.className = "modal";
      dlg.innerHTML =
        '<div class="modal-box max-w-sm">' +
          '<h3 class="font-bold text-lg flex items-center gap-2">' +
            '<span class="material-symbols-outlined ' + (danger ? "text-error" : "text-primary") + '">' +
              (danger ? "warning" : "help") + "</span>" +
            '<span data-title></span>' +
          "</h3>" +
          '<p class="py-3 text-sm text-base-content/80" data-msg></p>' +
          '<div class="modal-action">' +
            '<button class="btn btn-ghost" data-cancel></button>' +
            '<button class="btn ' + (danger ? "btn-error" : "btn-primary") + '" data-ok></button>' +
          "</div>" +
        "</div>" +
        '<form method="dialog" class="modal-backdrop"><button>close</button></form>';
      dlg.querySelector("[data-title]").textContent = opts.title || "Konfirmasi";
      dlg.querySelector("[data-msg]").textContent = opts.message || "Lanjutkan tindakan ini?";
      dlg.querySelector("[data-cancel]").textContent = opts.cancelText || "Batal";
      dlg.querySelector("[data-ok]").textContent = opts.confirmText || "Ya, lanjutkan";
      document.body.appendChild(dlg);

      let done = false;
      const finish = (val) => {
        if (done) return;
        done = true;
        try { dlg.close(); } catch (_) {}
        setTimeout(() => dlg.remove(), 200);
        resolve(val);
      };
      dlg.querySelector("[data-ok]").addEventListener("click", () => finish(true));
      dlg.querySelector("[data-cancel]").addEventListener("click", () => finish(false));
      dlg.addEventListener("close", () => finish(false)); // ESC / backdrop
      dlg.showModal();
      dlg.querySelector("[data-ok]").focus();
    });
  }

  window.UI = { toast: toast, confirm: confirm };
})();
