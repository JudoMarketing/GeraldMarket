/* =============================================================================
   GERALD MARKET · formulario de contacto
   -----------------------------------------------------------------------------
   No hay servidor. El formulario valida, arma un mensaje ordenado y lo entrega
   por WhatsApp, por correo o al portapapeles. Para recibirlo en un CRM o en una
   bandeja, conecta aquí un servicio tipo Formspree (ver README).
   ========================================================================== */
(function () {
  "use strict";

  var form = document.getElementById("contacto-form");
  if (!form) return;

  var SITE = window.GM_SITE || { whatsapp: "", email: "", mentor: "Gerald" };
  var aviso = form.querySelector("[data-sent]");

  function campo(name) { return form.elements[name]; }

  function marcar(el, msg) {
    var box = el.closest(".field");
    var err = box && box.querySelector(".err");
    el.setAttribute("aria-invalid", msg ? "true" : "false");
    if (err) err.textContent = msg || "";
    return !msg;
  }

  var RE_MAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function validar(silencioso) {
    var ok = true;

    var nombre = campo("nombre");
    var v = nombre.value.trim();
    ok = marcar(nombre, v.length >= 2 ? "" : "Escribe tu nombre.") && ok;

    var tel = campo("telefono");
    var digitos = tel.value.replace(/\D/g, "");
    ok = marcar(tel, digitos.length >= 7 ? "" : "Necesitamos un número para responderte.") && ok;

    var mail = campo("email");
    var mv = mail.value.trim();
    ok = marcar(mail, (!mv || RE_MAIL.test(mv)) ? "" : "Revisa el correo.") && ok;

    var acepto = campo("acepto");
    ok = marcar(acepto, acepto.checked ? "" : "Marca la casilla para poder responderte.") && ok;

    if (!silencioso && !ok) {
      var primero = form.querySelector('[aria-invalid="true"]');
      if (primero) { primero.focus(); primero.scrollIntoView({ block: "center", behavior: "smooth" }); }
    }
    return ok;
  }

  function mensaje() {
    var L = [];
    L.push("Hola " + SITE.mentor + ", vengo de la web de Gerald Market.");
    L.push("");
    L.push("Nombre: " + campo("nombre").value.trim());
    L.push("Teléfono / WhatsApp: " + campo("telefono").value.trim());
    var mail = campo("email").value.trim();
    if (mail) L.push("Correo: " + mail);

    var sel = campo("interes");
    if (sel.value) L.push("Me interesa: " + sel.options[sel.selectedIndex].text);

    var niv = campo("nivel");
    if (niv.value) L.push("Mi nivel: " + niv.options[niv.selectedIndex].text);

    var msg = campo("mensaje").value.trim();
    if (msg) { L.push(""); L.push("Mensaje:"); L.push(msg); }

    return L.join("\n");
  }

  function confirmar(texto) {
    if (!aviso) return;
    aviso.textContent = texto;
    aviso.setAttribute("data-on", "true");
  }

  form.addEventListener("submit", function (e) { e.preventDefault(); });

  form.querySelectorAll("input, select, textarea").forEach(function (el) {
    el.addEventListener("blur", function () { if (el.getAttribute("aria-invalid") === "true") validar(true); });
    el.addEventListener("input", function () { if (el.getAttribute("aria-invalid") === "true") validar(true); });
  });

  var wa = form.querySelector("[data-send-wa]");
  if (wa) wa.addEventListener("click", function () {
    if (!validar()) return;
    open("https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(mensaje()), "_blank", "noopener");
    confirmar("Se abrió WhatsApp con tu mensaje listo. Solo tienes que pulsar enviar.");
  });

  var mail = form.querySelector("[data-send-mail]");
  if (mail) mail.addEventListener("click", function () {
    if (!validar()) return;
    location.href = "mailto:" + SITE.email +
      "?subject=" + encodeURIComponent("Consulta desde la web: " + campo("nombre").value.trim()) +
      "&body=" + encodeURIComponent(mensaje());
    confirmar("Se abrió tu programa de correo con el mensaje escrito.");
  });

  var copy = form.querySelector("[data-copy]");
  if (copy) copy.addEventListener("click", function () {
    if (!validar()) return;
    var texto = mensaje();
    var listo = function () { confirmar("Mensaje copiado. Pégalo donde prefieras."); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(listo, listo);
    } else {
      var ta = document.createElement("textarea");
      ta.value = texto; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (err) {}
      document.body.removeChild(ta); listo();
    }
  });
})();
