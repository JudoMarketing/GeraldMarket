# Pacho's Quality Auto Repair — Website

Bilingual (English / Español) marketing site and appointment request form for
**Pacho's Quality Auto Repair LLC**, Miami, FL.

Static HTML, CSS and vanilla JavaScript. No build step, no dependencies, no server
required — open `index.html` or drop the folder on any host.

---

## Structure

```
index.html               Home: hero, guarantees, services, specials, process, reviews, shop, location
faq.html                 Questions & answers (own page, with FAQPage schema)
appointment.html         Appointment form (VIN optional)
assets/css/styles.css    Design system + all page styles
assets/css/fonts.css     @font-face for the self-hosted typefaces
assets/fonts/*.woff2     Poppins, DM Sans, IBM Plex Mono (latin + latin-ext)
assets/js/i18n.js        EN/ES dictionary + translation engine
assets/js/app.js         Business config, shop clock + next opening, reveals, coupons, reviews
assets/js/reviews.js     REAL customer reviews - empty until the shop pastes theirs in
assets/js/appointment.js Form validation, VIN helper, message composer
assets/img/logo.svg      Full lockup, rebuilt from the shop's painted sign
assets/img/logo-mark.svg Compact truck, used in the header
assets/img/favicon.svg   The truck on a blue plate
assets/img/art-*.svg     Line drawings (hero + service cards)
tools/generate-logo.py   Rebuilds the three logo files
tools/generate-art.py    Rebuilds the four line drawings
robots.txt | sitemap.xml | site.webmanifest
```

## Editing the important things

### Phone, WhatsApp, email, address, hours
All in one place — the `SITE` object at the top of **`assets/js/app.js`**.
Change it there and every button, link and schema on the site follows.

```js
const SITE = {
  phoneDisplay: "(305) 238-9333",
  phoneTel: "+13052389333",
  whatsapp: "13052389333",   // digits only, country code first
  email: "...",
  address: "12430 SW 128th St, Ste 2, Miami, FL 33186",
  hours: { 0: null, 1: [510, 1050], /* … minutes from midnight */ 6: [510, 900] }
};
```

The hours also appear as plain text in `index.html` (the hours card and footer) and in
the JSON-LD block in `<head>` — update those three places together if the schedule changes.

### Text and translations
Every visible string lives in **`assets/js/i18n.js`** as an `en` / `es` pair.
Find the key, edit both languages, done. Elements pull their text with
`data-i18n="key"` (or `data-i18n-html`, `-placeholder`, `-aria`, `-content`).

The visitor's language is auto-detected from their browser, remembered in
`localStorage`, and can be forced with `?lang=es` in the URL.

### Deals / coupons
The six coupon cards are in `index.html` under `<section id="deals">`. Each card's
text comes from `deals.d1.*` … `deals.d6.*` in the dictionary; the code (`OIL20`,
`TIRE4`, …) is the `data-code` attribute and the `?promo=` link. Clicking a code
copies it; the "Use this deal" link pre-fills the appointment form.

The scrolling ticker at the very top uses `ticker.1` … `ticker.6`.

### Appointment form
No backend. On submit the form validates, builds a clean formatted request and:

- **Send by WhatsApp** → opens `wa.me` with the whole request pre-typed
- **Send by email** → opens the mail client with subject + body filled
- **Copy request** → clipboard, for pasting anywhere

To send to a real inbox/CRM instead, point the form at a service like Formspree,
Netlify Forms or Google Apps Script and call it from `appointment.js` inside the
`sendWa` / `sendMail` handlers (or add a third button). The field `name`s are already
sensible: `service[]`, `problem`, `urgency`, `year`, `make`, `model`, `mileage`,
`vin`, `date`, `date2`, `time`, `wait`, `name`, `phone`, `email`, `contact`,
`lang`, `promo`, `consent`.

**VIN handling:** optional by design. The field auto-uppercases, strips punctuation,
counts to 17, rejects the letters I/O/Q (which never appear in a VIN), and explains
where to find it — but an empty or partial VIN never blocks a booking.

---

## The design

Built to the reference the client picked (a dark auto-shop showcase site),
recoloured to **black, white and several blues** at their request.

| | |
|---|---|
| **Ground** | near-black `#07090D`, panels `#0C1016`, cards `#12171F` |
| **Navy blocks** | reviews and the closing CTA sit on a `#071634 → #050B1C` gradient |
| **Accent** | `#0B63F6`, with `#3B87FF` for headline accents and `#7FB4FF` for soft detail |
| **Type** | Poppins 700/800 for headings, DM Sans for body, IBM Plex Mono only for VINs and promo codes |
| **Shape** | fully-rounded pill buttons, 24–32px card radii |

Patterns carried over from the reference: a pill badge above the headline, the
accent word coloured inside an otherwise white headline, grey body copy, service
cards with tags overlaid on the image, centred section headings under a small
accent eyebrow, review cards with a circular avatar, and a phone bar pinned to
the bottom of the screen on mobile.

