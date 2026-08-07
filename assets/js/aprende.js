/* =============================================================================
   GERALD MARKET · centro de aprendizaje gratuito
   -----------------------------------------------------------------------------
   Tres cosas:
     1. Marca las clases ya vistas y mueve la barra de avance.
     2. Guarda si la persona ya desbloqueó las clases finales.
     3. Recoge el nombre y el contacto y los entrega por WhatsApp o correo.

   AVISO IMPORTANTE PARA QUIEN PUBLIQUE ESTO
   El desbloqueo vive en el navegador de la persona (localStorage). Sirve para
   la experiencia y para pedir el contacto, pero NO protege nada: cualquiera
   con algo de maña puede saltárselo. Mientras no haya un servidor detrás:
     · sube los videos como «no listados» o privados, nunca públicos;
     · no pongas aquí nada que de verdad no puedas regalar.
   En el README está explicado cómo conectar un servicio real de correo o CRM.
   ========================================================================== */
(function () {
  "use strict";

  var K_ABIERTO = "gm.abierto";
  var K_VISTAS = "gm.vistas";

  function leer(k, alt) {
    try { var v = localStorage.getItem(k); return v === null ? alt : JSON.parse(v); }
    catch (e) { return alt; }
  }
  function guardar(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {}
  }

  var abierto = leer(K_ABIERTO, false) === true;
  var vistas = leer(K_VISTAS, []);
  if (!Array.isArray(vistas)) vistas = [];

  var clases = [].slice.call(document.querySelectorAll("[data-lesson]"));
  if (!clases.length) return;

  var muro = document.querySelector("[data-gate]");
  var barra = document.querySelector("[data-prog-fill]");
  var cuenta = document.querySelector("[data-prog-count]");
  var aviso = document.querySelector("[data-gate-done]");

  function esGratis(el) { return el.getAttribute("data-open") === "true"; }
  function num(el) { return parseInt(el.getAttribute("data-lesson"), 10); }

  function pintar() {
    var accesibles = 0;
    clases.forEach(function (el) {
      var n = num(el);
      var libre = esGratis(el) || abierto;
      if (libre) accesibles++;
      el.setAttribute("data-state",
        !libre ? "locked" : (vistas.indexOf(n) > -1 ? "done" : "open"));

      var etiqueta = el.querySelector("[data-state-label]");
      if (etiqueta) {
        etiqueta.textContent = !libre ? "Bloqueada"
          : (vistas.indexOf(n) > -1 ? "Vista" : "Disponible");
        etiqueta.className = "chip " + (!libre ? "" : (vistas.indexOf(n) > -1 ? "chip--up" : "chip--gold"));
      }
    });

    var hechas = clases.filter(function (el) { return vistas.indexOf(num(el)) > -1; }).length;
    if (barra) barra.style.width = Math.round(hechas / clases.length * 100) + "%";
    if (cuenta) cuenta.textContent = hechas + " de " + clases.length;

    if (muro) muro.hidden = abierto;
    if (aviso) aviso.hidden = !abierto;
    return accesibles;
  }

  /* Ver una clase: se marca como vista. Con video real esto se dispara al
     abrirlo; por ahora, al pulsar la ficha. */
  clases.forEach(function (el) {
    el.addEventListener("click", function (e) {
      var libre = esGratis(el) || abierto;
      if (!libre) {
        e.preventDefault();
        if (muro) muro.scrollIntoView({ behavior: "smooth", block: "center" });
        var primero = document.getElementById("g-nombre");
        if (primero) setTimeout(function () { primero.focus(); }, 400);
        return;
      }
      var n = num(el);
      if (vistas.indexOf(n) === -1) { vistas.push(n); guardar(K_VISTAS, vistas); pintar(); }
    });
  });

  /* ------------------------------------------------------------- el muro */
  var form = document.getElementById("gate-form");
  if (form) {
    var SITE = window.GM_SITE || { whatsapp: "", email: "", mentor: "Gerald" };

    function marcar(el, msg) {
      var caja = el.closest(".field");
      var err = caja && caja.querySelector(".err");
      el.setAttribute("aria-invalid", msg ? "true" : "false");
      if (err) err.textContent = msg || "";
      return !msg;
    }

    var RE_MAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function validar() {
      var ok = true;
      var nombre = form.elements.nombre;
      ok = marcar(nombre, nombre.value.trim().length >= 2 ? "" : "Escribe tu nombre.") && ok;

      var contacto = form.elements.contacto;
      var v = contacto.value.trim();
      var esMail = RE_MAIL.test(v);
      var esTel = v.replace(/\D/g, "").length >= 7;
      ok = marcar(contacto, (esMail || esTel) ? "" : "Deja un correo o un número de teléfono.") && ok;

      if (!ok) {
        var malo = form.querySelector('[aria-invalid="true"]');
        if (malo) { malo.focus(); malo.scrollIntoView({ block: "center", behavior: "smooth" }); }
      }
      return ok;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validar()) return;

      var texto = [
        "Hola " + SITE.mentor + ", quiero desbloquear las clases gratis.",
        "",
        "Nombre: " + form.elements.nombre.value.trim(),
        "Contacto: " + form.elements.contacto.value.trim()
      ].join("\n");

      abierto = true;
      guardar(K_ABIERTO, true);
      pintar();

      // se entrega el contacto por WhatsApp; sin servidor, es la vía honesta
      window.open("https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(texto),
                  "_blank", "noopener");

      var destino = document.querySelector('[data-lesson][data-open="false"]');
      if (destino) destino.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    form.querySelectorAll("input").forEach(function (el) {
      el.addEventListener("input", function () {
        if (el.getAttribute("aria-invalid") === "true") validar();
      });
    });
  }

  pintar();
})();
