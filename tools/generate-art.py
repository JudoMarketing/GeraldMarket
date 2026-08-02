"""Regenerate the three square service vignettes.

    python3 tools/generate-art.py

Writes assets/img/art-tires.svg, art-oil.svg and art-diag.svg.
Edit the numbers here rather than the generated SVG.
"""
import math, os

# Writes into ../assets/img relative to this file.
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "img")

DEFS = """  <defs>
    <linearGradient id="{p}A" x1="0" y1="0" x2="0.8" y2="1">
      <stop offset="0" stop-color="#FFD870"/><stop offset="0.5" stop-color="#FFB020"/><stop offset="1" stop-color="#FF6A12"/>
    </linearGradient>
    <linearGradient id="{p}S" x1="0.1" y1="0" x2="0.6" y2="1">
      <stop offset="0" stop-color="#55647B"/><stop offset="1" stop-color="#28323F"/>
    </linearGradient>
    <radialGradient id="{p}G" cx="0.5" cy="0.45" r="0.55">
      <stop offset="0" stop-color="#FF8A1E" stop-opacity="0.22"/><stop offset="1" stop-color="#FF8A1E" stop-opacity="0"/>
    </radialGradient>
  </defs>
"""


def wrap(prefix, title, label, body):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img" aria-label="{label}">\n'
        f"  <title>{title}</title>\n"
        + DEFS.format(p=prefix)
        + f'  <rect width="400" height="400" fill="url(#{prefix}G)"/>\n'
        + body
        + "</svg>\n"
    )


# ---------------------------------------------------------------- 1. wheel + torque wrench
def wheel():
    p = "tw"
    cx, cy = 198, 196
    o = []
    # tyre carcass + tread blocks
    o.append(f'  <circle cx="{cx}" cy="{cy}" r="144" fill="#0E141D"/>')
    for i in range(30):
        a = i * 360 / 30
        o.append(
            f'  <rect x="{cx-7}" y="{cy-148}" width="14" height="24" rx="4" fill="#242E3C" '
            f'transform="rotate({a:.1f} {cx} {cy})"/>'
        )
    o.append(f'  <circle cx="{cx}" cy="{cy}" r="126" fill="#151D27"/>')
    o.append(f'  <circle cx="{cx}" cy="{cy}" r="126" fill="none" stroke="#2C3849" stroke-width="3"/>')
    o.append(f'  <circle cx="{cx}" cy="{cy}" r="106" fill="none" stroke="#2C3849" stroke-width="2" '
             f'stroke-dasharray="9 15" opacity="0.65"/>')
    # alloy rim: dark face, bright lip, bright spokes
    o.append(f'  <circle cx="{cx}" cy="{cy}" r="90" fill="#1A222E"/>')
    o.append(f'  <circle cx="{cx}" cy="{cy}" r="90" fill="none" stroke="url(#{p}S)" stroke-width="11"/>')
    o.append(f'  <circle cx="{cx}" cy="{cy}" r="84" fill="none" stroke="#8496AF" stroke-width="2" opacity="0.5"/>')
    for i in range(5):
        a = math.radians(i * 72 - 90)
        x1, y1 = cx + 26 * math.cos(a - 0.30), cy + 26 * math.sin(a - 0.30)
        x2, y2 = cx + 26 * math.cos(a + 0.30), cy + 26 * math.sin(a + 0.30)
        x3, y3 = cx + 84 * math.cos(a + 0.17), cy + 84 * math.sin(a + 0.17)
        x4, y4 = cx + 84 * math.cos(a - 0.17), cy + 84 * math.sin(a - 0.17)
        o.append(
            f'  <path d="M{x1:.1f},{y1:.1f} L{x2:.1f},{y2:.1f} L{x3:.1f},{y3:.1f} L{x4:.1f},{y4:.1f} Z" '
            f'fill="url(#{p}S)"/>'
        )
    # hub + lug nuts
    o.append(f'  <circle cx="{cx}" cy="{cy}" r="32" fill="#3F4C5E"/>')
    o.append(f'  <circle cx="{cx}" cy="{cy}" r="32" fill="none" stroke="#8496AF" stroke-width="2"/>')
    for i in range(5):
        a = math.radians(i * 72 - 54)
        lx, ly = cx + 20 * math.cos(a), cy + 20 * math.sin(a)
        o.append(f'  <circle cx="{lx:.1f}" cy="{ly:.1f}" r="5.6" fill="#111823"/>')
    o.append(f'  <circle cx="{cx}" cy="{cy}" r="10" fill="url(#{p}A)"/>')

    # torque wrench across the wheel, socket seated on a lug
    la = math.radians(-54)
    lx, ly = cx + 20 * math.cos(la), cy + 20 * math.sin(la)
    o.append(f'  <g transform="rotate(34 {lx:.1f} {ly:.1f})">')
    o.append(f'    <rect x="{lx-9:.1f}" y="{ly+20:.1f}" width="18" height="196" rx="9" fill="url(#{p}S)"/>')
    o.append(f'    <rect x="{lx-9:.1f}" y="{ly+20:.1f}" width="7" height="196" rx="3.5" fill="#A5B4C9" opacity="0.35"/>')
    o.append(f'    <rect x="{lx-14:.1f}" y="{ly+150:.1f}" width="28" height="66" rx="12" fill="#161E29"/>')
    o.append(f'    <rect x="{lx-14:.1f}" y="{ly+150:.1f}" width="28" height="66" rx="12" fill="none" '
             f'stroke="url(#{p}A)" stroke-width="2.5" opacity="0.8"/>')
    o.append(f'    <circle cx="{lx:.1f}" cy="{ly:.1f}" r="22" fill="#28323F"/>')
    o.append(f'    <circle cx="{lx:.1f}" cy="{ly:.1f}" r="22" fill="none" stroke="url(#{p}A)" stroke-width="9"/>')
    o.append("  </g>")
    return wrap(p, "Wheel and tire service", "A wheel with a torque wrench on the lug nuts", "\n".join(o) + "\n")


