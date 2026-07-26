# Access-code fix — what to do

## Why no code appeared

Three separate faults stacked up:

1. **`admin.html` read `localStorage`, not the Sheet.** It showed `MS.getStudent()` — the one student registered *in that very browser*. A student registering on their own phone could never appear. This is why the page said "No student registrations on this device yet".
2. **`register()` threw away the server's reply.** The Apps Script generates the code; the site ignored it and stored `accessCode: ""`. Even a perfect Sheet write left a blank code everywhere.
3. **Every backend error was swallowed** by `.catch(function () { return s; })`. The student saw "Welcome aboard" whether or not anything reached Google, and you had no way to know it failed.

The empty Sheet points to the POST never landing. Almost always: the `/exec` URL belongs to an **older deployment version**, or the deployment's *Who has access* is not **Anyone**. Both now produce a visible error instead of silence.

---

## Step 1 — Backend (5 minutes)

1. Open the Apps Script project → replace **all** of `Code.gs` with the new `Code.gs`.
2. Run `setup()` once (**Run ▸ setup**, accept permissions). Open **Execution log** — it prints your `ADMIN_KEY`. Save it; it is the admin panel password now.
3. **Deploy ▸ New deployment ▸ Web app**
   - Execute as: **Me**
   - Who has access: **Anyone** — *not* "Anyone with a Google account"
4. Copy the `/exec` URL. If it differs from the one in `assets/app.js`, paste the new one into `BACKEND_URL`.
5. Open that `/exec` URL in a browser tab. You must see JSON like `{"ok":true,"service":"Mentorine access codes","version":2,...}`. A Google sign-in page means step 3 is wrong.

> **After any future edit to `Code.gs`:** Deploy ▸ Manage deployments ▸ ✏️ ▸ Version: **New version** ▸ Deploy. Editing without re-deploying leaves the old code live.

## Step 2 — Site

Upload the changed files: `admin.html`, `register.html`, `access.html`, `assets/app.js`.

## Step 3 — Test the whole loop

1. Register a test student in a **private window**.
2. The Sheet gains a row: status `PENDING`, with a code.
3. Open `admin.html` on **any device**, enter the `ADMIN_KEY` → the student is listed.
4. Click **Approve & issue code**, then **Send code on WhatsApp**.
5. As the student, enter the code at `access.html` → portal unlocks. Before approval the same code says *"payment has not been confirmed yet"*.

---

## What changed

| File | Change |
|---|---|
| `Code.gs` | Rewritten. `register` returns the code; new admin actions `list` / `approve` / `revoke` / `remove`, guarded by `ADMIN_KEY` in Script Properties; `doGet` is a health check; duplicate registrations update the row instead of adding one. |
| `admin.html` | Reads the Sheet through the backend. Every student, on any device. Search, approve, revoke, delete, copy code, one-click WhatsApp message. Login is the `ADMIN_KEY`. |
| `assets/app.js` | `register()` keeps the server code; failures throw instead of pretending; failed registrations queue in `localStorage` and retry on every page load; 20-second timeout; `MS.ping()`, `MS.adminCall()`, `MS.lastVerifyReason()`. |
| `register.html` | Shows the student their reference code, and an honest notice if the office could not be reached. |
| `access.html` | Distinguishes *not yet approved*, *wrong track*, *offline*, and *wrong code*. |

## Worth knowing

- The old admin passcode `1711@Prim$` was sitting in plain sight in `admin.html`. It is gone — the `ADMIN_KEY` never appears in any file you publish. Anyone can still read `BACKEND_SECRET` in `app.js` (unavoidable on a static site), but that secret only permits registering and checking codes — it cannot approve anyone.
- A code is inert until you set the row to `APPROVED`. You can still approve by typing `APPROVED` directly in column G of the Sheet.
- Progress tracking is still per-device `localStorage`. Moving it to the Sheet is a separate job if you want it.
