// Konversi durasi trial antara satuan tampilan (hari/bulan/tahun) dan satuan
// simpan (hari). Backend hanya mengenal hari — konversi hanya terjadi di sini,
// dipakai bersama oleh /admin/invite-codes dan /admin/enrollments.
//
// 1 bulan = 30 hari, 1 tahun = 365 hari. Sengaja aproksimasi tetap, bukan
// kalender: trial dihitung backend sebagai "sekarang + N hari", jadi angka
// tetap ini yang jujur. Form selalu menampilkan hasil harinya supaya admin
// tahu persis apa yang tersimpan.
(function () {
  "use strict";

  const PER = { day: 1, month: 30, year: 365 };
  const LABEL = { day: "hari", month: "bulan", year: "tahun" };
  const MAX_DAYS = 3650; // ≈ 10 tahun — sama dengan helper.MaxTrialDays di backend

  function toDays(value, unit) {
    const n = parseInt(value, 10);
    if (!isFinite(n)) return NaN;
    return n * (PER[unit] || 1);
  }

  // fromDays memilih satuan terbesar yang membagi habis, supaya 730 kembali
  // tampil sebagai "2 tahun", bukan "730 hari".
  function fromDays(days) {
    const n = parseInt(days, 10);
    if (!isFinite(n) || n <= 0) return { value: 7, unit: "day" };
    if (n % PER.year === 0) return { value: n / PER.year, unit: "year" };
    if (n % PER.month === 0) return { value: n / PER.month, unit: "month" };
    return { value: n, unit: "day" };
  }

  // label(90) → "3 bulan"; label(100) → "100 hari"
  function label(days) {
    const d = fromDays(days);
    return d.value + " " + LABEL[d.unit];
  }

  function maxValueFor(unit) {
    return Math.floor(MAX_DAYS / (PER[unit] || 1));
  }

  function optionsHTML() {
    return Object.keys(PER)
      .map((u) => '<option value="' + u + '">' + LABEL[u] + "</option>")
      .join("");
  }

  // wireTrialInput menyambung pasangan input angka + select satuan, mengisi
  // opsi satuan, menjaga batas atas per satuan, dan menampilkan hasil dalam
  // hari. Mengembalikan fungsi sync untuk dipanggil ulang setelah prefill.
  function wireTrialInput(valueId, unitId, hintId) {
    const val = document.getElementById(valueId);
    const unit = document.getElementById(unitId);
    const hint = document.getElementById(hintId);
    unit.innerHTML = optionsHTML();

    const sync = () => {
      const max = maxValueFor(unit.value);
      val.max = max;
      if (parseInt(val.value, 10) > max) val.value = max;
      const days = toDays(val.value, unit.value);
      hint.textContent =
        !isFinite(days) || days <= 0 ? "" : unit.value === "day" ? "" : "= " + days + " hari";
    };

    val.addEventListener("input", sync);
    unit.addEventListener("change", sync);
    sync();
    return sync;
  }

  // set(valueId, unitId, days) prefill pasangan input dari jumlah hari.
  function set(valueId, unitId, days) {
    const d = fromDays(days);
    document.getElementById(valueId).value = d.value;
    document.getElementById(unitId).value = d.unit;
  }

  window.Duration = { PER, LABEL, MAX_DAYS, toDays, fromDays, label, maxValueFor, optionsHTML, wireTrialInput, set };
})();
