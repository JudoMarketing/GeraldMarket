# Gerald Market — sitio web (borrador)

Portal de formación en trading, **íntegramente en español**, para Gerald Market.

HTML, CSS y JavaScript sin dependencias. No hay compilación, ni framework, ni
servidor: se abre `index.html` o se sube la carpeta a cualquier hosting.

> **Esto es un borrador.** Los textos, los datos de contacto y la foto son de
> relleno. La lista completa de lo que hay que reemplazar está al final, en
> **[Antes de publicar](#antes-de-publicar)**.

**En línea:** <https://poweroso2000.github.io/GeraldMarket/>

---

## Las tres páginas

| Archivo | Página | Qué lleva |
|---|---|---|
| `index.html` | **Inicio** | Portada a pantalla completa con el gráfico de velas en movimiento, la comparación «sin método / con método», los cuatro pasos, el resumen de programas, quién enseña y las preguntas frecuentes. |
| `educate.html` | **Educate!** | La tienda: los cuatro programas en fichas de producto con precio y botón de compra, qué incluye el 1 a 1, el temario plegado y tres preguntas. |
| `contacto.html` | **Contacto** | Foto y historia de Gerald, botones de llamar y WhatsApp, y el formulario. |

## Estructura de archivos

```
index.html · educate.html · contacto.html
assets/css/styles.css        Sistema de diseño y estilos de todas las páginas
assets/css/fonts.css         @font-face de las cuatro tipografías
assets/fonts/*.woff2         Playfair Display Italic, Archivo Black, Archivo, JetBrains Mono
assets/js/market.js          Gráfico de velas animado + cinta de cotizaciones
assets/js/app.js             Datos de contacto (SITE), cabecera, menú, revelados
assets/js/contacto.js        Validación del formulario y armado del mensaje
assets/img/logo.svg          Marca completa sobre fondo oscuro
assets/img/logo-light.svg    Marca completa sobre fondo claro (papel, prensa)
assets/img/logo-mark.svg     El monograma G (cabecera y pie)
assets/img/favicon.svg       Icono de pestaña y de pantalla de inicio
assets/img/mentor-placeholder.svg   Marco de «foto pendiente» — a reemplazar
tools/generate-logo.py       Regenera los cuatro archivos de marca
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

- Las cuatro fichas de producto están en `educate.html` (`#tienda`) y
  repetidas, más cortas, en `index.html` (`#programas`).
- Lo que incluye el **1 a 1** está en `educate.html`, sección `#uno-a-uno`.
- Los **9 módulos** están en `educate.html`, dentro del `<details>` de
  `#temario`.
- El precio se muestra siempre dentro de `.pcard__px`.
- Precios actuales: 1 a 1 **$50/mes**, Aprende desde cero **$200**, Nivel 1
  **$100**, Nivel 2 **$150**.

### Botones «quiero este plan»
Cualquier enlace con `data-plan="…"` se convierte solo en un mensaje de
WhatsApp con ese texto ya escrito. Para añadir uno nuevo basta con:

```html
<a class="btn btn--gold" data-plan="Nivel 1 ($100)" href="#">Quiero el Nivel 1</a>
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
| **Fondo** | negro `#04070A`; las cajas van de `#161E28` arriba a `#0B1119` abajo |
| **Oro** | `#E9C46A` — la marca, los acentos y los botones principales |
| **Verde** | `#00D68F` — sube, incluido, largo |
| **Rojo** | `#FF3D57` — baja, riesgo, corto |
| **Marca** | Playfair Display Italic — un serif de alto contraste, en cursiva |
| **Titulares** | Archivo Black, muy apretado |
| **Texto** | Archivo (variable) |
| **Números** | JetBrains Mono — precios, tickers, etiquetas de eje |
| **Esquinas** | 8–14 px |

### El relieve
Las cajas no son rectángulos planos: llevan un degradado de claro arriba a
oscuro abajo, un filo brillante en el borde superior (`--bevel`) y sombra
propia debajo (`--sh-1`, `--sh-2`, `--sh-3`). La luz cae siempre desde arriba.

Y el contraste es deliberado: **lo que se pulsa sobresale, lo que se rellena
está hundido**. Los botones tienen degradado y sombra proyectada; los campos
del formulario tienen sombra interior (`--sunken`) y fondo casi negro. Se nota
al instante qué es un control y qué es un hueco donde escribir.

### Los titulares están tallados
`.d1` y `.d2` no son texto plano: la cara va en crema y por debajo baja una
escalera de grises que se apaga hasta el negro, así que las letras salen de la
pantalla. La profundidad se mide en `em` (`--ext`), no en píxeles, de modo que
crece y encoge sola con el cuerpo de letra en vez de romperse en el móvil.

Dos variantes en el titular de la portada:

- **`.gold-cut`** — el mismo tallado, fundido en oro. Se usa en «lectura».
- **`.hollow`** — sin relleno: solo el filo, hecho con `-webkit-text-stroke`.
  Detrás se ve el gráfico moverse **a través de las letras**, así que la palabra
  «suerte» queda literalmente vacía. No es un adorno: dice lo mismo que la
  frase.

Como las letras ya tienen sombra propia, se pudo **aclarar el velo** que tapaba
el gráfico del hero. Ahora se ven más velas y el titular sigue leyéndose.

**El verde y el rojo nunca son decoración.** Si algo está en verde es porque
sube o está incluido; si está en rojo es porque baja o advierte de un riesgo.
Esa regla es la que hace que la paleta se lea como un mercado y no como un
sitio genérico en modo oscuro.

Recursos que se repiten para dar identidad: la retícula de gráfico detrás de
las secciones, el eje de precios a la derecha del gráfico del hero, los
numerales en cursiva dorada que hacen de portada a cada producto, y las
etiquetas en monoespaciada con mucho espaciado.

Deliberadamente **fuera**: cristal esmerilado (`backdrop-filter`), esferas de
degradado flotando de fondo, texto relleno con degradado y emojis como
iconos de sección. Son las marcas de una página generada, y se notan.

### La marca
`tools/generate-logo.py` construye los cuatro archivos a partir de la propia
Playfair Display: extrae los contornos de las letras y los escribe como
trazados SVG, así que **ningún SVG depende de una fuente instalada**. Para
rehacerlos después de cambiar algo:

```sh
python3 tools/generate-logo.py
```

«Gerald» va en crema y «Market» en oro. El monograma de la cabecera es la G en
cursiva dentro de una placa con filete dorado.

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

Las velas se usan **con cuentagotas**: el gráfico del hero, la cinta de
cotizaciones y una sola tira al pie de la portada. En Educate! y en Contacto no
hay ninguna. Si hiciera falta añadir otra, cualquier elemento con
`data-candles="24"` se rellena solo, y `data-bias="-1"` o `"1"` le da pendiente
bajista o alcista.

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
2. **La foto de Gerald.** Ahora hay un marco que dice «FOTO PENDIENTE». Se
   reemplaza el `src` de los dos `<img>` que apuntan a
   `assets/img/mentor-placeholder.svg` (uno en `index.html`, otro en
   `contacto.html`). Un retrato vertical, buena luz, fondo oscuro si es posible.
3. **La historia de Gerald.** El texto de `contacto.html` (`#historia`) y el del
   bloque «Quién enseña» de `index.html` son de ejemplo. Hay que sustituirlos por
   su biografía real. También la frase entrecomillada.
4. **Los títulos de los 9 módulos** son una propuesta. Ajustar al temario real.
5. **Las descripciones de cada programa** (una línea por ficha) son una
   propuesta. Confirmar que dicen lo que el cliente quiere vender.
6. **Métodos de pago.** No se mencionan en ninguna parte. Falta decidir cómo se
   cobra y si conviene decirlo en la ficha o dejarlo para el WhatsApp.
7. **El dominio.** `canonical`, las etiquetas `og:`, `sitemap.xml` y `robots.txt`
   usan `https://geraldmarket.com/`. Cambiar al dominio real.
8. **Imagen para redes (`og:image`).** No hay. Conviene generar una de
   1200 × 630 px con el logo sobre el gráfico y añadirla a las tres páginas.
9. **Instagram / redes.** `SITE.ig` apunta a la raíz de Instagram; poner el
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

Es un sitio estático puro: no hay compilación, no hay servidor, no hay variables
de entorno. Cualquier hosting sirve.

### GitHub Pages — la vía directa desde este repositorio

El repositorio ya está preparado: hay un `.nojekyll` y **todas las rutas son
relativas**, así que el sitio funciona igual en la raíz de un dominio que en una
subcarpeta tipo `usuario.github.io/GeraldMarket/`. Está comprobado sirviéndolo
desde una subruta.

**Ya está activo.** El sitio se sirve desde:

```
https://poweroso2000.github.io/GeraldMarket/
```

Configuración actual: *Settings → Pages* → **Deploy from a branch**, rama
`gerald-market-site`, carpeta `/ (root)`. Cada vez que se sube un cambio a esa
rama, GitHub reconstruye y republica solo — no hay que tocar nada más.

> **El repositorio es público**, que es lo que exige Pages en las cuentas
> gratuitas. En el código no hay claves ni datos reales (el teléfono y el
> correo siguen siendo marcadores con ceros), pero conviene tenerlo presente:
> el borrador está a la vista de cualquiera que dé con la dirección. Si más
> adelante se quiere volver privado, habrá que pasar el sitio a otro hosting
> o subir de plan.

### Otras opciones

- **Netlify / Vercel / Cloudflare Pages** — se arrastra la carpeta o se importa
  el repositorio. Sin comando de compilación y sin carpeta de salida.
  `vercel.json` ya trae las URL limpias y el caché de las tipografías.
- **Cualquier hosting clásico por FTP** — se suben los archivos tal cual.

### Cuando haya dominio propio

Añadir el dominio en *Settings → Pages → Custom domain* y actualizar a la vez
las etiquetas `canonical`, `og:url`, el `sitemap.xml` y el `robots.txt`, que
ahora apuntan a `https://geraldmarket.com/`.

## Accesibilidad y rendimiento

- Diseñado primero para el móvil. Barra fija abajo con «Ver programas» y
  «WhatsApp» siempre al alcance del pulgar.
- Enlace para saltar al contenido, foco visible, `aria-expanded` en el menú,
  campos etiquetados y `role="alert"` en los errores del formulario.
- `prefers-reduced-motion` desactiva el gráfico animado, la cinta y todas las
  transiciones.
- Sin framework, sin rastreo, sin cookies, sin peticiones externas.
