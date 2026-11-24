# Mentorine School brand layer on top of the AIMSS stickman kit (engine.py / video.py)
import math
import engine
from engine import *
from video import desk, phone

YEL = '#F2C230'; NAVY = '#8FB3D4'; SKY = '#7FB3D5'
G = 1560

def foot():
    return (T(80, H - 90, 'The Mentorine School', 40, GOLD, 800, 'Inter Display', anchor='start')
            + T(W - 80, H - 90, 'thementorineschool.com', 30, GREY, 500, anchor='end'))
engine.foot = foot

def ground(): return line((-50, G), (W + 50, G), c=GREY, w=4)

def woman(x, y, s=1.2, face='neutral', dress='#B5523B', gele=None, **kw):
    sp, head, sh = stick(x, y, s, face=face, **kw); hx, hy = head
    o = sp + (f'<path d="M{x-16*s:.0f} {sh[1]+12*s:.0f} L{x+16*s:.0f} {sh[1]+12*s:.0f} L{x+62*s:.0f} {y-50*s:.0f} '
              f'L{x-62*s:.0f} {y-50*s:.0f} Z" fill="{dress}" stroke="{CREAM}" stroke-width="{6*s:.0f}" stroke-linejoin="round"/>')
    if gele:
        o += (f'<path d="M{hx-58*s:.0f} {hy-18*s:.0f} Q{hx-30*s:.0f} {hy-105*s:.0f} {hx+20*s:.0f} {hy-80*s:.0f} '
              f'Q{hx+70*s:.0f} {hy-70*s:.0f} {hx+58*s:.0f} {hy-18*s:.0f} Q{hx:.0f} {hy-48*s:.0f} {hx-58*s:.0f} {hy-18*s:.0f}Z" '
              f'fill="{gele}" stroke="{CREAM}" stroke-width="{4*s:.0f}"/>')
    else:  # hair puff
        o += f'<circle cx="{hx:.0f}" cy="{hy-52*s:.0f}" r="{24*s:.0f}" fill="{CREAM}"/>'
    return o, head

def phonebox(cx, cy, w, h, inner, sc=1, op=1):
    return (f'<g opacity="{cl(op):.2f}" transform="translate({cx},{cy}) scale({sc:.3f}) translate({-w/2},{-h/2})">'
            f'<rect x="0" y="0" width="{w}" height="{h}" rx="56" fill="#1D1D21" stroke="{CREAM}" stroke-width="8"/>'
            f'<rect x="22" y="22" width="{w-44}" height="{h-44}" rx="38" fill="{BG}"/>'
            f'<rect x="{w/2-50}" y="40" width="100" height="14" rx="7" fill="#2a2a2f"/>{inner}</g>')

def wheel(x, y, r=38): return f'<circle cx="{x}" cy="{y}" r="{r}" fill="#222" stroke="{CREAM}" stroke-width="5"/><circle cx="{x}" cy="{y}" r="{r*0.35:.0f}" fill="{GREY}"/>'

def danfo(x, y, jig=0):  # yellow Lagos minibus, bottom at y
    b = y - 40 + jig
    o = f'<rect x="{x}" y="{b-230}" width="520" height="230" rx="34" fill="{YEL}" stroke="{CREAM}" stroke-width="5"/>'
    o += f'<rect x="{x}" y="{b-80}" width="520" height="16" fill="#111"/><rect x="{x}" y="{b-50}" width="520" height="10" fill="#111"/>'
    for k in range(4): o += f'<rect x="{x+30+k*120}" y="{b-200}" width="96" height="80" rx="10" fill="#2a3a46" stroke="#111" stroke-width="4"/>'
    return o + wheel(x + 110, y - 30) + wheel(x + 420, y - 30)

