/* ============================================================
   i18n — English / Español
   Usage in HTML:
     <span data-i18n="nav.services"></span>            -> textContent
     <span data-i18n-html="about.p1"></span>           -> innerHTML (allows <b>, <br>)
     <input data-i18n-placeholder="appt.namePh">       -> placeholder attr
     <a data-i18n-aria="cta.call">                     -> aria-label attr
     <meta data-i18n-content="meta.desc">              -> content attr
   ============================================================ */
(function () {
  "use strict";

  const DICT = {
    en: {
      /* ---------- meta ---------- */
      "meta.title": "Pacho's Quality Auto Repair | Honest Mechanics in Miami, FL",
      "meta.desc": "Family-owned auto repair in Miami since 2006. Oil changes, tires, brakes, A/C, diagnostics and alignment. 4.8★ from 100+ neighbors. Se habla español. Call (305) 238-9333.",
      "meta.titleAppt": "Book an Appointment | Pacho's Quality Auto Repair, Miami",
      "meta.descAppt": "Schedule your service at Pacho's Quality Auto Repair in Miami. Tell us your vehicle, pick a day, add your VIN (optional) and we'll confirm by call or WhatsApp.",

      /* ---------- ticker ---------- */
      "ticker.1": "$20 OFF full synthetic oil change",
      "ticker.2": "FREE alignment with 4 new tires",
      "ticker.3": "$40 OFF brake service per axle",
      "ticker.4": "FREE check-engine light scan",
      "ticker.5": "Family-owned in Miami since 2006",
      "ticker.6": "Se habla español",

      /* ---------- nav / global CTA ---------- */
      "nav.home": "Home",
      "nav.services": "Services",
      "nav.deals": "Deals",
      "nav.why": "Why Us",
      "nav.reviews": "Reviews",
      "nav.faq": "FAQ",
      "nav.location": "Find Us",
      "nav.book": "Book Now",
      "nav.menu": "Menu",
      "cta.call": "Call",
      "cta.callFull": "Call (305) 238-9333",
      "cta.callNow": "Call Now",
      "cta.book": "Book Appointment",
      "cta.bookShort": "Book",
      "cta.whatsapp": "WhatsApp",
      "cta.whatsappUs": "WhatsApp Us",
      "cta.directions": "Get Directions",
      "cta.seeDeals": "See Current Deals",
      "lang.en": "English",
      "lang.es": "Spanish",
      "lang.switch": "Change language",

      /* ---------- hero ---------- */
      "hero.badge": "Miami · Kendall · West Kendall",
      "hero.h1a": "The mechanic your",
      "hero.h1b": "neighbors trust.",
      "hero.lede": "A family-owned shop in Miami since 2006. We tell you what your car actually needs, quote it before we touch it, and get you back on the road — oil changes, tires, brakes, A/C and full mechanical repair.",
      "hero.t1": "4.8 ★ · 100+ reviews",
      "hero.t2": "Family-owned since 2006",
      "hero.t3": "Estimate before any work",
      "hero.t4": "Se habla español",
      "shop.title": "Shop Hours",
      "shop.open": "Open now",
      "shop.closed": "Closed now",
      "shop.stat1n": "19+",
      "shop.stat1l": "Years in Miami",
      "shop.stat2n": "4.8★",
      "shop.stat2l": "Customer rating",
      "shop.stat3n": "100%",
      "shop.stat3l": "Upfront quotes",
      "shop.addr": "12430 SW 128th St, Ste 2 · Miami, FL 33186",

      "day.mon": "Monday",
      "day.tue": "Tuesday",
      "day.wed": "Wednesday",
      "day.thu": "Thursday",
      "day.fri": "Friday",
      "day.sat": "Saturday",
      "day.sun": "Sunday",
      "day.weekdays": "Mon – Fri",
      "hours.weekday": "8:30 AM – 5:30 PM",
      "hours.sat": "8:30 AM – 3:00 PM",
      "hours.closed": "Closed",

      /* ---------- guarantee band ---------- */
      "trust.t1": "Parts & labor warranty",
      "trust.d1": "Most repairs are covered. Ask us and we'll write the exact terms on your invoice.",
      "trust.t2": "You see the price first",
      "trust.d2": "We inspect, then quote. Nothing gets repaired until you approve the number.",
      "trust.t3": "Same family since 2006",
      "trust.d3": "Almost twenty years in the same Miami bay. Our name is on the door.",
      "trust.t4": "English & Español",
      "trust.d4": "Explained in your language, in words that actually make sense.",

      /* ---------- featured service tags ---------- */
      "svc.tag1": "Most requested",
      "svc.tag2": "Free alignment offer",
      "svc.tag3": "Free code scan",
      "svc.all": "Everything else we handle",

      /* ---------- amenities ---------- */
      "amen.title": "While you're here",
      "amen.1": "Waiting area with A/C",
      "amen.2": "Free Wi-Fi",
      "amen.3": "Wait or drop off",
      "amen.4": "Cards & cash accepted",
      "amen.5": "Free parking on site",
      "amen.6": "Text or WhatsApp updates",
      "amen.note": "Amenities to be confirmed by the shop before launch.",

      /* ---------- brands ---------- */
      "brands.title": "We service what Miami drives",

      /* ---------- services ---------- */
      "svc.eyebrow": "What we do",
      "svc.h2": "Everything your car needs, under one roof",
      "svc.lede": "From a quick oil change to a check-engine light nobody else could figure out. Domestic, Asian and European vehicles.",
      "svc.oil.t": "Oil Changes",
      "svc.oil.d": "Conventional, high-mileage and full synthetic. Includes multi-point inspection, fluid top-off and filter.",
      "svc.oil.m": "Most cars in 30–45 min",
      "svc.tires.t": "Tires & Wheels",
      "svc.tires.d": "New tires, mounting, balancing, rotation, patches and TPMS. We'll help you pick the right tire for your budget.",
      "svc.tires.m": "Free alignment with 4 tires",
      "svc.align.t": "Wheel Alignment",
      "svc.align.d": "Computerized 4-wheel alignment. Stops the pulling, stops eating your tires, straightens the steering wheel.",
      "svc.align.m": "Ask about our tire bundle",
      "svc.brakes.t": "Brakes",
      "svc.brakes.d": "Pads, rotors, calipers, brake fluid and ABS diagnosis. If it squeals, grinds or pulses, bring it in.",
      "svc.brakes.m": "Free brake inspection",
      "svc.diag.t": "Check Engine & Diagnostics",
      "svc.diag.d": "Real diagnosis, not guessing. We scan the codes, test the system and explain what's actually wrong before spending your money.",
      "svc.diag.m": "Free code scan",
      "svc.ac.t": "A/C & Heating",
      "svc.ac.d": "Miami heat is not optional. Recharge, leak detection, compressor, condenser and blower repair.",
      "svc.ac.m": "One of our specialties",
      "svc.susp.t": "Suspension & Steering",
      "svc.susp.d": "Shocks, struts, control arms, ball joints, bushings, power steering. Kill the clunks and the bouncing.",
      "svc.susp.m": "Road-test included",
      "svc.engine.t": "Engine & Mechanical",
      "svc.engine.d": "Timing belts, water pumps, gaskets, cooling systems, belts, hoses and general mechanical repair.",
      "svc.engine.m": "Full mechanical shop",
      "svc.batt.t": "Batteries & Electrical",
      "svc.batt.d": "Battery, alternator and starter testing and replacement. Lights, sensors and wiring problems.",
      "svc.batt.m": "Free battery test",
      "svc.maint.t": "Scheduled Maintenance",
      "svc.maint.d": "Factory-interval services (30k / 60k / 90k) that keep your warranty and your car healthy.",
      "svc.maint.m": "Keeps warranty valid",
      "svc.insp.t": "Pre-Purchase Inspection",
      "svc.insp.d": "Buying a used car? Bring it here first. We'll look it over and tell you honestly if it's worth it.",
      "svc.insp.m": "Before you buy",
      "svc.note": "Don't see your problem on the list? Call us — chances are we handle it.",

      /* ---------- deals ---------- */
      "deals.eyebrow": "Current specials",
      "deals.h2": "Save money this month",
      "deals.lede": "Mention the code when you book or show this page at the counter. Simple as that.",
      "deals.d1.tag": "Oil Change",
      "deals.d1.amt": "$20 OFF",
      "deals.d1.for": "Full Synthetic Oil Change",
      "deals.d1.desc": "Includes filter, multi-point inspection and fluid top-off.",
      "deals.d2.tag": "Tires",
      "deals.d2.amt": "FREE",
      "deals.d2.for": "Alignment with 4 New Tires",
      "deals.d2.desc": "Buy a set of 4 tires from us and the 4-wheel alignment is on the house.",
      "deals.d3.tag": "Brakes",
      "deals.d3.amt": "$40 OFF",
      "deals.d3.for": "Brake Service (per axle)",
      "deals.d3.desc": "Pads and rotors replacement. Brake inspection is always free.",
      "deals.d4.tag": "Stay cool",
      "deals.d4.amt": "$25 OFF",
      "deals.d4.for": "A/C Service & Recharge",
      "deals.d4.desc": "Performance check, leak inspection and refrigerant recharge.",
      "deals.d5.tag": "Diagnostics",
      "deals.d5.amt": "FREE",
      "deals.d5.for": "Check-Engine Light Scan",
      "deals.d5.desc": "We pull the codes and explain them. No obligation to repair with us.",
      "deals.d6.tag": "Big jobs",
      "deals.d6.amt": "10% OFF",
      "deals.d6.for": "Any Repair Over $500",
      "deals.d6.desc": "Applies to labor on major mechanical repairs. Max discount $150.",
      "deals.code": "Code",
      "deals.use": "Use this deal",
      "deals.copied": "Copied!",
      "deals.fine": "Fine print: one offer per visit, per vehicle. Cannot be combined with other offers or applied to work already in progress. Discounts apply to standard shop pricing and must be mentioned when you drop off the vehicle. Some vehicles (diesel, heavy-duty, some European models) may require additional parts or labor. Offers valid at our Miami location while supplies last — call to confirm availability and current pricing.",

      /* ---------- process ---------- */
      "how.eyebrow": "How it works",
      "how.h2": "No surprises. Ever.",
      "how.lede": "The reason people keep coming back for almost two decades is simple: we treat your car and your wallet with respect.",
      "how.s1.t": "Tell us what's happening",
      "how.s1.d": "Book online, call, or send a WhatsApp. Describe the noise, the light, the leak — whatever it's doing.",
      "how.s2.t": "We diagnose it properly",
      "how.s2.d": "We inspect and test before quoting. If it's something small, we'll tell you it's something small.",
      "how.s3.t": "You approve the price",
      "how.s3.d": "You get a clear estimate first. Nothing gets repaired until you say yes. No surprise line items.",
      "how.s4.t": "Drive away confident",
      "how.s4.d": "We road-test the work, explain what we did, and hand you back a car you can trust.",

      "why.eyebrow": "Why Pacho's",
      "why.f1.t": "Honest by default",
      "why.f1.d": "If your car doesn't need it, we'll tell you it doesn't need it. That's the whole business model.",
      "why.f2.t": "Family-owned since 2006",
      "why.f2.d": "Same family, same shop, same neighborhood. We're not going anywhere and our name is on the door.",
      "why.f3.t": "Fair, upfront pricing",
      "why.f3.d": "You hear the number before the wrench turns. No mystery charges when you pick up the car.",
      "why.f4.t": "Español e inglés",
      "why.f4.d": "Explained in the language you're comfortable with, in words that actually make sense.",

      /* ---------- reviews ---------- */
      "rev.eyebrow": "What people say",
      "rev.h2": "4.8 stars from your neighbors",
      "rev.score": "4.8",
      "rev.meta": "Average rating across 100+ public reviews",
      "rev.r1": "They were honest, great pricing, and quick. They were very upfront about what was going on with my car and kept me informed the whole time.",
      "rev.r1n": "Miami customer",
      "rev.r2": "I have already found the best mechanic in Florida and it is Pacho's Quality Auto Repair. He's fair with prices and I've never had a bad experience here.",
      "rev.r2n": "Long-time client",
      "rev.r3": "Took the time to answer all my questions and explain my options, then gave me a fair estimate with no surprise charges. My A/C works like new.",
      "rev.r3n": "Kendall driver",
      "rev.src": "Public review",
      "rev.cta": "Read all reviews",

      /* ---------- about ---------- */
      "about.eyebrow": "Our shop",
      "about.h2": "A real family shop, not a chain",
      "about.p1": "Pacho's Quality Auto Repair opened its doors in Miami in 2006 and has been run by the same family ever since. No corporate sales quotas, no rotating staff, no upselling scripts — just a shop that has stayed in business almost twenty years because people keep sending their friends and family here.",
      "about.p2": "We work on domestic, Asian and European vehicles, and we handle everything from a 20-minute oil change to a full mechanical repair. When your car comes in, it gets looked at by someone who has seen that problem a hundred times before — and who will tell you the truth about it.",
      "about.verse": "\"Whatever you do, work at it with all your heart, as working for the Lord.\" — Colossians 3:23",

      /* ---------- faq ---------- */
      "faq.eyebrow": "Good to know",
      "faq.h2": "Frequently asked questions",
      "faq.q1": "Do I need an appointment?",
      "faq.a1": "Walk-ins are welcome, but booking ahead means we can reserve a bay and get to your car faster — especially for oil changes, tires and alignments on Saturdays. You can book online in under two minutes.",
      "faq.q2": "Will I get a price before you start working?",
      "faq.a2": "Always. We inspect the vehicle, then give you an estimate. Nothing gets repaired until you approve it. If we find something else along the way, we call you first.",
      "faq.q3": "What is a VIN and why do you ask for it?",
      "faq.a3": "The VIN is the 17-character number stamped on your dashboard at the base of the windshield, on the driver's door jamb sticker, and on your insurance card and registration. It tells us the exact engine, trim and factory options on your car so we can order the right parts the first time. It is helpful but completely optional — we can book you without it.",
      "faq.q4": "Do you offer a warranty on your work?",
      "faq.a4": "Yes — most repairs are covered by a parts-and-labor warranty. Coverage varies by the part and the type of repair, so ask us for the exact terms on your specific service and we'll put it in writing on your invoice.",
      "faq.q5": "Can I wait while my car is serviced?",
      "faq.a5": "For quick jobs like oil changes, tire rotations and battery replacement, yes — most people wait. For bigger repairs, dropping the car off is usually the better move. Just let us know which you prefer when you book.",
      "faq.q6": "Do you work on European cars?",
      "faq.a6": "Yes. We regularly service domestic, Asian and European vehicles. If a job requires a dealer-only tool or programming we don't have in-house, we'll tell you straight instead of guessing on your dime.",
      "faq.q7": "How do I pay?",
      "faq.a7": "We accept cash and major credit and debit cards. Ask us at drop-off if you'd like to confirm your payment method before the work starts.",
      "faq.q8": "¿Hablan español?",
      "faq.a8": "Claro que sí. The whole team speaks Spanish, and this entire website works in Spanish too — just tap the flag at the top of the page.",

      /* ---------- location ---------- */
      "loc.eyebrow": "Find us",
      "loc.h2": "Right here in Miami",
      "loc.lede": "Serving Kendall, West Kendall, The Hammocks, Country Walk, Richmond West and all of South Miami-Dade.",
      "loc.addrL": "Address",
      "loc.phoneL": "Phone",
      "loc.hoursL": "Hours",
      "loc.hoursV": "Mon–Fri 8:30 AM – 5:30 PM<br>Saturday 8:30 AM – 3:00 PM<br>Sunday closed",
      "loc.langL": "Languages",
      "loc.langV": "English & Español",
      "loc.mapTitle": "Map showing Pacho's Quality Auto Repair in Miami",

      /* ---------- CTA band ---------- */
      "band.h2": "Ready when you are",
      "band.p": "Book your appointment in two minutes, or just call and talk to a real person. We'll take care of it from there.",

      /* ---------- footer ---------- */
      "foot.tag": "Family-owned auto repair in Miami since 2006. Honest diagnosis, fair pricing, and work you can trust — in English and Spanish.",
      "foot.navT": "Explore",
      "foot.svcT": "Popular services",
      "foot.contactT": "Contact",
      "foot.hoursT": "Hours",
      "foot.rights": "All rights reserved.",
      "foot.disclaimer": "Prices, promotions and availability subject to change. Call to confirm.",

      /* ---------- appointment page ---------- */
      "appt.crumb": "Book an appointment",
      "appt.h1a": "Book your",
      "appt.h1b": "appointment",
      "appt.lede": "Fill this out and we'll confirm your spot by phone or WhatsApp — usually the same business day. Takes about two minutes.",
      "appt.badge1": "No payment required now",
      "appt.badge2": "We confirm before it's final",
      "appt.badge3": "English / Español",

      "appt.s1t": "What does your car need?",
      "appt.s1d": "Pick everything that applies — you can select more than one.",
      "appt.svcOther": "Something else / not sure",
      "appt.otherL": "Tell us more about the problem",
      "appt.otherPh": "Example: it makes a grinding noise when I brake, and the steering wheel shakes on the highway…",
      "appt.otherHint": "Noises, warning lights, leaks, when it started, whether it happens hot or cold — all of it helps us diagnose faster.",
      "appt.urgencyL": "How soon do you need it?",
      "appt.urg1t": "Flexible",
      "appt.urg1d": "Any day that works for you",
      "appt.urg2t": "This week",
      "appt.urg2d": "Sooner is better",
      "appt.urg3t": "Urgent",
      "appt.urg3d": "Car is down or unsafe",

      "appt.s2t": "Your vehicle",
      "appt.s2d": "The basics so we can prepare the right parts and time.",
      "appt.yearL": "Year",
      "appt.yearPh": "2019",
      "appt.makeL": "Make",
      "appt.makePh": "Toyota",
      "appt.modelL": "Model",
      "appt.modelPh": "Camry",
      "appt.milesL": "Approximate mileage",
      "appt.milesPh": "85,000",
      "appt.transL": "Transmission",
      "appt.transAuto": "Automatic",
      "appt.transMan": "Manual",
      "appt.transIdk": "Not sure",
      "appt.optional": "Optional",
      "appt.vinL": "VIN number",
      "appt.vinOpt": "Recommended, not required",
      "appt.vinPh": "1HGCM82633A004352",
      "appt.vinNote": "<b>Why we ask:</b> the VIN is a 17-character code found on your dashboard by the windshield, on the driver's door jamb sticker, or on your registration and insurance card. It tells us the exact engine and factory options on your car so we order the correct parts the first time — which usually means a faster, cheaper repair. <b>You can absolutely book without it.</b>",
      "appt.vinValid": "Looks good — 17 characters.",
      "appt.vinShort": "characters — a VIN has 17. Leave it blank if you can't find it.",
      "appt.vinBad": "A VIN doesn't contain the letters I, O or Q. Double-check that one.",

      "appt.s3t": "When works for you?",
      "appt.s3d": "Pick a preferred day and time window. We'll confirm the exact time with you.",
      "appt.dateL": "Preferred date",
      "appt.timeL": "Preferred time window",
      "appt.timeAny": "Any time they have available",
      "appt.timeMorning": "Morning (8:30 AM – 11:00 AM)",
      "appt.timeMidday": "Midday (11:00 AM – 2:00 PM)",
      "appt.timeAfternoon": "Afternoon (2:00 PM – 5:30 PM)",
      "appt.date2L": "Backup date",
      "appt.waitL": "Will you wait or drop off?",
      "appt.wait1t": "I'll wait",
      "appt.wait1d": "Best for quick services",
      "appt.wait2t": "I'll drop it off",
      "appt.wait2d": "Best for bigger repairs",
      "appt.wait3t": "Needs a tow",
      "appt.wait3d": "The car can't be driven",
      "appt.closedWarn": "Heads up: we're closed on Sundays. Please pick another day.",
      "appt.satNote": "Saturdays fill up fast — we close at 3:00 PM.",
      "appt.pastWarn": "Please pick a date in the future.",

      "appt.s4t": "How do we reach you?",
      "appt.s4d": "We only use this to confirm your appointment.",
      "appt.nameL": "Full name",
      "appt.namePh": "Juan Pérez",
      "appt.phoneL": "Phone number",
      "appt.phonePh": "(305) 555-0123",
      "appt.emailL": "Email",
      "appt.emailPh": "you@email.com",
      "appt.contactL": "Best way to reach you",
      "appt.c1": "WhatsApp",
      "appt.c2": "Phone call",
      "appt.c3": "Text message",
      "appt.c4": "Email",
      "appt.langL": "Preferred language",
      "appt.langEn": "English",
      "appt.langEs": "Español",
      "appt.promoL": "Promo code",
      "appt.promoPh": "OIL20",
      "appt.promoHint": "Have a code from our deals section? Drop it here.",
      "appt.newL": "Have you been here before?",
      "appt.new1": "First time",
      "appt.new2": "I'm a returning customer",
      "appt.consent": "I agree to be contacted about this appointment request by phone, text, WhatsApp or email.",
      "appt.consentErr": "Please check this box so we can contact you about your appointment.",
      "appt.errService": "Pick at least one service — or choose “Something else / not sure”.",
      "appt.errName": "Please tell us your name.",
      "appt.errPhone": "Please enter a phone number we can reach you at.",

      "appt.sendTitle": "Send your request",
      "appt.sendDesc": "Choose how you'd like to send it. WhatsApp is the fastest — your details get filled in automatically.",
      "appt.sendWa": "Send by WhatsApp",
      "appt.sendMail": "Send by email",
      "appt.sendCall": "I'd rather just call",
      "appt.sendNote": "This is a booking request, not a confirmed appointment. A team member will confirm your day and time. No payment is taken online.",
      "appt.errFix": "Please complete the highlighted fields above.",

      "appt.doneTitle": "Almost done — send it to us",
      "appt.doneP": "Here's your request. Tap a button below to send it, or copy it and paste it anywhere.",
      "appt.copy": "Copy request",
      "appt.copied": "Copied to clipboard",
      "appt.edit": "Go back and edit",

      "appt.railT": "Need it faster?",
      "appt.railP": "Call the shop and we'll book you right there. Someone always picks up during business hours.",
      "appt.railHoursT": "Today",
      "appt.railWhy": "Why book online?",
      "appt.railW1": "We reserve a bay for your car",
      "appt.railW2": "We can order parts before you arrive",
      "appt.railW3": "Less waiting on busy Saturdays",

      /* summary labels used when composing the message */
      "sum.title": "APPOINTMENT REQUEST — Pacho's Quality Auto Repair",
      "sum.services": "Services needed",
      "sum.details": "Details",
      "sum.urgency": "Urgency",
      "sum.vehicle": "Vehicle",
      "sum.mileage": "Mileage",
      "sum.trans": "Transmission",
      "sum.vin": "VIN",
      "sum.date": "Preferred date",
      "sum.date2": "Backup date",
      "sum.time": "Time window",
      "sum.wait": "Wait / drop-off",
      "sum.name": "Name",
      "sum.phone": "Phone",
      "sum.email": "Email",
      "sum.contact": "Best contact method",
      "sum.lang": "Language",
      "sum.promo": "Promo code",
      "sum.customer": "Customer type",
      "sum.none": "Not provided",
      "sum.mailSubject": "Appointment request — "
    },

    es: {
      /* ---------- meta ---------- */
      "meta.title": "Pacho's Quality Auto Repair | Mecánicos honestos en Miami, FL",
      "meta.desc": "Taller familiar en Miami desde 2006. Cambios de aceite, cauchos, frenos, aire acondicionado, diagnóstico y alineamiento. 4.8★ con más de 100 reseñas. Llame al (305) 238-9333.",
      "meta.titleAppt": "Pautar una cita | Pacho's Quality Auto Repair, Miami",
      "meta.descAppt": "Agende su servicio en Pacho's Quality Auto Repair en Miami. Díganos su vehículo, elija el día, agregue el VIN (opcional) y le confirmamos por llamada o WhatsApp.",

      /* ---------- ticker ---------- */
      "ticker.1": "$20 DE DESCUENTO en cambio de aceite sintético",
      "ticker.2": "Alineamiento GRATIS con 4 cauchos nuevos",
      "ticker.3": "$40 DE DESCUENTO en servicio de frenos",
      "ticker.4": "Escaneo GRATIS de la luz del motor",
      "ticker.5": "Taller familiar en Miami desde 2006",
      "ticker.6": "We speak English",

      /* ---------- nav ---------- */
      "nav.home": "Inicio",
      "nav.services": "Servicios",
      "nav.deals": "Ofertas",
      "nav.why": "Por qué",
      "nav.reviews": "Reseñas",
      "nav.faq": "Preguntas",
      "nav.location": "Ubicación",
      "nav.book": "Pautar cita",
      "nav.menu": "Menú",
      "cta.call": "Llamar",
      "cta.callFull": "Llamar (305) 238-9333",
      "cta.callNow": "Llámenos ahora",
      "cta.book": "Pautar una cita",
      "cta.bookShort": "Cita",
      "cta.whatsapp": "WhatsApp",
      "cta.whatsappUs": "Escríbanos por WhatsApp",
      "cta.directions": "Cómo llegar",
      "cta.seeDeals": "Ver ofertas del mes",
      "lang.en": "Inglés",
      "lang.es": "Español",
      "lang.switch": "Cambiar idioma",

      /* ---------- hero ---------- */
      "hero.badge": "Miami · Kendall · West Kendall",
      "hero.h1a": "El mecánico en",
      "hero.h1b": "quien confían.",
      "hero.lede": "Un taller familiar en Miami desde 2006. Le decimos lo que su carro realmente necesita, le damos el precio antes de tocarlo y lo devolvemos a la carretera — cambios de aceite, cauchos, frenos, aire acondicionado y mecánica en general.",
      "hero.t1": "4.8 ★ · más de 100 reseñas",
      "hero.t2": "Negocio familiar desde 2006",
      "hero.t3": "Presupuesto antes de trabajar",
      "hero.t4": "Se habla español",
      "shop.title": "Horario del taller",
      "shop.open": "Abierto ahora",
      "shop.closed": "Cerrado ahora",
      "shop.stat1n": "19+",
      "shop.stat1l": "Años en Miami",
      "shop.stat2n": "4.8★",
      "shop.stat2l": "Calificación",
      "shop.stat3n": "100%",
      "shop.stat3l": "Precios claros",
      "shop.addr": "12430 SW 128th St, Ste 2 · Miami, FL 33186",

      "day.mon": "Lunes",
      "day.tue": "Martes",
      "day.wed": "Miércoles",
      "day.thu": "Jueves",
      "day.fri": "Viernes",
      "day.sat": "Sábado",
      "day.sun": "Domingo",
      "day.weekdays": "Lun – Vie",
      "hours.weekday": "8:30 AM – 5:30 PM",
      "hours.sat": "8:30 AM – 3:00 PM",
      "hours.closed": "Cerrado",

      /* ---------- garantías ---------- */
      "trust.t1": "Garantía de piezas y mano de obra",
      "trust.d1": "La mayoría de las reparaciones tienen cobertura. Pregúntenos y le ponemos los términos exactos en la factura.",
      "trust.t2": "Usted ve el precio primero",
      "trust.d2": "Revisamos y después cotizamos. Nada se repara hasta que usted apruebe el número.",
      "trust.t3": "La misma familia desde 2006",
      "trust.d3": "Casi veinte años en el mismo taller de Miami. Nuestro nombre está en la puerta.",
      "trust.t4": "Español e inglés",
      "trust.d4": "Se lo explicamos en su idioma, con palabras que de verdad se entienden.",

      /* ---------- etiquetas de servicios ---------- */
      "svc.tag1": "Lo más pedido",
      "svc.tag2": "Alineamiento gratis",
      "svc.tag3": "Escaneo gratis",
      "svc.all": "Todo lo demás que hacemos",

      /* ---------- comodidades ---------- */
      "amen.title": "Mientras está aquí",
      "amen.1": "Sala de espera con aire",
      "amen.2": "Wi-Fi gratis",
      "amen.3": "Espere o deje el carro",
      "amen.4": "Aceptamos tarjetas y efectivo",
      "amen.5": "Estacionamiento gratis",
      "amen.6": "Avisos por texto o WhatsApp",
      "amen.note": "Comodidades por confirmar con el taller antes de publicar.",

      /* ---------- brands ---------- */
      "brands.title": "Atendemos lo que Miami maneja",

      /* ---------- services ---------- */
      "svc.eyebrow": "Lo que hacemos",
      "svc.h2": "Todo lo que su carro necesita, en un solo lugar",
      "svc.lede": "Desde un cambio de aceite rápido hasta esa luz del motor que nadie más pudo resolver. Vehículos americanos, asiáticos y europeos.",
      "svc.oil.t": "Cambio de aceite",
      "svc.oil.d": "Convencional, alto kilometraje y sintético completo. Incluye inspección de varios puntos, relleno de fluidos y filtro.",
      "svc.oil.m": "La mayoría en 30–45 min",
      "svc.tires.t": "Cauchos y ruedas",
      "svc.tires.d": "Cauchos nuevos, montaje, balanceo, rotación, parches y sensores TPMS. Le ayudamos a elegir el caucho correcto para su presupuesto.",
      "svc.tires.m": "Alineamiento gratis con 4",
      "svc.align.t": "Alineamiento",
      "svc.align.d": "Alineamiento computarizado de 4 ruedas. Deja de halar hacia un lado, deja de comerse los cauchos y endereza el volante.",
      "svc.align.m": "Pregunte por el combo",
      "svc.brakes.t": "Frenos",
      "svc.brakes.d": "Pastillas, discos, calipers, líquido de frenos y diagnóstico de ABS. Si chilla, raspa o vibra, tráigalo.",
      "svc.brakes.m": "Inspección gratis",
      "svc.diag.t": "Luz del motor y diagnóstico",
      "svc.diag.d": "Diagnóstico de verdad, no adivinanzas. Escaneamos los códigos, probamos el sistema y le explicamos qué pasa antes de gastar su dinero.",
      "svc.diag.m": "Escaneo de códigos gratis",
      "svc.ac.t": "Aire acondicionado",
      "svc.ac.d": "En Miami el aire no es un lujo. Recarga, detección de fugas, compresor, condensador y reparación del soplador.",
      "svc.ac.m": "Una de nuestras especialidades",
      "svc.susp.t": "Suspensión y dirección",
      "svc.susp.d": "Amortiguadores, bases, tijeras, rótulas, bujes y dirección hidráulica. Adiós a los golpeteos y al brinco.",
      "svc.susp.m": "Incluye prueba en carretera",
      "svc.engine.t": "Motor y mecánica",
      "svc.engine.d": "Correas de tiempo, bombas de agua, empacaduras, sistema de enfriamiento, correas, mangueras y mecánica general.",
      "svc.engine.m": "Taller mecánico completo",
      "svc.batt.t": "Baterías y eléctrico",
      "svc.batt.d": "Prueba y cambio de batería, alternador y arranque. Problemas de luces, sensores y cableado.",
      "svc.batt.m": "Prueba de batería gratis",
      "svc.maint.t": "Mantenimiento programado",
      "svc.maint.d": "Servicios de fábrica (30k / 60k / 90k millas) que mantienen su garantía y su carro sano.",
      "svc.maint.m": "Mantiene la garantía",
      "svc.insp.t": "Inspección antes de comprar",
      "svc.insp.d": "¿Va a comprar un carro usado? Tráigalo primero. Lo revisamos y le decimos con honestidad si vale la pena.",
      "svc.insp.m": "Antes de comprar",
      "svc.note": "¿No ve su problema en la lista? Llámenos — lo más probable es que sí lo hagamos.",

      /* ---------- deals ---------- */
      "deals.eyebrow": "Ofertas vigentes",
      "deals.h2": "Ahorre este mes",
      "deals.lede": "Mencione el código al pautar su cita o muestre esta página en el mostrador. Así de fácil.",
      "deals.d1.tag": "Aceite",
      "deals.d1.amt": "$20 MENOS",
      "deals.d1.for": "Cambio de aceite sintético",
      "deals.d1.desc": "Incluye filtro, inspección de varios puntos y relleno de fluidos.",
      "deals.d2.tag": "Cauchos",
      "deals.d2.amt": "GRATIS",
      "deals.d2.for": "Alineamiento con 4 cauchos nuevos",
      "deals.d2.desc": "Compre el juego de 4 cauchos con nosotros y el alineamiento va por la casa.",
      "deals.d3.tag": "Frenos",
      "deals.d3.amt": "$40 MENOS",
      "deals.d3.for": "Servicio de frenos (por eje)",
      "deals.d3.desc": "Cambio de pastillas y discos. La inspección de frenos siempre es gratis.",
      "deals.d4.tag": "Aire",
      "deals.d4.amt": "$25 MENOS",
      "deals.d4.for": "Servicio y recarga de A/C",
      "deals.d4.desc": "Prueba de rendimiento, revisión de fugas y recarga de refrigerante.",
      "deals.d5.tag": "Diagnóstico",
      "deals.d5.amt": "GRATIS",
      "deals.d5.for": "Escaneo de la luz del motor",
      "deals.d5.desc": "Sacamos los códigos y se los explicamos. Sin obligación de reparar aquí.",
      "deals.d6.tag": "Trabajos grandes",
      "deals.d6.amt": "10% MENOS",
      "deals.d6.for": "Cualquier reparación de más de $500",
      "deals.d6.desc": "Aplica a la mano de obra en reparaciones mayores. Descuento máximo $150.",
      "deals.code": "Código",
      "deals.use": "Usar esta oferta",
      "deals.copied": "¡Copiado!",
      "deals.fine": "Letra pequeña: una oferta por visita y por vehículo. No se combina con otras promociones ni se aplica a trabajos ya comenzados. Los descuentos aplican sobre el precio regular del taller y deben mencionarse al dejar el vehículo. Algunos vehículos (diésel, de trabajo pesado y ciertos modelos europeos) pueden requerir piezas o mano de obra adicional. Ofertas válidas en nuestro local de Miami hasta agotar existencias — llame para confirmar disponibilidad y precios vigentes.",

      /* ---------- process ---------- */
      "how.eyebrow": "Cómo funciona",
      "how.h2": "Sin sorpresas. Nunca.",
      "how.lede": "La razón por la que la gente regresa desde hace casi dos décadas es simple: respetamos su carro y su bolsillo.",
      "how.s1.t": "Cuéntenos qué pasa",
      "how.s1.d": "Pauta en línea, llame o mándenos un WhatsApp. Describa el ruido, la luz, la fuga — lo que esté haciendo.",
      "how.s2.t": "Lo diagnosticamos bien",
      "how.s2.d": "Inspeccionamos y probamos antes de cotizar. Si es algo pequeño, le decimos que es algo pequeño.",
      "how.s3.t": "Usted aprueba el precio",
      "how.s3.d": "Primero recibe un presupuesto claro. Nada se repara hasta que usted diga que sí. Sin cobros escondidos.",
      "how.s4.t": "Maneje con confianza",
      "how.s4.d": "Probamos el trabajo en carretera, le explicamos qué hicimos y le devolvemos un carro en el que puede confiar.",

      "why.eyebrow": "Por qué Pacho's",
      "why.f1.t": "Honestos por costumbre",
      "why.f1.d": "Si su carro no lo necesita, le decimos que no lo necesita. Ese es todo el modelo de negocio.",
      "why.f2.t": "Familiar desde 2006",
      "why.f2.d": "La misma familia, el mismo taller, el mismo vecindario. No nos vamos a ningún lado y nuestro nombre está en la puerta.",
      "why.f3.t": "Precios justos y claros",
      "why.f3.d": "Usted escucha el número antes de que gire la primera llave. Sin cargos misteriosos al recoger el carro.",
      "why.f4.t": "Español e inglés",
      "why.f4.d": "Le explicamos en el idioma en el que usted se sienta cómodo, con palabras que de verdad se entienden.",

      /* ---------- reviews ---------- */
      "rev.eyebrow": "Lo que dice la gente",
      "rev.h2": "4.8 estrellas de sus vecinos",
      "rev.score": "4.8",
      "rev.meta": "Calificación promedio en más de 100 reseñas públicas",
      "rev.r1": "Fueron honestos, buen precio y rápidos. Fueron muy claros sobre lo que tenía mi carro y me mantuvieron informado todo el tiempo.",
      "rev.r1n": "Cliente de Miami",
      "rev.r2": "Ya encontré el mejor mecánico de la Florida y es Pacho's Quality Auto Repair. Es justo con los precios y nunca he tenido una mala experiencia aquí.",
      "rev.r2n": "Cliente de años",
      "rev.r3": "Se tomó el tiempo de contestar todas mis preguntas y explicarme las opciones, y me dio un presupuesto justo sin cobros sorpresa. Mi aire quedó como nuevo.",
      "rev.r3n": "Conductor de Kendall",
      "rev.src": "Reseña pública",
      "rev.cta": "Ver todas las reseñas",

      /* ---------- about ---------- */
      "about.eyebrow": "Nuestro taller",
      "about.h2": "Un taller familiar de verdad, no una cadena",
      "about.p1": "Pacho's Quality Auto Repair abrió sus puertas en Miami en 2006 y desde entonces lo maneja la misma familia. Sin cuotas de venta corporativas, sin personal que cambia cada mes, sin libretos para venderle cosas de más — solo un taller que lleva casi veinte años abierto porque la gente sigue mandando a sus amigos y familiares aquí.",
      "about.p2": "Trabajamos vehículos americanos, asiáticos y europeos, y hacemos desde un cambio de aceite de 20 minutos hasta una reparación mecánica completa. Cuando su carro entra, lo revisa alguien que ya vio ese problema cien veces — y que le va a decir la verdad.",
      "about.verse": "«Y todo lo que hagáis, hacedlo de corazón, como para el Señor.» — Colosenses 3:23",

      /* ---------- faq ---------- */
      "faq.eyebrow": "Bueno saberlo",
      "faq.h2": "Preguntas frecuentes",
      "faq.q1": "¿Necesito cita?",
      "faq.a1": "Aceptamos clientes sin cita, pero pautar con anticipación nos permite reservarle un puesto y atenderlo más rápido — sobre todo para aceite, cauchos y alineamiento los sábados. Puede pautar en línea en menos de dos minutos.",
      "faq.q2": "¿Me dan el precio antes de empezar?",
      "faq.a2": "Siempre. Revisamos el vehículo y le damos un presupuesto. No se repara nada hasta que usted lo apruebe. Si encontramos algo más en el camino, lo llamamos primero.",
      "faq.q3": "¿Qué es el VIN y por qué lo piden?",
      "faq.a3": "El VIN es el número de 17 caracteres que está en el tablero, junto al parabrisas del lado del conductor, en la calcomanía del marco de la puerta y también en su registración y en la tarjeta del seguro. Nos dice el motor exacto, la versión y las opciones de fábrica de su carro, para pedir la pieza correcta desde la primera vez. Es útil, pero totalmente opcional — podemos pautarle la cita sin él.",
      "faq.q4": "¿Dan garantía por el trabajo?",
      "faq.a4": "Sí — la mayoría de las reparaciones tienen garantía de piezas y mano de obra. La cobertura varía según la pieza y el tipo de reparación, así que pregúntenos los términos exactos de su servicio y se los ponemos por escrito en la factura.",
      "faq.q5": "¿Puedo esperar mientras atienden mi carro?",
      "faq.a5": "Para trabajos rápidos como cambio de aceite, rotación de cauchos y cambio de batería, sí — la mayoría espera. Para reparaciones más grandes, lo mejor suele ser dejar el carro. Solo indíquenos qué prefiere al pautar la cita.",
      "faq.q6": "¿Trabajan carros europeos?",
      "faq.a6": "Sí. Atendemos regularmente vehículos americanos, asiáticos y europeos. Si un trabajo requiere una herramienta o programación exclusiva del concesionario que no tenemos, se lo decimos de frente en vez de adivinar con su dinero.",
      "faq.q7": "¿Cómo puedo pagar?",
      "faq.a7": "Aceptamos efectivo y las principales tarjetas de crédito y débito. Si quiere confirmar su forma de pago antes de que empiece el trabajo, pregúntenos al dejar el carro.",
      "faq.q8": "Do you speak English?",
      "faq.a8": "Yes, of course. Todo el equipo habla inglés y español, y este sitio completo funciona en los dos idiomas — solo toque la bandera arriba en la página.",

      /* ---------- location ---------- */
      "loc.eyebrow": "Ubicación",
      "loc.h2": "Aquí mismo en Miami",
      "loc.lede": "Atendemos Kendall, West Kendall, The Hammocks, Country Walk, Richmond West y todo el sur de Miami-Dade.",
      "loc.addrL": "Dirección",
      "loc.phoneL": "Teléfono",
      "loc.hoursL": "Horario",
      "loc.hoursV": "Lun–Vie 8:30 AM – 5:30 PM<br>Sábado 8:30 AM – 3:00 PM<br>Domingo cerrado",
      "loc.langL": "Idiomas",
      "loc.langV": "Español e inglés",
      "loc.mapTitle": "Mapa con la ubicación de Pacho's Quality Auto Repair en Miami",

      /* ---------- CTA band ---------- */
      "band.h2": "Cuando usted quiera, estamos listos",
      "band.p": "Pauta su cita en dos minutos, o simplemente llame y hable con una persona de verdad. De ahí en adelante nos encargamos nosotros.",

      /* ---------- footer ---------- */
      "foot.tag": "Taller familiar en Miami desde 2006. Diagnóstico honesto, precios justos y un trabajo en el que puede confiar — en español y en inglés.",
      "foot.navT": "Explorar",
      "foot.svcT": "Servicios populares",
      "foot.contactT": "Contacto",
      "foot.hoursT": "Horario",
      "foot.rights": "Todos los derechos reservados.",
      "foot.disclaimer": "Precios, promociones y disponibilidad sujetos a cambio. Llame para confirmar.",

      /* ---------- appointment ---------- */
      "appt.crumb": "Pautar una cita",
      "appt.h1a": "Pauta tu",
      "appt.h1b": "cita",
      "appt.lede": "Llene esto y le confirmamos su cupo por teléfono o WhatsApp — normalmente el mismo día hábil. Toma unos dos minutos.",
      "appt.badge1": "No se paga nada ahora",
      "appt.badge2": "Confirmamos antes de que sea final",
      "appt.badge3": "Español / English",

      "appt.s1t": "¿Qué necesita su carro?",
      "appt.s1d": "Marque todo lo que aplique — puede elegir más de uno.",
      "appt.svcOther": "Otra cosa / no estoy seguro",
      "appt.otherL": "Cuéntenos más sobre el problema",
      "appt.otherPh": "Ejemplo: hace un ruido como de raspado cuando freno y el volante vibra en la autopista…",
      "appt.otherHint": "Ruidos, luces de advertencia, fugas, cuándo empezó, si pasa en frío o en caliente — todo ayuda a diagnosticar más rápido.",
      "appt.urgencyL": "¿Para cuándo lo necesita?",
      "appt.urg1t": "Flexible",
      "appt.urg1d": "Cualquier día que a usted le sirva",
      "appt.urg2t": "Esta semana",
      "appt.urg2d": "Mientras más pronto, mejor",
      "appt.urg3t": "Urgente",
      "appt.urg3d": "El carro está parado o inseguro",

      "appt.s2t": "Su vehículo",
      "appt.s2d": "Lo básico para preparar las piezas y el tiempo correctos.",
      "appt.yearL": "Año",
      "appt.yearPh": "2019",
      "appt.makeL": "Marca",
      "appt.makePh": "Toyota",
      "appt.modelL": "Modelo",
      "appt.modelPh": "Camry",
      "appt.milesL": "Millaje aproximado",
      "appt.milesPh": "85,000",
      "appt.transL": "Transmisión",
      "appt.transAuto": "Automática",
      "appt.transMan": "Sincrónica",
      "appt.transIdk": "No estoy seguro",
      "appt.optional": "Opcional",
      "appt.vinL": "Número de VIN",
      "appt.vinOpt": "Recomendado, no obligatorio",
      "appt.vinPh": "1HGCM82633A004352",
      "appt.vinNote": "<b>Por qué lo pedimos:</b> el VIN es un código de 17 caracteres que está en el tablero junto al parabrisas, en la calcomanía del marco de la puerta del conductor, o en su registración y tarjeta del seguro. Nos dice el motor exacto y las opciones de fábrica de su carro para pedir la pieza correcta desde la primera vez — lo que normalmente significa una reparación más rápida y más barata. <b>Puede pautar su cita perfectamente sin él.</b>",
      "appt.vinValid": "Perfecto — 17 caracteres.",
      "appt.vinShort": "caracteres — el VIN tiene 17. Déjelo en blanco si no lo encuentra.",
      "appt.vinBad": "El VIN no lleva las letras I, O ni Q. Revise ese carácter.",

      "appt.s3t": "¿Cuándo le queda bien?",
      "appt.s3d": "Elija el día y la franja de hora que prefiere. Le confirmamos la hora exacta.",
      "appt.dateL": "Fecha preferida",
      "appt.timeL": "Franja de hora preferida",
      "appt.timeAny": "Cualquier hora disponible",
      "appt.timeMorning": "Mañana (8:30 AM – 11:00 AM)",
      "appt.timeMidday": "Mediodía (11:00 AM – 2:00 PM)",
      "appt.timeAfternoon": "Tarde (2:00 PM – 5:30 PM)",
      "appt.date2L": "Fecha alternativa",
      "appt.waitL": "¿Va a esperar o a dejar el carro?",
      "appt.wait1t": "Voy a esperar",
      "appt.wait1d": "Ideal para servicios rápidos",
      "appt.wait2t": "Voy a dejarlo",
      "appt.wait2d": "Ideal para reparaciones grandes",
      "appt.wait3t": "Necesita grúa",
      "appt.wait3d": "El carro no se puede manejar",
      "appt.closedWarn": "Ojo: los domingos estamos cerrados. Por favor elija otro día.",
      "appt.satNote": "Los sábados se llenan rápido — cerramos a las 3:00 PM.",
      "appt.pastWarn": "Por favor elija una fecha futura.",

      "appt.s4t": "¿Cómo lo contactamos?",
      "appt.s4d": "Solo usamos esto para confirmar su cita.",
      "appt.nameL": "Nombre completo",
      "appt.namePh": "Juan Pérez",
      "appt.phoneL": "Número de teléfono",
      "appt.phonePh": "(305) 555-0123",
      "appt.emailL": "Correo electrónico",
      "appt.emailPh": "usted@correo.com",
      "appt.contactL": "Mejor forma de contactarlo",
      "appt.c1": "WhatsApp",
      "appt.c2": "Llamada",
      "appt.c3": "Mensaje de texto",
      "appt.c4": "Correo",
      "appt.langL": "Idioma preferido",
      "appt.langEn": "English",
      "appt.langEs": "Español",
      "appt.promoL": "Código de oferta",
      "appt.promoPh": "OIL20",
      "appt.promoHint": "¿Tiene un código de la sección de ofertas? Póngalo aquí.",
      "appt.newL": "¿Ha venido antes?",
      "appt.new1": "Primera vez",
      "appt.new2": "Soy cliente frecuente",
      "appt.consent": "Acepto que me contacten sobre esta solicitud de cita por teléfono, texto, WhatsApp o correo.",
      "appt.consentErr": "Marque esta casilla para que podamos contactarlo sobre su cita.",
      "appt.errService": "Elija al menos un servicio — o marque «Otra cosa / no estoy seguro».",
      "appt.errName": "Por favor díganos su nombre.",
      "appt.errPhone": "Por favor escriba un número de teléfono donde podamos ubicarlo.",

      "appt.sendTitle": "Envíe su solicitud",
      "appt.sendDesc": "Elija cómo quiere enviarla. WhatsApp es lo más rápido — sus datos se llenan automáticamente.",
      "appt.sendWa": "Enviar por WhatsApp",
      "appt.sendMail": "Enviar por correo",
      "appt.sendCall": "Mejor prefiero llamar",
      "appt.sendNote": "Esto es una solicitud de cita, no una cita confirmada. Un miembro del equipo confirmará su día y hora. No se cobra nada en línea.",
      "appt.errFix": "Por favor complete los campos marcados arriba.",

      "appt.doneTitle": "Ya casi — envíenoslo",
      "appt.doneP": "Aquí está su solicitud. Toque un botón abajo para enviarla, o cópiela y péguela donde quiera.",
      "appt.copy": "Copiar solicitud",
      "appt.copied": "Copiado al portapapeles",
      "appt.edit": "Volver y editar",

      "appt.railT": "¿Lo necesita más rápido?",
      "appt.railP": "Llame al taller y le pautamos ahí mismo. Siempre contesta alguien en horario de trabajo.",
      "appt.railHoursT": "Hoy",
      "appt.railWhy": "¿Por qué pautar en línea?",
      "appt.railW1": "Le reservamos un puesto a su carro",
      "appt.railW2": "Podemos pedir las piezas antes de que llegue",
      "appt.railW3": "Menos espera los sábados llenos",

      /* summary */
      "sum.title": "SOLICITUD DE CITA — Pacho's Quality Auto Repair",
      "sum.services": "Servicios que necesita",
      "sum.details": "Detalles",
      "sum.urgency": "Urgencia",
      "sum.vehicle": "Vehículo",
      "sum.mileage": "Millaje",
      "sum.trans": "Transmisión",
      "sum.vin": "VIN",
      "sum.date": "Fecha preferida",
      "sum.date2": "Fecha alternativa",
      "sum.time": "Franja de hora",
      "sum.wait": "Espera / deja el carro",
      "sum.name": "Nombre",
      "sum.phone": "Teléfono",
      "sum.email": "Correo",
      "sum.contact": "Mejor forma de contacto",
      "sum.lang": "Idioma",
      "sum.promo": "Código de oferta",
      "sum.customer": "Tipo de cliente",
      "sum.none": "No indicado",
      "sum.mailSubject": "Solicitud de cita — "
    }
  };

  const STORAGE_KEY = "pacho-lang";
  const SUPPORTED = ["en", "es"];

  function detect() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.includes(saved)) return saved;
    } catch (e) { /* private mode */ }
    const params = new URLSearchParams(location.search);
    const q = params.get("lang");
    if (q && SUPPORTED.includes(q)) return q;
    const nav = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
    return nav.toLowerCase().startsWith("es") ? "es" : "en";
  }

  const I18N = {
    lang: "en",
    t(key) {
      const table = DICT[I18N.lang] || DICT.en;
      return (key in table) ? table[key] : (DICT.en[key] !== undefined ? DICT.en[key] : key);
    },
    apply(root) {
      const scope = root || document;
      scope.querySelectorAll("[data-i18n]").forEach((el) => {
        el.textContent = I18N.t(el.getAttribute("data-i18n"));
      });
      scope.querySelectorAll("[data-i18n-html]").forEach((el) => {
        el.innerHTML = I18N.t(el.getAttribute("data-i18n-html"));
      });
      scope.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        el.setAttribute("placeholder", I18N.t(el.getAttribute("data-i18n-placeholder")));
      });
      scope.querySelectorAll("[data-i18n-aria]").forEach((el) => {
        el.setAttribute("aria-label", I18N.t(el.getAttribute("data-i18n-aria")));
      });
      scope.querySelectorAll("[data-i18n-title]").forEach((el) => {
        el.setAttribute("title", I18N.t(el.getAttribute("data-i18n-title")));
      });
      scope.querySelectorAll("[data-i18n-content]").forEach((el) => {
        el.setAttribute("content", I18N.t(el.getAttribute("data-i18n-content")));
      });
      const titleKey = document.documentElement.getAttribute("data-title-key");
      if (titleKey) document.title = I18N.t(titleKey);
    },
    set(lang, opts) {
      if (!SUPPORTED.includes(lang)) lang = "en";
      I18N.lang = lang;
      document.documentElement.setAttribute("lang", lang);
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
      I18N.apply();
      document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
        btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang-btn") === lang));
      });
      document.dispatchEvent(new CustomEvent("langchange", { detail: { lang, silent: !!(opts && opts.silent) } }));
    },
    toggle() { I18N.set(I18N.lang === "en" ? "es" : "en"); },
    init() {
      I18N.set(detect(), { silent: true });
      document.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-lang-btn]");
        if (!btn) return;
        e.preventDefault();
        I18N.set(btn.getAttribute("data-lang-btn"));
      });
    }
  };

  window.I18N = I18N;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", I18N.init);
  } else {
    I18N.init();
  }
})();
