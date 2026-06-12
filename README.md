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
| `access.html` | Unique access-code gate — verifies the student's code before opening their training portal |
| `admin.html` | Admin login — view registrations, copy/issue access codes, revoke portal access, reset progress (default passcode `ona-admin-2026`, change before deploying) |
| `training/sd-full/` | Full training portal for **Software Development — Full Program**: 15 part pages (Part 0–14, terminal → React → Python → Node → databases → DevOps → MentorLink LMS capstone) rethemed to Mentorine green, gated by login + access code, with automatic progress mapping |
| `training/frontend/` | Full training portal for **Front-end Web Developer**: 12 part pages (Part 0–9 + two appendices — HTML, CSS, JavaScript, the DOM, async, tooling, React, integration, professional practice) generated from the official Word training guide, same gate + progress system |
| `training/javascript/` | Full training portal for **JavaScript Developer**: 12 part pages (Part 0–9 + two appendices — HTML, CSS, JS fundamentals, the DOM, async, Node & Express, databases & the full-stack capstone, cross-language integration, professional practice) generated from the official Word training guide |
| `training/backend/` | Full training portal for **Back-end Web Developer**: 12 part pages (Part 0–9 + two appendices — terminal & HTTP, JavaScript core, Node, Express & REST, SQL, MongoDB, auth & security, integration with Python/Paystack/email/webhooks, professional practice and the NaijaStore capstone). Authored as an original guide; the matching Word document is `Back-End-Web-Developer-Training-Guide.docx` |

## Key behaviours

- **Locked until registered.** Every course shows a 🔒 badge and stays locked until a student registers for it — but every syllabus is fully viewable first.
- **One student → one unique course.** Registration unlocks exactly the chosen track; the dashboard opens straight to it.
- **Unique access codes.** Registration generates a one-per-student code (`MS-XXXX-XXXX`). Admissions issues it after payment via the admin panel; the student enters it once on `access.html` to open the training portal. Admins can revoke access at any time.
- **Progress mapping.** Visiting a training part records it automatically; the training index paints ✓ ticks and a progress bar over the curriculum map, mirrored on the student dashboard and visible to admins.
- **Real curricula.** Front-end, Back-end, JavaScript Developer and both Software Development tracks carry their full curricula from the official training guides; Front-end, Back-end, JavaScript and SD-Full all ship complete in-site training portals.
- **Copyright.** Every page carries the footer notice: © 2026 Mentorine School by Ona Services Ltd. All rights reserved.
- **WhatsApp admissions chat.** The floating ✆ button opens four quick questions (registration/payment, track choice, access code, installments); choosing one copies it and opens the admissions WhatsApp line (`wa.me/message/OF4HWNSJM6ZTK1`).
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
├── access.html
├── admin.html
├── training/sd-full/   # gated portal — Software Development Full (index + part0–14)
├── training/frontend/  # gated portal — Front-end Web Developer (index + part0–11)
├── training/javascript/# gated portal — JavaScript Developer (index + part0–11)
├── training/backend/   # gated portal — Back-end Web Developer (index + part0–11)
└── assets/
    ├── style.css        # design tokens + components (day/night)
    ├── app.js           # course catalogue, syllabi, auth, theme
    ├── liveliness.js    # drop-in motion layer
    ├── gate.js          # training-portal access gate + progress mapping
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

On **every HTML change**, bump the cache version in `sw.js` (`mentorine-v6` → `v3` …) and deploy `sw.js` together with the HTML — otherwise returning visitors keep seeing the cached version.

## Before going live

- Change the **admin passcode** in `admin.html` (`ADMIN_PASS`).
- Authentication is a **localStorage demo** (single student per browser, plain-text password, client-side only). Swap `assets/app.js`'s `register/login` functions for a real backend before charging students.
- Pricing, tiers, tracks, and FAQ content all live in `index.html` and `assets/app.js` (`CATALOGUE` / `SYLLABI`) for easy editing.

---

*Mentorine School by Ona Services — building the workforce of tomorrow, today.*
