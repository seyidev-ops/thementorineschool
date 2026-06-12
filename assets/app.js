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
        { slug: "software-development-full", name: "Software Development — Full Program", courses: "15 guided parts", duration: "24 weeks", featured: true, training: "training/sd-full/index.html",
          blurb: "The flagship zero-to-professional program: terminal to React, Python, Node, databases, DevOps and the MentorLink LMS capstone — with full training pages inside." },
        { slug: "software-development", name: "Software Development — Core (JS + HTML)", courses: "Full guided curriculum", duration: "16 weeks", featured: true,
          blurb: "The complete JavaScript + HTML developer training — from your first web page to a deployed full-stack capstone." },
        { slug: "javascript-developer", name: "JavaScript Developer", courses: "12 guided parts", duration: "16 weeks", featured: true, training: "training/javascript/index.html",
          blurb: "Master the language of the web end to end — fundamentals, the DOM, async, Node.js, databases and a full-stack capstone, with full training pages inside." },
        { slug: "frontend-developer",  name: "Front-end Web Developer", courses: "12 guided parts", duration: "16 weeks", featured: true, training: "training/frontend/index.html",
          blurb: "HTML, CSS, JavaScript, professional tooling and React — full training pages with copy-and-paste practicals and a deployed capstone." },
        { slug: "backend-developer",   name: "Back-end Web Developer", courses: "12 guided parts", duration: "16 weeks", featured: true, training: "training/backend/index.html",
          blurb: "Node, Express, SQL and MongoDB, security, real payments and a deployed e-commerce capstone — full training pages with copy-and-paste practicals." },
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
    "backend-developer": {
      title: "Back-end Web Developer",
      subtitle: "The complete back-end training — Node, Express, SQL, MongoDB, security and payments, in 16 weeks.",
      training: "training/backend/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 Terminal & HTTP", "Command line, how requests travel, status codes, curl", "You can speak raw HTTP"],
        ["Weeks 2\u20134", "Part 2 \u00b7 JavaScript Core", "Variables, logic, loops, functions, data shapes, async", "Bank-account simulator CLI"],
        ["Weeks 4\u20135", "Part 3 \u00b7 Node.js", "Modules, npm, file system, environment variables", "Notes CLI with real persistence"],
        ["Weeks 5\u20137", "Part 4 \u00b7 Express & REST", "Routing, middleware, CRUD, validation, status codes", "Task Manager API, fully tested"],
        ["Weeks 7\u20139", "Part 5 \u00b7 SQL", "SQLite, CRUD, JOINs, parameterized queries", "Task Manager persists forever"],
        ["Weeks 9\u201310", "Part 6 \u00b7 MongoDB", "Documents, Mongoose, SQL vs NoSQL judgement", "Product catalogue on Atlas"],
        ["Weeks 10\u201312", "Part 7 \u00b7 Auth & Security", "bcrypt, JWT, protected routes, OWASP, CORS", "Secure multi-user Task API"],
        ["Weeks 12\u201314", "Part 8 \u00b7 Integration", "Python FastAPI, Paystack, email, webhooks", "Polyglot pipeline with payments"],
        ["Weeks 14\u201316", "Part 9 \u00b7 Professional Practice", "Testing, Docker, CI/CD, deployment, capstone", "NaijaStore API live on Render"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 Who This Guide Is For \u2014 and What You Will Become", "0.2 The Golden Rules of Learning Back-End Development", "0.3 The 16-Week Fast-Track Roadmap", "0.4 Set Up Your Workstation (Practical)", "0.5 How Every Lesson Is Structured"] },
        { title: "Part 1 \u2014 The Terminal, HTTP & How the Web Actually Works",
          items: ["1.1 Why Back-End Developers Live in the Terminal", "1.2 The Ten Commands You Will Use Forever (Practical)", "1.3 What Actually Happens When You Visit a URL", "1.4 The Anatomy of HTTP \u2014 Requests, Responses, Status Codes", "1.5 Speak HTTP Yourself with curl (Practical)", "1.6 Checkpoint: Narrate a Request Out Loud"] },
        { title: "Part 2 \u2014 JavaScript for the Back End: Thinking in Logic and Data",
          items: ["2.1 Why JavaScript on the Server?", "2.2 Variables: The Computer's Labelled Boxes", "2.3 Conditionals: Teaching the Computer to Decide", "2.4 Loops: Doing Things Ten Thousand Times", "2.5 Functions: Reusable Machines", "2.6 Arrays and Objects: The Data Shapes of Every API", "2.7 Asynchronous JavaScript: The Restaurant Kitchen", "2.8 Checkpoint Project: The Bank Account Simulator"] },
        { title: "Part 3 \u2014 Node.js Deep Dive: Your JavaScript Engine Room",
          items: ["3.1 What Node.js Actually Is", "3.2 Modules: Splitting Code Across Files", "3.3 npm: The World's Largest Code Library", "3.4 The File System: Node's Superpower", "3.5 Environment Variables: Secrets Stay Out of Code", "3.6 Checkpoint Project: The Notes CLI"] },
        { title: "Part 4 \u2014 Express & REST APIs: Your First Real Back End",
          items: ["4.1 A Web Server in Eleven Lines", "4.2 Routing: Different Paths, Different Answers", "4.3 Middleware: The Airport Security Line", "4.4 Full CRUD: The Task Manager API (Practical)", "4.5 Validation and Error Handling Like a Professional", "4.6 Checkpoint Project: Task Manager API, Documented"] },
        { title: "Part 5 \u2014 Databases I: SQL, the Language of Structured Data",
          items: ["5.1 Why Files Break and Databases Don't", "5.2 SQL in One Sitting (Practical)", "5.3 The Question Marks: Parameterized Queries vs SQL Injection", "5.4 Relationships and JOINs: Where SQL Earns Its Keep", "5.5 Checkpoint Project: The Task API Persists Forever"] },
        { title: "Part 6 \u2014 Databases II: MongoDB and Choosing the Right Store",
          items: ["6.1 Documents Instead of Tables", "6.2 A Free Cloud Database with Atlas (Practical)", "6.3 Mongoose: Models, Validation, CRUD (Practical)", "6.4 SQL or NoSQL? The Decision Professionals Make", "6.5 Checkpoint Project: Catalogue Service"] },
        { title: "Part 7 \u2014 Authentication & Security: Guarding the Door",
          items: ["7.1 Security Is a Feature, Not a Garnish", "7.2 Passwords: Hash, Never Store (Practical)", "7.3 JWT: The Nightclub Wristband", "7.4 The Secure User System (Practical)", "7.5 The OWASP Hall of Shame: Mistakes You Will Never Make", "7.6 Checkpoint Project: The Secure Task API"] },
        { title: "Part 8 \u2014 Integration: Other Languages, Payments & the Outside World",
          items: ["8.1 HTTP Is the Lingua Franca", "8.2 A Python Microservice, Consumed from Node (Practical)", "8.3 Payments with Paystack (Practical)", "8.4 Webhooks: When the Internet Calls You Back", "8.5 Email and File Uploads in Ten Minutes", "8.6 Checkpoint Project: The Polyglot Pipeline"] },
        { title: "Part 9 \u2014 Professional Practice: Testing, Deployment & the Capstone",
          items: ["9.1 Automated Testing: Your Robot Quality Inspector", "9.2 Git & GitHub: The Professional Workflow", "9.3 Docker in Twenty Minutes", "9.4 CI/CD: Robots That Test Every Push", "9.5 Deployment: Your API on the Real Internet (Practical)", "9.6 THE CAPSTONE: NaijaStore API", "9.7 The Job Hunt: Turning the Capstone into Offers"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 HTTP Status Codes You Will Actually Use", "A.2 SQL on One Page", "A.3 Express Patterns on One Page", "A.4 Terminal & Git on One Page"] },
        { title: "Appendix B \u2014 The 16-Week Daily Study Plan",
          items: ["B.1 How to Use This Plan"] }
      ]
    },
    "software-development-full": {
      title: "Software Development — Full Program",
      subtitle: "The flagship 24-week zero-to-professional curriculum, with complete training pages for every part.",
      training: "training/sd-full/index.html",
      roadmap: [
        ["Start Here", "Part 0 \u00b7 Start Here", "What developers do, the golden rules, the 24-week roadmap, and full workstation setup. Milestone \u2014 Workstation ready", ""],
        ["Week 1", "Part 1 \u00b7 Terminal & How Code Runs", "Command-line mastery, paths, and your first programs in two languages. Milestone \u2014 hello.js + hello.py from the terminal", ""],
        ["Weeks 2\u20133", "Part 2 \u00b7 HTML & CSS", "Structure, styling, flexbox, and responsive design that works on every screen. Milestone \u2014 Personal landing page", ""],
        ["Weeks 4\u20136", "Part 3 \u00b7 JavaScript Fundamentals", "Variables, logic, loops, functions, arrays, objects \u2014 programming itself. Milestone \u2014 Console Student Manager", ""],
        ["Week 7", "Part 4 \u00b7 Git & GitHub", "Version control, branching, merging, and publishing every project you build. Milestone \u2014 All work on GitHub + first live site", ""],
        ["Weeks 8\u20139", "Part 5 \u00b7 The DOM", "Interactive apps: state \u2192 render architecture, events, localStorage, and fetch. Milestone \u2014 To-Do app + Quiz app", ""],
        ["Weeks 10\u201311", "Part 6 \u00b7 React", "Components, props, state, and effects \u2014 how modern teams build frontends. Milestone \u2014 Course Catalogue app", ""],
        ["Weeks 12\u201313", "Part 7 \u00b7 Python", "Your second language: automation, files, CSV, APIs, pip and virtual environments. Milestone \u2014 Expense Analyser CLI", ""],
        ["Weeks 14\u201315", "Part 8 \u00b7 Node.js & Express", "Backend engineering: REST APIs, CRUD, validation, status codes, curl. Milestone \u2014 Students API", ""],
        ["Weeks 16\u201317", "Part 9 \u00b7 Databases (SQL & NoSQL)", "SQL hands-on with SQLite, relationships and JOINs, injection-proof queries. Milestone \u2014 Persistent API with JOINs", ""],
        ["Week 18", "Part 10 \u00b7 Testing & Debugging", "The DIRE debugging method and automated tests with the built-in Node test runner. Milestone \u2014 10+ green tests", ""],
        ["Weeks 19\u201320", "Part 11 \u00b7 DevOps: Docker, CI/CD, Cloud", "Environment variables, Docker containers, GitHub Actions, Netlify and Render. Milestone \u2014 Deployed app + API, CI green", ""],
        ["Week 21", "Part 12 \u00b7 Cross-Language Integration", "JavaScript \u2194 Python (FastAPI), child processes, PHP, CORS, and WebAssembly. Milestone \u2014 Polyglot dashboard", ""],
        ["Weeks 22\u201323", "Part 13 \u00b7 Capstone: MentorLink LMS", "A real learning platform: auth, enrolments, progress tracking, tests, deployment. Milestone \u2014 Live, tested, documented product", ""],
        ["Week 24", "Part 14 \u00b7 Professional Practice", "Portfolio, CV, interviews, job search, and the habits that compound for years. Milestone \u2014 Portfolio live, applications out", ""]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here (Start Here)",
          items: ["What developers do, the golden rules, the 24-week roadmap, and full workstation setup. Milestone \u2014 Workstation ready"] },
        { title: "Part 1 \u2014 Terminal & How Code Runs (Week 1)",
          items: ["Command-line mastery, paths, and your first programs in two languages. Milestone \u2014 hello.js + hello.py from the terminal"] },
        { title: "Part 2 \u2014 HTML & CSS (Weeks 2\u20133)",
          items: ["Structure, styling, flexbox, and responsive design that works on every screen. Milestone \u2014 Personal landing page"] },
        { title: "Part 3 \u2014 JavaScript Fundamentals (Weeks 4\u20136)",
          items: ["Variables, logic, loops, functions, arrays, objects \u2014 programming itself. Milestone \u2014 Console Student Manager"] },
        { title: "Part 4 \u2014 Git & GitHub (Week 7)",
          items: ["Version control, branching, merging, and publishing every project you build. Milestone \u2014 All work on GitHub + first live site"] },
        { title: "Part 5 \u2014 The DOM (Weeks 8\u20139)",
          items: ["Interactive apps: state \u2192 render architecture, events, localStorage, and fetch. Milestone \u2014 To-Do app + Quiz app"] },
        { title: "Part 6 \u2014 React (Weeks 10\u201311)",
          items: ["Components, props, state, and effects \u2014 how modern teams build frontends. Milestone \u2014 Course Catalogue app"] },
        { title: "Part 7 \u2014 Python (Weeks 12\u201313)",
          items: ["Your second language: automation, files, CSV, APIs, pip and virtual environments. Milestone \u2014 Expense Analyser CLI"] },
        { title: "Part 8 \u2014 Node.js & Express (Weeks 14\u201315)",
          items: ["Backend engineering: REST APIs, CRUD, validation, status codes, curl. Milestone \u2014 Students API"] },
        { title: "Part 9 \u2014 Databases (SQL & NoSQL) (Weeks 16\u201317)",
          items: ["SQL hands-on with SQLite, relationships and JOINs, injection-proof queries. Milestone \u2014 Persistent API with JOINs"] },
        { title: "Part 10 \u2014 Testing & Debugging (Week 18)",
          items: ["The DIRE debugging method and automated tests with the built-in Node test runner. Milestone \u2014 10+ green tests"] },
        { title: "Part 11 \u2014 DevOps: Docker, CI/CD, Cloud (Weeks 19\u201320)",
          items: ["Environment variables, Docker containers, GitHub Actions, Netlify and Render. Milestone \u2014 Deployed app + API, CI green"] },
        { title: "Part 12 \u2014 Cross-Language Integration (Week 21)",
          items: ["JavaScript \u2194 Python (FastAPI), child processes, PHP, CORS, and WebAssembly. Milestone \u2014 Polyglot dashboard"] },
        { title: "Part 13 \u2014 Capstone: MentorLink LMS (Weeks 22\u201323)",
          items: ["A real learning platform: auth, enrolments, progress tracking, tests, deployment. Milestone \u2014 Live, tested, documented product"] },
        { title: "Part 14 \u2014 Professional Practice (Week 24)",
          items: ["Portfolio, CV, interviews, job search, and the habits that compound for years. Milestone \u2014 Portfolio live, applications out"] }
      ]
    },
    "frontend-developer": {
      title: "Front-end Web Developer",
      subtitle: "The complete front-end training — HTML, CSS, JavaScript, modern tooling and React, in 16 weeks.",
      training: "training/frontend/index.html",
      roadmap: [
        ["Weeks 1–2","Part 1 · HTML","Structure of every web page; semantic markup; forms, tables, media","Profile page + registration form"],
        ["Weeks 2–4","Part 2 · CSS","Box model, Flexbox, Grid, responsive design","Mobile-friendly portfolio site"],
        ["Weeks 4–6","Part 3 · JavaScript Core","Variables, logic, loops, functions, arrays, objects","Number-guessing game; tip calculator"],
        ["Weeks 6–8","Part 4 · The DOM","Interactivity, events, forms, localStorage","To-Do app; quiz app"],
        ["Weeks 8–9","Part 5 · Modern & Async JS","ES6+, promises, async/await, fetch, public APIs","Weather app; GitHub finder"],
        ["Weeks 9–10","Part 6 · Professional Tooling","Git/GitHub, npm, Vite, Tailwind CSS","Portfolio rebuilt with modern tooling"],
        ["Weeks 10–13","Part 7 · React","Components, props, state, hooks, routing","Remote Job Finder app (capstone)"],
        ["Weeks 13–14","Part 8 · Integration","Node, Python, headless CMS, payments","React powered by real APIs"],
        ["Weeks 14–16","Part 9 · Professional Practice","Debugging, performance, deployment, job hunt","Live portfolio + deployed capstone"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1  Who This Guide Is For", "0.2  The Golden Rules of Learning to Code", "0.3  The 16-Week Fast-Track Roadmap", "0.4  Setting Up Your Developer Workstation", "0.5  How Each Lesson Is Structured"] },
        { title: "Part 1 \u2014 HTML: The Skeleton of Every Web Page",
          items: ["1.1  What Is HTML?", "1.2  Your First Web Page (Practical)", "1.3  The Essential Tags (Your Daily Vocabulary)", "1.4  Attributes: Giving Tags Extra Information", "1.5  Semantic HTML: Writing Pages That Mean Something", "1.6  Forms: Collecting Information From Users", "1.7  Tables and Media", "1.8  Checkpoint Project: Your Personal Profile Page"] },
        { title: "Part 2 \u2014 CSS: Making It Beautiful",
          items: ["2.1  What Is CSS, and Three Ways to Use It", "2.2  Selectors: Targeting What You Style", "2.3  The Box Model: The Most Important Idea in CSS", "2.4  Colour, Typography, and Units", "2.5  Flexbox: Arranging Things in a Row or Column", "2.6  CSS Grid: Two-Dimensional Layouts", "2.7  Responsive Design: One Site, Every Screen", "2.8  Transitions, Transforms, and CSS Variables", "2.9  Checkpoint Project: Style Your Profile Into a Portfolio"] },
        { title: "Part 3 \u2014 JavaScript Fundamentals: Learning to Think Like a Programmer",
          items: ["3.1  What Is JavaScript, and Where Does It Run?", "3.2  Variables: The Computer's Memory", "3.3  Operators: Doing Things With Values", "3.4  Conditionals: Teaching the Computer to Decide", "3.5  Loops: Doing Things Repeatedly", "3.6  Functions: Reusable Machines", "3.7  Arrays: Ordered Lists of Anything", "3.8  Objects: Describing Real-World Things", "3.9  Checkpoint Project 1: The Number-Guessing Game", "3.10  Checkpoint Project 2: Console Expense Tracker"] },
        { title: "Part 4 \u2014 The DOM: Making Web Pages Come Alive",
          items: ["4.1  What Is the DOM?", "4.2  Selecting and Changing Elements", "4.3  Events: Responding to the User", "4.4  Project: The To-Do List (Every Developer's Rite of Passage)", "4.5  localStorage: Remembering Data After the Tab Closes", "4.6  Checkpoint Project: The Quiz App"] },
        { title: "Part 5 \u2014 Modern & Asynchronous JavaScript: Talking to the Internet",
          items: ["5.1  Modern JavaScript (ES6+) Power Features", "5.2  Asynchronous JavaScript: The Restaurant Analogy", "5.3  Promises and async/await", "5.4  fetch(): Getting Real Data From Real Servers", "5.5  Project: GitHub Profile Finder", "5.6  Checkpoint Project: Live Weather App"] },
        { title: "Part 6 \u2014 Professional Tooling: Git, npm, Vite & Tailwind",
          items: ["6.1  Git & GitHub: The Developer's Time Machine", "6.2  npm: The World's Largest Code Library", "6.3  Vite: The Modern Build Tool", "6.4  Tailwind CSS: Styling at Professional Speed", "6.5  Checkpoint Project: Rebuild Your Portfolio With Modern Tooling"] },
        { title: "Part 7 \u2014 React: Building Real Applications",
          items: ["7.1  Why React, and How It Thinks", "7.2  Components and JSX", "7.3  Props: Passing Data Into Components", "7.4  State: Data That Changes (the useState Hook)", "7.5  Rendering Lists and Handling Forms", "7.6  useEffect: Fetching Data and Side Effects", "7.7  Multi-Page Apps With React Router", "7.8  CAPSTONE: The Remote Job Finder"] },
        { title: "Part 8 \u2014 Integrating With Back Ends & Other Languages",
          items: ["8.1  How a Front End Talks to Everything Else", "8.2  JavaScript + Node/Express: Your Own API in 25 Lines", "8.3  JavaScript + Python: The Power Couple", "8.4  JavaScript + PHP & WordPress: The Classic Web", "8.5  Integrating Payments: Paystack in the Front End", "8.6  WebAssembly: When JavaScript Needs a Turbocharger", "8.7  Checkpoint Project: The Connected Dashboard"] },
        { title: "Part 9 \u2014 Professional Practice: Debugging, Deployment & Getting Hired",
          items: ["9.1  Debugging Like a Professional", "9.2  Performance & Accessibility: The Professional's Edge", "9.3  Deploying: Putting Your Work on the Real Internet", "9.4  Your Portfolio and the Job Hunt", "9.5  Your Daily Professional Habits, From Today"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1  HTML Skeleton (memorise this)", "A.2  CSS Essentials on One Page", "A.3  JavaScript Essentials on One Page", "A.4  Terminal & Git on One Page", "A.5  Recommended Free Resources"] },
        { title: "Appendix B \u2014 The 16-Week Daily Study Plan",
          items: ["Full lesson set inside the training guide"] }
      ]
    },
    "javascript-developer": {
      title: "JavaScript Developer",
      subtitle: "The complete JavaScript developer training — fundamentals to full-stack capstone, in 16 weeks.",
      training: "training/javascript/index.html",
      roadmap: [
        ["Weeks 1–2","Part 1 · HTML","Structure of every web page; semantic markup; forms, tables, media","Profile page + registration form"],
        ["Weeks 2–3","Part 2 · CSS","Box model, Flexbox, Grid, responsive design","Styled, mobile-friendly profile site"],
        ["Weeks 3–6","Part 3 · JavaScript Core","Variables, logic, loops, functions, arrays, objects","Number-guessing game; expense tracker"],
        ["Weeks 6–8","Part 4 · The DOM","Interactivity, events, forms, localStorage","To-Do app, calculator, quiz app"],
        ["Weeks 8–10","Part 5 · Modern & Async JS","ES6+, promises, async/await, fetch, public APIs","Weather app; GitHub profile finder"],
        ["Weeks 10–12","Part 6 · Node.js & Express","Servers, npm, REST APIs, JSON","Remote Job Board API"],
        ["Weeks 12–14","Part 7 · Databases + Capstone","SQL, CRUD, front end meets back end","Full-stack Remote Job Board"],
        ["Weeks 14–15","Part 8 · Cross-Language Integration","JS + Python, JS + PHP, JS + SQL, WebAssembly","JS front end on a Python API"],
        ["Weeks 15–16","Part 9 · Professional Practice","Git/GitHub, debugging, deployment, job hunt","Live portfolio + deployed capstone"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1  Who This Guide Is For", "0.2  The Golden Rules of Learning to Code", "0.3  The 16-Week Fast-Track Roadmap", "0.4  Setting Up Your Developer Workstation", "0.5  How Each Lesson Is Structured"] },
        { title: "Part 1 \u2014 HTML: The Skeleton of Every Web Page",
          items: ["1.1  What Is HTML?", "1.2  Your First Web Page (Practical)", "1.3  The Essential Tags (Your Daily Vocabulary)", "1.4  Attributes: Giving Tags Extra Information", "1.5  Semantic HTML: Writing Pages That Mean Something", "1.6  Forms: Collecting Information From Users", "1.7  Tables and Media", "1.8  Checkpoint Project: Your Personal Profile Page"] },
        { title: "Part 2 \u2014 CSS: Making It Beautiful",
          items: ["2.1  What Is CSS?", "2.2  Selectors: Targeting What You Style", "2.3  The Box Model: The Most Important Idea in CSS", "2.4  Flexbox: Arranging Things in a Row or Column", "2.5  CSS Grid: Two-Dimensional Layouts", "2.6  Checkpoint Project: Style Your Profile Page"] },
        { title: "Part 3 \u2014 JavaScript Fundamentals: Learning to Think Like a Programmer",
          items: ["3.1  What Is JavaScript, and Where Does It Run?", "3.2  Variables: The Computer\u2019s Memory", "3.3  Operators: Doing Things With Values", "3.4  Conditionals: Teaching the Computer to Decide", "3.5  Loops: Doing Things Repeatedly", "3.6  Functions: Reusable Machines", "3.7  Arrays: Ordered Lists of Anything", "3.8  Objects: Describing Real-World Things", "3.9  Checkpoint Project 1: The Number-Guessing Game", "3.10  Checkpoint Project 2: Console Expense Tracker"] },
        { title: "Part 4 \u2014 The DOM: Making Web Pages Come Alive",
          items: ["4.1  What Is the DOM?", "4.2  Selecting and Changing Elements", "4.3  Events: Responding to the User", "4.4  Project: The To-Do List (Every Developer\u2019s Rite of Passage)", "4.5  localStorage: Remembering Data After the Tab Closes", "4.6  Project: A Working Calculator", "4.7  Checkpoint Project: The Quiz App"] },
        { title: "Part 5 \u2014 Modern & Asynchronous JavaScript: Talking to the Internet",
          items: ["5.1  Modern JavaScript (ES6+) Power Features", "5.2  Modules: Splitting Code Across Files", "5.3  Asynchronous JavaScript: The Restaurant Analogy", "5.4  fetch(): Getting Real Data From Real Servers", "5.5  Project: GitHub Profile Finder", "5.6  Checkpoint Project: Live Weather App"] },
        { title: "Part 6 \u2014 Node.js & Express: Building the Back End",
          items: ["6.1  Front End vs Back End: The Full Picture", "6.2  npm: The World\u2019s Largest Code Library", "6.3  Your First Web Server (Practical)", "6.4  REST APIs: The Grammar of the Web", "6.5  Project: The Remote Job Board API", "6.6  Serving Your Front End From Your Back End"] },
        { title: "Part 7 \u2014 Databases & the Full-Stack Capstone",
          items: ["7.1  Why Databases?", "7.2  SQL in One Sitting (Practical)", "7.3  THE CAPSTONE: Remote Job Board \u2014 A Complete Full-Stack Application"] },
        { title: "Part 8 \u2014 Integrating JavaScript With Other Languages",
          items: ["8.1  How Languages Actually Talk to Each Other", "8.2  JavaScript + Python: The Power Couple", "8.3  JavaScript + PHP: Working With the Classic Web", "8.4  JavaScript + SQL: A Deeper Look", "8.5  JavaScript + Compiled Languages: WebAssembly", "8.6  Checkpoint Project: The Polyglot Dashboard"] },
        { title: "Part 9 \u2014 Professional Practice: Git, Debugging, Deployment & Getting Hired",
          items: ["9.1  Git & GitHub: The Developer\u2019s Time Machine", "9.2  Debugging Like a Professional", "9.3  Deploying: Putting Your Work on the Real Internet", "9.4  Your Portfolio and the Job Hunt", "9.5  Your Daily Professional Habits, From Today"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1  HTML Skeleton (memorise this)", "A.2  JavaScript Essentials on One Page", "A.3  Terminal & Git on One Page", "A.4  Recommended Free Resources"] },
        { title: "Appendix B \u2014 The 16-Week Daily Study Plan",
          items: ["Full lesson set inside the training guide"] }
      ]
    },
    "software-development": {
      title: "Software Development — Core (JS + HTML)",
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
  function makeCode() {
    var A = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789", c = "MS-";
    for (var i = 0; i < 8; i++) { if (i === 4) c += "-"; c += A[Math.floor(Math.random() * A.length)]; }
    return c;
  }
  function register(data) {
    var s = {
      name: data.name, email: data.email.toLowerCase().trim(), pass: data.pass,
      course: data.course, tier: data.tier,
      accessCode: makeCode(), codeVerified: false,
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
  function verifyCode(input) {
    var s = getStudent(); if (!s) return false;
    if (input.trim().toUpperCase() === s.accessCode) {
      s.codeVerified = true; saveStudent(s); return true;
    }
    return false;
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

  /* ---------- WhatsApp admissions chat (four quick questions) ---------- */
  var WA_LINK = "https://wa.me/message/OF4HWNSJM6ZTK1";
  var WA_QUESTIONS = [
    "I want to register for a course — what are the payment details?",
    "Can you help me choose the right career track for me?",
    "I have paid — please send my unique access code.",
    "Do you offer payment plans or installments?"
  ];
  function initChat() {
    var chip = document.querySelector(".chip-float");
    if (!chip) return;
    chip.setAttribute("href", WA_LINK);
    chip.setAttribute("target", "_blank");
    chip.setAttribute("rel", "noopener");
    var pop = document.createElement("div");
    pop.setAttribute("style",
      "position:fixed;bottom:5.6rem;right:1.4rem;z-index:61;width:min(320px,calc(100vw - 2.8rem));" +
      "background:var(--card);border:1px solid var(--line);border-radius:12px;" +
      "box-shadow:0 14px 40px rgba(0,0,0,.16);padding:1rem;display:none;font-family:'DM Sans',sans-serif;");
    pop.innerHTML =
      '<div style="font-size:.68rem;font-weight:500;letter-spacing:2px;text-transform:uppercase;' +
      'color:var(--ink-faint);margin-bottom:.6rem">Chat with admissions</div>' +
      WA_QUESTIONS.map(function (q) {
        return '<a href="' + WA_LINK + '" target="_blank" rel="noopener" data-q="' + q.replace(/"/g, "&quot;") + '" style="display:block;' +
          'padding:.65rem .8rem;margin-bottom:.45rem;border:1px solid var(--line-soft);border-radius:8px;' +
          'font-size:.86rem;font-weight:300;color:var(--ink);text-decoration:none;line-height:1.4">' + q + "</a>";
      }).join("") +
      '<div style="font-size:.7rem;color:var(--ink-faint)">Your question is copied — paste it when WhatsApp opens.</div>';
    document.body.appendChild(pop);
    pop.addEventListener("click", function (e) {
      var a = e.target.closest("a[data-q]");
      if (a && navigator.clipboard) { try { navigator.clipboard.writeText(a.getAttribute("data-q")); } catch (er) {} }
    });
    chip.addEventListener("click", function (e) {
      e.preventDefault();
      pop.style.display = pop.style.display === "none" ? "block" : "none";
    });
    document.addEventListener("click", function (e) {
      if (!pop.contains(e.target) && !chip.contains(e.target)) pop.style.display = "none";
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
    register: register, login: login, logout: logout, session: session, verifyCode: verifyCode,
    getStudent: getStudent, isUnlocked: isUnlocked,
    setProgress: setProgress, getProgress: getProgress, initTheme: initTheme, initChat: initChat
  };
})();
