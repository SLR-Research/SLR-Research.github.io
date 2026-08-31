// Tampilan + aksi satu enrollment, dipakai bersama oleh /admin/enrollments
// dan /admin/users-detail. Sebelumnya hanya ada di halaman enrollments; saat
// detail user ikut menampilkan akses per track, logikanya diangkat ke sini
// supaya kedua halaman tidak pernah berbeda dalam menilai status yang sama.
//
// Bergantung pada Api, UI, Duration, dan Tracks.
(function () {
  "use strict";

  const STATUS = {
    pending:  { label: "Pending",       cls: "badge-warning", icon: "hourglass_empty" },
    trial:    { label: "Trial",         cls: "badge-info",    icon: "schedule" },
    expired:  { label: "Trial Expired", cls: "badge-error",   icon: "history_toggle_off" },
    approved: { label: "Approved",      cls: "badge-success", icon: "verified" },
  };

  function key(e) {
    if (e.status === "trial" && e.is_expired_trial) return "expired";
    return e.status;
  }

  // statusBadge mengembalikan elemen badge, bukan string HTML, supaya
  // pemanggil tidak tergoda menyisipkannya lewat innerHTML.
  function statusBadge(e) {
    const s = STATUS[key(e)] || { label: e.status || "—", cls: "badge-ghost", icon: "help" };
    const span = document.createElement("span");
    span.className = "badge gap-1 " + s.cls;
    const ic = document.createElement("span");
    ic.className = "material-symbols-outlined text-xs";
    ic.textContent = s.icon;
    span.appendChild(ic);
    span.appendChild(document.createTextNode(" " + s.label));
    return span;
  }

  function fmtDate(s) {
    if (!s) return "—";
    try { return new Date(s).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }); }
    catch (_) { return s; }
  }

  // fillTrialCell menampilkan tanggal berakhir sekaligus sisa harinya —
  // keputusan perpanjangan bergantung pada sisa waktu, bukan tanggalnya.
  function fillTrialCell(td, e) {
    td.textContent = "";
    td.removeAttribute("title");
    if (!e.trial_ends_at) { td.textContent = "—"; return; }
    if (e.is_expired_trial) {
      const s = document.createElement("span");
      s.className = "text-error";
      s.textContent = "Habis";
      td.appendChild(s);
      td.title = fmtDate(e.trial_ends_at);
      return;
    }
    td.appendChild(document.createTextNode(fmtDate(e.trial_ends_at)));
    const left = document.createElement("div");
    left.className = "text-xs text-base-content/60";
    left.textContent = (e.trial_days_left || 0) + " hari lagi";
    td.appendChild(left);
  }

  // ── Dialog durasi trial ────────────────────────────────────────────────
  // Dibuat sekali lalu dipakai ulang; halaman tidak perlu menyediakan markup
  // modalnya sendiri.
  let dlg = null;
  let syncTrial = null;

  function ensureDialog() {
    if (dlg) return dlg;
    dlg = document.createElement("dialog");
    dlg.className = "modal";
    dlg.innerHTML =
      '<div class="modal-box max-w-sm">' +
        '<h3 class="font-bold text-lg mb-3">Set Trial</h3>' +
        '<p class="text-sm opacity-70 mb-4" data-ctx></p>' +
        '<div class="form-control">' +
          '<label class="label"><span class="label-text font-medium">Durasi Trial</span></label>' +
          '<div class="flex gap-2">' +
            '<input id="eu-trial-value" type="number" class="input input-bordered w-full" value="7" min="1">' +
            '<select id="eu-trial-unit" class="select select-bordered"></select>' +
          "</div>" +
          '<label class="label"><span class="label-text-alt text-base-content/50">TrialEndsAt di-set ke sekarang + durasi ini <span id="eu-trial-hint"></span></span></label>' +
        "</div>" +
        '<div class="modal-action">' +
          '<button class="btn" data-cancel>Batal</button>' +
          '<button class="btn btn-primary" data-ok>Set Trial</button>' +
        "</div>" +
      "</div>" +
      '<form method="dialog" class="modal-backdrop"><button>close</button></form>';
    document.body.appendChild(dlg);
    syncTrial = Duration.wireTrialInput("eu-trial-value", "eu-trial-unit", "eu-trial-hint");
    return dlg;
  }

  // askTrialDays -> Promise<number|null>. null = dibatalkan.
  function askTrialDays(context) {
    return new Promise((resolve) => {
      const d = ensureDialog();
      d.querySelector("[data-ctx]").textContent = context || "";
      Duration.set("eu-trial-value", "eu-trial-unit", 7);
      syncTrial();

      let done = false;
      const finish = (v) => {
        if (done) return;
        done = true;
        try { d.close(); } catch (_) {}
        resolve(v);
      };
      // Ditugaskan (bukan addEventListener) supaya handler tidak menumpuk
      // setiap kali dialog dibuka ulang.
      d.querySelector("[data-ok]").onclick = () =>
        finish(Duration.toDays(
          document.getElementById("eu-trial-value").value,
          document.getElementById("eu-trial-unit").value) || 7);
      d.querySelector("[data-cancel]").onclick = () => finish(null);
      d.onclose = () => finish(null);
      d.showModal();
    });
  }

  // ── Tombol aksi ────────────────────────────────────────────────────────
  // opts: { context: teks untuk dialog/konfirmasi, reload: fn dipanggil
  // setelah aksi berhasil }
  function renderActions(container, e, opts) {
    const o = opts || {};
    const ctx = o.context || "";
    const reload = o.reload || function () {};
    const track = Tracks.label(e.track);

    const btn = (cls, icon, text, title) => {
      const b = document.createElement("button");
      b.className = "btn btn-xs gap-1 " + cls;
      const ic = document.createElement("span");
      ic.className = "material-symbols-outlined";
      ic.style.fontSize = "14px";
      ic.textContent = icon;
      b.appendChild(ic);
      if (text) b.appendChild(document.createTextNode(" " + text));
      if (title) b.title = title;
      b.setAttribute("aria-label", (text || title || icon) + " " + track);
      return b;
    };

    const run = async (fn) => {
      try { await fn(); reload(); }
      catch (err) { UI.toast(err.message || "Gagal", "error"); }
    };

    if (e.status !== "approved") {
      const b = btn("btn-success", "check", "Approve");
      b.addEventListener("click", async () => {
        if (!await UI.confirm({
          title: "Approve Enrollment",
          message: `Approve ${ctx} untuk track ${track}?`,
          confirmText: "Approve" })) return;
        await run(async () => {
          await Api.post(`/admin/enrollments/${e.id}/approve`);
          UI.toast("Berhasil di-approve", "success");
        });
      });
      container.appendChild(b);
    }

    const bolehTrial = e.status === "pending" || e.status === "trial";
    if (bolehTrial) {
      const perpanjang = e.status === "trial" && !e.is_expired_trial;
      const b = btn(perpanjang ? "btn-ghost" : "btn-info",
        perpanjang ? "update" : "schedule",
        perpanjang ? "Extend" : "Trial",
        perpanjang ? "Reset deadline trial ke sekarang + durasi baru" : "");
      b.addEventListener("click", async () => {
        const days = await askTrialDays(`${ctx} → track ${track}`);
        if (days === null) return;
        await run(async () => {
          await Api.post(`/admin/enrollments/${e.id}/set-trial`, { days });
          UI.toast("Trial di-set " + Duration.label(days), "success");
        });
      });
      container.appendChild(b);
    }

    if (e.status === "approved" || e.status === "trial") {
      const b = btn("btn-error btn-outline", "block", "", "Revoke (kembalikan ke pending)");
      b.addEventListener("click", async () => {
        if (!await UI.confirm({
          title: "Revoke Akses",
          message: `Revoke akses ${ctx} di track ${track}? Status akan kembali ke pending.`,
          confirmText: "Revoke", danger: true })) return;
        await run(async () => {
          await Api.post(`/admin/enrollments/${e.id}/revoke`);
          UI.toast("Berhasil revoke", "success");
        });
      });
      container.appendChild(b);
    }
  }

  window.EnrollmentUI = { statusBadge, fillTrialCell, renderActions, askTrialDays, fmtDate };
})();
