"""Regenerate the line-art illustrations.

    python3 tools/generate-art.py

Style: shop-manual line drawing. Ink strokes on a transparent ground, two
stroke weights, hatching for shade, and the signal orange used only to point
at the part being serviced. No fills, no gradients — it has to look like it
was drawn with a pen, because that is what a service manual looks like.

Writes assets/img/art-bay.svg, art-tires.svg, art-oil.svg, art-diag.svg.
"""
import math
import os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "img")

INK = "#14161A"
SIGNAL = "#E5502A"
A = "    "


def svg(w, h, title, label, body):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-label="{label}">\n'
        f"  <title>{title}</title>\n"
        f'  <g fill="none" stroke="{INK}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">\n'
        + body
        + "  </g>\n</svg>\n"
    )


def hatch(x, y, w, h, step=8, angle=55, width=1.0, opacity=0.35):
    """Diagonal shading, the way a manual indicates a shadowed face."""
    o = [f'{A}<g stroke-width="{width}" opacity="{opacity}">']
    t = math.tan(math.radians(angle))
    start = x - h * t
    n = int((w + h * t) / step) + 1
    for i in range(n):
        x0 = start + i * step
        o.append(f'{A}  <path d="M{x0:.1f},{y + h:.1f} L{x0 + h * t:.1f},{y:.1f}"/>')
    o.append(f"{A}</g>")
    return "\n".join(o) + "\n"


# ------------------------------------------------------------------ bay
def bay():
    o = []
    o.append(f'{A}<path d="M20,372 H780"/>\n')
    o.append(hatch(20, 372, 760, 15, step=14, angle=62, width=1, opacity=0.25))

    for px in (150, 610):
        o.append(f'{A}<path d="M{px},372 V96"/>\n')
        o.append(f'{A}<path d="M{px + 26},372 V96"/>\n')
        o.append(f'{A}<path d="M{px - 20},372 h66"/>\n')
        o.append(f'{A}<g stroke="{SIGNAL}" stroke-width="7"><path d="M{px + 13},320 v24"/></g>\n')
    o.append(f'{A}<path d="M144,96 H642 V78 H144 Z"/>\n')

    o.append(f'{A}<path d="M176,252 H344"/>\n')
    o.append(f'{A}<path d="M616,252 H448"/>\n')
    o.append(f'{A}<path d="M330,252 v-12 h30 v12"/>\n')
    o.append(f'{A}<path d="M432,252 v-12 h30 v12"/>\n')

    o.append(f'{A}<g transform="translate(196 92)">\n')
    o.append(
        f'{A}  <path d="M24,148 C24,132 28,122 42,118 L114,106 C126,104 134,100 142,92 '
        f"L178,64 C184,59 192,56 202,56 L254,56 C266,56 274,59 280,64 L320,96 L354,104 "
        f"C366,106 374,114 376,126 L378,150 C378,157 374,162 366,162 L334,162 "
        f'A30,30 0 0 0 274,162 L138,162 A30,30 0 0 0 78,162 L34,162 C27,162 24,156 24,148 Z"/>\n'
    )
    o.append(
        f'{A}  <g stroke-width="1.3">\n'
        f'{A}    <path d="M150,90 L180,66 C186,61 193,59 202,59 L250,59 C260,59 267,61 273,66 L305,92 Z"/>\n'
        f'{A}    <path d="M228,59 V92"/>\n'
        f'{A}    <path d="M228,96 V158"/>\n'
        f'{A}    <path d="M196,114 h22"/>\n'
        f'{A}    <path d="M48,127 L358,121"/>\n'
        f"{A}  </g>\n"
    )
    # wheels hang below the rocker — the suspension is drooping, it is on a lift
    for wx in (108, 304):
        wy = 184
        o.append(f'{A}  <circle cx="{wx}" cy="{wy}" r="30"/>\n')
        o.append(f'{A}  <circle cx="{wx}" cy="{wy}" r="15" stroke-width="1.3"/>\n')
        for i in range(5):
            a = math.radians(i * 72 - 90)
            o.append(
                f'{A}  <path stroke-width="1.1" d="M{wx + 5 * math.cos(a):.1f},{wy + 5 * math.sin(a):.1f} '
                f'L{wx + 14 * math.cos(a):.1f},{wy + 14 * math.sin(a):.1f}"/>\n'
            )
        # hub carrier linking the hanging wheel back up into the arch
        o.append(f'{A}  <path stroke-width="1.6" d="M{wx - 7},{wy - 26} V163 M{wx + 7},{wy - 26} V163"/>\n')
    o.append(f"{A}</g>\n")

    o.append(
        f'{A}<g stroke-width="2.2">\n'
        f'{A}  <circle cx="398" cy="300" r="12"/>\n'
        f'{A}  <path d="M410,294 h13"/>\n'
        f'{A}  <path d="M382,326 C382,318 389,313 398,313 C407,313 414,318 414,326 L417,356 H379 Z"/>\n'
        f'{A}  <path d="M386,356 V392"/><path d="M406,356 V392"/>\n'
        f'{A}  <path d="M381,392 h-9"/><path d="M401,392 h-9"/>\n'
        f'{A}  <path d="M413,327 L437,300"/>\n'
        f'{A}  <path d="M383,327 L372,354"/>\n'
        f"{A}</g>\n"
    )
    o.append(f'{A}<g stroke="{SIGNAL}"><circle cx="443" cy="294" r="9"/>\n')
    o.append(f'{A}<path d="M443,278 v-8"/><path d="M456,286 l8,-5"/><path d="M456,302 l8,5"/></g>\n')

    o.append(f'{A}<path d="M34,286 h96 v88 h-96 Z"/>\n')
    o.append(f'{A}<g stroke-width="1.3"><path d="M34,314 h96"/><path d="M34,342 h96"/>\n')
    o.append(f'{A}<path d="M68,300 h28"/><path d="M68,328 h28"/><path d="M68,356 h28"/></g>\n')
    o.append(f'{A}<circle cx="50" cy="381" r="7" stroke-width="1.6"/><circle cx="114" cy="381" r="7" stroke-width="1.6"/>\n')

    for i, ty in enumerate((286, 316, 346)):
        o.append(f'{A}<rect x="{682 - (i % 2) * 6}" y="{ty}" width="96" height="26" rx="13"/>\n')

    return svg(800, 400, "A car up on the lift", "Line drawing of a car raised on a two-post lift", "".join(o))


