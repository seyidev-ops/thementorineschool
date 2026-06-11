/* ============================================================
   THE MENTORINE SCHOOL — shared app logic
   Course catalogue + syllabi + registration / login / lock state
   (Demo auth uses localStorage; wire to a real backend later.)
   ============================================================ */

window.MS = (function () {

  /* ---------- COURSE CATALOGUE (from the Career & Skill
     Development Program document, plus Software Development) ---------- */
  const CATALOGUE = [
    {
      id: "tech", label: "Tech & Development",
      tracks: [
        { slug: "software-development", name: "Software Development", courses: "Full guided curriculum", duration: "16 weeks", featured: true,
          blurb: "The complete JavaScript + HTML developer training — from your first web page to a deployed full-stack capstone." },
        { slug: "frontend-developer",  name: "Front-end Web Developer", courses: "12 courses", duration: "8–10 weeks" },
        { slug: "backend-developer",   name: "Back-end Web Developer", courses: "15 courses", duration: "10–12 weeks" },
        { slug: "fullstack-developer", name: "Full-stack Developer", courses: "18 courses", duration: "12–16 weeks" },
        { slug: "mobile-developer",    name: "Mobile App Developer (iOS/Android)", courses: "12 courses", duration: "10–14 weeks" },
        { slug: "data-analyst",        name: "Data Analyst", courses: "10 courses", duration: "8–12 weeks" },
        { slug: "data-scientist",      name: "Data Scientist", courses: "12 courses", duration: "12–16 weeks" },
        { slug: "ml-engineer",         name: "Machine Learning Engineer", courses: "14 courses", duration: "14–18 weeks" },
        { slug: "cybersecurity-analyst", name: "Cybersecurity Analyst", courses: "10 courses", duration: "10–14 weeks" },
        { slug: "cloud-architect",     name: "Cloud Architect (AWS/Azure)", courses: "8 courses", duration: "8–12 weeks" },
        { slug: "devops-engineer",     name: "DevOps Engineer", courses: "10 courses", duration: "10–14 weeks" },
        { slug: "sdet",                name: "SDET (Software Dev Engineer in Test)", courses: "8 courses", duration: "8–10 weeks" },
        { slug: "database-admin",      name: "Database Administrator", courses: "7 courses", duration: "6–10 weeks" }
      ]
    },
    {
      id: "design", label: "Design & Creative",
      tracks: [
        { slug: "graphic-designer", name: "Graphic Designer", courses: "9 courses", duration: "10–12 weeks" },
        { slug: "product-designer", name: "Product Designer (UI/UX)", courses: "12 courses", duration: "10–14 weeks" },
        { slug: "motion-designer",  name: "Motion Graphics Designer", courses: "8 courses", duration: "8–12 weeks" },
        { slug: "video-editor",     name: "Video Editor", courses: "7 courses", duration: "6–10 weeks" },
        { slug: "3d-artist",        name: "3D Artist / Animator", courses: "10 courses", duration: "12–16 weeks" },
        { slug: "brand-designer",   name: "Brand Identity Designer", courses: "6 courses", duration: "6–8 weeks" }
      ]
    },
    {
      id: "marketing", label: "Marketing & Content",
      tracks: [
        { slug: "digital-marketer", name: "Digital Marketer", courses: "7 courses", duration: "4–7 weeks" },
        { slug: "content-creator",  name: "Content Creator", courses: "15 courses", duration: "10–15 weeks" },
        { slug: "seo-specialist",   name: "SEO Specialist", courses: "6 courses", duration: "4–6 weeks" },
        { slug: "social-media-manager", name: "Social Media Manager", courses: "8 courses", duration: "6–8 weeks" },
        { slug: "email-marketer",   name: "Email Marketing Specialist", courses: "5 courses", duration: "4–6 weeks" },
        { slug: "copywriter",       name: "Copywriter", courses: "6 courses", duration: "4–8 weeks" }
      ]
    },
    {
      id: "business", label: "Business & Operations",
      tracks: [
        { slug: "project-manager",  name: "Project Manager", courses: "10 courses", duration: "8–12 weeks" },
        { slug: "product-manager",  name: "Product Manager", courses: "12 courses", duration: "10–14 weeks" },
        { slug: "business-analyst", name: "Business Analyst", courses: "9 courses", duration: "8–10 weeks" },
        { slug: "operations-manager", name: "Operations Manager", courses: "8 courses", duration: "8–10 weeks" },
        { slug: "scrum-master",     name: "Scrum Master", courses: "6 courses", duration: "4–6 weeks" },
        { slug: "healthcare-analyst", name: "Healthcare Analyst", courses: "8 courses", duration: "8–12 weeks" },
        { slug: "salesforce-admin", name: "Salesforce Administrator", courses: "7 courses", duration: "6–10 weeks" }
      ]
    },
    {
      id: "support", label: "Support, Admin & Community",
      tracks: [
        { slug: "virtual-assistant", name: "Virtual Assistant", courses: "10 courses", duration: "4–8 weeks" },
        { slug: "customer-support",  name: "Customer Support Specialist", courses: "9 courses", duration: "10–12 weeks" },
        { slug: "community-manager", name: "Community Manager", courses: "5 courses", duration: "3–5 weeks" },
        { slug: "executive-assistant", name: "Executive Assistant (Remote)", courses: "8 courses", duration: "6–8 weeks" },
        { slug: "technical-support", name: "Technical Support Specialist", courses: "7 courses", duration: "6–10 weeks" },
        { slug: "remote-team-lead",  name: "Remote Team Lead", courses: "6 courses", duration: "4–6 weeks" }
      ]
    },
    {
      id: "nocode", label: "No-Code & Automation",
      tracks: [
        { slug: "nocode-developer",   name: "No-Code Developer (Bubble/Adalo)", courses: "8 courses", duration: "6–10 weeks" },
        { slug: "automation-specialist", name: "Zapier/Make Automation Specialist", courses: "5 courses", duration: "4–6 weeks" },
        { slug: "ai-prompt-engineer", name: "AI Prompt Engineer", courses: "4 courses", duration: "3–5 weeks" },
        { slug: "lowcode-builder",    name: "Low-Code App Builder", courses: "6 courses", duration: "6–8 weeks" }
      ]
    }
  ];

  /* ---------- SYLLABI ----------
     Software Development syllabus is extracted directly from the
     JavaScript-HTML Developer Training Guide (Parts 0–9 + appendices). */
  const SYLLABI = {
    "software-development": {
      title: "Software Development",
      subtitle: "The Complete JavaScript + HTML Developer Training — zero to deployed full-stack capstone in 16 weeks.",
      roadmap: [
        ["Weeks 1–2",  "Part 1 · HTML", "Structure of every web page; semantic markup; forms, tables, media", "Personal profile page + registration form"],
        ["Weeks 2–3",  "Part 2 · CSS", "Styling, box model, Flexbox, Grid, responsive design", "Fully styled, mobile-friendly profile site"],
        ["Weeks 3–6",  "Part 3 · JavaScript Core", "Variables, logic, loops, functions, arrays, objects", "Number-guessing game; console expense tracker"],
        ["Weeks 6–8",  "Part 4 · The DOM", "Making pages interactive; events; forms; localStorage", "To-Do app, calculator, quiz app"],
        ["Weeks 8–10", "Part 5 · Modern & Async JS", "ES6+, promises, async/await, fetch, public APIs", "Live weather app; GitHub profile finder"],
        ["Weeks 10–12","Part 6 · Node.js Backend", "Servers, npm, Express, REST APIs, JSON", "Remote Job Board API"],
        ["Weeks 12–14","Part 7 · Databases + Capstone", "SQL, CRUD, connecting front end to back end", "Full-stack Remote Job Board (capstone)"],
        ["Weeks 14–15","Part 8 · Cross-Language Integration", "JS + Python, JS + PHP, JS + SQL, WebAssembly", "JS front end powered by a Python API"],
        ["Weeks 15–16","Part 9 · Professional Practice", "Git/GitHub, debugging, deployment, portfolio, job search", "Live portfolio + deployed capstone"]
      ],
      modules: [
        { title: "Part 0 — Start Here: How This Guide Works",
          items: ["Who this guide is for", "The golden rules of learning to code", "The 16-week fast-track roadmap", "Setting up your developer workstation — VS Code, Chrome, Node.js", "How each lesson is structured"] },
        { title: "Part 1 — HTML: The Skeleton of Every Web Page",
          items: ["What is HTML?", "Your first web page (practical)", "The essential tags — your daily vocabulary", "Attributes: giving tags extra information", "Semantic HTML: writing pages that mean something", "Forms: collecting information from users", "Tables and media", "Checkpoint project: your personal profile page"] },
        { title: "Part 2 — CSS: Making It Beautiful",
          items: ["What is CSS?", "Selectors: targeting what you style", "The box model — the most important idea in CSS", "Flexbox: arranging things in a row or column", "CSS Grid: two-dimensional layouts", "Checkpoint project: style your profile page"] },
        { title: "Part 3 — JavaScript Fundamentals: Thinking Like a Programmer",
          items: ["What is JavaScript, and where does it run?", "Variables: the computer's memory", "Operators: doing things with values", "Conditionals: teaching the computer to decide (ATM simulator)", "Loops: doing things repeatedly (Multiplication Master)", "Functions: reusable machines", "Arrays: ordered lists of anything", "Objects: describing real-world things", "Checkpoint project 1: the number-guessing game", "Checkpoint project 2: console expense tracker"] },
        { title: "Part 4 — The DOM: Making Web Pages Come Alive",
          items: ["What is the DOM?", "Selecting and changing elements", "Events: responding to the user", "Project: the To-Do list — every developer's rite of passage", "localStorage: remembering data after the tab closes", "Project: a working calculator", "Checkpoint project: the quiz app"] },
        { title: "Part 5 — Modern & Asynchronous JavaScript: Talking to the Internet",
          items: ["Modern JavaScript (ES6+) power features", "Modules: splitting code across files", "Asynchronous JavaScript: the restaurant analogy", "fetch(): getting real data from real servers", "Project: GitHub profile finder", "Checkpoint project: live weather app"] },
        { title: "Part 6 — Node.js & Express: Building the Back End",
          items: ["Front end vs back end: the full picture", "npm: the world's largest code library", "Your first web server (practical)", "REST APIs: the grammar of the web", "Project: the Remote Job Board API", "Testing your API like a professional", "Serving your front end from your back end"] },
        { title: "Part 7 — Databases & the Full-Stack Capstone",
          items: ["Why databases?", "SQL in one sitting (practical)", "THE CAPSTONE: Remote Job Board — a complete full-stack application", "Step 1: the server with a real database", "Step 2: the front end", "Capstone upgrade challenges (do at least two)"] },
        { title: "Part 8 — Integrating JavaScript With Other Languages",
          items: ["How languages actually talk to each other", "JavaScript + Python: the power couple (FastAPI)", "JavaScript + PHP: working with the classic web", "JavaScript + SQL: a deeper look", "JavaScript + compiled languages: WebAssembly", "Checkpoint project: the Polyglot Dashboard"] },
        { title: "Part 9 — Professional Practice: Git, Debugging, Deployment & Getting Hired",
          items: ["Git & GitHub: the developer's time machine", "Debugging like a professional — the five errors every beginner meets", "Deploying: static sites on Netlify, full-stack apps on Render", "Your portfolio and the job hunt", "Positioning yourself for remote roles", "Your daily professional habits, from today"] },
        { title: "Appendices — Quick Reference",
          items: ["A.1 HTML skeleton (memorise this)", "A.2 JavaScript essentials on one page", "A.3 Terminal & Git on one page", "A.4 Recommended free resources", "Appendix B: the 16-week daily study plan"] }
      ]
    }
  };

  /* Generic syllabus phases for every other track, built from the
     programme's four pillars and milestone structure (weeks 1, 4, 8+). */
  function genericSyllabus(track) {
    return {
      title: track.name,
      subtitle: track.courses + " · " + track.duration + " · taught by senior industry practitioners.",
      roadmap: null,
      modules: [
        { title: "Phase 1 — Foundation (Weeks 1–2)",
          items: ["Your Career Roadmap: milestones, skill trees, and target-role breakdown", "Orientation: tools of the trade and workstation setup", "Hard skills vs soft skills map for the " + track.name + " role", "Community onboarding: cohort, mentors, and alumni network"] },
        { title: "Phase 2 — Core Skills (Weeks 2–4 milestone)",
          items: ["Curated course sequence — " + track.courses + " of hands-on, project-based curriculum", "Self-paced video lectures + weekly live sessions (hybrid format)", "Industry-standard tools access (Figma, GitHub, Cloud Labs, and more)", "Weekly “Ask Me Anything” mentorship hours"] },
        { title: "Phase 3 — Projects & Portfolio (Week 8 milestone)",
          items: ["Guided portfolio projects designed to impress employers", "Monthly hackathons and applied challenges", "Micro-credential badges as you complete modules", "Real-world assignments reviewed by senior practitioners"] },
        { title: "Phase 4 — Capstone & Career (Final weeks)",
          items: ["Capstone project build and refinement", "Capstone Showcase before a panel of hiring partners", "Verified Programme Completion Certificate issued by Ona", "Remote-work positioning: CV, portfolio, and job-hunt strategy", "Alumni network access after graduation"] }
      ]
    };
  }

  function allTracks() {
    return CATALOGUE.flatMap(function (c) { return c.tracks; });
  }
  function findTrack(slug) {
    return allTracks().find(function (t) { return t.slug === slug; }) || null;
  }
  function getSyllabus(slug) {
    if (SYLLABI[slug]) return SYLLABI[slug];
    var t = findTrack(slug);
    return t ? genericSyllabus(t) : null;
  }

  /* ---------- Registration / auth / lock state (demo, localStorage) ---------- */
  function getStudent() {
    try { return JSON.parse(localStorage.getItem("ms_student")) || null; }
    catch (e) { return null; }
  }
  function saveStudent(s) { localStorage.setItem("ms_student", JSON.stringify(s)); }
  function register(data) {
    var s = {
      name: data.name, email: data.email.toLowerCase().trim(), pass: data.pass,
      course: data.course, tier: data.tier,
      registeredAt: new Date().toISOString(), progress: {}
    };
    saveStudent(s);
    sessionStorage.setItem("ms_session", s.email);
    return s;
  }
  function login(email, pass) {
    var s = getStudent();
    if (s && s.email === email.toLowerCase().trim() && s.pass === pass) {
      sessionStorage.setItem("ms_session", s.email);
      return s;
    }
    return null;
  }
  function logout() { sessionStorage.removeItem("ms_session"); }
  function session() {
    var s = getStudent();
    return (s && sessionStorage.getItem("ms_session") === s.email) ? s : null;
  }
  function isUnlocked(slug) {
    var s = getStudent();
    return !!(s && s.course === slug);
  }
  function setProgress(slug, idx, done) {
    var s = getStudent(); if (!s) return;
    s.progress[slug] = s.progress[slug] || {};
    s.progress[slug][idx] = !!done;
    saveStudent(s);
  }
  function getProgress(slug) {
    var s = getStudent();
    return (s && s.progress[slug]) || {};
  }

  /* ---------- Theme: system → day → night cycle ---------- */
  var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  function applyTheme(mode) {
    var resolved = mode === "system"
      ? (mq && mq.matches ? "night" : "day")
      : mode;
    document.documentElement.setAttribute("data-theme", resolved);
  }
  function initTheme() {
    var mode = localStorage.getItem("ms_theme") || "system";
    applyTheme(mode);
    if (mq && mq.addEventListener) {
      mq.addEventListener("change", function () {
        if ((localStorage.getItem("ms_theme") || "system") === "system") applyTheme("system");
      });
    }
    var btn = document.querySelector(".theme-btn");
    if (btn) {
      var ICONS = { system: "◐", day: "☀", night: "☾" };
      var LABELS = { system: "Theme: system default", day: "Theme: day", night: "Theme: night" };
      var sync = function () {
        var m = localStorage.getItem("ms_theme") || "system";
        btn.textContent = ICONS[m];
        btn.title = LABELS[m] + " — click to change";
        btn.setAttribute("aria-label", LABELS[m]);
      };
      sync();
      btn.addEventListener("click", function () {
        var order = ["system", "day", "night"];
        var cur = localStorage.getItem("ms_theme") || "system";
        var next = order[(order.indexOf(cur) + 1) % order.length];
        localStorage.setItem("ms_theme", next);
        applyTheme(next);
        sync();
      });
    }
    var mb = document.querySelector(".menu-btn");
    if (mb) mb.addEventListener("click", function () {
      document.querySelector(".nav-links").classList.toggle("open");
    });
  }

  /* ---------- PWA ---------- */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }

  return {
    CATALOGUE: CATALOGUE, allTracks: allTracks, findTrack: findTrack, getSyllabus: getSyllabus,
    register: register, login: login, logout: logout, session: session,
    getStudent: getStudent, isUnlocked: isUnlocked,
    setProgress: setProgress, getProgress: getProgress, initTheme: initTheme
  };
})();
