// Daftar track untuk panel admin — satu tempat, bukan disalin per halaman.
//
// Sumber utamanya endpoint publik /api/tracks (model.AllTracks di backend),
// jadi track baru yang didaftarkan di backend langsung muncul di semua
// dropdown tanpa menyunting HTML. Daftar cadangan statis dipakai hanya kalau
// permintaan gagal, supaya form pembuatan kode undangan tidak pernah kosong
// dan mustahil dipakai.
(function () {
  "use strict";

  const FALLBACK = [
    { slug: "slr", title: "SLR AI" },
    { slug: "slr-cowork", title: "SLR + AI Cowork" },
    { slug: "scoping", title: "Scoping Review" },
    { slug: "scoping-cowork", title: "Scoping Review + AI Cowork" },
    { slug: "scoping-cowork-mcp", title: "Scoping Review + AI Cowork (MCP)" },
    { slug: "buku", title: "Penulisan Buku Akademik" },
    { slug: "empiris", title: "Riset Empiris dengan AI" },
    { slug: "modul-quan", title: "Riset Kuantitatif" },
  ];

  let cache = null;

  async function load() {
    if (cache) return cache;
    try {
      const d = await Api.get("/api/tracks");
      const list = (d.tracks || []).map((t) => ({ slug: t.slug, title: t.title }));
      cache = list.length ? list : FALLBACK;
    } catch (_) {
      cache = FALLBACK;
    }
    return cache;
  }

  function all() {
    return cache || FALLBACK;
  }

  // label("slr") → "SLR AI". Slug tak dikenal dikembalikan apa adanya supaya
  // data lama tetap terbaca, bukan berubah jadi kosong.
  function label(slug) {
    const t = all().find((x) => x.slug === slug);
    return t ? t.title : slug;
  }

  // fillSelect(el, { placeholder }) mengisi <select> dengan seluruh track.
  // placeholder jadi opsi pertama bernilai "" (mis. "Semua track").
  function fillSelect(el, opts) {
    if (!el) return;
    const o = opts || {};
    const keep = el.value;
    el.innerHTML = "";
    if (o.placeholder) {
      const first = document.createElement("option");
      first.value = "";
      first.textContent = o.placeholder;
      el.appendChild(first);
    }
    all().forEach((t) => {
      const opt = document.createElement("option");
      opt.value = t.slug;
      opt.textContent = t.title;
      el.appendChild(opt);
    });
    if (keep) el.value = keep;
  }

  window.Tracks = { load, all, label, fillSelect, FALLBACK };
})();
