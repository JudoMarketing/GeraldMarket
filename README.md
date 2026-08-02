# Pacho's Quality Auto Repair — Website

Bilingual (English / Español) marketing site and appointment request form for
**Pacho's Quality Auto Repair LLC**, Miami, FL.

Static HTML, CSS and vanilla JavaScript. No build step, no dependencies, no server
required — open `index.html` or drop the folder on any host.

---

## Structure

```
index.html            Home: hero, services, deals, process, reviews, about, FAQ, location
appointment.html      Full appointment request form (VIN optional)
assets/css/styles.css Design system + all page styles
assets/js/i18n.js     EN/ES dictionary + translation engine
assets/js/app.js      Business config, header, shop-open clock, reveals, coupons
assets/js/appointment.js  Form validation, VIN helper, message composer
assets/img/logo.svg   Primary mark — bold "P" whose counter is a hex nut
assets/img/favicon.svg  App / tab icon — the P knocked out of an amber hexagon
assets/img/emblem.svg   Round "EST. 2006 · MIAMI" stamp (About section)
assets/img/bay-scene.svg  Hero artwork — a car up on the two-post lift
assets/img/art-oil.svg    Oil change vignette (featured service card)
assets/img/art-tires.svg  Wheel + torque wrench vignette
assets/img/art-diag.svg   Diagnostic scan tool vignette
tools/generate-art.py    Regenerates the three service vignettes
robots.txt · sitemap.xml · site.webmanifest
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
`transmission`, `vin`, `date`, `date2`, `time`, `wait`, `name`, `phone`, `email`,
`contact`, `lang`, `promo`, `customer`, `consent`.

**VIN handling:** optional by design. The field auto-uppercases, strips punctuation,
counts to 17, rejects the letters I/O/Q (which never appear in a VIN), and explains
where to find it — but an empty or partial VIN never blocks a booking.

---

## Artwork and the logo

### The mark
No logo existed, so the site ships with one. The idea is a **bold "P" whose
counter is a hex nut** — it reads as the initial at 16px and as a piece of
hardware up close. Three lockups, one shape:

| File | Where it's used | Notes |
|---|---|---|
| `logo.svg` | header, footer | gradient P on transparent |
| `favicon.svg` | browser tab, phone home screen | P knocked out of a solid amber hexagon — survives 16px |
| `emblem.svg` | About section | the P inside a brake-rotor ring with `EST. 2006 · MIAMI · FLORIDA` |

All are plain SVG. To recolor the whole system, edit the gradient stops
(`#FFD870 → #FFB020 → #FF6A12`) in each file, or the `--amber-*` tokens in the CSS.

### The illustrations
The four scene/vignette SVGs were drawn for this site — no stock licensing, no
attribution needed, a few KB each, sharp on any screen. `art-tires.svg`,
`art-oil.svg` and `art-diag.svg` are generated — run `python3 tools/generate-art.py`
after editing that script to redraw them. `bay-scene.svg` and the logo files are
hand-written SVG; edit them directly.

### Swapping in real photos (recommended before launch)
Every study of shop websites says the same thing: **real photos of your bay, your
waiting room and your technicians beat any illustration or stock image.** The
illustrations are here so the site looks finished today — plan to replace them.

Two swaps, no CSS changes needed:

1. **Hero** — put a wide photo (roughly 1600×920, a car on the lift or the shop
   front) at `assets/img/hero.jpg` and change one line in `index.html`:
   `<img src="assets/img/bay-scene.svg" …>` → `<img src="assets/img/hero.jpg" …>`.
   The scrim already guarantees the headline stays readable over any photo. If the
   subject sits off-center, nudge `object-position` in `.hero-art__media img`.
2. **Featured service cards** — drop three square-ish photos in and swap the
   `src` on the three `<img>` tags inside `.svc-featured`. Then change
   `.svcart__media img { object-fit: contain }` to `cover` so photos fill the frame.

Good shots to take, in priority order: the shop front with the sign, a car up on
the lift, a technician working, the waiting area, and the team.

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
5. **Testimonials.** The three quotes in the reviews section are paraphrased from
   public review summaries and are marked with an HTML comment. Replace them with
   real verbatim Google reviews (with first names) before launch.
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

The only external requests are Google Fonts and the Google Maps embed; everything
else is local, and the layout degrades gracefully if fonts don't load.

## Design notes

Four patterns were taken from the auto-repair sites that convert best and applied
here:

1. **One big visual hero** with a dark scrim, an oversized headline, and the phone
   number and booking button visible without scrolling.
2. **A guarantee band directly under the hero** — warranty and "you see the price
   first" are the two questions customers ask most, so they are answered before
   anything else on the page.
3. **Imagery on the service cards**, not just icons, for the three services people
   search for most (oil, tires, diagnostics).
4. **Amenities and a real "our shop" story** — what humanises a family business
   against a chain.

## Accessibility & performance notes

- Mobile-first; a sticky bottom dock (Call / Book / Directions) and a following
  WhatsApp button are always in reach on phones.
- Skip link, visible focus rings, `aria-pressed` on the language switch, labelled
  form fields, `role="status"` live regions for validation.
- `prefers-reduced-motion` disables every animation, marquee and smooth scroll.
- Fallbacks for browsers without `backdrop-filter` or `:has()`.
- No JS framework, no tracking, no cookies. Only `localStorage` for the language.
