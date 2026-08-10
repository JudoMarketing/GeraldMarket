# Gerald Market · sitio web (borrador)

Portal de formación en trading, **íntegramente en español**, para Gerald Market.

HTML, CSS y JavaScript sin dependencias. No hay compilación, ni framework, ni
servidor: se abre `index.html` o se sube la carpeta a cualquier hosting.

> **Esto es un borrador.** Los textos, los datos de contacto y la foto son de
> relleno. La lista completa de lo que hay que reemplazar está al final, en
> **[Antes de publicar](#antes-de-publicar)**.

**En línea:** <https://judomarketing.github.io/GeraldMarket/>

> **Estilo de redacción.** En este proyecto **no se usan guiones largos** en
> ningún texto: ni en la web, ni en el README, ni en los comentarios del
> código. Son los caracteres Unicode `U+2014` (raya) y `U+2013` (semirraya),
> los que se cuelan al escribir con ayuda de una IA. Donde haría falta una
> pausa fuerte se pone coma, dos puntos o punto y seguido; como separador,
> el punto medio (·). Es una preferencia del cliente y se respeta en todo lo
> que se escriba.
>
> Para comprobarlo antes de publicar (no debe imprimir nada):
> ```sh
> LC_ALL=C.UTF-8 grep -rnP '[\x{2014}\x{2013}]' --exclude-dir=.git .
> ```

---

## La idea: un embudo, no un catálogo

Este sitio es **publicidad**, no la plataforma. Su único trabajo es que alguien
que no conoce a Gerald acabe inscribiéndose. La formación de verdad vive en
**otra plataforma**, a la que se entra después de pagar.

La secuencia de la portada es deliberada:

```
video de Gerald → mini clase (acciones y opciones) → testimonios
   → qué hay dentro → redes sociales → inscribirse
```

Primero se demuestra cómo enseña, y solo al final se pide algo.

## Las dos páginas

| Archivo | Página | Qué lleva |
|---|---|---|
| `index.html` | **Inicio** | El embudo: video que arranca solo, la clase corta comparando acciones y opciones, testimonios de estudiantes, qué hay dentro de la plataforma, redes sociales y la llamada a inscribirse. |
| `inscribete.html` | **Inscríbete** | Las dos formas de pago (único y por semana de clase), cómo es el proceso, qué hay dentro y las preguntas de antes de pagar. |

## Estructura de archivos

```
index.html · inscribete.html
assets/css/styles.css        Sistema de diseño y estilos de todas las páginas
assets/css/fonts.css         @font-face de las tres tipografías
assets/fonts/*.woff2         Playfair Display Italic, Archivo (variable), JetBrains Mono
assets/js/market.js          Gráfico de velas animado + cinta de cotizaciones
assets/js/app.js             Datos de contacto (SITE), cabecera, menú, revelados
assets/video/gerald-ejemplo.webm  Video de relleno, a sustituir por la grabación real
assets/video/poster.jpg      Fotograma que se ve mientras el video carga
assets/img/logo.svg          Marca completa sobre fondo oscuro
assets/img/logo-light.svg    Marca completa sobre fondo claro (papel, prensa)
assets/img/logo-mark.svg     El monograma G (cabecera y pie)
assets/img/favicon.svg       Icono de pestaña y de pantalla de inicio
assets/img/mentor-placeholder.svg   Marco de «foto pendiente», a reemplazar
assets/img/og.png            1200x630, la imagen que sale al compartir el enlace
assets/img/preview.png       1600x1000, miniatura para fichas y portafolios
showcase.json                Ficha del sitio para el panel de Judo Marketing
tools/generate-logo.py       Regenera los cuatro archivos de marca
robots.txt · sitemap.xml · site.webmanifest · vercel.json
```

---

## Lo que hay que tocar para editar

### Teléfono, WhatsApp y correo: un solo sitio
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
  facebook:   "https://facebook.com/",   // perfiles reales, pendientes
  instagram:  "https://instagram.com/",
  youtube:    "https://youtube.com/",
  plataforma: "",                        // la plataforma de estudiantes
  waSaludo:   "Hola Gerald, vengo de la web…"
};
```

Los ceros son un marcador de posición evidente **a propósito**, para que no se
publique por error un número inventado.

### Precios y contenidos de los programas
Están escritos directamente en el HTML, sin diccionarios de por medio:

- Las dos formas de pago están en `inscribete.html` (`#pagos`).
- **Los dos precios están sin poner**, marcados como «Consultar». Se escriben
  dentro de `.pay__amt`.
- Los botones no cobran nada: abren WhatsApp con el mensaje ya escrito. Cuando
  haya pasarela de pago, se cambian por el enlace de cobro.
