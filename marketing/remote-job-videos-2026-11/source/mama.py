import sys, math
from ms import *

def sofa(x, y):
    return (f'<rect x="{x}" y="{y-150}" width="430" height="120" rx="30" fill="#6A4C93" stroke="{CREAM}" stroke-width="5"/>'
            f'<rect x="{x-20}" y="{y-80}" width="470" height="80" rx="24" fill="#7B5BA6" stroke="{CREAM}" stroke-width="5"/>'
            + line((x + 20, y), (x + 20, y + 40), c=GREY, w=8) + line((x + 410, y), (x + 410, y + 40), c=GREY, w=8))

def mama(x, face='neutral', **kw): return woman(x, G, 1.25, face=face, dress='#B5523B', gele='#D9A441', **kw)
def ada(x, face='neutral', **kw): return woman(x, G, 1.15, face=face, dress='#2E7D6B', **kw)

def s1(lt, L):
    o = cap(['"Remote job?"'], P(lt, 0.05, 0.5), size=80, gold=(0,)) + sofa(520, 1480) + ground()
    wag = math.sin(lt*9)*25
    m, _ = mama(780, face='sad', aL=(-30, -10), aR=(150 + wag, 175 + wag)); a, _ = ada(260, face='happy', aL=(-20, -10), aR=(60, 90))
    o += m + a + f'<rect x="352" y="{G-330}" width="40" height="72" rx="8" fill="#1D1D21" stroke="{CREAM}" stroke-width="4"/>'
    return o + bubble(360, 540, 680, 210, ['Joy! Remote job?', 'Is it not yahoo-yahoo?'], P(lt, 0.2, 0.7), size=40, tail='right')

def s1b(lt, L):
    o = sofa(520, 1480) + ground()
    m, _ = mama(780, face='neutral', aL=(-30, -10), aR=(30, 10)); a, _ = ada(260, face='happy', aL=(-140, -170), aR=(60, 90))
    o += m + a
    return o + bubble(40, 540, 620, 210, ['Mama, no o!', "It's real work."], P(lt, 0.05, 0.5), size=44, tail='left')

def globe(cx, cy, r, lt):
    o = f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{CARD}" stroke="{GOLD}" stroke-width="7"/>'
    for k in range(3):
        rx = r*abs(math.cos(lt*0.8 + k*1.05)); o += f'<ellipse cx="{cx}" cy="{cy}" rx="{rx:.1f}" ry="{r}" fill="none" stroke="{GOLD}" stroke-opacity="0.6" stroke-width="4"/>'
    for yy in (-0.5, 0, 0.5):
        w = r*math.sqrt(1 - yy*yy); o += line((cx - w, cy + yy*r), (cx + w, cy + yy*r), c=GOLD, w=4)
    return o

def s2(lt, L):
    o = cap(['Remote work is real.', 'You need the right skill.'], P(lt, 0.05, 0.6), gold=(1,))
    o += globe(540, 900, 230, lt)
    for k in range(5):
        a = math.radians(lt*40 + k*72); x = 540 + math.cos(a)*340; y = 900 + math.sin(a)*300*0.45
        sp, _, _ = stick(x, y + 80, 0.35, face='happy'); o += f'<g opacity="{ease(P(lt, 0.4 + k*0.2, 0.8 + k*0.2)):.2f}">{sp}</g>'
    return o