# ------------------------------------------------------------------ wheel
def tires():
    cx, cy = 200, 190
    o = []
    o.append(f'{A}<circle cx="{cx}" cy="{cy}" r="150"/>\n')
    o.append(f'{A}<circle cx="{cx}" cy="{cy}" r="128" stroke-width="1.4"/>\n')
    o.append(f'{A}<g stroke-width="1.4">\n')
    for i in range(26):
        a = i * 360 / 26
        o.append(f'{A}  <path d="M{cx},{cy - 150} V{cy - 128}" transform="rotate({a:.1f} {cx} {cy})"/>\n')
    o.append(f"{A}</g>\n")
    o.append(f'{A}<circle cx="{cx}" cy="{cy}" r="92"/>\n')
    o.append(f'{A}<circle cx="{cx}" cy="{cy}" r="84" stroke-width="1.2"/>\n')
    for i in range(5):
        a = math.radians(i * 72 - 90)
        x1, y1 = cx + 30 * math.cos(a - 0.26), cy + 30 * math.sin(a - 0.26)
        x2, y2 = cx + 30 * math.cos(a + 0.26), cy + 30 * math.sin(a + 0.26)
        x3, y3 = cx + 84 * math.cos(a + 0.15), cy + 84 * math.sin(a + 0.15)
        x4, y4 = cx + 84 * math.cos(a - 0.15), cy + 84 * math.sin(a - 0.15)
        o.append(
            f'{A}<path stroke-width="1.6" d="M{x1:.1f},{y1:.1f} L{x4:.1f},{y4:.1f} '
            f'M{x2:.1f},{y2:.1f} L{x3:.1f},{y3:.1f}"/>\n'
        )
    o.append(f'{A}<circle cx="{cx}" cy="{cy}" r="30"/>\n')
    for i in range(5):
        a = math.radians(i * 72 - 54)
        lx, ly = cx + 19 * math.cos(a), cy + 19 * math.sin(a)
        col = SIGNAL if i == 0 else INK
        o.append(f'{A}<circle cx="{lx:.1f}" cy="{ly:.1f}" r="5" stroke="{col}" stroke-width="1.8"/>\n')

    la = math.radians(-54)
    lx, ly = cx + 19 * math.cos(la), cy + 19 * math.sin(la)
    o.append(f'{A}<g stroke="{SIGNAL}" transform="rotate(36 {lx:.1f} {ly:.1f})">\n')
    o.append(f'{A}  <circle cx="{lx:.1f}" cy="{ly:.1f}" r="17"/>\n')
    o.append(f'{A}  <path d="M{lx - 8:.1f},{ly + 17:.1f} V{ly + 190:.1f} h16 V{ly + 17:.1f}"/>\n')
    o.append(f'{A}  <path stroke-width="1.6" d="M{lx - 12:.1f},{ly + 136:.1f} h24 v62 h-24 Z"/>\n')
    o.append(f"{A}</g>\n")
    return svg(400, 400, "Wheel and tire service", "Line drawing of a wheel with a torque wrench on a lug nut", "".join(o))


