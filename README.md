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
assets/img/logo.svg   Logo mark (hexagon nut + "P")
assets/img/favicon.svg
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

## Accessibility & performance notes

- Mobile-first; a sticky bottom dock (Call / Book / Directions) and a following
  WhatsApp button are always in reach on phones.
- Skip link, visible focus rings, `aria-pressed` on the language switch, labelled
  form fields, `role="status"` live regions for validation.
- `prefers-reduced-motion` disables every animation, marquee and smooth scroll.
- Fallbacks for browsers without `backdrop-filter` or `:has()`.
- No JS framework, no tracking, no cookies. Only `localStorage` for the language.