def car(x, y, color, jig=0):
    b = y - 40 + jig
    o = (f'<path d="M{x} {b} L{x} {b-80} Q{x+10} {b-100} {x+50} {b-104} L{x+90} {b-170} L{x+250} {b-170} L{x+300} {b-104} '
         f'Q{x+350} {b-100} {x+360} {b-80} L{x+360} {b} Z" fill="{color}" stroke="{CREAM}" stroke-width="5" stroke-linejoin="round"/>')
    o += f'<path d="M{x+100} {b-110} L{x+125} {b-155} L{x+175} {b-155} L{x+175} {b-110}Z M{x+190} {b-110} L{x+190} {b-155} L{x+240} {b-155} L{x+275} {b-110}Z" fill="#2a3a46"/>'
    return o + wheel(x + 80, y - 30, 32) + wheel(x + 285, y - 30, 32)

def certificate(cx, cy, sc, track, op=1):
    w, h = 760, 540
    o = (f'<g opacity="{cl(op):.2f}" transform="translate({cx},{cy}) scale({sc:.3f}) translate({-w/2},{-h/2})">'
         f'<rect width="{w}" height="{h}" rx="18" fill="#F7F5F0" stroke="{GOLD}" stroke-width="10"/>'
         f'<rect x="26" y="26" width="{w-52}" height="{h-52}" rx="10" fill="none" stroke="{GOLD}" stroke-opacity="0.5" stroke-width="3"/>')
    o += T(w/2, 110, 'THE MENTORINE SCHOOL', 34, '#0D8C4F', 800, 'Inter Display')
    o += T(w/2, 175, 'CERTIFICATE OF COMPLETION', 26, '#5A5A5A', 700, 'JetBrains Mono')
    o += T(w/2, 285, track, 56, '#0A0A0A', 800, 'Inter Display')
    o += T(w/2, 345, 'Capstone project · verified', 28, '#5A5A5A', 500)
    o += f'<circle cx="{w/2}" cy="440" r="52" fill="#0D8C4F"/>' + T(w/2, 455, '✓', 50, '#fff', 800)
    return o + '</g>'

def pill_row(y, labels, op, size=32):
    if op <= 0: return ''
    tw = [len(p) * size * 0.55 + 60 for p in labels]; x = (W - sum(tw) - 18 * (len(labels) - 1)) / 2; o = f'<g opacity="{cl(op):.2f}">'
    for p, wd in zip(labels, tw):
        o += f'<rect x="{x:.0f}" y="{y}" width="{wd:.0f}" height="{size*2:.0f}" rx="{size:.0f}" fill="none" stroke="{GOLD}" stroke-width="3"/>' + T(x + wd/2, y + size*1.38, p, size, CREAM, 600); x += wd + 18
    return o + '</g>'

def ms_cta(lt, head, sub, pills, button, foot2='or chat with admissions on WhatsApp'):
    a = ease(P(lt, 0, 0.6)); o = T(W/2, 330, '// THE MENTORINE SCHOOL', 32, GOLD, 700, 'JetBrains Mono', op=a)
    for i, l in enumerate(head): o += T(W/2, 520 + i*130, l, 112, GOLD if i == len(head)-1 else CREAM, 800, 'Inter Display', op=ease(P(lt, 0.2+i*0.2, 0.8+i*0.2)))
    y0 = 520 + len(head)*130 + 70
    b = ease(P(lt, 1.4, 2)); o += T(W/2, y0+40, 'from', 40, GREY, 500, op=b) + T(W/2, y0+200, '₦50,000', 170, GOLD, 800, 'Inter Display', op=b) + T(W/2, y0+270, sub, 40, CREAM, 500, op=b)
    o += pill_row(y0 + 320, pills, ease(P(lt, 2.2, 2.8)), 30)
    d = ease(P(lt, 3, 3.6)); pulse = 1 + 0.03*math.sin(lt*6); yb = y0 + 450
    o += (f'<g opacity="{d:.2f}" transform="translate(540,{yb+52}) scale({pulse:.3f}) translate(-540,{-(yb+52)})">'
          f'<rect x="110" y="{yb}" width="860" height="104" rx="52" fill="{GOLD}"/>' + T(540, yb+68, button, 46, BG, 800) + '</g>')
    return o + T(W/2, yb + 190, foot2, 40, CREAM, 600, op=d)

def checklist(lt, items, y0=700, gap=120, start=0.3, step=0.7):
    return ''.join(check_item(150, y0 + i*gap, t, P(lt, start + i*step, start + i*step + 0.4)) for i, t in enumerate(items))