TRACKS = ['Virtual Assistant', 'Data Analyst', 'Graphic Designer', 'Social Media Manager', 'Project Manager', 'Front-end Developer', 'Customer Support', 'Copywriter']
def s3(lt, L):
    n = min(40, int(1 + 39*ease(P(lt, 0.2, 2.2))))
    o = T(W/2, 620, f'{n}+', 230, GOLD, 800, 'Inter Display') + T(W/2, 710, 'career tracks', 52, CREAM, 700, 'Inter Display')
    o += cap(['The Mentorine School'], P(lt, 0.05, 0.5), gold=(0,))
    for i in range(0, len(TRACKS), 2):
        o += pill_row(820 + (i//2)*120, TRACKS[i:i+2], ease(P(lt, 1.0 + i*0.35, 1.5 + i*0.35)), 34)
    return o

def s4(lt, L):
    o = cap(['Joy chose', 'Virtual Assistant.'], P(lt, 0.05, 0.6), gold=(1,))
    o += checklist(lt, ['Learn at your own pace', 'A practical in every part', 'A capstone for your portfolio', 'A verified certificate'], y0=720, start=0.6, step=L*0.18)
    a, _ = ada(820, face='happy', aL=(-60, -100), aR=(30, 10)); o += a + f'<rect x="742" y="{G-310}" width="40" height="72" rx="8" fill="#1D1D21" stroke="{CREAM}" stroke-width="4"/>'
    return o + ground()

def s5(lt, L):
    o = ground() + certificate(540, 640, (0.4 + 0.6*back(P(lt, 0.1, 0.8)))*0.85, 'Virtual Assistant', op=lt*3)
    dance = math.sin(lt*7)*30
    m, _ = mama(720, face='happy', aL=(-150 - dance, -170), aR=(150 + dance, 170), lL=(-12 - dance*0.4, 0), lR=(12 + dance*0.4, 0))
    a, _ = ada(300, face='happy', aL=(-30, -15), aR=(40, 20))
    return o + m + a + bubble(480, 880, 580, 170, ['Ehen! My daughter', 'don get certificate!'], P(lt, 0.2, 0.7), size=38, tail='right')

def s5b(lt, L):
    o = ground() + certificate(540, 640, 0.85, 'Virtual Assistant')
    dance = math.sin((lt + 3)*7)*30
    m, _ = mama(720, face='happy', aL=(-150 - dance, -170), aR=(150 + dance, 170), lL=(-12 - dance*0.4, 0), lR=(12 + dance*0.4, 0))
    a, _ = ada(300, face='happy', aL=(-140, -170), aR=(40, 20))
    return o + m + a + bubble(40, 880, 580, 170, ['And my first client', 'abroad, Mama!'], P(lt, 0.05, 0.5), size=38, tail='left')

def s6(lt, L): return ms_cta(lt, ['There is a', 'track for', 'you.'], 'Starter plan · 1 track · 30 days', ['40+ tracks', 'Learn at your pace', 'Certificate'], 'thementorineschool.com')

NARR = lambda s: (MV, '+3%', '+0Hz', s)       # Abeo, narrator
MAMA = lambda s: (NV, '-6%', '-14Hz', s)      # Ezinne, older and lower
ADA = lambda s: (NV, '+6%', '+8Hz', s)        # Ezinne, younger and brighter
beats = [
 dict(say=MAMA("Joy! Remote job? Is it not yahoo-yahoo?"), draw=s1, scene='a', pre=0.4, post=0.2),
 dict(say=ADA("Mama, no o! It's real work, from my laptop."), draw=s1b, scene='a', pre=0.1, post=0.5),
 dict(say=NARR("Remote work is real. What you need is a skill that people will pay for."), draw=s2, post=0.5),
 dict(say=NARR("At The Mentorine School, there are over forty career tracks to choose from. Virtual assistant, data, design, social media, project management, and many more."), draw=s3, post=0.6),
 dict(say=NARR("Joy chose Virtual Assistant. She learned at her own pace, did a practical in every part, built a capstone for her portfolio, and earned a verified certificate."), draw=s4, post=0.6),
 dict(say=MAMA("Ehen! My daughter don get certificate!"), draw=s5, scene='c', pre=0.6, post=0.2),
 dict(say=ADA("And my first client abroad, Mama!"), draw=s5b, scene='c', pre=0.1, post=0.8),
 dict(say=NARR("Whatever you want to do, there is a track for you. Start with one track for thirty days, from fifty thousand naira. Register today at the mentorine school dot com."), draw=s6, post=1.6, min=9),
]
if __name__ == '__main__':
    st = [float(x) for x in sys.argv[1:]] or None
    build('Mentorine-Video2-Mama-Is-It-Real', beats, [[48, 55, 60, 64], [45, 52, 57, 60], [41, 53, 57, 60], [43, 55, 59, 62]], 0.4, stills=st)
