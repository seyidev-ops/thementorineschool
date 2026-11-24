import sys, math
from ms import *

def traffic(lt):
    jig = lambda k: math.sin(lt*14 + k)*2
    return car(-260, G, '#6A4C93', jig(1)) + danfo(300, G, jig(2)) + car(860, G, '#3D6FA5', jig(3))

def s1(lt, L):
    o = cap(['Meet Chidi.', '3 hours in', 'Lagos traffic.'], P(lt, 0.1, 0.8), gold=(2,)) + ground() + traffic(lt)
    hh = 6 + 3*ease(P(lt, 0.3, L)); o += clock(860, 760, 90, int(hh), int((hh % 1)*60))
    sp, head, _ = stick(170, G, 1.05, aL=(-20, -10), aR=(160, 190), face='sad')  # leaning out of the bus queue
    return o + f'<g>{sp}</g>' + sweat(head[0] + 45, head[1] - 25, lt)

def s1b(lt, L):
    o = s1(lt + 3, L) if False else cap(['Small salary.', 'Long road.'], P(lt, 0.05, 0.5), gold=(1,)) + ground() + traffic(lt + 3)
    sp, head, _ = stick(170, G, 1.05, aL=(-20, -10), aR=(160, 190), face='sad')
    o += sp + sweat(head[0] + 45, head[1] - 25, lt)
    return o + bubble(80, 560, 640, 170, ['Na so we dey', 'every day.'], P(lt, 0.15, 0.6), tail='left')

def s2(lt, L):
    o = cap(['Then Ngozi asked…'], P(lt, 0.05, 0.5)) + ground()
    sp, _, _ = stick(260, G, 1.2, face='neutral'); o += sp
    fx = 1200 - 400*ease(P(lt, 0.0, 1.0)); walk = math.sin(lt*10)*22*(1 - P(lt, 0.8, 1.0))
    wm, _ = woman(fx, G, 1.2, face='happy', dress='#2E7D6B', aL=(-20 - walk*0.5, -10), aR=(-70, -110), lL=(-walk, 0), lR=(walk, 0))
    o += wm + f'<rect x="{fx-100}" y="{G-370}" width="44" height="78" rx="9" fill="#1D1D21" stroke="{CREAM}" stroke-width="4"/>'
    o += bubble(360, 560, 660, 200, ['Why you no learn', 'skill for remote work?'], P(lt, 0.6, 1.1) - P(lt, L - 0.3, L), tail='right')
    return o

def s2b(lt, L):
    o = ground(); sp, _, _ = stick(260, G, 1.2, aL=(-40, -150), aR=(40, 150), face='neutral'); o += sp
    wm, _ = woman(800, G, 1.2, face='happy', dress='#2E7D6B', aL=(-20, -10), aR=(-70, -110)); o += wm
    o += f'<rect x="700" y="{G-370}" width="44" height="78" rx="9" fill="#1D1D21" stroke="{CREAM}" stroke-width="4"/>'
    return o + bubble(60, 560, 600, 200, ['Remote work?', 'Where I go start?'], P(lt, 0.05, 0.5), tail='left')

CATS = ['Tech & Development', 'Design & Creative', 'Marketing & Content', 'Business & Operations', 'Support & Admin', 'No-Code & Automation']
def s3(lt, L):
    o = cap(['40+ career tracks.', 'One for you.'], P(lt, 0.05, 0.6), gold=(1,))
    p = ease(P(lt, 0.2, 1.1))
    inner = T(260, 140, 'THE MENTORINE SCHOOL', 26, GOLD, 800, 'Inter Display') + T(260, 220, '40+', 90, CREAM, 800, 'Inter Display') + T(260, 270, 'career tracks', 30, GREY, 500)
    for i, c in enumerate(CATS):
        a = P(lt, 1.0 + i*0.35, 1.3 + i*0.35)
        if a > 0:
            y = 350 + i*82
            inner += f'<g opacity="{a:.2f}"><rect x="50" y="{y-48}" width="420" height="66" rx="16" fill="{CARD}" stroke="{GOLD}" stroke-opacity="0.5"/>' + T(260, y - 5, c, 28, CREAM, 600) + '</g>'
    return o + phonebox(540, 1120, 520, 900, inner, sc=0.3 + 0.7*p, op=lt*3)

def s4(lt, L):
    o = cap(['Data Analyst track.', 'Learn at your own pace.'], P(lt, 0.05, 0.6), gold=(0,))
    o += checklist(lt, ['Guided parts, step by step', 'Practical work in every part', 'A capstone project', 'A portfolio to show'], y0=690, start=0.6, step=L*0.18)
    typ = math.sin(lt*22)*7
    o += desk(420, 1330) + laptop(560, 1330, glow=0.6)
    sp, head, _ = stick(330, 1550, 1.0, aL=(75 + typ, 110), aR=(85 - typ, 112), lL=(88, 2), lR=(92, -2), face='happy', tilt=8)
    o += sp + f'<rect x="260" y="1430" width="140" height="18" rx="6" fill="{GREY}"/>' + line((280, 1448), (280, G), c=GREY, w=8) + line((380, 1448), (380, G), c=GREY, w=8)
    return o + ground()

