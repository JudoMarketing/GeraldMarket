/* ============================================================
   Pacho's Quality Auto Repair — site behavior
   Single source of truth for contact details lives in SITE below.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Business config (edit here, it propagates) ---------- */
  const SITE = {
    name: "Pacho's Quality Auto Repair",
    phoneDisplay: "(305) 238-9333",
    phoneTel: "+13052389333",
    whatsapp: "13052389333", // digits only, country code first
    email: "pachosqualityautorepair@gmail.com",
    address: "12430 SW 128th St, Ste 2, Miami, FL 33186",
    mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Pacho%27s+Quality+Auto+Repair%2C+12430+SW+128th+St%2C+Miami%2C+FL+33186",
    // 0 = Sunday … 6 = Saturday. [openMinutes, closeMinutes] or null when closed.
    hours: {
      0: null,
      1: [510, 1050], 2: [510, 1050], 3: [510, 1050], 4: [510, 1050], 5: [510, 1050],
      6: [510, 900]
    },
    tz: "America/New_York"
  };
  window.SITE = SITE;

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ---------- Wire contact links from config ---------- */
  function wireContacts() {
    $$("[data-tel]").forEach((el) => { el.setAttribute("href", "tel:" + SITE.phoneTel); });
    $$("[data-phone-text]").forEach((el) => { el.textContent = SITE.phoneDisplay; });
    $$("[data-address-text]").forEach((el) => { el.textContent = SITE.address; });
    $$("[data-maps]").forEach((el) => { el.setAttribute("href", SITE.mapsUrl); });
    $$("[data-mail]").forEach((el) => { el.setAttribute("href", "mailto:" + SITE.email); });
    $$("[data-mail-text]").forEach((el) => { el.textContent = SITE.email; });
    $$("[data-wa]").forEach((el) => {
      const key = el.getAttribute("data-wa");
      const msg = key ? waMessage(key) : "";
      el.setAttribute("href", waLink(msg));
    });
  }

  function waLink(text) {
    const base = "https://wa.me/" + SITE.whatsapp;
    return text ? base + "?text=" + encodeURIComponent(text) : base;
  }

  function waMessage(kind) {
    const es = (window.I18N && I18N.lang === "es");
    if (kind === "deal") {
      return es
        ? "Hola Pacho's, vi una oferta en su página web y quisiera aprovecharla. ¿Me pueden dar más información?"
        : "Hi Pacho's, I saw a deal on your website and I'd like to use it. Can you give me more info?";
    }
    if (kind === "quote") {
      return es
        ? "Hola Pacho's, quisiera un presupuesto para mi carro. Les cuento lo que está pasando:"
        : "Hi Pacho's, I'd like a quote for my car. Here's what's going on:";
    }
    return es
      ? "Hola Pacho's, vengo de su página web y quisiera pautar una cita."
      : "Hi Pacho's, I'm coming from your website and I'd like to book an appointment.";
  }
  window.waLink = waLink;

  /* ---------- Shop clock (always in Miami time) ---------- */
  function shopNow() {
    const now = new Date();
    let local;
    try {
      local = new Date(now.toLocaleString("en-US", { timeZone: SITE.tz }));
      if (isNaN(local.getTime())) local = now;
    } catch (e) {
      local = now;
    }
    return local;
  }

  function isOpenNow() {
    const d = shopNow();
    const span = SITE.hours[d.getDay()];
    if (!span) return false;
    const mins = d.getHours() * 60 + d.getMinutes();
    return mins >= span[0] && mins < span[1];
  }

  /* When the shop is closed, work out when it opens again. */
  function nextOpening() {
    const d = shopNow();
    const nowMin = d.getHours() * 60 + d.getMinutes();
    for (let i = 0; i < 8; i++) {
      const day = (d.getDay() + i) % 7;
      const span = SITE.hours[day];
      if (!span) continue;
      if (i === 0 && nowMin >= span[0]) continue; // today's opening already passed
      return { offset: i, day: day, minutes: span[0] };
    }
    return null;
  }

  const DAY_KEYS = ["day.sun", "day.mon", "day.tue", "day.wed", "day.thu", "day.fri", "day.sat"];

  function clockLabel(mins) {
    const h24 = Math.floor(mins / 60);
    const m = mins % 60;
    const suffix = h24 < 12 ? "AM" : "PM";
    const h = h24 % 12 === 0 ? 12 : h24 % 12;
    return h + ":" + String(m).padStart(2, "0") + " " + suffix;
  }

  function nextOpeningText() {
    const next = nextOpening();
    if (!next) return "";
    const t = (k) => (window.I18N ? I18N.t(k) : k);
    const time = clockLabel(next.minutes);
    if (next.offset === 0) return t("shop.opensToday") + " " + time;
    if (next.offset === 1) return t("shop.opensTomorrow") + " " + time;
    let day = t(DAY_KEYS[next.day]);
    if (window.I18N && I18N.lang === "es") day = day.toLocaleLowerCase("es");
    return t("shop.opens") + " " + day + " " + t("shop.opensAt") + " " + time;
  }

  function paintStatus() {
    const open = isOpenNow();
    $$("[data-status]").forEach((el) => {
      el.classList.toggle("is-open", open);
      el.classList.toggle("is-closed", !open);
      const label = el.querySelector("[data-status-text]");
      if (label) label.textContent = window.I18N ? I18N.t(open ? "shop.open" : "shop.closed") : (open ? "Open now" : "Closed now");
    });
    const today = shopNow().getDay();
    $$("[data-day]").forEach((row) => {
      row.classList.toggle("is-today", Number(row.getAttribute("data-day")) === today);
    });
    // Tell people when we open again rather than just "closed"
    const nextText = open ? "" : nextOpeningText();
    $$("[data-next-open]").forEach((el) => {
      el.textContent = nextText;
      el.hidden = !nextText;
    });

    // "Today" line used on the appointment rail
    const t = $("[data-today-hours]");
    if (t) {
      const span = SITE.hours[today];
      t.textContent = span
        ? (window.I18N ? I18N.t(today === 6 ? "hours.sat" : "hours.weekday") : "8:30 AM – 5:30 PM")
        : (window.I18N ? I18N.t("hours.closed") : "Closed");
    }
  }

  /* ---------- Header / drawer ---------- */
  function initHeader() {
    const header = $(".header");
    const burger = $(".burger");
    const drawer = $(".drawer");

    if (header) {
      const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 8);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    if (burger && drawer) {
      const close = () => {
        burger.setAttribute("aria-expanded", "false");
        drawer.classList.remove("is-open");
        document.body.style.overflow = "";
      };
      burger.addEventListener("click", () => {
        const open = burger.getAttribute("aria-expanded") === "true";
        if (open) { close(); return; }
        burger.setAttribute("aria-expanded", "true");
        drawer.classList.add("is-open");
        document.body.style.overflow = "hidden";
      });
      drawer.addEventListener("click", (e) => { if (e.target.closest("a")) close(); });
      document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
      window.addEventListener("resize", () => { if (window.innerWidth >= 1000) close(); });
    }
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    const items = $$(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    items.forEach((el) => io.observe(el));
  }

  /* ---------- Scroll spy for desktop nav ---------- */
  function initSpy() {
    const links = $$(".nav a[href^='#']");
    if (!links.length || !("IntersectionObserver" in window)) return;
    const map = new Map();
    links.forEach((a) => {
      const sec = document.getElementById(a.getAttribute("href").slice(1));
      if (sec) map.set(sec, a);
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((a) => a.classList.remove("is-active"));
          const active = map.get(entry.target);
          if (active) active.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    map.forEach((_, sec) => io.observe(sec));
  }

  /* ---------- Back to top ---------- */
  function initTop() {
    const btn = $(".fab--top");
    if (!btn) return;
    const onScroll = () => btn.classList.toggle("is-visible", window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    });
  }

  /* ---------- Coupon codes: click to copy, and carry into the form ---------- */
  function initCoupons() {
    $$(".coupon__code").forEach((el) => {
      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");
      const fire = () => {
        const code = el.getAttribute("data-code") || el.textContent.trim();
        const restore = el.textContent;
        const done = () => {
          el.classList.add("is-copied");
          el.textContent = window.I18N ? I18N.t("deals.copied") : "Copied!";
          setTimeout(() => { el.classList.remove("is-copied"); el.textContent = restore; }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(code).then(done).catch(done);
        } else {
          done();
        }
      };
      el.addEventListener("click", fire);
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fire(); }
      });
    });
  }

  /* ---------- Duplicate ticker/marquee content for a seamless loop ---------- */
  function initLoops() {
    $$("[data-loop]").forEach((track) => {
      const clone = track.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.removeAttribute("data-loop");
      Array.from(clone.children).forEach((c) => track.appendChild(c));
    });
  }

  /* ---------- Year in footer ---------- */
  function initYear() {
    $$("[data-year]").forEach((el) => { el.textContent = String(new Date().getFullYear()); });
  }

  /* ---------- Boot ---------- */
  function boot() {
    initLoops();
    wireContacts();
    initHeader();
    initReveal();
    initSpy();
    initTop();
    initCoupons();
    initYear();
    paintStatus();
    setInterval(paintStatus, 60000);
    document.addEventListener("langchange", () => { paintStatus(); wireContacts(); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