# ---------------------------------------------------------------- 2. oil change
def oil():
    p = "ol"
    o = []
    # oil filter cylinder
    o.append('  <g transform="rotate(-10 150 180)">')
    o.append('    <rect x="96" y="92" width="108" height="150" rx="18" fill="url(#olS)"/>')
    o.append('    <rect x="96" y="92" width="108" height="150" rx="18" fill="none" stroke="#7B8BA3" stroke-width="2.5"/>')
    for y in range(112, 232, 16):
        o.append(f'    <rect x="104" y="{y}" width="92" height="5" rx="2.5" fill="#0F1620" opacity="0.55"/>')
    o.append('    <rect x="110" y="76" width="80" height="24" rx="8" fill="url(#olA)"/>')
    o.append("  </g>")
    # drain plug + bolt
    o.append('  <rect x="228" y="128" width="78" height="26" rx="13" fill="url(#olS)"/>')
    o.append('  <polygon points="316,141 308,127 292,127 284,141 292,155 308,155" fill="url(#olA)"/>')
    # falling drops
    o.append('  <path d="M258,178 c0,-9 9,-17 9,-17 s9,8 9,17 a9,9 0 0 1 -18,0 z" fill="url(#olA)" opacity="0.95"/>')
    o.append('  <path d="M276,224 c0,-7 7,-13 7,-13 s7,6 7,13 a7,7 0 0 1 -14,0 z" fill="url(#olA)" opacity="0.65"/>')
    o.append('  <circle cx="292" cy="256" r="5" fill="url(#olA)" opacity="0.4"/>')
    # drain pan with oil
    o.append('  <path d="M92,300 h216 a10,10 0 0 1 10,10 v22 a26,26 0 0 1 -26,26 H108 a26,26 0 0 1 -26,-26 v-22 a10,10 0 0 1 10,-10 z" fill="#1B2331"/>')
    o.append('  <path d="M92,300 h216 a10,10 0 0 1 10,10 v6 H82 v-6 a10,10 0 0 1 10,-10 z" fill="#2E3A4C"/>')
    o.append('  <ellipse cx="200" cy="326" rx="104" ry="9" fill="url(#olA)" opacity="0.55"/>')
    return wrap(p, "Oil change service", "An oil filter, drain plug and drain pan", "\n".join(o) + "\n")


# ---------------------------------------------------------------- 3. diagnostics
def diag():
    p = "dg"
    o = []
    # cable from the OBD port
    o.append('  <path d="M96,318 C96,250 150,246 168,214" fill="none" stroke="#2E3A4C" stroke-width="11" stroke-linecap="round"/>')
    o.append('  <rect x="70" y="312" width="54" height="34" rx="8" fill="url(#dgS)"/>')
    o.append('  <g fill="#0F1620"><rect x="80" y="322" width="6" height="14" rx="3"/><rect x="94" y="322" width="6" height="14" rx="3"/><rect x="108" y="322" width="6" height="14" rx="3"/></g>')
    # scan tool body
    o.append('  <rect x="148" y="60" width="172" height="248" rx="26" fill="url(#dgS)"/>')
    o.append('  <rect x="148" y="60" width="172" height="248" rx="26" fill="none" stroke="#7B8BA3" stroke-width="2.5"/>')
    # screen
    o.append('  <rect x="166" y="80" width="136" height="126" rx="12" fill="#080D14"/>')
    o.append('  <rect x="166" y="80" width="136" height="126" rx="12" fill="none" stroke="#3B4859" stroke-width="1.5"/>')
    # check-engine glyph on screen
    o.append('  <g transform="translate(234 116) scale(1.5) translate(-12 -12)">'
             '<path d="M6,9h3l2-2h4v3h2l2,2v4h-2v2h-6l-2-2H6a2,2 0 0 1 -2,-2v-3a2,2 0 0 1 2,-2z" '
             'fill="none" stroke="url(#dgA)" stroke-width="1.6" stroke-linejoin="round"/></g>')
    # waveform
    o.append('  <path d="M178,178 h18 l10,-22 l12,40 l10,-30 l9,18 h20 l8,-14 h22" fill="none" '
             'stroke="#14E0C0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>')
    # keypad
    for r in range(2):
        for c in range(3):
            o.append(f'  <rect x="{176 + c*46}" y="{224 + r*38}" width="34" height="26" rx="9" fill="#0F1620"/>')
    o.append('  <rect x="176" y="224" width="34" height="26" rx="9" fill="url(#dgA)" opacity="0.85"/>')
    return wrap(p, "Computer diagnostics", "A diagnostic scan tool plugged into a car", "\n".join(o) + "\n")


for name, fn in (("art-tires.svg", wheel), ("art-oil.svg", oil), ("art-diag.svg", diag)):
    with open(os.path.join(OUT, name), "w") as f:
        f.write(fn())
    print("wrote", name)