- La dirección de la plataforma de estudiantes va en `SITE.plataforma`, dentro
  de `assets/js/app.js`. Mientras esté vacía, los enlaces que apunten ahí se
  ocultan solos.

### El video de la portada

Es lo primero que ve cualquiera, así que es la pieza más importante que falta.

Ahora hay uno de relleno en `assets/video/gerald-ejemplo.webm` que dice en
pantalla que hay que sustituirlo. Para poner el real basta con reemplazar ese
archivo y el fotograma `poster.jpg`, sin tocar el HTML.

**Formato:** el de relleno es WebM porque es lo único que se pudo generar aquí.
Para publicar conviene **MP4 con códec H.264**, que lo reproduce absolutamente
todo, iPhone incluido. Si el video acaba en YouTube, se sustituye el `<video>`
por el `<iframe>` del reproductor.

**Por qué arranca en silencio:** ningún navegador deja que un video arranque con
sonido sin que la persona lo pida. Por eso empieza mudo, en bucle, y hay un
botón visible para activar el sonido. Es la única forma de que la reproducción
automática funcione de verdad; si se quita el `muted`, el video no arranca solo
en ningún teléfono.

También se pausa solo cuando sale de la pantalla, para no gastar datos ni
batería.

### Regenerar las imágenes de vista previa

`assets/img/og.png` y `assets/img/preview.png` son capturas de la portada real,
así que **envejecen con el diseño**. Cada vez que cambie la portada de forma
notable conviene rehacerlas, o el enlace compartido enseñará una versión vieja.

### Botones «quiero este plan»
Cualquier enlace con `data-plan="…"` se convierte solo en un mensaje de
WhatsApp con ese texto ya escrito. Para añadir uno nuevo basta con:

```html
<a class="btn btn--gold" data-plan="Pago único" href="#">Quiero el acceso completo</a>
```

---

## El diseño

La idea de partida: **la página no habla del mercado, la página es una pantalla
de mercado.** De ahí sale todo lo demás.

| | |
|---|---|
| **Fondo** | negro `#04070A`; las cajas van de `#161E28` arriba a `#0B1119` abajo |
| **Oro** | `#E9C46A`, la marca, los acentos y los botones principales |
| **Verde** | `#00D68F`, sube, incluido, largo |
| **Rojo** | `#FF3D57`, baja, riesgo, corto |
| **Marca** | Playfair Display Italic, un serif de alto contraste, en cursiva |
| **Titulares** | Archivo en 750, apretado. Es variable, así que el grosor se afina al decimal en vez de depender de un peso único |
| **Texto** | Archivo (variable) |
| **Números** | JetBrains Mono, para precios, tickers y etiquetas de eje |
| **Esquinas** | de 8 a 14 px |

### El relieve
Las cajas no son rectángulos planos: llevan un degradado de claro arriba a
oscuro abajo, un filo brillante en el borde superior (`--bevel`) y sombra
propia debajo (`--sh-1`, `--sh-2`, `--sh-3`). La luz cae siempre desde arriba.

Y el contraste es deliberado: **lo que se pulsa sobresale, lo que se rellena
está hundido**. Los botones tienen degradado y sombra proyectada; los campos
del formulario tienen sombra interior (`--sunken`) y fondo casi negro. Se nota
al instante qué es un control y qué es un hueco donde escribir.

### El relieve del texto: solo una vez
El tallado (la cara en crema con una escalera de grises debajo) se reserva
**únicamente para el titular de la portada**. Repetirlo en cada `h2` convertía
la página en un cartel: mucho ruido y el mensaje perdido. Los demás títulos van
planos, que se leen mejor.

La profundidad se mide en `em` (`--ext`), no en píxeles, así que crece y encoge
sola con el cuerpo de letra.

Dos variantes conviven en el hero: **`.gold-cut`** (el mismo tallado fundido en
oro) y **`.hollow`** (sin relleno, solo el filo con `-webkit-text-stroke`, de
modo que el gráfico se ve moverse a través de las letras).

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
  carga**, así la marca queda consistente.
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

1. **El video de Gerald.** Es la pieza central del embudo y ahora hay uno de
   relleno que lo dice en pantalla. Sin él, la portada no cumple su función.
   Ver «El video de la portada» más arriba.
2. **Los dos precios.** Ni el pago único ni el de semana de clase están
   puestos: aparecen como «Consultar» en `inscribete.html`.
3. **La plataforma de estudiantes.** Falta su dirección en `SITE.plataforma`.
   Es a donde se manda a quien ya pagó.
4. **Teléfono, WhatsApp y correo.** Los de `SITE` son marcadores con ceros.
   Sin esto, ningún botón funciona.
