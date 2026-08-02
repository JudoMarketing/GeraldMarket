/* ============================================================
   Appointment page — validation, VIN helper, message composer
   The form has no backend: it composes a clean, readable request
   and hands it to WhatsApp or email. Swap in a real endpoint later
   (see README) without touching the markup.
   ============================================================ */
(function () {
  "use strict";

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  const form = $("#apptForm");
  if (!form) return;

  const T = (k) => (window.I18N ? I18N.t(k) : k);
  const SITE = window.SITE || {};

  /* ---------- Elements ---------- */
  const vin = $("#vin");
  const vinCount = $("#vinCount");
  const vinMsg = $("#vinMsg");
  const dateEl = $("#date");
  const date2El = $("#date2");
  const dateMsg = $("#dateMsg");
  const confirmBox = $("#confirm");
  const summaryEl = $("#summary");
  const formErr = $("#formErr");

  /* ---------- Helpers ---------- */
  function todayISO() {
    const now = new Date();
    let d;
    try { d = new Date(now.toLocaleString("en-US", { timeZone: SITE.tz || "America/New_York" })); }
    catch (e) { d = now; }
    if (isNaN(d.getTime())) d = now;
    const p = (n) => String(n).padStart(2, "0");
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
  }

  // Parse "YYYY-MM-DD" as a local date (avoids the UTC shift of new Date(str))
  function parseISO(str) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(str || "");
    if (!m) return null;
    return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  }

  function showErr(el, key) {
    if (!el) return;
    el.textContent = "⚠ " + T(key);
    el.hidden = false;
  }
  function clearErr(el) { if (el) { el.hidden = true; el.textContent = ""; } }

  /* ---------- VIN ---------- */
  const VIN_BAD = /[IOQ]/;
  function checkVin() {
    const raw = vin.value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    if (raw !== vin.value) {
      const pos = vin.selectionStart;
      vin.value = raw;
      try { vin.setSelectionRange(pos, pos); } catch (e) { /* ignore */ }
    }
    vinCount.textContent = raw.length + "/17";
    vinCount.classList.toggle("is-ok", raw.length === 17 && !VIN_BAD.test(raw));

    vinMsg.classList.remove("hint--ok", "hint--warn");
    if (!raw.length) { vinMsg.textContent = ""; return true; }
    if (VIN_BAD.test(raw)) {
      vinMsg.textContent = T("appt.vinBad");
      vinMsg.classList.add("hint--warn");
      return false;
    }
    if (raw.length === 17) {
      vinMsg.textContent = T("appt.vinValid");
      vinMsg.classList.add("hint--ok");
      return true;
    }
    vinMsg.textContent = raw.length + " " + T("appt.vinShort");
    return true; // incomplete VIN never blocks the booking — it's optional
  }
  if (vin) {
    vin.addEventListener("input", checkVin);
    vin.addEventListener("blur", checkVin);
  }

  /* ---------- Dates ---------- */
  function checkDate() {
    if (!dateEl) return;
    dateMsg.classList.remove("hint--ok", "hint--warn");
    dateMsg.textContent = "";
    const d = parseISO(dateEl.value);
    if (!d) return;
    const today = parseISO(todayISO());
    if (today && d < today) {
      dateMsg.textContent = T("appt.pastWarn");
      dateMsg.classList.add("hint--warn");
      return;
    }
    if (d.getDay() === 0) {
      dateMsg.textContent = T("appt.closedWarn");
      dateMsg.classList.add("hint--warn");
      return;
    }
    if (d.getDay() === 6) {
      dateMsg.textContent = T("appt.satNote");
    }
  }
  if (dateEl) {
    const min = todayISO();
    dateEl.min = min;
    if (date2El) date2El.min = min;
    dateEl.addEventListener("change", checkDate);
    dateEl.addEventListener("input", checkDate);
  }

  /* ---------- Prefill from the URL (?promo=OIL20&service=tires) ---------- */
  (function prefill() {
    const q = new URLSearchParams(location.search);
    const promo = q.get("promo");
    if (promo) {
      const el = $("#promo");
      if (el) el.value = promo.toUpperCase();
    }
    const boxes = $$('input[name="service"]', form);
    const tick = (value) => {
      const box = boxes.find((b) => b.value === value);
      if (box) box.checked = true;
    };

    const svc = q.get("service");
    if (svc) svc.split(",").forEach((v) => tick(v.trim()));

    // A promo code implies the service it belongs to
    const MAP = { OIL20: "oil", TIRE4: "tires", BRAKE40: "brakes", COOL25: "ac", SCANFREE: "diagnostics" };
    if (promo && MAP[promo.toUpperCase()]) tick(MAP[promo.toUpperCase()]);
  })();

  /* ---------- Keep the "preferred language" select in sync ---------- */
  function syncLang() {
    const sel = $("#lang");
    if (sel && window.I18N) sel.value = I18N.lang;
  }
  document.addEventListener("langchange", () => {
    syncLang();
    checkVin();
    checkDate();
  });
  syncLang();

  /* ---------- Collect + validate ---------- */
  function selectedServices() {
    return $$('input[name="service"]:checked', form).map((el) => {
      const label = el.closest(".chip").querySelector("span");
      return label ? label.textContent.trim() : el.value;
    });
  }

  function validate() {
    let ok = true;
    let firstBad = null;

    const svcErr = $("#svcErr");
    if (!form.querySelector('input[name="service"]:checked')) {
      showErr(svcErr, "appt.errService");
      ok = false;
      firstBad = firstBad || $("#serviceChips");
    } else { clearErr(svcErr); }

    const name = $("#name");
    if (!name.value.trim()) {
      showErr($("#nameErr"), "appt.errName");
      ok = false;
      firstBad = firstBad || name;
    } else { clearErr($("#nameErr")); }

    const phone = $("#phone");
    if (phone.value.replace(/\D/g, "").length < 7) {
      showErr($("#phoneErr"), "appt.errPhone");
      ok = false;
      firstBad = firstBad || phone;
    } else { clearErr($("#phoneErr")); }

    const consent = $("#consent");
    if (!consent.checked) {
      showErr($("#consentErr"), "appt.consentErr");
      ok = false;
      firstBad = firstBad || consent;
    } else { clearErr($("#consentErr")); }

    if (!ok) {
      showErr(formErr, "appt.errFix");
      if (firstBad && firstBad.scrollIntoView) {
        firstBad.scrollIntoView({ block: "center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        if (firstBad.focus) setTimeout(() => firstBad.focus({ preventScroll: true }), 350);
      }
    } else {
      clearErr(formErr);
    }
    return ok;
  }

  /* ---------- Compose the message ---------- */
  // The visible title of the checked radio — never the description under it.
  function radioLabel(name) {
    const el = form.querySelector('input[name="' + name + '"]:checked');
    if (!el) return "";
    const label = el.closest("label");
    const t = label.querySelector(".radio__t") || label.querySelector("span:last-child");
    return t ? t.textContent.trim() : el.value;
  }
  function selectLabel(id) {
    const sel = $("#" + id);
    if (!sel) return "";
    const opt = sel.options[sel.selectedIndex];
    return opt ? opt.textContent.trim() : sel.value;
  }
  function niceDate(iso) {
    const d = parseISO(iso);
    if (!d) return "";
    const locale = (window.I18N && I18N.lang === "es") ? "es-ES" : "en-US";
    try {
      return d.toLocaleDateString(locale, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    } catch (e) { return iso; }
  }

  function buildMessage() {
    const none = T("sum.none");
    const v = (s) => (s && String(s).trim() ? String(s).trim() : none);
    const lines = [];

    lines.push("🔧 " + T("sum.title"));
    lines.push("");

    lines.push("• " + T("sum.services") + ": " + (selectedServices().join(", ") || none));
    const problem = $("#problem").value.trim();
    if (problem) lines.push("• " + T("sum.details") + ": " + problem);
    lines.push("• " + T("sum.urgency") + ": " + radioLabel("urgency"));
    lines.push("");

    const year = $("#year").value.trim();
    const make = $("#make").value.trim();
    const model = $("#model").value.trim();
    const vehicle = [year, make, model].filter(Boolean).join(" ");
    lines.push("• " + T("sum.vehicle") + ": " + v(vehicle));
    if ($("#mileage").value.trim()) lines.push("• " + T("sum.mileage") + ": " + $("#mileage").value.trim());
    lines.push("• " + T("sum.trans") + ": " + selectLabel("transmission"));
    lines.push("• " + T("sum.vin") + ": " + v(vin.value));
    lines.push("");

    lines.push("• " + T("sum.date") + ": " + (dateEl.value ? niceDate(dateEl.value) : none));
    if (date2El.value) lines.push("• " + T("sum.date2") + ": " + niceDate(date2El.value));
    lines.push("• " + T("sum.time") + ": " + selectLabel("time"));
    lines.push("• " + T("sum.wait") + ": " + radioLabel("wait"));
    lines.push("");

    lines.push("• " + T("sum.name") + ": " + $("#name").value.trim());
    lines.push("• " + T("sum.phone") + ": " + $("#phone").value.trim());
    if ($("#email").value.trim()) lines.push("• " + T("sum.email") + ": " + $("#email").value.trim());
    lines.push("• " + T("sum.contact") + ": " + (function () {
      const el = form.querySelector('input[name="contact"]:checked');
      if (!el) return none;
      const s = el.closest(".chip").querySelector("span");
      return s ? s.textContent.trim() : el.value;
    })());
    lines.push("• " + T("sum.lang") + ": " + selectLabel("lang"));
    lines.push("• " + T("sum.customer") + ": " + radioLabel("customer"));
    if ($("#promo").value.trim()) lines.push("• " + T("sum.promo") + ": " + $("#promo").value.trim().toUpperCase());

    return lines.join("\n");
  }

  function reveal(msg) {
    summaryEl.textContent = msg;
    confirmBox.classList.add("is-visible");
    confirmBox.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  /* ---------- Send handlers ---------- */
  $("#sendWa").addEventListener("click", () => {
    if (!validate()) return;
    const msg = buildMessage();
    reveal(msg);
    const url = window.waLink ? waLink(msg) : ("https://wa.me/" + (SITE.whatsapp || "") + "?text=" + encodeURIComponent(msg));
    window.open(url, "_blank", "noopener");
  });

  $("#sendMail").addEventListener("click", () => {
    if (!validate()) return;
    const msg = buildMessage();
    reveal(msg);
    const vehicle = [$("#year").value, $("#make").value, $("#model").value].filter((s) => s && s.trim()).join(" ");
    const subject = T("sum.mailSubject") + ($("#name").value.trim() || "") + (vehicle ? " (" + vehicle + ")" : "");
    location.href = "mailto:" + (SITE.email || "") + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(msg);
  });

  $("#copyBtn").addEventListener("click", function () {
    const btn = this;
    const label = btn.querySelector("span");
    const restore = label.textContent;
    const done = () => {
      label.textContent = T("appt.copied");
      setTimeout(() => { label.textContent = restore; }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(summaryEl.textContent).then(done).catch(done);
    } else {
      const r = document.createRange();
      r.selectNodeContents(summaryEl);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
      try { document.execCommand("copy"); } catch (e) { /* ignore */ }
      done();
    }
  });

  $("#editBtn").addEventListener("click", () => {
    confirmBox.classList.remove("is-visible");
    form.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  });

  // Enter key inside the form should not reload the page
  form.addEventListener("submit", (e) => { e.preventDefault(); $("#sendWa").click(); });

  // Clear field errors as the user fixes them
  [["#name", "#nameErr"], ["#phone", "#phoneErr"]].forEach(([input, err]) => {
    const el = $(input);
    if (el) el.addEventListener("input", () => clearErr($(err)));
  });
  $$('input[name="service"]', form).forEach((el) => {
    el.addEventListener("change", () => { if (form.querySelector('input[name="service"]:checked')) clearErr($("#svcErr")); });
  });
  $("#consent").addEventListener("change", function () { if (this.checked) clearErr($("#consentErr")); });

  checkVin();
})();
