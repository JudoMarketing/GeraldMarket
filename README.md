# Gerald Market — sitio web (borrador)

Portal de formación en trading, **íntegramente en español**, para Gerald Market.

HTML, CSS y JavaScript sin dependencias. No hay compilación, ni framework, ni
servidor: se abre `index.html` o se sube la carpeta a cualquier hosting.

> **Esto es un borrador.** Los textos, los datos de contacto, la foto y varios
> precios son de relleno. La lista completa de lo que hay que reemplazar está
> al final, en **[Antes de publicar](#antes-de-publicar)**.

---

## Las tres páginas

| Archivo | Página | Qué lleva |
|---|---|---|
| `index.html` | **Inicio** | Portada a pantalla completa con el gráfico de velas en movimiento, la comparación «sin método / con método», los cuatro pasos, el resumen de programas, quién enseña y las preguntas frecuentes. |
| `educate.html` | **Educate!** | El portal educativo: el 1 a 1 en detalle, los 9 módulos de *Aprende desde cero*, los Niveles 1 y 2, la tabla comparativa y las preguntas. |
| `contacto.html` | **Contacto** | Foto y historia de Gerald, botones de llamar y WhatsApp, y el formulario. |

## Estructura de archivos

```
index.html · educate.html · contacto.html
assets/css/styles.css        Sistema de diseño y estilos de todas las páginas
assets/css/fonts.css         @font-face de las tres tipografías
assets/fonts/*.woff2         Archivo Black, Archivo, JetBrains Mono (latin + latin-ext)
assets/js/market.js          Gráfico de velas animado + velas decorativas + cinta
assets/js/app.js             Datos de contacto (SITE), cabecera, menú, revelados
assets/js/contacto.js        Validación del formulario y armado del mensaje
assets/img/logo-mark.svg     El isotipo (cabecera y pie)
assets/img/favicon.svg       Icono de pestaña y de pantalla de inicio
assets/img/mentor-placeholder.svg   Marco de «foto pendiente» — a reemplazar
robots.txt · sitemap.xml · site.webmanifest · vercel.json
```

---

## Lo que hay que tocar para editar

### Teléfono, WhatsApp y correo — un solo sitio
Todo está en el objeto `SITE`, al principio de **`assets/js/app.js`**. Se cambia
ahí y se actualizan todos los botones y enlaces del sitio de una vez.

```js
var SITE = {
  marca:      "Gerald Market",
  mentor:     "Gerald",
  telDisplay: "+1 (305) 000-0000",   // como se lee en pantalla
  tel:        "+13050000000",        // como se marca
  whatsapp:   "13050000000",         // solo dígitos, código de país primero
  email:      "hola@geraldmarket.com",
  waSaludo:   "Hola Gerald, vengo de la web…"
};
```

Los ceros son un marcador de posición evidente **a propósito**, para que no se
publique por error un número inventado.

### Precios y contenidos de los programas
Están escritos directamente en el HTML, sin diccionarios de por medio:

- El bloque del **1 a 1** aparece dos veces: en `index.html` (sección
  `#programas`) y completo en `educate.html` (sección `#uno-a-uno`).
- Los **9 módulos** están en `educate.html`, en el bloque `.mods`.
- La **tabla comparativa** está en `educate.html`, sección `#comparar`.
- El precio se muestra siempre dentro de `.plan__px`.

### Botones «quiero este plan»
Cualquier enlace con `data-plan="…"` se convierte solo en un mensaje de
WhatsApp con ese texto ya escrito. Para añadir uno nuevo basta con:

```html
<a class="btn btn--sig" data-plan="Nivel 1 ($100)" href="#">Quiero el Nivel 1</a>
```

### El formulario de contacto
No manda nada por su cuenta: valida, arma un mensaje ordenado y lo abre en
WhatsApp o en el correo para que lo envíe la persona. Así no hay servidor de por
medio ni datos guardados en ningún lado.

Si más adelante se quiere recibir en una bandeja o en un CRM, se conecta un
servicio tipo Formspree, Netlify Forms o Google Apps Script desde
`assets/js/contacto.js`. Los `name` de los campos ya son sensatos: `nombre`,
`telefono`, `email`, `interes`, `nivel`, `mensaje`, `acepto`.

---

## El diseño

La idea de partida: **la página no habla del mercado, la página es una pantalla
de mercado.** De ahí sale todo lo demás.

| | |
|---|---|
| **Fondo** | negro `#04070A`, paneles `#070B10`, tarjetas `#0E141B` |
| **Verde** | `#00D68F` — sube, incluido, largo |
| **Rojo** | `#FF3D57` — baja, riesgo, corto |
| **Amarillo** | `#FFD400` — el marcador con el que un trader raya el gráfico. Por eso es el color de los botones de acción. |
| **Titulares** | Archivo Black, muy apretado |
| **Texto** | Archivo (variable) |
| **Números** | JetBrains Mono — precios, tickers, índices de módulo, etiquetas de eje |
| **Esquinas** | 4–8 px. Los terminales son cuadrados, no redondeados. |

**El verde y el rojo nunca son decoración.** Si algo está en verde es porque
sube o está incluido; si está en rojo es porque baja o advierte de un riesgo.
Esa regla es la que hace que la paleta se lea como un mercado y no como un
sitio genérico en modo oscuro.

Recursos que se repiten para dar identidad: la retícula de gráfico detrás de
las secciones, los encabezados numerados como leyendas de indicador
(`01 / MÉTODO`), el eje de precios a la derecha del gráfico del hero y las
viñetas con forma de vela en todas las listas.

Deliberadamente **fuera**: cristal esmerilado (`backdrop-filter`), esferas de
degradado flotando de fondo, texto relleno con degradado y emojis como
iconos de sección. Son las marcas de una página generada, y se notan.

### El gráfico de velas en movimiento
`assets/js/market.js` dibuja un gráfico de velas real sobre un `<canvas>`:
camina el precio cada 70 ms, forma la vela en curso, la cierra cada 1,5 s,
empuja el gráfico a la izquierda y redibuja la retícula, el eje y la etiqueta
del precio actual.

- Usa un generador con semilla fija, así el gráfico se ve **igual en cada
  carga** — la marca queda consistente.
- Se **detiene solo** cuando la pestaña se oculta o cuando el hero sale de la
  pantalla, para no gastar batería en el móvil.
- Con `prefers-reduced-motion` activado dibuja un solo fotograma y no anima
  nada.

Las velas decorativas del resto del sitio salen del mismo archivo: cualquier
elemento con `data-candles="24"` se rellena solo, y `data-bias="-1"` o `"1"` le
da pendiente bajista o alcista.

**Ninguno de esos datos es real** y el sitio lo dice: hay una nota bajo el
gráfico del hero y otra en el aviso de riesgo del pie.

### Tipografías propias
Están en `assets/fonts/` y se declaran en `assets/css/fonts.css`. La página
hace **cero peticiones a terceros**: nada a Google, ningún rastreador, ninguna
cookie. El único almacenamiento del navegador que se usa es… ninguno.

---

## Antes de publicar

Todo esto es de relleno y hay que confirmarlo o reemplazarlo:

1. **Teléfono, WhatsApp y correo.** Los de `SITE` en `assets/js/app.js` son
   marcadores (`+1 (305) 000-0000`). Sin esto, ningún botón funciona.
2. **El precio del Nivel 2.** No se indicó. En toda la web aparece como
   «Consultar / precio por confirmar». En cuanto haya cifra, se cambia en
   `index.html` (`#programas`), en `educate.html` (`#nivel-2`) y en la fila
   «Precio» de la tabla comparativa.
3. **La foto de Gerald.** Ahora hay un marco que dice «FOTO PENDIENTE». Se
   reemplaza el `src` de los dos `<img>` que apuntan a
   `assets/img/mentor-placeholder.svg` (uno en `index.html`, otro en
   `contacto.html`). Un retrato vertical, buena luz, fondo oscuro si es posible.
4. **La historia de Gerald.** El texto de `contacto.html` (`#historia`) y el del
   bloque «Quién enseña» de `index.html` son de ejemplo. Hay que sustituirlos por
   su biografía real. También la frase entrecomillada.
5. **Los títulos de los 9 módulos** son una propuesta. Ajustar al temario real.
6. **Los temas de los Niveles 1 y 2** son una propuesta. Confirmar.
7. **Métodos de pago.** Una de las preguntas de `educate.html` lo deja abierto.
8. **El dominio.** `canonical`, las etiquetas `og:`, `sitemap.xml` y `robots.txt`
   usan `https://geraldmarket.com/`. Cambiar al dominio real.
9. **Imagen para redes (`og:image`).** No hay. Conviene generar una de
   1200 × 630 px con el logo sobre el gráfico y añadirla a las tres páginas.
10. **Instagram / redes.** `SITE.ig` apunta a la raíz de Instagram; poner el
    perfil real y, si se quiere, añadir los enlaces al pie.

### Sobre el aviso de riesgo
El pie de las tres páginas lleva un aviso de riesgo y deja claro que Gerald
Market da **formación**, no asesoría financiera, y que no garantiza resultados.
No es adorno legal: en formación sobre mercados es justo lo que separa a un
sitio serio de uno que parece una estafa, y ninguna afirmación de la web promete
rentabilidad. **Recomendamos no quitarlo**, y que un abogado lo revise antes de
cobrar el primer pago.

---

## Publicar

Es un sitio estático: sirve cualquier hosting.

- **Vercel** — importar el repositorio, preset «Other», sin comando de
  compilación ni carpeta de salida. `vercel.json` ya trae las URL limpias y el
  caché de las tipografías.
- **Netlify / Cloudflare Pages** — arrastrar la carpeta, sin comando de build.
- **GitHub Pages** — Settings → Pages → desplegar desde la raíz de la rama.

## Accesibilidad y rendimiento

- Diseñado primero para el móvil. Barra fija abajo con «Ver programas» y
  «WhatsApp» siempre al alcance del pulgar.
- Enlace para saltar al contenido, foco visible, `aria-expanded` en el menú,
  campos etiquetados y `role="alert"` en los errores del formulario.
- `prefers-reduced-motion` desactiva el gráfico animado, la cinta y todas las
  transiciones.
- Sin framework, sin rastreo, sin cookies, sin peticiones externas.