# ------------------------------------------------------------------ oil
def oil():
    o = []
    o.append(f'{A}<g transform="rotate(-8 150 175)">\n')
    o.append(f'{A}  <rect x="88" y="80" width="112" height="158" rx="12"/>\n')
    o.append(f'{A}  <rect x="104" y="58" width="80" height="24" rx="5"/>\n')
    o.append(f'{A}  <g stroke-width="1.2">\n')
    for y in range(104, 234, 15):
        o.append(f'{A}    <path d="M96,{y} h96"/>\n')
    o.append(f"{A}  </g>\n{A}</g>\n")
    o.append(f'{A}<path d="M232,124 h64 a14,14 0 0 1 0,28 h-64 Z"/>\n')
    o.append(f'{A}<path d="M330,138 l-9,-15 h-18 l-9,15 l9,15 h18 Z" stroke="{SIGNAL}"/>\n')
    o.append(f'{A}<g stroke="{SIGNAL}">\n')
    o.append(f'{A}  <path d="M262,176 c0,-10 10,-19 10,-19 s10,9 10,19 a10,10 0 0 1 -20,0 Z"/>\n')
    o.append(f'{A}  <path d="M280,228 c0,-7 7,-13 7,-13 s7,6 7,13 a7,7 0 0 1 -14,0 Z" stroke-width="1.8"/>\n')
    o.append(f'{A}  <circle cx="296" cy="264" r="4.5" stroke-width="1.6"/>\n')
    o.append(f"{A}</g>\n")
    o.append(f'{A}<path d="M78,300 h244 v20 a34,34 0 0 1 -34,34 H112 a34,34 0 0 1 -34,-34 Z"/>\n')
    o.append(f'{A}<path d="M78,318 h244" stroke-width="1.3"/>\n')
    o.append(hatch(86, 320, 228, 28, step=10, angle=58, width=1, opacity=0.32))
    return svg(400, 400, "Oil change service", "Line drawing of an oil filter, drain plug and drain pan", "".join(o))


# ------------------------------------------------------------------ diagnostics
def diag():
    o = []
    o.append(f'{A}<rect x="140" y="52" width="180" height="256" rx="20"/>\n')
    o.append(f'{A}<rect x="160" y="74" width="140" height="126" rx="5" stroke-width="1.6"/>\n')
    o.append(
        f'{A}<g stroke="{SIGNAL}" stroke-width="2.2" transform="translate(230 112) scale(2.1) translate(-12 -12)">\n'
        f'{A}  <path d="M6,9h3l2-2h4v3h2l2,2v4h-2v2h-6l-2-2H6a2,2 0 0 1 -2,-2v-3a2,2 0 0 1 2,-2z"/>\n'
        f"{A}</g>\n"
    )
    o.append(f'{A}<path stroke-width="1.8" d="M170,178 h16 l10,-22 l12,40 l10,-30 l9,18 h20 l8,-14 h35"/>\n')
    o.append(f'{A}<g stroke-width="1.6">\n')
    for r in range(2):
        for c in range(3):
            col = SIGNAL if (r == 0 and c == 0) else INK
            o.append(f'{A}  <rect x="{168 + c * 50}" y="{220 + r * 40}" width="38" height="28" rx="4" stroke="{col}"/>\n')
    o.append(f"{A}</g>\n")
    o.append(f'{A}<path d="M140,236 C96,244 78,268 78,306"/>\n')
    o.append(f'{A}<path d="M52,306 h52 v34 h-52 Z"/>\n')
    o.append(f'{A}<g stroke-width="1.4"><path d="M64,316 v14"/><path d="M78,316 v14"/><path d="M92,316 v14"/></g>\n')
    return svg(400, 400, "Computer diagnostics", "Line drawing of a diagnostic scan tool plugged into a car", "".join(o))


for name, fn in (
    ("art-bay.svg", bay),
    ("art-tires.svg", tires),
    ("art-oil.svg", oil),
    ("art-diag.svg", diag),
):
    with open(os.path.join(OUT, name), "w") as f:
        f.write(fn())
    print("wrote", name)
