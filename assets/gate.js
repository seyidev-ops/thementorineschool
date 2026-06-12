/* ============================================================
   MENTORINE TRAINING GATE
   - Requires: logged-in student, registered for this course,
     unique access code verified.
   - Maps progress: visiting a part records it; the training
     index paints ticks + a progress bar over the part cards.
   Include AFTER assets/app.js on every training page.
   ============================================================ */
(function () {
  var COURSE = "software-development-full";          // course this folder belongs to
  var HOME = "../../";                                // path back to site root

  var student = window.MS && MS.session();

  /* ---- 1. Gate ---- */
  if (!student) { location.replace(HOME + "login.html"); return; }
  if (student.course !== COURSE) { location.replace(HOME + "syllabus.html?course=" + COURSE); return; }
  if (!student.codeVerified) { location.replace(HOME + "access.html?course=" + COURSE); return; }

  /* ---- 2. Which page is this? ---- */
  var m = location.pathname.match(/part(\d+)\.html/);
  var partN = m ? m[1] : null;

  /* ---- 3. Progress mapping ---- */
  if (partN !== null) {
    // visiting a part marks it complete in the shared progress store
    MS.setProgress(COURSE, partN, true);
  } else {
    // training index: paint ticks + progress strip onto the curriculum map
    var prog = MS.getProgress(COURSE);
    var links = document.querySelectorAll('a[href^="part"]');
    var total = links.length, done = 0;
    links.forEach(function (a) {
      var n = (a.getAttribute("href").match(/part(\d+)/) || [])[1];
      if (n !== undefined && prog[n]) {
        done++;
        var tick = document.createElement("span");
        tick.textContent = "✓ completed";
        tick.setAttribute("style",
          "display:inline-block;margin-top:.5rem;font-size:.68rem;font-weight:600;" +
          "letter-spacing:1.5px;text-transform:uppercase;color:var(--accent);");
        a.appendChild(tick);
      }
    });
    if (total) {
      var pct = Math.round(done / total * 100);
      var strip = document.createElement("div");
      strip.setAttribute("style",
        "max-width:1100px;margin:0 auto 1.6rem;padding:1rem 1.4rem;display:flex;align-items:center;gap:1rem;" +
        "border:1px solid var(--line-soft);border-radius:8px;background:var(--card);font-family:var(--sans);");
      strip.innerHTML =
        '<strong style="font-family:var(--serif);font-size:1.25rem;min-width:3.2em">' + pct + "%</strong>" +
        '<span style="flex:1;height:4px;background:var(--line-soft);border-radius:99px;overflow:hidden">' +
        '<i style="display:block;height:100%;width:' + pct + '%;background:var(--accent)"></i></span>' +
        '<span style="font-size:.72rem;letter-spacing:2px;text-transform:uppercase;color:var(--ink-faint)">' +
        done + " of " + total + " parts</span>" +
        '<a href="' + HOME + 'dashboard.html" style="font-size:.8rem;color:var(--accent)">Dashboard →</a>';
      var anchor = document.querySelector("main") || document.body;
      anchor.insertBefore(strip, anchor.firstChild);
    }
  }

  /* ---- 4. Greeting chip in nav ---- */
  var navRight = document.querySelector(".nav-right");
  if (navRight) {
    var chip = document.createElement("span");
    chip.textContent = student.name.split(" ")[0];
    chip.setAttribute("style",
      "font-size:.72rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink-faint);" +
      "border:1px solid var(--line-soft);border-radius:99px;padding:.3rem .8rem;font-family:var(--sans);");
    navRight.insertBefore(chip, navRight.firstChild);
  }
})();