Still deliberately absent — these are the tells of a generated page: frosted
glass / `backdrop-filter`, ambient gradient orbs floating behind the content,
and gradient-filled text.

### The mark - rebuilt from the shop's own sign
The shop has a painted metal sign: bold slanted blue letters spelling PACHO'S
QUALITY, AUTO REPAIR beneath, the whole wordmark sitting on a truck body with
two black wheels. **The lettering is the vehicle** - that is the identity, so
that is what the logo reproduces, in the sign's own colours (blue lettering,
silver body, black tyres).

Letterforms are Archivo Black, the closest match to the hand-cut originals,
converted to outlines and slanted, so the finished SVG carries no font
dependency at all. Run `python3 tools/generate-logo.py` to rebuild.

| File | Where |
|---|---|
| `logo.svg` | full horizontal lockup - footer, print, social |
| `logo-mark.svg` | the truck alone - site header, small sizes |
| `favicon.svg` | the truck on a blue plate - browser tab, phone home screen |

If the shop ever wants the sign traced exactly rather than interpreted with a
typeface, send the photo to a sign shop or a vector illustrator - a hand-trace
of those hand-cut letters will beat any font substitution.

### The imagery — read this before launch
**The reference site is carried almost entirely by real photographs.** This one
cannot be: stock photo hosts are unreachable from the build environment, and the
shop has not supplied photos yet. In their place are four **line drawings** in the
shop-manual style — light strokes on the dark ground, blue used only to point at
the part being serviced (`python3 tools/generate-art.py` regenerates them).

They hold the layout together and look deliberate, but they are a stand-in. The
design will not match the reference until real photos go in. Two swaps, no CSS
changes:

1. **Hero** — replace the `<img>` inside `.hero__art` in `index.html`.
2. **The three service cards** — swap the `src` on the `<img>` tags inside
   `.svc-grid`, then change `.svc__media img { object-fit: contain }` to `cover`
   and drop the `padding` on that rule so photos fill the frame edge to edge.

Shots to take, in priority order: the shop front with the sign, a car up on the
lift, a technician working, the waiting area, and the team. Phone photos are fine
if they are well lit — they will still beat any illustration.

### Fonts are self-hosted
`assets/fonts/` holds the woff2 files and `assets/css/fonts.css` declares them.
The page makes **zero third-party requests** — nothing to Google, no tracking.

## Before this goes live — please confirm with the shop

These came from public directory listings and should be verified by the owner:

1. **Hours.** Listings disagree: some show Mon–Fri 8:15 AM–5:30 PM, others
   8:30 AM–6:30 PM. The site currently uses **Mon–Fri 8:30 AM–5:30 PM,
   Sat 8:30 AM–3:00 PM, Sun closed**.
2. **WhatsApp number.** Currently set to the shop's main line. If WhatsApp is on a
   different number, change `SITE.whatsapp`.
3. **Email address.** `SITE.email` is a placeholder — replace with the real one.
4. **The six promotions.** Amounts, conditions and expiration are proposals. The
   owner should approve every number before publishing.
5. **Reviews.** There are no invented quotes on the site any more. The section
   shows the public 4.8 rating, the themes customers mention most, and a button
   through to the Google listing. To put real reviews on the page, open
   `assets/js/reviews.js` and paste them in - copy each one word for word, in the
   language the customer wrote it, and set `lang: "es"` or `lang: "en"` so a
   Spanish review stays Spanish on the English site. Instructions are in the file.
   Cards appear automatically as soon as there is at least one.
5b. **Amenities.** The "While you're here" chips (waiting area, Wi-Fi, parking,
   text updates) are plausible defaults, not verified facts. Confirm each one or
   delete the chip — they live in the About section of `index.html` and under
   `amen.*` in the dictionary.
6. **Warranty and payment answers** in the FAQ are written conservatively — confirm
   the exact terms.
7. **Domain.** `canonical`, `og:` tags, `sitemap.xml` and the JSON-LD use
   `https://pachosqualityautorepair.com/`. Update to the real domain.
8. **Map + geo coordinates** in the JSON-LD are approximate for the street address.

`aggregateRating` was deliberately **left out** of the structured data — Google
discourages self-serving review markup. The 4.8★ figure appears as normal page text.

---

## Deploying

Any static host works. Fastest options:

- **GitHub Pages** — Settings → Pages → deploy from the branch root.
- **Netlify / Vercel / Cloudflare Pages** — drag the folder in, no build command.

The only external request is the Google Maps embed. Fonts, styles, scripts and
artwork are all local.

## Accessibility & performance notes

- Mobile-first; a sticky bottom dock (Call / Book / Directions) and a following
  WhatsApp button are always in reach on phones.
- Skip link, visible focus rings, `aria-pressed` on the language switch, labelled
  form fields, `role="status"` live regions for validation.
- `prefers-reduced-motion` disables every animation, marquee and smooth scroll.
- Fallbacks for browsers without `backdrop-filter` or `:has()`.
- No JS framework, no tracking, no cookies, no third-party requests. Only
  `localStorage`, and only for the language choice.
