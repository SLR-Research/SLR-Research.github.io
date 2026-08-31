// Lencana metode login untuk panel admin.
//
// Backend mengirim auth_methods sebagai daftar (["password","google"]) —
// satu akun bisa punya lebih dari satu, karena akun email/password yang
// kemudian login lewat Google akan ter-link ke google_sub yang sama.
// Daftar kosong = akun lama tanpa penanda apa pun, bukan "tidak bisa login".
(function () {
  "use strict";

  const LABEL = {
    password: { text: "Password", cls: "badge-ghost" },
    google:   { text: "Google",   cls: "badge-info" },
    firebase: { text: "Firebase", cls: "badge-ghost" },
  };

  // render(td, methods) mengisi elemen dengan lencana per metode.
  function render(el, methods) {
    el.textContent = "";
    const list = methods || [];
    if (list.length === 0) {
      el.textContent = "—";
      el.title = "Tidak ada penanda metode login pada akun ini";
      return;
    }
    list.forEach((m) => {
      const info = LABEL[m] || { text: m, cls: "badge-ghost" };
      const b = document.createElement("span");
      b.className = "badge badge-sm ml-1 " + info.cls;
      b.textContent = info.text;
      el.appendChild(b);
    });
  }

  window.AuthMethod = { render: render, LABEL: LABEL };
})();
