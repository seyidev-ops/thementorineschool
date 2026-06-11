# The Mentorine School by Ona

![The Mentorine School by Ona](assets/og-image.png)

**Career & Skill Development Program — your gateway to a future-ready remote career.**

A complete, installable (PWA) static website for The Mentorine School by Ona Services: a sales landing page, an open syllabus library, student registration, login, and a per-student learner dashboard — all in a warm editorial minimalist design system with the Mentorine green as its single accent.

---

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Landing page — hero, four learning pillars, the full course catalogue (six categories, 40+ tracks, Software Development featured), registration block, pricing tiers, FAQ |
| `syllabus.html` | Syllabus viewer (`?course=slug`) — open to everyone, even for locked courses. Software Development carries the full extracted 16-week JavaScript + HTML curriculum (Parts 0–9 + appendices) |
| `login.html` | Student login — routes each student straight to their registered course |
| `dashboard.html` | Learner portal — the student's unique course unlocked with module-by-module progress tracking; all other tracks shown locked with open syllabus links |

## Key behaviours

- **Locked until registered.** Every course shows a 🔒 badge and stays locked until a student registers for it — but every syllabus is fully viewable first.
- **One student → one unique course.** Registration unlocks exactly the chosen track; the dashboard opens straight to it.
- **Theme toggle with system default.** Cycles **system → day → night** (`◐ / ☀ / ☾`); "system" follows the OS `prefers-color-scheme` live, and a no-flash bootstrap snippet applies the theme before first paint.
- **SVG brand mark.** `assets/logo.svg` is a vector trace of the shield with transparent negative space, so it blends on both day and night surfaces. The wordmark is typeset in **Cinzel** (the Trajan-style serif of the logo).
- **Quiet motion.** The Liveliness Layer (`assets/liveliness.js`) adds scroll reveals and micro-interactions without touching the design, honouring `prefers-reduced-motion`.
- **PWA.** `manifest.json` + `sw.js` make the site installable and offline-capable.

## Project structure

```
├── index.html
├── syllabus.html
├── login.html
├── dashboard.html
├── manifest.json
├── sw.js
├── README.md
└── assets/
    ├── style.css        # design tokens + components (day/night)
    ├── app.js           # course catalogue, syllabi, auth, theme
    ├── liveliness.js    # drop-in motion layer
    ├── logo.svg         # shield mark (theme-blending vector)
    ├── og-image.png     # social preview / repo thumbnail (1280×640)
    ├── icon-192.png     # PWA icon
    └── icon-512.png     # PWA icon
```

## Deployment

Any static host works (GitHub Pages, Netlify, cPanel):

1. **GitHub Pages:** push this folder to a repo → *Settings → Pages* → deploy from the `main` branch root.
2. **Repo thumbnail:** *Settings → General → Social preview* → upload `assets/og-image.png`. The same image is wired as the `og:image` meta tag on the landing page.
3. **Custom domain:** add a `CNAME` file at the root and keep it in every rebuild.

### ⚠️ Service worker rule

On **every HTML change**, bump the cache version in `sw.js` (`mentorine-v2` → `v3` …) and deploy `sw.js` together with the HTML — otherwise returning visitors keep seeing the cached version.

## Before going live

- Replace the `#` href on the floating **✆ chat chip** (all four pages) with the real WhatsApp admissions link.
- Authentication is a **localStorage demo** (single student per browser, plain-text password, client-side only). Swap `assets/app.js`'s `register/login` functions for a real backend before charging students.
- Pricing, tiers, tracks, and FAQ content all live in `index.html` and `assets/app.js` (`CATALOGUE` / `SYLLABI`) for easy editing.

---

*Mentorine School by Ona Services — building the workforce of tomorrow, today.*
