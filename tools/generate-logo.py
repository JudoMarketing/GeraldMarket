#!/usr/bin/env python3
"""Genera la marca de Gerald Market a partir de la propia tipografía del sitio.

La identidad es la palabra escrita en cursiva: Playfair Display Italic, un serif
de alto contraste. Las letras se convierten a contornos, así que los SVG que
salen de aquí no dependen de ninguna fuente instalada.

    python3 tools/generate-logo.py

Escribe assets/img/logo-mark.svg, favicon.svg y logo.svg.
"""
import os

from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = os.path.join(ROOT, "assets/fonts/playfair-italic-latin.woff2")
IMG = os.path.join(ROOT, "assets/img")

GOLD = "#E9C46A"      # oro apagado: la marca
CREAM = "#F4F1E9"     # blanco cálido, no blanco puro
BLACK = "#04070A"


def load(weight):
    f = TTFont(FONT)
    if "fvar" in f:
        f = instancer.instantiateVariableFont(f, {"wght": weight})
    return f


def text_path(font, string, size, tracking=0.0):
    """Devuelve (contornos svg, ancho total) con la línea base en y=0."""
    upem = font["head"].unitsPerEm
    scale = size / upem
    cmap = font.getBestCmap()
    glyphs = font.getGlyphSet()
    hmtx = font["hmtx"]
    parts = []
    x = 0.0
    for ch in string:
        gid = cmap.get(ord(ch)) or font.getGlyphOrder()[0]
        pen = SVGPathPen(glyphs)
        glyphs[gid].draw(pen)
        d = pen.getCommands()
        if d:
            # el espacio de la fuente crece hacia arriba, el de SVG hacia abajo
            parts.append(
                '<path transform="translate(%.2f 0) scale(%.5f %.5f)" d="%s"/>'
                % (x, scale, -scale, d)
            )
        x += hmtx[gid][0] * scale + tracking
    return "".join(parts), (x - tracking if string else 0.0)


def measure(font, string, size, tracking=0.0):
    return text_path(font, string, size, tracking)[1]


def fit(font, string, target, tracking=0.0):
    """Cuerpo necesario para que la cadena mida exactamente `target` de ancho."""
    probe = 100.0
    w = measure(font, string, probe, tracking * probe / 100.0)
    return probe * target / w if w else probe


def write(name, svg):
    path = os.path.join(IMG, name)
    with open(path, "w", encoding="utf-8") as f:
        f.write(svg)
    print("escrito", os.path.relpath(path, ROOT))


# --------------------------------------------------------------- el monograma
def monogram(box, tile, radius, border):
    """La G en cursiva dentro de una placa. `tile` = color de fondo o None."""
    font = load(600)
    size = box * 0.74
    d, w = text_path(font, "G", size)
    # centrado óptico: la cursiva pesa a la derecha, se corrige un pelo
    x = (box - w) / 2 - box * 0.015
    y = box * 0.735
    bg = ""
    if tile:
        bg = ('<rect width="%(b)s" height="%(b)s" rx="%(r)s" fill="%(t)s"/>'
              '<rect x=".75" y=".75" width="%(bi).2f" height="%(bi).2f" rx="%(r)s" '
              'fill="none" stroke="%(g)s" stroke-opacity=".38" stroke-width="1.5"/>'
              % {"b": box, "r": radius, "t": tile, "bi": box - 1.5, "g": border})
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %(b)s %(b)s" '
        'role="img" aria-label="Gerald Market">\n'
        '  <title>Gerald Market</title>\n'
        '  %(bg)s\n'
        '  <g transform="translate(%(x).2f %(y).2f)" fill="%(g)s">%(d)s</g>\n'
        '</svg>\n'
        % {"b": box, "bg": bg, "x": x, "y": y, "g": border, "d": d}
    )


write("logo-mark.svg", monogram(40, BLACK, 9, GOLD))
write("favicon.svg", monogram(48, BLACK, 11, GOLD))

# ------------------------------------------------------------ marca completa
# «Gerald» en crema, «Market» en oro, ambas en cursiva. Para redes e impresión.
font = load(600)
W, H = 560, 140
pad = 26
gap = 26                      # la cursiva de la «d» invade a la «M»: hace falta aire
target = W - pad * 2

size = fit(font, "GeraldMarket", target - gap)
w1 = measure(font, "Gerald", size)
w2 = measure(font, "Market", size)
d1, _ = text_path(font, "Gerald", size)
d2, _ = text_path(font, "Market", size)

baseline = 88
rule_y = baseline + 20


def lockup(first_color):
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %(W)s %(H)s" '
        'role="img" aria-label="Gerald Market">\n'
        '  <title>Gerald Market</title>\n'
        '  <g transform="translate(%(x1).2f %(b)s)" fill="%(first)s">%(d1)s</g>\n'
        '  <g transform="translate(%(x2).2f %(b)s)" fill="%(gold)s">%(d2)s</g>\n'
        '  <line x1="%(pad)s" y1="%(ry)s" x2="%(rx).2f" y2="%(ry)s" stroke="%(gold)s" '
        'stroke-opacity=".5" stroke-width="1"/>\n'
        '</svg>\n'
        % {
            "W": W, "H": H, "pad": pad, "b": baseline, "ry": rule_y,
            "x1": pad, "x2": pad + w1 + gap, "rx": pad + w1 + gap + w2,
            "first": first_color, "gold": GOLD, "d1": d1, "d2": d2,
        }
    )


write("logo.svg", lockup(CREAM))        # sobre fondo oscuro
write("logo-light.svg", lockup(BLACK))  # sobre fondo claro (papel, prensa)
