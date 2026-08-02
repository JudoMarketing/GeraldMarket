# Pacho's Quality Auto Repair — Website

Bilingual (English / Español) marketing site and appointment request form for
**Pacho's Quality Auto Repair LLC**, Miami, FL.

Static HTML, CSS and vanilla JavaScript. No build step, no dependencies, no server
required — open `index.html` or drop the folder on any host.

---

## Structure

```
index.html               Home: hero, services, specials, process, reviews, shop, FAQ, location
appointment.html         Appointment work order (VIN optional)
assets/css/styles.css    Design system + all page styles
assets/css/fonts.css     @font-face for the self-hosted typefaces
assets/fonts/*.woff2     Barlow, Barlow Condensed, IBM Plex Mono (latin + latin-ext)
assets/js/i18n.js        EN/ES dictionary + translation engine
assets/js/app.js         Business config, header, shop-open clock, reveals, coupons
assets/js/appointment.js Form validation, VIN helper, message composer
assets/img/logo.svg      Stamped plate — the "P" knocked out of signal orange
assets/img/favicon.svg   Same mark, tuned for a browser tab
assets/img/stamp.svg     Rubber approval stamp (the shop section)
assets/img/art-bay.svg   Fig. 1 — a car up on the two-post lift
assets/img/art-oil.svg   Oil change vignette
assets/img/art-tires.svg Wheel + torque wrench vignette
assets/img/art-diag.svg  Scan tool vignette
tools/generate-art.py    Regenerates the four line drawings
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

## The design: "the work order"

The first draft of this site looked like every other AI-generated page in 2026 —
dark mode, frosted glass, gradient orbs floating in the background, gradient text,
Inter, four identical cards in a grid. That is a real and recognisable house style,
and it is wrong for a family garage in Kendall.

So the whole thing was rebuilt around one idea: **the printed vehicle inspection
sheet a service advisor hands you.** Pacho's differentiator is "we tell you what's
wrong before we charge you," and that is exactly what the paperwork of an honest
shop looks like.

What that means concretely:

| | |
|---|---|
| **Ground** | warm paper `#F2EFE8` with a faint fibre texture — not white, not dark |
| **Ink** | `#14161A`, hairline rules `#D3CDC0` |
| **Signal** | one colour, `#E5502A`, used like safety paint — never decoratively |
| **Marks** | inspection green / amber / red for pass, caution, fail |
| **Display** | Barlow Condensed, uppercase — shop signage and racing numbers |
| **Body** | Barlow |
| **Data** | IBM Plex Mono for hours, codes, VINs, section numbers, labels |
| **Shape** | 2px corners, 1.5px borders, hard offset shadows (`3px 3px 0`) |
| **Divider** | a painted hazard stripe, the way it is on a shop floor |

Components that came out of the concept rather than a component library: the
**work-order panel** in the hero (dark title bar, dotted leader rows, today's row
highlighted, live open/closed stamp), the services set as a **ruled list with
numbers** instead of twelve identical cards, the specials as **actual perforated
vouchers**, and the appointment page as a **numbered form with a black title bar
on each section**.

Explicitly not used anywhere: `backdrop-filter`, ambient gradient orbs, gradient
text, blurred glow shadows, pill-shaped everything, and an icon chip on top of
every card.

### The mark
No logo existed. The idea is a **bold "P" whose counter is a hex nut** — it reads
as the initial at 16px and as a piece of hardware up close. It is set as a solid
plate so it works on paper and on the dark footer without a second file.

| File | Where |
|---|---|
| `logo.svg` | header, footer |
| `favicon.svg` | browser tab, phone home screen |
| `stamp.svg` | the shop section — a rubber approval stamp, rotated in CSS |

### The illustrations
Four **shop-manual line drawings**: ink strokes on the paper, two stroke weights,
hatching for shade, and the signal orange used only to point at the part being
serviced. Nothing is filled and nothing is gradient — it should look drawn with a
pen, because that is what a service manual looks like. Regenerate with
`python3 tools/generate-art.py`.

### Fonts are self-hosted
`assets/fonts/` holds the woff2 files and `assets/css/fonts.css` declares them.
The page makes **zero third-party requests** — nothing to Google, no tracking, and
the condensed display face is guaranteed to render rather than silently falling
back to a normal-width system font.

### Swapping in real photos (still recommended)
Real photos of the bay, the waiting room and the technicians beat any illustration.
The line drawings are here so the draft looks finished today.

1. **Fig. 1** — replace `assets/img/art-bay.svg` in `index.html` with a wide photo.
2. **The three featured services** — swap the `src` on the `<img>` tags inside
   `.svc-feat`, then change `.svcf__media img { object-fit: contain }` to `cover`.

Good shots, in priority order: the shop front with the sign, a car up on the lift,
a technician working, the waiting area, the team.

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
