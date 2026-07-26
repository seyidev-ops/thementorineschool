/**
 * THE MENTORINE SCHOOL — Access Code Backend  (v2)
 * Google Apps Script, bound to the "Mentorine Access Codes" Sheet.
 * ---------------------------------------------------------------------------
 * WHAT CHANGED IN v2
 *   - register() now RETURNS the code it generated, so the site and the admin
 *     panel can both show it (v1 generated it and told nobody).
 *   - Added admin actions (list / approve / revoke / remove) so admin.html can
 *     read the Sheet instead of one browser's localStorage.
 *   - Admin actions are guarded by ADMIN_KEY, stored in Script Properties —
 *     NOT in the public website files.
 *   - Every response is JSON, always, including errors.
 *
 * ONE-TIME SETUP
 *   1. Paste this over the whole of Code.gs.
 *   2. Run  setup()  once from the editor  (Run ▸ setup, then Review permissions).
 *      Check View ▸ Logs — it prints your ADMIN_KEY. Copy it somewhere safe.
 *   3. Deploy ▸ New deployment ▸ Web app
 *        Execute as:      Me
 *        Who has access:  Anyone            <-- MUST be "Anyone", not "Anyone with a Google account"
 *      Copy the /exec URL into BACKEND_URL in assets/app.js.
 *   4. EVERY TIME you edit this file afterwards:
 *      Deploy ▸ Manage deployments ▸ ✏️ ▸ Version: New version ▸ Deploy.
 *      Editing without re-deploying leaves the old code live — this is the
 *      single most common reason a registration never reaches the Sheet.
 *   5. Test in a browser: open the /exec URL. You should see JSON, not a login
 *      page. A login page means step 3's access setting is wrong.
 *
 * Sheet columns (row 1 = headers, created automatically):
 *   A Timestamp | B Name | C Email | D Course | E Tier | F AccessCode
 *   G Status    | H VerifiedAt | I Notes
 */

var SHEET_NAME    = 'AccessCodes';
var PUBLIC_SECRET = 'Mentorine-7d13-O2P2-T1g1';   // must match BACKEND_SECRET in assets/app.js
var HEADERS = ['Timestamp', 'Name', 'Email', 'Course', 'Tier',
               'AccessCode', 'Status', 'VerifiedAt', 'Notes'];

var COL = { TS: 1, NAME: 2, EMAIL: 3, COURSE: 4, TIER: 5,
            CODE: 6, STATUS: 7, VERIFIED: 8, NOTES: 9 };

/* ===================== one-time setup ===================== */

function setup() {
  sheet_();
  var props = PropertiesService.getScriptProperties();
  if (!props.getProperty('ADMIN_KEY')) {
    props.setProperty('ADMIN_KEY', 'MS-ADMIN-' + Utilities.getUuid().slice(0, 8).toUpperCase());
  }
  Logger.log('Sheet ready. ADMIN_KEY = ' + props.getProperty('ADMIN_KEY'));
  return props.getProperty('ADMIN_KEY');
}

/** Run this if you ever want to change the admin key. */
function setAdminKey(newKey) {
  PropertiesService.getScriptProperties().setProperty('ADMIN_KEY', newKey || 'change-me');
  Logger.log('ADMIN_KEY updated.');
}

/* ===================== entry points ===================== */

function doGet(e) {
  // Visiting the /exec URL in a browser should show this. If you see a Google
  // sign-in page instead, the deployment access is not set to "Anyone".
  return json_({
    ok: true,
    service: 'Mentorine access codes',
    version: 2,
    rows: Math.max(0, sheet_().getLastRow() - 1),
    time: new Date().toISOString()
  });
}

