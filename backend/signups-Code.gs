/**
 * THE MENTORINE SCHOOL — Sign-up collector (Google Apps Script)
 * Writes every gift / promo sign-up (name, email, course) into the Sheet
 * this script is attached to.
 *
 * SETUP (one time, ~3 minutes)
 *   1. Open the Sheet "Seyi Birthday Gift — Sign-ups" in Google Drive.
 *   2. Extensions ▸ Apps Script. Delete what's there, paste this whole file, Save.
 *   3. Deploy ▸ New deployment ▸ gear icon ▸ Web app
 *        Execute as:      Me
 *        Who has access:  Anyone        (must be "Anyone", not "Anyone with a Google account")
 *      Click Deploy, approve the permissions, copy the Web app URL (ends in /exec).
 *   4. Put that URL in SIGNUP_URL in assets/app.js.
 *   If you edit this file later: Deploy ▸ Manage deployments ▸ ✏️ ▸ Version: New version ▸ Deploy.
 */

var SECRET = 'MS-signups-2026';   // must match SIGNUP_SECRET in assets/app.js

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ ok: true, service: 'Mentorine sign-ups' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var out = { ok: false };
  try {
    var b = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (b.secret !== SECRET) throw new Error('bad_secret');
    var clip = function (v) { return String(v == null ? '' : v).slice(0, 200); };
    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      var sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
      if (sh.getLastRow() === 0) sh.appendRow(['Timestamp', 'Name', 'Email', 'Course', 'Source', 'Device time']);
      sh.appendRow([new Date(), clip(b.name), clip(b.email).toLowerCase(), clip(b.course), clip(b.source), clip(b.at)]);
    } finally { lock.releaseLock(); }
    out.ok = true;
  } catch (err) {
    out.error = String(err && err.message || err);
  }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}
