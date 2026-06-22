/**
 * THE MENTORINE SCHOOL — Access Code Backend
 * Google Apps Script (bound to a Google Sheet)
 * ---------------------------------------------------------------------------
 * What it does
 *   - register : a student registers for a track -> a row is added (status PENDING)
 *   - verify   : a student enters their code -> we confirm it is APPROVED for that track
 *   - status   : (optional) check a student's current status by email
 *
 * The code itself NEVER becomes valid until YOU set the row's Status to APPROVED
 * in the Sheet (your "pay, send proof, get access" flow). Random codes are
 * generated server-side, so they cannot be guessed or derived from the page.
 *
 * Sheet columns (row 1 = headers, created automatically on first run):
 *   A Timestamp | B Name | C Email | D Course | E Tier | F AccessCode
 *   G Status    | H VerifiedAt | I Notes
 * ---------------------------------------------------------------------------
 */

/* ====== CONFIG — change this ONE value, then redeploy ====== */
var SHARED_SECRET = "Mentorine-7d13-O2P2-T1g1.";  // must match app.js
var SHEET_NAME = "AccessCodes";   // tab name inside your spreadsheet
/* =========================================================== */

var HEADERS = ["Timestamp", "Name", "Email", "Course", "Tier",
               "AccessCode", "Status", "VerifiedAt", "Notes"];

/* ---- entry points (Apps Script calls these for web requests) ---- */
function doGet(e)  { return handle(e); }
function doPost(e) { return handle(e); }

function handle(e) {
  var p = (e && e.parameter) ? e.parameter : {};
  // also accept a JSON POST body
  if (e && e.postData && e.postData.contents) {
    try {
      var b = JSON.parse(e.postData.contents);
      for (var k in b) { if (p[k] === undefined) p[k] = b[k]; }
    } catch (err) {}
  }

  if (p.secret !== SHARED_SECRET) return json({ ok: false, error: "unauthorized" });

  switch (p.action) {
    case "register": return json(doRegister(p));
    case "verify":   return json(doVerify(p));
    case "status":   return json(doStatus(p));
    default:         return json({ ok: false, error: "unknown action" });
  }
}

/* ---- actions ---- */

function doRegister(p) {
  var name   = (p.name || "").trim();
  var email  = (p.email || "").toLowerCase().trim();
  var course = (p.course || "").trim();
  var tier   = (p.tier || "").trim();
  if (!email || !course) return { ok: false, error: "missing email or course" };

  var sh = getSheet();
  var lock = LockService.getScriptLock();
  lock.waitLock(8000);
  try {
    // Already registered for this exact course? Return the existing row's state.
    var existing = findRow(sh, email, course);
    if (existing) {
      var r = existing.values;
      return {
        ok: true, alreadyRegistered: true,
        status: r[6], course: course,
        // only reveal the code once approved
        accessCode: (r[6] === "APPROVED") ? r[5] : ""
      };
    }
    var code = makeCode();
    sh.appendRow([new Date(), name, email, course, tier, code, "PENDING", "", ""]);
    // Do NOT return the code on registration — it is not active until approved.
    return { ok: true, status: "PENDING", course: course };
  } finally {
    lock.releaseLock();
  }
}

function doVerify(p) {
  var email  = (p.email || "").toLowerCase().trim();
  var course = (p.course || "").trim();
  var code   = (p.code || "").toUpperCase().replace(/\s+/g, "");
  if (!course || !code) return { ok: false, error: "missing code or course" };

  var sh = getSheet();
  var data = sh.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var rowCode = String(row[5]).toUpperCase().replace(/\s+/g, "");
    var rowCourse = String(row[3]).trim();
    var rowStatus = String(row[6]).trim().toUpperCase();
    // Match by code + course. (Email optional: lets you hand a code to anyone.)
    if (rowCode === code && rowCourse === course) {
      if (rowStatus !== "APPROVED") {
        return { ok: false, verified: false, reason: "not_approved" };
      }
      // stamp first verification time
      if (!row[7]) {
        sh.getRange(i + 1, 8).setValue(new Date());
      }
      return { ok: true, verified: true, course: rowCourse, name: row[1] };
    }
  }
  return { ok: false, verified: false, reason: "not_found" };
}

function doStatus(p) {
  var email = (p.email || "").toLowerCase().trim();
  if (!email) return { ok: false, error: "missing email" };
  var sh = getSheet();
  var data = sh.getDataRange().getValues();
  var rows = [];
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][2]).toLowerCase().trim() === email) {
      rows.push({
        course: data[i][3], tier: data[i][4], status: data[i][6],
        accessCode: (String(data[i][6]).toUpperCase() === "APPROVED") ? data[i][5] : ""
      });
    }
  }
  return { ok: true, registrations: rows };
}

/* ---- helpers ---- */

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sh.setFrozenRows(1);
  }
  return sh;
}

function findRow(sh, email, course) {
  var data = sh.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][2]).toLowerCase().trim() === email &&
        String(data[i][3]).trim() === course) {
      return { rowIndex: i + 1, values: data[i] };
    }
  }
  return null;
}

function makeCode() {
  // MS-XXXX-XXXX, alphabet excludes I O 0 1 to avoid confusion
  var A = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  var c = "MS-";
  for (var i = 0; i < 8; i++) {
    if (i === 4) c += "-";
    c += A.charAt(Math.floor(Math.random() * A.length));
  }
  return c;
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ---- one-time helper: run this once from the editor to create the tab ---- */
function setup() {
  getSheet();
  Logger.log("Sheet '" + SHEET_NAME + "' is ready.");
}

