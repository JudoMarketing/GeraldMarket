"""Rebuild the logo from the shop's own painted sign.

    python3 tools/generate-logo.py

The sign on the wall is a metal relief: bold slanted blue letters spelling
PACHO'S QUALITY, with AUTO REPAIR beneath, the whole wordmark sitting on a
truck body with two black wheels under it. That composition — the lettering
IS the vehicle — is the identity, so it is what gets rebuilt here.

Letterforms come from Archivo Black (a heavy squarish grotesque, the closest
match to the hand-cut sign), converted to outlines so the finished SVG needs
no font at all, then slanted the way the sign is.

Writes assets/img/logo.svg      full horizontal lockup
       assets/img/logo-mark.svg compact truck, for the header
       assets/img/favicon.svg   the same truck on a blue plate
"""
import os

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "img")
FONT = "/tmp/archivo-black.woff2"

BLUE = "#1E63C8"      # the blue enamel on the sign
BLUE_LT = "#3B87FF"   # site accent, used for the highlight face
DARK = "#0A1020"
SILVER = "#E7EBF2"


def measure(font, string, size, letter_spacing=0.0):
    upem = font["head"].unitsPerEm
    cmap = font.getBestCmap()
    hmtx = font["hmtx"]
    order = font.getGlyphOrder()
    w = 0.0
    for ch in string:
        gid = cmap.get(ord(ch)) or order[0]
        w += hmtx[gid][0] * size / upem + letter_spacing
    return w - letter_spacing


def fit(font, string, target_w, tracking_ratio=0.0):
    """Pick the point size that makes `string` exactly target_w wide."""
    ref = 100.0
    w = measure(font, string, ref, ref * tracking_ratio)
    return ref * target_w / w


def text_path(font, string, size, letter_spacing=0.0):
    """Return (svg path data, advance width) for a string, baseline at y=0."""
    upem = font["head"].unitsPerEm
    scale = size / upem
    cmap = font.getBestCmap()
    glyphs = font.getGlyphSet()
    hmtx = font["hmtx"]
    order = font.getGlyphOrder()

    parts = []
    x = 0.0
    for ch in string:
        gid = cmap.get(ord(ch))
        if gid is None:
            gid = order[0]
        pen = SVGPathPen(glyphs)
        glyphs[gid].draw(pen)
        d = pen.getCommands()
        if d:
            # font space is y-up, SVG is y-down
            parts.append(
                f'<path transform="translate({x:.2f} 0) scale({scale:.5f} {-scale:.5f})" d="{d}"/>'
            )
        x += hmtx[gid][0] * scale + letter_spacing
    return "".join(parts), x - letter_spacing


def build():
    font = TTFont(FONT)

    W, H = 720, 300
    SLANT = -9  # degrees; the sign's letters lean forward

    # Size each line to a target width instead of guessing a point size
    top_track, sub_track = -0.02, 0.10
    top_size = fit(font, "PACHO'S QUALITY", 552, top_track)
    sub_size = fit(font, "AUTO REPAIR", 236, sub_track)
    top, top_w = text_path(font, "PACHO'S QUALITY", top_size, top_size * top_track)
    sub, sub_w = text_path(font, "AUTO REPAIR", sub_size, sub_size * sub_track)

    # skewX pivots on the baseline, so nudge back by the lean at cap height
    import math
    lean = math.tan(math.radians(-SLANT))
    top_x = (W - top_w) / 2 + top_size * 0.35 * lean
    sub_x = (W - sub_w) / 2 + sub_size * 0.35 * lean

    # ---- truck body: nose at the left, wheels beneath, sign proportions ----
    body = (
        "M26,214 C26,194 34,180 54,174 L112,158 L130,112 "
        "C135,96 148,86 166,86 L560,86 C578,86 590,96 596,112 L620,162 "
        "C648,170 666,186 668,210 L670,238 C670,248 663,254 652,254 "
        "L604,254 A58,58 0 0 0 488,254 L232,254 A58,58 0 0 0 116,254 "
        "L42,254 C32,254 26,247 26,238 Z"
    )

    wheels = "".join(
        f'<g><circle cx="{cx}" cy="254" r="48" fill="{DARK}"/>'
        f'<circle cx="{cx}" cy="254" r="21" fill="{SILVER}"/>'
        f'<circle cx="{cx}" cy="254" r="21" fill="none" stroke="{DARK}" stroke-width="3" opacity=".4"/></g>'
        for cx in (174, 546)
    )

    lockup = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img"
     aria-label="Pacho's Quality Auto Repair">
  <title>Pacho's Quality Auto Repair</title>

  <!-- truck body, the way the letters sit on it on the shop sign -->
  <path d="{body}" fill="{SILVER}"/>
  <path d="{body}" fill="none" stroke="{DARK}" stroke-width="8" stroke-linejoin="round"/>

  <!-- wordmark -->
  <g transform="translate({top_x:.1f} 172) skewX({SLANT})" fill="{BLUE}">{top}</g>
  <g transform="translate({sub_x:.1f} 208) skewX({SLANT})" fill="{DARK}">{sub}</g>

  <!-- wheels -->
  {wheels}
</svg>
"""

    # ---- compact mark: the truck alone, for the header and small sizes ----
    mark_body = (
        "M14,150 C14,132 22,118 40,112 L92,98 L108,58 "
        "C112,44 124,34 142,34 L358,34 C376,34 388,44 394,58 L418,104 "
        "C442,112 458,126 460,148 L462,172 C462,182 455,188 444,188 "
        "L404,188 A50,50 0 0 0 304,188 L172,188 A50,50 0 0 0 72,188 "
        "L30,188 C20,188 14,181 14,172 Z"
    )
    mark_wheels = "".join(
        f'<circle cx="{cx}" cy="188" r="40" fill="{DARK}"/>'
        f'<circle cx="{cx}" cy="188" r="17" fill="{SILVER}"/>'
        for cx in (122, 354)
    )
    mark = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476 236" role="img"
     aria-label="Pacho's Quality Auto Repair">
  <title>Pacho's Quality Auto Repair</title>
  <path d="{mark_body}" fill="{SILVER}"/>
  <path d="{mark_body}" fill="none" stroke="{DARK}" stroke-width="9" stroke-linejoin="round"/>
  {mark_wheels}
</svg>
"""

    fav = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="116" fill="#0B63F6"/>
  <g transform="translate(18 138)">
    <path d="{mark_body}" fill="#FFFFFF"/>
    <g fill="#0B63F6"><circle cx="122" cy="188" r="27"/><circle cx="354" cy="188" r="27"/></g>
  </g>
</svg>
"""

    for name, data in (("logo.svg", lockup), ("logo-mark.svg", mark), ("favicon.svg", fav)):
        with open(os.path.join(OUT, name), "w", encoding="utf-8") as f:
            f.write(data)
        print("wrote", name, len(data), "bytes")


build()