def s5(lt, L):
    o = cap(['Then: certified.'], P(lt, 0.05, 0.5), gold=(0,)) + ground()
    o += certificate(540, 760, 0.4 + 0.6*back(P(lt, 0.2, 0.9)), 'Data Analyst', op=lt*3)
    up = ease(P(lt, 0.6, 1.2))
    sp, _, _ = stick(540, G, 1.25, aL=(-40 - 110*up, -50 - 110*up), aR=(40 + 110*up, 50 + 110*up), face='happy'); return o + sp

def window(x, y, lt):
    o = f'<rect x="{x}" y="{y}" width="320" height="300" rx="12" fill="#16242E" stroke="{CREAM}" stroke-width="6"/>'
    o += f'<circle cx="{x+220}" cy="{y+100}" r="48" fill="{YEL}" opacity="{0.85 + 0.15*math.sin(lt*2):.2f}"/>'
    return o + line((x + 160, y), (x + 160, y + 300), w=5) + line((x, y + 150), (x + 320, y + 150), w=5)

def s6(lt, L):
    o = cap(['My office?', 'My own room.'], P(lt, 0.05, 0.5), gold=(1,)) + window(640, 560, lt)
    typ = math.sin(lt*16)*5
    o += desk(420, 1330) + laptop(560, 1330, glow=0.8)
    sp, head, _ = stick(330, 1550, 1.0, aL=(75 + typ, 110), aR=(85 - typ, 112), lL=(88, 2), lR=(92, -2), face='happy', tilt=4)
    o += sp + f'<rect x="260" y="1430" width="140" height="18" rx="6" fill="{GREY}"/>' + line((280, 1448), (280, G), c=GREY, w=8) + line((380, 1448), (380, G), c=GREY, w=8)
    o += f'<path d="M{760} 1325 q0 -30 22 -30 h24 q22 0 22 30z" fill="{CREAM}"/>' + f'<path d="M790 1280 q8 -20 0 -40 M805 1280 q8 -20 0 -40" stroke="{GREY}" stroke-width="4" fill="none" opacity="{0.5+0.5*math.sin(lt*3):.2f}"/>'
    return o + ground() + bubble(60, 600, 560, 170, ['No more three hours', 'for road!'], P(lt, 0.3, 0.8), size=38, tail='left')

def s7(lt, L): return ms_cta(lt, ['Your remote', 'career starts', 'here.'], '1 track · 30 days · Starter plan', ['40+ tracks', 'Capstone project', 'Certificate'], 'thementorineschool.com')

NARR = lambda s: (NV, '+5%', '+0Hz', s)      # Ezinne, narrator
CHIDI = lambda s: (MV, '+3%', '+0Hz', s)     # Abeo
NGOZI = lambda s: (NV, '+8%', '+12Hz', s)
beats = [
 dict(say=NARR("Meet Chidi. Every single day, three hours in Lagos traffic."), draw=s1, scene='a', post=0.3),
 dict(say=CHIDI("Na so we dey every day. Small salary, long road."), draw=s1b, scene='a', pre=0.1, post=0.5),
 dict(say=NGOZI("Chidi, why you no learn skill for remote work?"), draw=s2, scene='b', pre=1.0, post=0.2),
 dict(say=CHIDI("Remote work? Where I go even start?"), draw=s2b, scene='b', pre=0.1, post=0.5),
 dict(say=NARR("So Chidi joined The Mentorine School. Over forty career tracks, in tech, design, marketing, business and support."), draw=s3, post=0.6),
 dict(say=NARR("He chose Data Analyst and learned at his own pace. Guided parts, practical work in every one, and a capstone project for his portfolio."), draw=s4, post=0.6),
 dict(say=NARR("When he finished, he got a verified certificate to show employers."), draw=s5, post=0.5),
 dict(say=CHIDI("Now my office na my own room. No more three hours for road!"), draw=s6, post=0.8),
 dict(say=NARR("Your remote career starts here. The Starter plan gives you one track for thirty days, for fifty thousand naira. Visit the mentorine school dot com, or chat with admissions on WhatsApp."), draw=s7, post=1.6, min=9),
]
if __name__ == '__main__':
    st = [float(x) for x in sys.argv[1:]] or None
    build('Mentorine-Video1-Chidi-Traffic-to-Laptop', beats, [[45, 52, 57, 60], [41, 53, 57, 60], [48, 55, 60, 64], [43, 55, 59, 62]], 0.4, stills=st)
