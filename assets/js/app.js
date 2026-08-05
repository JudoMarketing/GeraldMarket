/* =============================================================================
   GERALD MARKET · comportamiento del sitio
   -----------------------------------------------------------------------------
   Un solo lugar para los datos de contacto (SITE). Cambia ahí el teléfono, el
   WhatsApp o el correo y se actualizan todos los botones y enlaces del sitio.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------ SITE */
  /* BORRADOR: estos datos son de relleno. Reemplazar por los reales antes de
     publicar. Están todos marcados en el README. */
  var SITE = {
    marca:      "Gerald Market",
    mentor:     "Gerald",
    telDisplay: "+1 (305) 000-0000",
    tel:        "+13050000000",
    whatsapp:   "13050000000",            // solo dígitos, código de país primero
    email:      "hola@geraldmarket.com",
    ig:         "https://instagram.com/",
    waSaludo:   "Hola Gerald, vengo de la web de Gerald Market y quiero información sobre las clases."
  };

  window.GM_SITE = SITE;

  var wa = function (texto) {
    return "https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(texto || SITE.waSaludo);
  };

  function fillLinks() {
    document.querySelectorAll("[data-tel]").forEach(function (a) { a.href = "tel:" + SITE.tel; });
    document.querySelectorAll("[data-tel-text]").forEach(function (n) { n.textContent = SITE.telDisplay; });
    document.querySelectorAll("[data-wa]").forEach(function (a) {
      a.href = wa(a.getAttribute("data-wa") || "");
      a.target = "_blank";
      a.rel = "noopener";
    });
    document.querySelectorAll("[data-mail]").forEach(function (a) { a.href = "mailto:" + SITE.email; });
    document.querySelectorAll("[data-mail-text]").forEach(function (n) { n.textContent = SITE.email; });
    document.querySelectorAll("[data-year]").forEach(function (n) { n.textContent = new Date().getFullYear(); });
  }

  /* --------------------------------------------------------------- cabecera */
  function header() {
    var hdr = document.querySelector(".hdr");
    if (!hdr) return;
    var stuck = false;
    function onScroll() {
      var s = scrollY > 12;
      if (s !== stuck) { stuck = s; hdr.classList.toggle("hdr--stuck", s); }
    }
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function drawer() {
    var btn = document.querySelector(".burger");
    var box = document.querySelector(".drawer");
    if (!btn || !box) return;

    function set(open) {
      btn.setAttribute("aria-expanded", String(open));
      box.setAttribute("data-open", String(open));
    }
    btn.addEventListener("click", function () {
      set(btn.getAttribute("aria-expanded") !== "true");
    });
    box.addEventListener("click", function (e) {
      if (e.target.closest("a")) set(false);
    });
    addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
    matchMedia("(min-width: 960px)").addEventListener("change", function () { set(false); });
  }

  /* ------------------------------------------------- barra fija en el móvil */
  function dock() {
    var el = document.querySelector(".dock");
    if (!el) return;
    var last = 0;
    function onScroll() {
      var y = scrollY;
      var show = y > 420 && (y < last || y > document.body.scrollHeight - innerHeight - 600);
      el.setAttribute("data-on", String(show));
      last = y;
    }
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* -------------------------------------------------------------- revelado */
  function reveal() {
    var els = document.querySelectorAll(".rv");
    if (!els.length) return;
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach(function (e) { e.setAttribute("data-in", "true"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.setAttribute("data-in", "true");
        io.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .06 });
    els.forEach(function (e, i) {
      e.style.transitionDelay = (Math.min(i % 4, 3) * 60) + "ms";
      io.observe(e);
    });
  }

  /* --------------------------------------------- acordeón: uno abierto a la vez */
  function accordions() {
    document.querySelectorAll(".acc").forEach(function (group) {
      var items = group.querySelectorAll("details");
      items.forEach(function (d) {
        d.addEventListener("toggle", function () {
          if (!d.open) return;
          items.forEach(function (o) { if (o !== d) o.open = false; });
        });
      });
    });
  }

  /* ------------------------------------- enlaces "quiero este plan" a WhatsApp */
  function planLinks() {
    document.querySelectorAll("[data-plan]").forEach(function (a) {
      var p = a.getAttribute("data-plan");
      a.href = wa("Hola " + SITE.mentor + ", quiero información sobre: " + p + ".");
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  function boot() {
    fillLinks();
    planLinks();
    header();
    drawer();
    dock();
    reveal();
    accordions();
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", boot)
    : boot();
})();