function doPost(e) {
  try {
    var body = {};
    if (e && e.postData && e.postData.contents) body = JSON.parse(e.postData.contents);
    var action = String(body.action || '').toLowerCase();

    // ---- public actions: shared site secret ----
    var PUBLIC = { ping: 1, register: 1, verify: 1, status: 1 };
    // ---- admin actions: ADMIN_KEY from Script Properties ----
    var ADMIN = { list: 1, approve: 1, revoke: 1, remove: 1 };

    if (PUBLIC[action]) {
      if (String(body.secret || '') !== PUBLIC_SECRET) return fail_('bad_secret');
    } else if (ADMIN[action]) {
      var key = PropertiesService.getScriptProperties().getProperty('ADMIN_KEY');
      if (!key) return fail_('admin_key_not_set — run setup() in the Apps Script editor');
      if (String(body.adminKey || '') !== key) return fail_('bad_admin_key');
    } else {
      return fail_('unknown_action: ' + action);
    }

    switch (action) {
      case 'ping':     return json_({ ok: true, version: 2, rows: Math.max(0, sheet_().getLastRow() - 1) });
      case 'register': return register_(body);
      case 'verify':   return verify_(body);
      case 'status':   return status_(body);
      case 'list':     return list_();
      case 'approve':  return setStatus_(body, 'APPROVED');
      case 'revoke':   return setStatus_(body, 'PENDING');
      case 'remove':   return remove_(body);
    }
    return fail_('unhandled_action');
  } catch (err) {
    return fail_(String(err && err.message || err));
  }
}

/* ===================== actions ===================== */

/**
 * Records a registration as PENDING and returns the generated code.
 * Registering twice with the same email + course updates the existing row
 * instead of creating a duplicate, and keeps any code already issued.
 */
function register_(b) {
  var name   = trim_(b.name);
  var email  = lower_(b.email);
  var course = trim_(b.course);
  var tier   = trim_(b.tier);
  if (!email || !course) return fail_('missing_email_or_course');

  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sh = sheet_();
    var row = findRow_(sh, function (r) {
      return lower_(r[COL.EMAIL - 1]) === email && trim_(r[COL.COURSE - 1]) === course;
    });

    if (row) {
      var existing = trim_(sh.getRange(row, COL.CODE).getValue());
      var code = existing || makeCode_();
      sh.getRange(row, COL.NAME).setValue(name);
      sh.getRange(row, COL.TIER).setValue(tier);
      sh.getRange(row, COL.CODE).setValue(code);
      if (!trim_(sh.getRange(row, COL.STATUS).getValue())) {
        sh.getRange(row, COL.STATUS).setValue('PENDING');
      }
      return json_({
        ok: true, code: code, duplicate: true,
        status: trim_(sh.getRange(row, COL.STATUS).getValue())
      });
    }

    var newCode = makeCode_();
    sh.appendRow([new Date(), name, email, course, tier, newCode, 'PENDING', '', '']);
    return json_({ ok: true, code: newCode, duplicate: false, status: 'PENDING' });
  } finally {
    lock.releaseLock();
  }
}

/**
 * A code only works when its row is APPROVED and the course matches.
 * Returns a reason so the site can say "we have you, payment not confirmed yet"
 * instead of the unhelpful "that code doesn't match".
 */
function verify_(b) {
  var code   = upper_(b.code);
  var course = trim_(b.course);
  var email  = lower_(b.email);
  if (!code) return json_({ ok: true, verified: false, reason: 'nocode' });

  var sh = sheet_();
  var row = findRow_(sh, function (r) { return upper_(r[COL.CODE - 1]) === code; });
  if (!row) return json_({ ok: true, verified: false, reason: 'notfound' });

  var vals   = sh.getRange(row, 1, 1, HEADERS.length).getValues()[0];
  var status = upper_(vals[COL.STATUS - 1]);

  if (course && trim_(vals[COL.COURSE - 1]) !== course) {
    return json_({ ok: true, verified: false, reason: 'wrongcourse' });
  }
  if (status !== 'APPROVED') {
    return json_({ ok: true, verified: false, reason: 'pending' });
  }

  sh.getRange(row, COL.VERIFIED).setValue(new Date());
  if (email && !lower_(vals[COL.EMAIL - 1])) sh.getRange(row, COL.EMAIL).setValue(email);
  return json_({ ok: true, verified: true, reason: 'ok', course: trim_(vals[COL.COURSE - 1]) });
}