5. **Las redes sociales.** `facebook`, `instagram` y `youtube` apuntan a la raíz
   de cada red. Poner los perfiles reales.
6. **Los testimonios.** Los tres de la portada son marcadores y lo dicen en
   pantalla. Se sustituyen por mensajes reales, con permiso, y **hablando de lo
   que aprendieron, no de cuánto dinero ganaron** (ver el aviso de abajo).
7. **Métodos de pago.** Ahora los botones solo abren WhatsApp. Falta decidir
   cómo se cobra.
8. **El dominio.** `canonical`, las etiquetas `og:`, `sitemap.xml` y `robots.txt`
   usan `https://geraldmarket.com/`. Cambiar al dominio real.

### Sobre el aviso de riesgo y lo que NO se puede prometer

Esto no es adorno legal. La FTC persigue activamente a quienes venden cursos y
«oportunidades de ingresos» con promesas de ganancias sin pruebas suficientes, y
poner un «los resultados pueden variar» al pie **no arregla** una promesa
engañosa. Warrior Trading, por ejemplo, muestra bien visible que operar es
arriesgado y que la mayoría de los day traders pierde dinero.

Por eso, en todo el sitio:

- Aparece destacado, no escondido en el pie: **«Solo con fines educativos. No es
  asesoría de inversión. Operar conlleva un riesgo sustancial y los resultados
  no están garantizados.»**
- Se dice explícitamente que **la mayoría de quienes operan a corto plazo pierde
  dinero**.
- No hay ni una cifra de ganancia, ni capturas de beneficios, ni carros, ni
  «gana X al día», ni «deja tu trabajo».
- Los testimonios que se pongan deben hablar de **cómo se enseña y qué
  aprendieron**, no de cuánto dinero ganó alguien. Un testimonio que diga «gané
  X» es una promesa de ingresos con otro nombre, y es justo lo que persigue la
  FTC. Debajo de los testimonios hay un aviso que dice que son experiencias
  individuales y no un resultado típico: **no lo quites**.

**No quites nada de esto y no metas promesas de rentabilidad**, ni siquiera
suaves. Que un abogado lo revise antes de cobrar el primer pago.

---

## Publicar

Es un sitio estático puro: no hay compilación, no hay servidor, no hay variables
de entorno. Todas las rutas son relativas, así que funciona igual en la raíz de
un dominio que dentro de una subcarpeta.

### GitHub Pages (lo que está activo ahora)

```
https://judomarketing.github.io/GeraldMarket/
```

Configurado en *Settings → Pages* con la rama `gerald-market-site` y la carpeta
`/ (root)`. Cada subida a esa rama republica sola.

> Si vuelve a cambiar el nombre de la cuenta de GitHub, **la dirección cambia
> con él y no se redirige**. Hay que volver a entrar en *Settings → Pages* y
> guardar de nuevo. Con un dominio propio esto deja de ser un problema.

### Vercel

El repositorio ya trae `vercel.json` listo, con el caché de tipografías, video e
imágenes y un par de cabeceras de seguridad. **No hace falta configurar nada
más.**

1. Entra a <https://vercel.com/new> e inicia sesión **con GitHub**.
2. Busca `GeraldMarket` en la lista y pulsa **Import**.
3. En *Framework Preset* elige **Other**. Deja vacíos *Build Command* y *Output
   Directory*: el sitio no se compila.
4. Abre *Git Branch* y elige **`gerald-market-site`**, que es donde vive el
   código. Este es el paso que más se olvida: por defecto Vercel toma la rama
   principal del repositorio.
5. Pulsa **Deploy**.

En menos de un minuto te da una dirección `*.vercel.app`. A partir de ahí, cada
subida a esa rama despliega sola.

**Ventaja frente a Pages:** Vercel funciona también con repositorios privados,
así que si algún día se quiere volver a poner el código en privado, el sitio
sigue publicándose.

### Cuando haya dominio propio

En Vercel: *Settings → Domains → Add*. En Pages: *Settings → Pages → Custom
domain*. En los dos casos hay que actualizar a la vez las etiquetas `canonical`,
`og:url`, `og:image`, el `sitemap.xml` y el `robots.txt`, que ahora apuntan a
`https://geraldmarket.com/`.

## Accesibilidad y rendimiento

- Diseñado primero para el móvil. Barra fija abajo con «Ver programas» y
  «WhatsApp» siempre al alcance del pulgar.
- Enlace para saltar al contenido, foco visible, `aria-expanded` en el menú,
  campos etiquetados y `role="alert"` en los errores del formulario.
- `prefers-reduced-motion` desactiva el gráfico animado, la cinta y todas las
  transiciones.
- Sin framework, sin rastreo, sin cookies, sin peticiones externas.
