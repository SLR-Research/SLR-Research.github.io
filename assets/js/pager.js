// Kontrol paginasi bersama untuk daftar-daftar panel admin.
//
// Backend mengirim { page, limit, total, total_pages } di setiap respons
// daftar; modul ini menerjemahkannya jadi tombol dan memanggil balik dengan
// nomor halaman yang diminta. Tidak menyimpan state sendiri — halamanlah yang
// memegang nomor halaman aktif, supaya filter dan paginasi tidak berebut.
(function () {
  "use strict";

  // render(el, meta, onGo). Menyembunyikan diri kalau cuma ada satu halaman:
  // kontrol yang tidak bisa menghasilkan apa-apa hanya jadi derau.
  function render(el, meta, onGo) {
    if (!el) return;
    el.innerHTML = "";

    const page = (meta && meta.page) || 1;
    const pages = (meta && meta.total_pages) || 1;
    const total = (meta && meta.total) || 0;

    if (pages <= 1) {
      el.classList.add("hidden");
      return;
    }
    el.classList.remove("hidden");

    const join = document.createElement("div");
    join.className = "join";

    const nav = (label, target, disabled) => {
      const b = document.createElement("button");
      b.className = "btn btn-sm join-item";
      b.textContent = label;
      b.disabled = disabled;
      if (!disabled) b.addEventListener("click", () => onGo(target));
      return b;
    };

    join.appendChild(nav("‹ Sebelumnya", page - 1, page <= 1));

    const label = document.createElement("button");
    label.className = "btn btn-sm join-item btn-ghost";
    label.textContent = `Halaman ${page} dari ${pages}`;
    label.disabled = true;
    join.appendChild(label);

    join.appendChild(nav("Berikutnya ›", page + 1, page >= pages));

    const info = document.createElement("span");
    info.className = "text-xs text-base-content/50 ml-2";
    info.textContent = total + " data";

    el.className = "flex items-center justify-end p-4";
    el.appendChild(join);
    el.appendChild(info);
  }

  window.Pager = { render: render };
})();