function status_(b) {
  var email = lower_(b.email);
  if (!email) return fail_('missing_email');
  var sh = sheet_();
  var out = rows_(sh).filter(function (r) { return lower_(r[COL.EMAIL - 1]) === email; })
    .map(function (r) {
      return { course: trim_(r[COL.COURSE - 1]), status: upper_(r[COL.STATUS - 1]),
               code: trim_(r[COL.CODE - 1]) };
    });
  return json_({ ok: true, records: out });
}

function list_() {
  var sh = sheet_();
  var out = rows_(sh).map(function (r, i) {
    return {
      row: i + 2,
      timestamp: r[COL.TS - 1] ? new Date(r[COL.TS - 1]).toISOString() : '',
      name: trim_(r[COL.NAME - 1]),
      email: lower_(r[COL.EMAIL - 1]),
      course: trim_(r[COL.COURSE - 1]),
      tier: trim_(r[COL.TIER - 1]),
      code: trim_(r[COL.CODE - 1]),
      status: upper_(r[COL.STATUS - 1]) || 'PENDING',
      verifiedAt: r[COL.VERIFIED - 1] ? new Date(r[COL.VERIFIED - 1]).toISOString() : '',
      notes: trim_(r[COL.NOTES - 1])
    };
  }).reverse();   // newest first
  return json_({ ok: true, students: out });
}

function setStatus_(b, newStatus) {
  var sh = sheet_();
  var row = locate_(sh, b);
  if (!row) return fail_('student_not_found');
  sh.getRange(row, COL.STATUS).setValue(newStatus);
  if (newStatus === 'PENDING') sh.getRange(row, COL.VERIFIED).setValue('');
  if (!trim_(sh.getRange(row, COL.CODE).getValue())) {
    sh.getRange(row, COL.CODE).setValue(makeCode_());
  }
  return json_({
    ok: true, status: newStatus,
    code: trim_(sh.getRange(row, COL.CODE).getValue())
  });
}

function remove_(b) {
  var sh = sheet_();
  var row = locate_(sh, b);
  if (!row) return fail_('student_not_found');
  sh.deleteRow(row);
  return json_({ ok: true, deleted: true });
}

/* ===================== helpers ===================== */

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

function rows_(sh) {
  if (sh.getLastRow() < 2) return [];
  return sh.getRange(2, 1, sh.getLastRow() - 1, HEADERS.length).getValues();
}

function findRow_(sh, match) {
  var data = rows_(sh);
  for (var i = 0; i < data.length; i++) if (match(data[i])) return i + 2;
  return 0;
}

/** Locate a row by code, or by email + course. */
function locate_(sh, b) {
  if (b.code) {
    var byCode = findRow_(sh, function (r) { return upper_(r[COL.CODE - 1]) === upper_(b.code); });
    if (byCode) return byCode;
  }
  if (b.row) return Number(b.row);
  if (b.email) {
    return findRow_(sh, function (r) {
      return lower_(r[COL.EMAIL - 1]) === lower_(b.email) &&
             (!b.course || trim_(r[COL.COURSE - 1]) === trim_(b.course));
    });
  }
  return 0;
}

function makeCode_() {
  var A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', c = 'MS-';
  for (var i = 0; i < 8; i++) {
    if (i === 4) c += '-';
    c += A.charAt(Math.floor(Math.random() * A.length));
  }
  return c;
}

function trim_(v)  { return String(v == null ? '' : v).trim(); }
function lower_(v) { return trim_(v).toLowerCase(); }
function upper_(v) { return trim_(v).toUpperCase(); }

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
function fail_(msg) { return json_({ ok: false, error: msg }); }
