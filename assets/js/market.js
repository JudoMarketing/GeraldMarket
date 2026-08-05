/* =============================================================================
   GERALD MARKET — motor de velas
   -----------------------------------------------------------------------------
   1. Chart()  : el gráfico de velas vivo que corre detrás del hero. Camina el
                 precio, forma la vela actual, la cierra, empuja el gráfico a la
                 izquierda y redibuja. Canvas 2D, sin librerías.
   2. velas    : rellena cualquier [data-candles] con velas CSS decorativas.
   3. cinta    : arma el ticker de la parte superior.

   IMPORTANTE: todo lo que se ve aquí es DEMOSTRATIVO. No hay datos de mercado
   reales, ni conexión a ningún bróker. Es la identidad visual del sitio.
   ========================================================================== */
(function () {
  "use strict";

  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* PRNG con semilla: el gráfico se ve igual en cada carga, así la marca es
     consistente y las capturas de pantalla son reproducibles. */
  function seeded(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function css(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  /* =========================================================== 1. el gráfico */

  function Chart(canvas) {
    this.cv = canvas;
    this.cx = canvas.getContext("2d", { alpha: true });
    this.rnd = seeded(20260805);

    this.col = {
      up:   css("--up", "#00D68F"),
      down: css("--down", "#FF3D57"),
      sig:  css("--sig", "#FFD400"),
      grid: "rgba(255,255,255,.045)",
      axis: "rgba(255,255,255,.10)",
      text: "rgba(255,255,255,.32)"
    };

    this.BAR = 1500;          // ms que dura cada vela
    this.TICK = 70;           // ms entre movimientos de precio
    this.px = 100;            // precio de arranque
    this.drift = 0;
    this.bars = [];
    this.range = null;        // {lo, hi} suavizado
    this.acc = 0;
    this.tickAcc = 0;
    this.last = 0;
    this.running = false;

    this.resize();
    this.seedHistory();

    var self = this;
    this._onResize = function () { self.resize(); self.seedHistory(); self.draw(1); };
    addEventListener("resize", this._onResize, { passive: true });

    if (reduce) { this.draw(1); return; }

    // no gastar batería si la pestaña está oculta o el hero no se ve
    document.addEventListener("visibilitychange", function () {
      document.hidden ? self.stop() : self.start();
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        es[0].isIntersecting ? self.start() : self.stop();
      }, { threshold: 0 }).observe(canvas);
    } else {
      this.start();
    }
  }

  Chart.prototype.resize = function () {
    var r = this.cv.getBoundingClientRect();
    var dpr = Math.min(devicePixelRatio || 1, 2);
    this.w = Math.max(320, r.width);
    this.h = Math.max(360, r.height);
    this.cv.width = Math.round(this.w * dpr);
    this.cv.height = Math.round(this.h * dpr);
    this.cx.setTransform(dpr, 0, 0, dpr, 0, 0);

    this.padR = this.w < 620 ? 46 : 64;      // eje de precios
    this.padT = 18;
    this.padB = 22;
    this.cw = this.w < 620 ? 7 : 11;         // ancho del cuerpo
    this.gap = this.w < 620 ? 3 : 5;
    this.stepX = this.cw + this.gap;
    this.count = Math.ceil((this.w - this.padR) / this.stepX) + 3;
  };

  /* Camina el precio una vez y lo mete en la vela en formación. */
  Chart.prototype.tick = function () {
    var r = this.rnd();
    this.drift = (this.drift + (this.rnd() - .5) * .085) * .965;
    this.px *= 1 + this.drift * .0011 + (r - .5) * .0026;
    var b = this.bars[this.bars.length - 1];
    b.c = this.px;
    if (this.px > b.h) b.h = this.px;
    if (this.px < b.l) b.l = this.px;
  };

  Chart.prototype.newBar = function () {
    this.bars.push({ o: this.px, h: this.px, l: this.px, c: this.px });
    if (this.bars.length > this.count) this.bars.shift();
  };

  /* Historia inicial: la pantalla arranca ya con el gráfico "corrido". */
  Chart.prototype.seedHistory = function () {
    this.rnd = seeded(20260805);
    this.px = 100; this.drift = 0; this.bars = []; this.range = null;
    for (var i = 0; i < this.count; i++) {
      this.newBar();
      for (var t = 0; t < 20; t++) this.tick();
    }
  };

  Chart.prototype.start = function () {
    if (this.running || reduce) return;
    this.running = true;
    this.last = 0;
    var self = this;
    this.raf = requestAnimationFrame(function (t) { self.frame(t); });
  };

  Chart.prototype.stop = function () {
    this.running = false;
    cancelAnimationFrame(this.raf);
  };

  Chart.prototype.frame = function (now) {
    if (!this.running) return;
    if (!this.last) this.last = now;
    var dt = Math.min(now - this.last, 120);   // tras una pausa, no saltar
    this.last = now;

    this.tickAcc += dt;
    while (this.tickAcc >= this.TICK) { this.tick(); this.tickAcc -= this.TICK; }

    this.acc += dt;
    while (this.acc >= this.BAR) { this.newBar(); this.acc -= this.BAR; }

    this.draw(this.acc / this.BAR);

    var self = this;
    this.raf = requestAnimationFrame(function (t) { self.frame(t); });
  };

  /* Escala vertical suavizada: si no, el gráfico "salta" al entrar una mecha. */
  Chart.prototype.scale = function () {
    var lo = Infinity, hi = -Infinity;
    for (var i = 0; i < this.bars.length; i++) {
      if (this.bars[i].l < lo) lo = this.bars[i].l;
      if (this.bars[i].h > hi) hi = this.bars[i].h;
    }
    var pad = (hi - lo) * .18 || 1;
    lo -= pad; hi += pad;
    if (!this.range) this.range = { lo: lo, hi: hi };
    else {
      this.range.lo += (lo - this.range.lo) * .06;
      this.range.hi += (hi - this.range.hi) * .06;
    }
    return this.range;
  };

  Chart.prototype.draw = function (frac) {
    var c = this.cx, w = this.w, h = this.h;
    var plotW = w - this.padR;
    var top = this.padT, bot = h - this.padB, ih = bot - top;
    var r = this.scale();
    var span = r.hi - r.lo || 1;
    var self = this;
    function y(p) { return bot - (p - r.lo) / span * ih; }

    c.clearRect(0, 0, w, h);

    /* --- retícula --------------------------------------------------------- */
    c.lineWidth = 1;
    c.strokeStyle = this.col.grid;
    c.beginPath();
    var rows = h < 520 ? 5 : 7;
    for (var i = 0; i <= rows; i++) {
      var yy = Math.round(top + ih * (i / rows)) + .5;
      c.moveTo(0, yy); c.lineTo(plotW, yy);
    }
    var colStep = this.stepX * 6;
    for (var x = plotW; x > 0; x -= colStep) {
      var xx = Math.round(x - frac * this.stepX) + .5;
      c.moveTo(xx, top); c.lineTo(xx, bot);
    }
    c.stroke();

    /* --- etiquetas del eje de precios ------------------------------------ */
    c.font = '500 10px "JetBrains Mono", ui-monospace, monospace';
    c.fillStyle = this.col.text;
    c.textAlign = "left";
    c.textBaseline = "middle";
    for (var j = 0; j <= rows; j++) {
      var p = r.hi - span * (j / rows);
      c.fillText(p.toFixed(2), plotW + 9, top + ih * (j / rows));
    }
    c.strokeStyle = this.col.axis;
    c.beginPath();
    c.moveTo(plotW + .5, 0); c.lineTo(plotW + .5, h);
    c.stroke();

    /* --- velas ------------------------------------------------------------ */
    var n = this.bars.length;
    var xRight = plotW - 6 - frac * this.stepX;
    for (var k = n - 1; k >= 0; k--) {
      var b = this.bars[k];
      var cx = xRight - (n - 1 - k) * this.stepX;
      if (cx < -this.stepX) break;
      var up = b.c >= b.o;
      var col = up ? this.col.up : this.col.down;
      var live = (k === n - 1);

      c.globalAlpha = live ? 1 : (cx < plotW * .3 ? .55 : .92);

      // mecha
      c.strokeStyle = col;
      c.lineWidth = 1;
      c.beginPath();
      var mx = Math.round(cx) + .5;
      c.moveTo(mx, y(b.h)); c.lineTo(mx, y(b.l));
      c.stroke();

      // cuerpo
      var yo = y(b.o), yc = y(b.c);
      var bt = Math.min(yo, yc), bh = Math.max(Math.abs(yo - yc), 1.5);
      c.fillStyle = col;
      c.fillRect(Math.round(cx - this.cw / 2), Math.round(bt), this.cw, Math.round(bh));
    }
    c.globalAlpha = 1;

    /* --- precio actual: línea punteada + etiqueta en el eje --------------- */
    var lastBar = this.bars[n - 1];
    var lastUp = lastBar.c >= lastBar.o;
    var lastCol = lastUp ? this.col.up : this.col.down;
    var ly = Math.round(y(lastBar.c)) + .5;

    c.save();
    c.setLineDash([3, 4]);
    c.strokeStyle = lastCol;
    c.globalAlpha = .6;
    c.beginPath(); c.moveTo(0, ly); c.lineTo(plotW, ly); c.stroke();
    c.restore();

    var label = lastBar.c.toFixed(2);
    c.font = '700 10px "JetBrains Mono", ui-monospace, monospace';
    var lw = c.measureText(label).width + 14;
    c.fillStyle = lastCol;
    c.fillRect(plotW + 1, ly - 9, Math.min(lw, this.padR - 2), 18);
    c.fillStyle = "#04070A";
    c.textAlign = "left";
    c.fillText(label, plotW + 8, ly + .5);
  };

  /* ======================================================= 2. velas en CSS */

  function fillCandles(el, rnd) {
    var n = parseInt(el.getAttribute("data-candles"), 10) || 24;
    var bias = parseFloat(el.getAttribute("data-bias") || "0");   // -1 baja, +1 sube
    var box = document.createElement("div");
    box.className = "candles";

    /* La tira tiene una pendiente real: se traza primero la línea que va del
       principio al final según el "bias" y encima se le suma ruido. Así una
       tira con bias -1 se ve caer de verdad, no solo con más velas rojas. */
    var SPAN = 58;                                  // recorrido vertical usable
    var base = 50 - bias * SPAN / 2;                // punto de partida
    var pts = [];
    var noise = 0;
    for (var p = 0; p <= n; p++) {
      noise = noise * .5 + (rnd() - .5) * 19;
      var v = base + bias * SPAN * (n ? p / n : 0) + noise;
      pts.push(Math.max(8, Math.min(92, v)));
    }

    for (var i = 0; i < n; i++) {
      var open = pts[i];
      var close = pts[i + 1];
      if (Math.abs(close - open) < 12) {            // cuerpos visibles siempre
        close = open + (close >= open ? 12 : -12);
        close = Math.max(8, Math.min(92, close));
      }
      var up = close >= open;

      var bodyTop = 100 - Math.max(open, close);
      var bodyBot = Math.min(open, close);
      var wickTop = Math.max(1, bodyTop - (2 + rnd() * 8));
      var wickBot = Math.max(1, bodyBot - (2 + rnd() * 8));

      var d = document.createElement("div");
      d.className = "candle " + (up ? "candle--up" : "candle--down");
      d.style.setProperty("--bt", bodyTop.toFixed(1));
      d.style.setProperty("--bb", bodyBot.toFixed(1));
      d.style.setProperty("--wt", wickTop.toFixed(1));
      d.style.setProperty("--wb", wickBot.toFixed(1));
      box.appendChild(d);
    }
    el.textContent = "";
    el.setAttribute("aria-hidden", "true");
    el.appendChild(box);
  }

  /* ============================================================ 3. la cinta */

  var TAPE = [
    ["EUR/USD", "1.0914", +0.24], ["XAU/USD", "2 391.40", +0.86],
    ["US100",   "18 942", -0.41], ["BTC/USD", "64 180", +1.92],
    ["GBP/USD", "1.2733", -0.12], ["US500",   "5 284", +0.33],
    ["USD/JPY", "156.21", +0.58], ["WTI",     "78.94", -1.07],
    ["ETH/USD", "3 142", +0.71],  ["DAX",     "18 336", -0.19]
  ];

  function buildTape(el) {
    var track = document.createElement("div");
    track.className = "tape__track";
    // dos vueltas idénticas: el bucle a -50% queda perfecto
    for (var pass = 0; pass < 2; pass++) {
      for (var i = 0; i < TAPE.length; i++) {
        var t = TAPE[i], up = t[2] >= 0;
        var s = document.createElement("span");
        s.className = "tape__i";
        s.innerHTML =
          '<span class="tape__sym">' + t[0] + '</span>' +
          '<span class="tape__px">' + t[1] + '</span>' +
          '<span class="tape__ch" data-dir="' + (up ? "up" : "down") + '">' +
          (up ? "▲" : "▼") + " " + Math.abs(t[2]).toFixed(2) + '%</span>';
        track.appendChild(s);
      }
    }
    el.textContent = "";
    el.setAttribute("aria-hidden", "true");
    el.appendChild(track);
  }

  /* ================================================================ arranque */

  function boot() {
    var cv = document.querySelector("[data-chart]");
    if (cv) new Chart(cv);

    var rnd = seeded(777);
    document.querySelectorAll("[data-candles]").forEach(function (el) { fillCandles(el, rnd); });

    var tape = document.querySelector("[data-tape]");
    if (tape) buildTape(tape);
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", boot)
    : boot();
})();
