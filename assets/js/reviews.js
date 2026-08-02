/* ============================================================
   REAL customer reviews.

   This file is empty on purpose. Nothing here is invented — the site
   will not show a review it was not given.

   HOW TO ADD THEM (about 5 minutes, no code knowledge needed)
   -----------------------------------------------------------
   1. Open the shop's Google listing and click "Reviews".
   2. Pick the good ones you want on the site.
   3. For each, copy the text EXACTLY as the customer wrote it —
      same language, same words. Do not translate it. A review left
      in Spanish stays in Spanish; the site tags it so it renders
      correctly whichever language the visitor is browsing in.
   4. Paste it into the list below following the pattern.

   Fields:
     text    the review, word for word
     name    how Google shows the reviewer (first name is fine)
     lang    "en" or "es" — the language the review was WRITTEN in
     stars   1–5
     date    optional, e.g. "2025-11" — shown as month/year

   Example of a finished entry (delete the // to switch it on):

   // { text: "Honest, fair price and fast. They explained everything
   //          before touching the car.",
   //   name: "Michael S.", lang: "en", stars: 5, date: "2025-09" },

   Until at least one review is added, the section shows the shop's
   public rating and a button through to Google — which is accurate,
   and better than a made-up quote.
   ============================================================ */
window.PACHO_REVIEWS = [];
