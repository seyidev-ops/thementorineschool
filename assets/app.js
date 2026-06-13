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
        { slug: "fullstack-developer", name: "Full-stack Developer", courses: "12 guided parts", duration: "12–16 weeks", featured: true, training: "training/fullstack/index.html",
          blurb: "Front end, back end and database in one journey — React, Express, SQL, auth across the stack, and the deployed MentorMarket capstone, with full training pages inside." },
        { slug: "mobile-developer",    name: "Mobile App Developer (iOS/Android)", courses: "12 guided parts", duration: "10–14 weeks", featured: true, training: "training/mobile/index.html",
          blurb: "React Native + Expo on your own phone from week one — screens, navigation, device powers, auth and the CampusMart capstone, built and shipped to real devices." },
        { slug: "data-analyst",        name: "Data Analyst", courses: "12 guided parts", duration: "8–12 weeks", featured: true, training: "training/dataanalyst/index.html",
          blurb: "Spreadsheets, SQL, Python and live dashboards with a free toolkit — ending in the NaijaSales capstone: an insight memo and dashboard, with full training pages inside." },
        { slug: "data-scientist",      name: "Data Scientist", courses: "12 guided parts", duration: "14–18 weeks", featured: true, training: "training/datascientist/index.html",
          blurb: "Python, honest statistics, machine learning and a served prediction API — ending in the ChurnGuard capstone with an executive report, with full training pages inside." },
        { slug: "ml-engineer",         name: "Machine Learning Engineer", courses: "12 guided parts", duration: "14–18 weeks", featured: true, training: "training/mlengineer/index.html",
          blurb: "Python, model evaluation, leak-free pipelines, FastAPI serving and MLOps — ending in the FraudWatch fraud-detection system with a live API, with full training pages inside." },
        { slug: "cybersecurity-analyst", name: "Cybersecurity Analyst", courses: "12 guided parts", duration: "10–14 weeks", featured: true, training: "training/cybersecurity/index.html",
          blurb: "Networks, threats, layered defences, log detection and incident response — ending in the SOC-in-a-Box detection lab, all on systems you own, with full training pages inside." },
        { slug: "cloud-architect",     name: "Cloud Architect (AWS/Azure)", courses: "12 guided parts", duration: "8–12 weeks", featured: true, training: "training/cloud/index.html",
          blurb: "Compute, VPC networking, IAM, reliability, cost engineering and Terraform — ending in the SokoCloud architecture pack, AWS-first with Azure equivalents, with full training pages inside." },
        { slug: "devops-engineer",     name: "DevOps Engineer", courses: "12 guided parts", duration: "10–14 weeks", featured: true, training: "training/devops/index.html",
          blurb: "Linux, Git, Docker, CI/CD, orchestration, Terraform and monitoring — ending in the ShipIt pipeline from a Git push to a running, monitored deployment, with full training pages inside." },
        { slug: "sdet",                name: "SDET (Software Dev Engineer in Test)", courses: "12 guided parts", duration: "8–10 weeks", featured: true, training: "training/sdet/index.html",
          blurb: "Test design, pytest, API and Playwright browser automation, CI gates and performance testing — ending in the TestGuard multi-layer suite, with full training pages inside." },
        { slug: "database-admin",      name: "Database Administrator", courses: "12 guided parts", duration: "6–10 weeks", featured: true, training: "training/dba/index.html",
          blurb: "SQL, schema design, transactions, indexing, security and the sacred backup-and-recovery drill — ending in the DataVault production database, PostgreSQL throughout, with full training pages inside." }
      ]
    },
    {
      id: "design", label: "Design & Creative",
      tracks: [
        { slug: "graphic-designer", name: "Graphic Designer", courses: "12 guided parts", duration: "10–12 weeks", featured: true, training: "training/graphic/index.html",
          blurb: "Design principles, colour, typography, layout, logos, brand identity and marketing design — ending in the Zuri Foods complete brand kit, with full training pages inside." },
        { slug: "product-designer", name: "Product Designer (UI/UX)", courses: "12 guided parts", duration: "10–14 weeks", featured: true, training: "training/productdesign/index.html",
          blurb: "UX research, wireframes, visual design, Figma, design systems, prototyping and usability testing — ending in the NaijaPay app case study, with full training pages inside." },
        { slug: "motion-designer",  name: "Motion Graphics Designer", courses: "12 guided parts", duration: "8–12 weeks", featured: true, training: "training/motion/index.html",
          blurb: "Animation principles, keyframing, animated logos, kinetic type, explainers, sound and social motion — ending in the Pulse motion package and showreel, with full training pages inside." },
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
    "product-designer": {
      title: "Product Designer (UI/UX)",
      subtitle: "The complete UI/UX training \u2014 research, visual design, Figma, design systems, prototyping and testing. Recommended duration: 10\u201314 weeks.",
      training: "training/productdesign/index.html",
      roadmap: [
        ["Weeks 1\u20132", "Part 1 \u00b7 Design Thinking", "The process, empathy, problem framing", "A real problem, framed"],
        ["Weeks 2\u20133", "Part 2 \u00b7 UX Research", "Interviews, personas, journey maps", "Research synthesised into insight"],
        ["Weeks 3\u20134", "Part 3 \u00b7 IA & Interaction", "Flows, sitemaps, wireframes", "A wireframed user flow"],
        ["Weeks 4\u20136", "Part 4 \u00b7 Visual Design", "Colour, type, spacing, hierarchy, Gestalt", "A screen with real hierarchy"],
        ["Weeks 6\u20138", "Part 5 \u00b7 Figma Mastery", "Auto-layout, components, variants", "A reusable component library"],
        ["Weeks 8\u20139", "Part 6 \u00b7 Design Systems", "Tokens, components, consistency", "A mini design system"],
        ["Weeks 9\u201310", "Part 7 \u00b7 Prototyping", "Clickable prototypes, micro-interactions", "A prototype people can use"],
        ["Weeks 10\u201311", "Part 8 \u00b7 Usability Testing", "Testing with real people, iteration", "A design improved by findings"],
        ["Weeks 11\u201312", "Part 9 \u00b7 Capstone & Career", "NaijaPay end to end, the case study", "Portfolio-ready case study"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Product Designer Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (10\u201314 Weeks)", "0.4 Set Up Your Free Toolkit (Practical)"] },
        { title: "Part 1 \u2014 Design Thinking & UX Foundations",
          items: ["1.1 The Double Diamond: Design as a Process", "1.2 Empathy and the Problem Statement (Practical)"] },
        { title: "Part 2 \u2014 UX Research: Listening Before Designing",
          items: ["2.1 Talking to Users (Practical)", "2.2 Synthesis: From Notes to Insight (Practical)", "2.3 Personas and Journey Maps"] },
        { title: "Part 3 \u2014 Information Architecture & Interaction Design",
          items: ["3.1 User Flows and Information Architecture", "3.2 Wireframes: Structure Before Style (Practical)"] },
        { title: "Part 4 \u2014 Visual Design Foundations",
          items: ["4.1 Hierarchy: Guiding the Eye", "4.2 Colour and Typography (Practical)", "4.3 Gestalt: Why Layouts Feel Right"] },
        { title: "Part 5 \u2014 Figma Mastery: The Tool of the Trade",
          items: ["5.1 Auto-Layout: Designs That Respond (Practical)", "5.2 Components and Variants: Design Once, Reuse Everywhere (Practical)"] },
        { title: "Part 6 \u2014 Design Systems: Consistency at Scale",
          items: ["6.1 What a Design System Is and Why", "6.2 Tokens and Styles (Practical)", "6.3 Documenting Patterns"] },
        { title: "Part 7 \u2014 Prototyping & Interaction",
          items: ["7.1 Connecting Screens (Practical)", "7.2 Transitions and Micro-interactions"] },
        { title: "Part 8 \u2014 Usability Testing & Iteration",
          items: ["8.1 Testing With Real People (Practical)", "8.2 Synthesis and Iteration"] },
        { title: "Part 9 \u2014 Capstone, Portfolio & Career",
          items: ["9.1 THE CAPSTONE: The NaijaPay Case Study", "9.2 Handoff and the Job Hunt"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 The UX Process on One Page", "A.2 Visual Principles on One Page", "A.3 Figma Shortcuts & Handoff"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "graphic-designer": {
      title: "Graphic Designer",
      subtitle: "The complete graphic design training \u2014 principles, colour, typography, logos, brand identity and marketing. Recommended duration: 10\u201312 weeks.",
      training: "training/graphic/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 Principles & the Eye", "Elements & principles, critique", "A critique vocabulary"],
        ["Weeks 1\u20132", "Part 2 \u00b7 Colour Theory", "Harmony, psychology, palettes", "A palette with rationale"],
        ["Weeks 2\u20133", "Part 3 \u00b7 Typography", "Anatomy, pairing, hierarchy", "A type system that sings"],
        ["Weeks 3\u20135", "Part 4 \u00b7 Layout & Composition", "Grids, balance, focal points", "A composed, balanced poster"],
        ["Weeks 5\u20136", "Part 5 \u00b7 The Toolkit", "Vector vs raster, Figma/Canva/GIMP", "Tool fluency, first artwork"],
        ["Weeks 6\u20137", "Part 6 \u00b7 Logo & Brand Identity", "Logo types, marks, brand systems", "A logo + mini identity"],
        ["Weeks 7\u20138", "Part 7 \u00b7 Marketing & Social", "Posts, flyers, templates that scale", "A social template kit"],
        ["Weeks 8\u20139", "Part 8 \u00b7 Production & Guidelines", "Print vs screen, the brand book", "A brand guidelines document"],
        ["Weeks 9\u201311", "Part 9 \u00b7 Capstone & Career", "Zuri Foods brand kit, portfolio", "Portfolio-ready brand kit"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Graphic Designer Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (10\u201312 Weeks)", "0.4 Set Up Your Free Toolkit (Practical)"] },
        { title: "Part 1 \u2014 Principles & the Designer's Eye",
          items: ["1.1 The Elements: The Raw Materials", "1.2 The Principles: How to Arrange Them", "1.3 The Critique Habit (Practical)"] },
        { title: "Part 2 \u2014 Colour Theory: The Loudest Element",
          items: ["2.1 The Colour Wheel and Harmonies", "2.2 Colour Psychology and Context", "2.3 Building a Palette (Practical)"] },
        { title: "Part 3 \u2014 Typography: Designing With Words",
          items: ["3.1 Anatomy and Classification", "3.2 Pairing and Hierarchy (Practical)"] },
        { title: "Part 4 \u2014 Layout & Composition",
          items: ["4.1 Grids: Invisible Order", "4.2 Focal Point, Balance and Flow", "4.3 Compose a Poster (Practical)"] },
        { title: "Part 5 \u2014 The Toolkit: Vector, Raster & Production",
          items: ["5.1 Vector vs Raster: The Most Important Distinction", "5.2 Tool Fluency (Practical)", "5.3 File Formats: Delivering Work That Works"] },
        { title: "Part 6 \u2014 Logo & Brand Identity",
          items: ["6.1 What Makes a Logo Work", "6.2 The Logo Process (Practical)", "6.3 From Logo to Identity"] },
        { title: "Part 7 \u2014 Marketing & Social Media Design",
          items: ["7.1 Designing for Platforms", "7.2 Templates That Scale (Practical)"] },
        { title: "Part 8 \u2014 Production & Brand Guidelines",
          items: ["8.1 Print vs Screen: Getting It Right", "8.2 Packaging Concept (Practical)", "8.3 The Brand Guidelines Document"] },
        { title: "Part 9 \u2014 Capstone, Portfolio & Career",
          items: ["9.1 THE CAPSTONE: The Zuri Foods Brand Kit", "9.2 The Job Hunt and Freelance Path"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 Principles & Composition on One Page", "A.2 Colour & Type on One Page", "A.3 Files & Production on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "motion-designer": {
      title: "Motion Graphics Designer",
      subtitle: "The complete motion design training \u2014 animation principles, animated logos, kinetic type, explainers and sound. Recommended duration: 8\u201312 weeks.",
      training: "training/motion/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 Design for Motion", "Composition, colour, type \u2014 the frame", "A strong static frame"],
        ["Weeks 1\u20132", "Part 2 \u00b7 Animation Principles", "Timing, spacing, easing, the classics", "Bouncing-ball test passed"],
        ["Weeks 2\u20133", "Part 3 \u00b7 The Toolkit", "Keyframes, the timeline, free software", "First keyframed animation"],
        ["Weeks 3\u20134", "Part 4 \u00b7 Shapes & Logos", "Build-ons, reveals, the animated logo", "An animated logo"],
        ["Weeks 4\u20135", "Part 5 \u00b7 Kinetic Typography", "Type in motion, rhythm, readability", "An animated quote"],
        ["Weeks 5\u20136", "Part 6 \u00b7 Storytelling", "Storyboards, pacing, the explainer", "A storyboarded explainer plan"],
        ["Weeks 6\u20137", "Part 7 \u00b7 Sound & Editing", "Music, SFX, syncing to the beat", "An animation cut to sound"],
        ["Weeks 7\u20138", "Part 8 \u00b7 Social & Production", "Formats, loops, export, optimisation", "A social motion set"],
        ["Weeks 8\u201310", "Part 9 \u00b7 Capstone & Career", "The Pulse package, the showreel", "A showreel ready to share"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Motion Graphics Designer Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (8\u201312 Weeks)", "0.4 Set Up Your Free Toolkit (Practical)"] },
        { title: "Part 1 \u2014 Design Foundations for Motion",
          items: ["1.1 Motion Cannot Save a Weak Frame", "1.2 The Still Frame (Practical)"] },
        { title: "Part 2 \u2014 The Principles of Animation",
          items: ["2.1 Timing and Spacing: The Soul of Motion", "2.2 Easing: The Single Most Important Technique", "2.3 The Classic Principles (Practical)"] },
        { title: "Part 3 \u2014 Your Motion Toolkit: Keyframes & the Timeline",
          items: ["3.1 Keyframes: How All Animation Works", "3.2 The Animatable Properties (Practical)", "3.3 Reading the Timeline"] },
        { title: "Part 4 \u2014 Animating Shapes & Logos",
          items: ["4.1 Shape Animation and Reveals", "4.2 The Animated Logo (Practical)"] },
        { title: "Part 5 \u2014 Kinetic Typography: Type in Motion",
          items: ["5.1 Why Type Moves", "5.2 Animating Words (Practical)"] },
        { title: "Part 6 \u2014 Storytelling & the Explainer Video",
          items: ["6.1 Motion Tells a Story Over Time", "6.2 The Storyboard (Practical)"] },
        { title: "Part 7 \u2014 Sound & Editing: Motion That's Heard",
          items: ["7.1 Sound Is Half the Experience", "7.2 Syncing Motion to Sound (Practical)", "7.3 Editing Fundamentals"] },
        { title: "Part 8 \u2014 Social Motion & Production",
          items: ["8.1 Designing for Platforms and the Scroll", "8.2 The Seamless Loop (Practical)", "8.3 Exporting and Optimising"] },
        { title: "Part 9 \u2014 Capstone, Reel & Career",
          items: ["9.1 THE CAPSTONE: The Pulse Motion Package", "9.2 The Showreel and the Job Hunt"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 Animation Principles on One Page", "A.2 Workflow on One Page", "A.3 Social & Export on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "ml-engineer": {
      title: "Machine Learning Engineer",
      subtitle: "The complete ML engineering training \u2014 Python, models, pipelines, serving and MLOps. Recommended duration: 14\u201318 weeks.",
      training: "training/mlengineer/index.html",
      roadmap: [
        ["Weeks 1\u20133", "Part 1 \u00b7 Python Foundations", "Logic, functions, lists, dicts", "Transaction-rules engine CLI"],
        ["Weeks 3\u20135", "Part 2 \u00b7 NumPy & pandas", "Arrays, DataFrames, groupby", "Fraud dataset sliced and described"],
        ["Weeks 5\u20137", "Part 3 \u00b7 ML Core", "Splits, baselines, recall vs precision", "First model beats the baseline"],
        ["Weeks 7\u20139", "Part 4 \u00b7 Winning Models", "Forests, boosting, overfitting, CV", "Tuned model with \u00b1 bounds"],
        ["Weeks 9\u201310", "Part 5 \u00b7 Features & Pipelines", "sklearn Pipeline, leakage audits", "Raw row in, prediction out"],
        ["Weeks 10\u201312", "Part 6 \u00b7 Serving", "joblib, FastAPI, batch scoring", "Live /predict answering curl"],
        ["Weeks 12\u201313", "Part 7 \u00b7 MLOps", "Experiment logs, monitoring, drift", "A model that reports its health"],
        ["Weeks 13\u201314", "Part 8 \u00b7 Deep Learning & LLMs", "When neural nets fit; LLM APIs", "An embedding-powered feature"],
        ["Weeks 14\u201316", "Part 9 \u00b7 Capstone & Career", "FraudWatch end-to-end", "Repo + API + monitoring + report"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What an ML Engineer Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (14\u201318 Weeks)", "0.4 Set Up Your Workstation (Practical)"] },
        { title: "Part 1 \u2014 Python Foundations: Thinking in Code",
          items: ["1.1 Variables, Decisions, Loops", "1.2 Functions and the Shapes of Records", "1.3 Checkpoint Project: The Rules Engine"] },
        { title: "Part 2 \u2014 NumPy & pandas: The Workbench",
          items: ["2.1 Generate the Course Dataset (Practical)", "2.2 Slice, Group, Describe (Practical)", "2.3 Checkpoint Project: The Dataset Brief"] },
        { title: "Part 3 \u2014 ML Core: Honest Models From Day One",
          items: ["3.1 The Split, the Baseline, the First Model (Practical)", "3.2 Thresholds: Where Engineering Meets Money (Practical)", "3.3 Checkpoint Project: The Threshold Memo"] },
        { title: "Part 4 \u2014 Models That Win on Tabular Data",
          items: ["4.1 Forests and Gradient Boosting (Practical)", "4.2 Overfitting, Caught Red-Handed (Practical)", "4.3 Checkpoint Project: The Contender Report"] },
        { title: "Part 5 \u2014 Features & Pipelines: One Object, No Leaks",
          items: ["5.1 Features: Where Skill Lives (Practical)", "5.2 The Pipeline: Training and Serving, Identical (Practical)", "5.3 Checkpoint Project: The Leak-Audited Pipeline"] },
        { title: "Part 6 \u2014 Serving: The Model Gets a Phone Number",
          items: ["6.1 The Real-Time API (Practical)", "6.2 Batch Scoring: The Morning File (Practical)", "6.3 Checkpoint Project: FraudWatch Serving"] },
        { title: "Part 7 \u2014 MLOps: Models That Report Their Own Health",
          items: ["7.1 Experiment Tracking, Minimum Honest Version (Practical)", "7.2 Drift: The World Moves, Models Don't (Practical)", "7.3 Checkpoint Project: The Operations Page"] },
        { title: "Part 8 \u2014 Deep Learning & LLMs: The Honest Map",
          items: ["8.1 When Neural Networks Earn Their Cost", "8.2 LLMs as Components: Text Becomes Features (Practical)", "8.3 Checkpoint Project: The Buy/Build/Skip Memo"] },
        { title: "Part 9 \u2014 The Capstone & Your Career: FraudWatch, Shipped",
          items: ["9.1 THE CAPSTONE: FraudWatch, Assembled", "9.2 The Job Hunt: An Engineer With Receipts"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 scikit-learn on One Page", "A.2 Metrics & Money on One Page", "A.3 The Production Checklist"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "cybersecurity-analyst": {
      title: "Cybersecurity Analyst",
      subtitle: "The complete blue-team training \u2014 networks, threats, defences, detection and incident response. Recommended duration: 10\u201314 weeks.",
      training: "training/cybersecurity/index.html",
      roadmap: [
        ["Weeks 1\u20132", "Part 1 \u00b7 How Networks Work", "IP, ports, DNS, TLS, packets", "A connection narrated end to end"],
        ["Weeks 2\u20133", "Part 2 \u00b7 The Analyst's Terminal", "Shell fluency, pipes, permissions", "Five-minute shell drill passed"],
        ["Weeks 3\u20134", "Part 3 \u00b7 Know Your Enemy", "Malware, phishing, social engineering", "A phishing email dissected"],
        ["Weeks 4\u20136", "Part 4 \u00b7 Defences That Work", "CIA triad, auth, hardening", "Your machine hardened, with proof"],
        ["Weeks 6\u20137", "Part 5 \u00b7 Web Attacks & OWASP", "SQLi and XSS on your own toy app", "Both performed, then patched"],
        ["Weeks 7\u20139", "Part 6 \u00b7 Logs & Detection", "Log anatomy, a Python detector", "Detector catches the attack"],
        ["Weeks 9\u201310", "Part 7 \u00b7 Incident Response", "NIST cycle, playbooks, evidence", "A playbook + tabletop run"],
        ["Weeks 10\u201311", "Part 8 \u00b7 The Analyst's Toolbox", "Wireshark, MITRE ATT&CK, hashes", "An attack mapped to ATT&CK"],
        ["Weeks 11\u201312", "Part 9 \u00b7 Capstone & Career", "SOC-in-a-Box end to end", "Detection lab + incident report"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Cybersecurity Analyst Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (10\u201314 Weeks)", "0.4 Set Up Your Lab (Practical)"] },
        { title: "Part 1 \u2014 How Networks Actually Work",
          items: ["1.1 Addresses, Ports, and the Postal System", "1.2 DNS and TLS: The Phone Book and the Sealed Envelope", "1.3 Ports In Practice (Practical)"] },
        { title: "Part 2 \u2014 The Analyst's Terminal: Living in the Shell",
          items: ["2.1 The Commands of the Trade (Practical)", "2.2 Permissions: The First Access Control", "2.3 Checkpoint Project: The Shell Drill"] },
        { title: "Part 3 \u2014 Know Your Enemy: The Threat Landscape",
          items: ["3.1 The Malware Family Album", "3.2 Phishing: Anatomy of the Hook (Practical)", "3.3 Checkpoint Project: The Threat Briefing"] },
        { title: "Part 4 \u2014 Defences That Work: CIA, Auth & Hardening",
          items: ["4.1 The Triad and the Layers", "4.2 Authentication: Passwords, Hashes, MFA (Practical)", "4.3 Least Privilege and the Hardening Checklist (Practical)"] },
        { title: "Part 5 \u2014 Web Attacks: OWASP on Your Own Toy App",
          items: ["5.1 Build the Victim (Practical)", "5.2 Attack One: SQL Injection (Practical)", "5.3 Attack Two: Cross-Site Scripting (Practical)"] },
        { title: "Part 6 \u2014 Logs & Detection: Reading the Black Box",
          items: ["6.1 Generate Realistic Logs (Practical)", "6.2 Triage With the Shell, Then Detect With Python (Practical)"] },
        { title: "Part 7 \u2014 Incident Response: When the Alarm Is Real",
          items: ["7.1 The NIST Cycle", "7.2 Write the Playbook, Then Run the Tabletop (Practical)"] },
        { title: "Part 8 \u2014 The Analyst's Toolbox: Wireshark, ATT&CK & Scanning",
          items: ["8.1 Wireshark: Seeing the Packets (Practical)", "8.2 MITRE ATT&CK: The Common Language (Practical)", "8.3 Vulnerability Scanning and File Hashes (Practical)"] },
        { title: "Part 9 \u2014 Capstone & Career: SOC-in-a-Box",
          items: ["9.1 THE CAPSTONE: SOC-in-a-Box", "9.2 The Job Hunt: Certifications and the Analyst Path"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 The Investigation Shell on One Page", "A.2 Ports, Protocols & Red Flags", "A.3 Phishing Checklist & IR Cycle"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "cloud-architect": {
      title: "Cloud Architect (AWS/Azure)",
      subtitle: "The complete cloud architecture training \u2014 networking, security, reliability, cost and IaC. Recommended duration: 8\u201312 weeks.",
      training: "training/cloud/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 Fundamentals", "Service models, regions, responsibility", "Account secured, budget alarm live"],
        ["Weeks 1\u20132", "Part 2 \u00b7 Compute", "VMs, containers, serverless", "A function answering the internet"],
        ["Weeks 2\u20134", "Part 3 \u00b7 Networking", "VPCs, subnets, security groups, LBs", "A private network you designed"],
        ["Weeks 4\u20135", "Part 4 \u00b7 Storage & Databases", "Object/block storage, SQL vs NoSQL", "Static site on object storage, live"],
        ["Weeks 5\u20136", "Part 5 \u00b7 Identity & Security", "IAM, least privilege, encryption", "A least-privilege policy you wrote"],
        ["Weeks 6\u20137", "Part 6 \u00b7 Reliability & Scale", "AZs, auto-scaling, Well-Architected", "An HA design surviving a zone loss"],
        ["Weeks 7\u20138", "Part 7 \u00b7 Cost Engineering", "Pricing models, estimation, levers", "A capstone cost model in naira"],
        ["Weeks 8\u20139", "Part 8 \u00b7 Infrastructure as Code", "Terraform basics, plan/apply/destroy", "Infra defined in a file, deployed"],
        ["Weeks 9\u201310", "Part 9 \u00b7 Capstone & Career", "SokoCloud designed and partly built", "Architecture pack + cert plan"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Cloud Architect Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (8\u201312 Weeks)", "0.4 Set Up a SAFE Account (Practical)"] },
        { title: "Part 1 \u2014 Cloud Fundamentals: The Mental Model",
          items: ["1.1 Service Models: Pizza as a Service", "1.2 Regions, Zones, and the Shared-Responsibility Line", "1.3 Console and CLI (Practical)"] },
        { title: "Part 2 \u2014 Compute: VMs, Containers & Serverless",
          items: ["2.1 The Three Ways to Run Code", "2.2 Serverless in Five Minutes (Practical)", "2.3 Checkpoint Project: The Compute Decision"] },
        { title: "Part 3 \u2014 Networking: Building Private Cities",
          items: ["3.1 The VPC: Your Own Private City", "3.2 Security Groups: Per-Resource Firewalls", "3.3 NAT and Load Balancers"] },
        { title: "Part 4 \u2014 Storage & Databases in the Cloud",
          items: ["4.1 The Storage Types", "4.2 Host a Site on Object Storage (Practical)", "4.3 Managed Databases: SQL vs NoSQL, Cloud Edition"] },
        { title: "Part 5 \u2014 Identity & Security: Who Can Do What",
          items: ["5.1 IAM: The Cloud's Master Lock", "5.2 Read and Write a Policy (Practical)", "5.3 Encryption and Secrets"] },
        { title: "Part 6 \u2014 Reliability & Scale: Designs That Don't Fall Over",
          items: ["6.1 High Availability: Survive the Failure", "6.2 Auto-Scaling and Statelessness", "6.3 The Well-Architected Lens"] },
        { title: "Part 7 \u2014 Cost Engineering: Architecting for the Bill",
          items: ["7.1 Why Cost Is an Architecture Decision", "7.2 Estimate Before You Build (Practical)", "7.3 Checkpoint Project: The Cost Model"] },
        { title: "Part 8 \u2014 Infrastructure as Code: Architecture You Can Replay",
          items: ["8.1 Why Code Beats Clicking", "8.2 Terraform in One Sitting (Practical)"] },
        { title: "Part 9 \u2014 Capstone & Career: SokoCloud",
          items: ["9.1 THE CAPSTONE: SokoCloud Architecture Pack", "9.2 The Job Hunt: Certifications and the Architect Path"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 AWS \u2194 Azure Service Map", "A.2 The Architect's Design Checklist", "A.3 Safety & CLI on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "devops-engineer": {
      title: "DevOps Engineer",
      subtitle: "The complete DevOps training \u2014 Linux, Git, Docker, CI/CD, orchestration, IaC and monitoring. Recommended duration: 10\u201314 weeks.",
      training: "training/devops/index.html",
      roadmap: [
        ["Weeks 1\u20132", "Part 1 \u00b7 Linux & the Shell", "Files, processes, pipes, ssh", "Comfortable operating a server"],
        ["Weeks 2\u20133", "Part 2 \u00b7 Git & Collaboration", "Branches, PRs, the team workflow", "A reviewed, merged pull request"],
        ["Weeks 3\u20135", "Part 3 \u00b7 Containers (Docker)", "Images, Dockerfiles, registries", "An app containerised and shared"],
        ["Weeks 5\u20136", "Part 4 \u00b7 CI/CD", "Automated test, build, deploy", "Green pipeline on a real repo"],
        ["Weeks 6\u20137", "Part 5 \u00b7 Orchestration", "Compose now, Kubernetes concepts", "A multi-container app, one command"],
        ["Weeks 7\u20138", "Part 6 \u00b7 Infrastructure as Code", "Terraform, servers from a file", "A server born from code"],
        ["Weeks 8\u201310", "Part 7 \u00b7 Monitoring & Logging", "Metrics, the golden signals, alerts", "A dashboard + a meaningful alert"],
        ["Weeks 10\u201311", "Part 8 \u00b7 Reliability & Security", "SRE, secrets, DevSecOps, rollback", "An incident handled by playbook"],
        ["Weeks 11\u201312", "Part 9 \u00b7 Capstone & Career", "ShipIt pipeline end to end", "Full pipeline + portfolio"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a DevOps Engineer Actually Does", "0.2 The Culture and the Golden Rules", "0.3 The Recommended Roadmap (10\u201314 Weeks)", "0.4 Set Up Your Toolkit (Practical)"] },
        { title: "Part 1 \u2014 Linux & the Shell: Operating the Machine",
          items: ["1.1 The Commands DevOps Lives In (Practical)", "1.2 Processes, Environment, and SSH"] },
        { title: "Part 2 \u2014 Git & Collaboration: How Teams Ship Together",
          items: ["2.1 The Daily Git Loop (Practical)", "2.2 Branches and Pull Requests: The Team Workflow"] },
        { title: "Part 3 \u2014 Containers: Build Once, Run Anywhere",
          items: ["3.1 Why Containers Changed Everything", "3.2 Containerise ShipIt (Practical)", "3.3 Registries: Sharing Images"] },
        { title: "Part 4 \u2014 CI/CD: The Automated Path to Production",
          items: ["4.1 What CI/CD Actually Is", "4.2 Your First Pipeline (Practical)", "4.3 Checkpoint Project: The Green Pipeline"] },
        { title: "Part 5 \u2014 Orchestration: Running Many Containers",
          items: ["5.1 Compose: The Whole App in One File (Practical)", "5.2 Kubernetes: The Concepts That Matter"] },
        { title: "Part 6 \u2014 Infrastructure as Code: Servers From a File",
          items: ["6.1 Why Infrastructure Belongs in Git", "6.2 Terraform in One Sitting (Practical)"] },
        { title: "Part 7 \u2014 Monitoring & Logging: Watching It All",
          items: ["7.1 You Can't Run What You Can't See", "7.2 Instrument and Watch ShipIt (Practical)", "7.3 Alerting Without Crying Wolf"] },
        { title: "Part 8 \u2014 Reliability & Security: SRE and DevSecOps",
          items: ["8.1 SRE: Reliability as an Engineering Target", "8.2 Secrets and DevSecOps (Practical)", "8.3 Incident Response, Blamelessly"] },
        { title: "Part 9 \u2014 Capstone & Career: The ShipIt Pipeline",
          items: ["9.1 THE CAPSTONE: ShipIt, End to End", "9.2 The Job Hunt: Certifications and the DevOps Path"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 Docker & Compose on One Page", "A.2 Git Workflow & CI on One Page", "A.3 Operating & The Golden Signals"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "sdet": {
      title: "SDET (Software Dev Engineer in Test)",
      subtitle: "The complete SDET training \u2014 test design, pytest, API and browser automation, CI and performance. Recommended duration: 8\u201310 weeks.",
      training: "training/sdet/index.html",
      roadmap: [
        ["Weeks 1\u20132", "Part 1 \u00b7 Python for Testers", "Logic, functions, the code under test", "A small app worth testing"],
        ["Weeks 2\u20133", "Part 2 \u00b7 Testing Foundations", "Partitions, boundaries, the pyramid", "Test cases for a feature, by hand"],
        ["Weeks 3\u20134", "Part 3 \u00b7 Unit Testing", "pytest, assertions, parametrize", "A suite that catches real bugs"],
        ["Weeks 4\u20135", "Part 4 \u00b7 Coverage & TDD", "Coverage, mocking, test-first", "A feature built test-first"],
        ["Weeks 5\u20136", "Part 5 \u00b7 API Testing", "status, schema, contract, negatives", "An API suite hammering endpoints"],
        ["Weeks 6\u20137", "Part 6 \u00b7 Browser Automation", "Playwright, selectors, page objects", "A user journey tested end to end"],
        ["Week 7", "Part 7 \u00b7 CI & Test Strategy", "Tests on every push, anti-flakiness", "Green suite in a pipeline"],
        ["Weeks 7\u20138", "Part 8 \u00b7 Performance & Beyond", "Load testing, security, accessibility", "A load test with a verdict"],
        ["Weeks 8\u20139", "Part 9 \u00b7 Capstone & Career", "TestGuard end to end", "Full suite + CI + portfolio"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What an SDET Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (8\u201310 Weeks)", "0.4 Set Up Your Toolkit (Practical)"] },
        { title: "Part 1 \u2014 Python for Testers: The Code Under Test",
          items: ["1.1 Functions, Logic, Data (Practical)", "1.2 The Shapes You'll Assert Against"] },
        { title: "Part 2 \u2014 Testing Foundations: Thinking Like a Breaker",
          items: ["2.1 The Tester's Mindset", "2.2 Designing Cases: Partitions and Boundaries (Practical)", "2.3 The Testing Pyramid"] },
        { title: "Part 3 \u2014 Unit Testing: Your First Automated Net",
          items: ["3.1 pytest: Arrange, Act, Assert (Practical)", "3.2 Parametrize: Many Cases, One Test (Practical)", "3.3 Checkpoint Project: The Unit Suite"] },
        { title: "Part 4 \u2014 Coverage, Mocking & TDD",
          items: ["4.1 Coverage: A Map, Not a Trophy (Practical)", "4.2 Mocking: Testing in Isolation (Practical)", "4.3 TDD: Tests First (Practical)"] },
        { title: "Part 5 \u2014 API Testing: Hammering the Endpoints",
          items: ["5.1 HTTP and the requests Library (Practical)", "5.2 Contract and Negative Testing"] },
        { title: "Part 6 \u2014 Browser Automation: Testing Like a User",
          items: ["6.1 Drive a Real Browser (Practical)", "6.2 Robust Selectors and Page Objects"] },
        { title: "Part 7 \u2014 CI & Test Strategy: Tests on Every Push",
          items: ["7.1 The Suite in the Pipeline (Practical)", "7.2 Flakiness: The Tester's Plague", "7.3 Checkpoint Project: The Strategy Note"] },
        { title: "Part 8 \u2014 Performance & Beyond: The Other Qualities",
          items: ["8.1 Load Testing: Does It Hold Up? (Practical)", "8.2 Security and Accessibility Testing"] },
        { title: "Part 9 \u2014 Capstone & Career: TestGuard",
          items: ["9.1 THE CAPSTONE: TestGuard", "9.2 The Job Hunt: The SDET Path"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 pytest on One Page", "A.2 API & Browser on One Page", "A.3 Test Design & The Pyramid"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "database-admin": {
      title: "Database Administrator",
      subtitle: "The complete DBA training \u2014 SQL, schema design, transactions, indexing, security and backup/recovery. Recommended duration: 6\u201310 weeks.",
      training: "training/dba/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 Foundations", "Relational model, PostgreSQL, keys", "Database created, first table"],
        ["Weeks 1\u20132", "Part 2 \u00b7 SQL That Answers", "SELECT, GROUP BY, JOINs", "Ten business questions answered"],
        ["Weeks 2\u20133", "Part 3 \u00b7 Schema Design", "Types, constraints, normalisation", "A clean multi-table schema"],
        ["Weeks 3\u20134", "Part 4 \u00b7 Data Integrity", "Transactions, ACID, foreign keys", "Money moved safely under failure"],
        ["Weeks 4\u20135", "Part 5 \u00b7 Performance", "EXPLAIN, indexes, query tuning", "A slow query made fast, measured"],
        ["Weeks 5\u20136", "Part 6 \u00b7 Security & Access", "Roles, privileges, injection defence", "A least-privilege access model"],
        ["Weeks 6\u20137", "Part 7 \u00b7 Backup & Recovery", "Dumps, PITR, the restore drill", "A proven, tested restore"],
        ["Week 7", "Part 8 \u00b7 Operations", "Maintenance, vacuum, replication", "A health-check routine"],
        ["Weeks 7\u20138", "Part 9 \u00b7 Capstone & Career", "DataVault end to end", "Full database + runbook + portfolio"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Database Administrator Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (6\u201310 Weeks)", "0.4 Install PostgreSQL (Practical)"] },
        { title: "Part 1 \u2014 Foundations: The Relational Model",
          items: ["1.1 Why Tables and Relationships", "1.2 Keys: How Rows Are Identified and Linked (Practical)"] },
        { title: "Part 2 \u2014 SQL That Answers Questions",
          items: ["2.1 Selecting, Filtering, Sorting (Practical)", "2.2 Aggregation and JOINs (Practical)"] },
        { title: "Part 3 \u2014 Schema Design: Building It Right",
          items: ["3.1 Choosing Types and Constraints", "3.2 Normalisation: Store Each Fact Once"] },
        { title: "Part 4 \u2014 Data Integrity: Transactions & ACID",
          items: ["4.1 Transactions: All or Nothing (Practical)", "4.2 ACID and Foreign-Key Actions"] },
        { title: "Part 5 \u2014 Performance & Indexing: Making It Fast",
          items: ["5.1 EXPLAIN: How the Database Thinks (Practical)", "5.2 Indexes: The Cure and Its Cost (Practical)"] },
        { title: "Part 6 \u2014 Security & Access Control",
          items: ["6.1 Roles and Least Privilege (Practical)", "6.2 Encryption and SQL Injection Defence"] },
        { title: "Part 7 \u2014 Backup & Recovery: The DBA's Sacred Duty",
          items: ["7.1 Backups: The Reason DBAs Exist", "7.2 The Restore Drill (Practical)"] },
        { title: "Part 8 \u2014 Operations & Monitoring: Keeping It Healthy",
          items: ["8.1 Maintenance and Health Metrics (Practical)", "8.2 Replication and High Availability"] },
        { title: "Part 9 \u2014 Capstone & Career: DataVault",
          items: ["9.1 THE CAPSTONE: DataVault", "9.2 The Job Hunt: Certifications and the DBA Path"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 SQL on One Page", "A.2 Schema, Keys & Constraints", "A.3 Transactions, Tuning & Ops"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "data-analyst": {
      title: "Data Analyst",
      subtitle: "The complete analyst training \u2014 spreadsheets, SQL, Python and dashboards. Recommended duration: 8\u201312 weeks.",
      training: "training/dataanalyst/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 Analyst Thinking", "Sharp questions, metrics, the analysis loop", "A question decomposed into metrics"],
        ["Weeks 1\u20132", "Part 2 \u00b7 Spreadsheet Power", "Formulas, SUMIFS, pivot tables, honest charts", "Sales summary built three ways"],
        ["Weeks 2\u20134", "Part 3 \u00b7 SQL I", "SELECT, WHERE, GROUP BY, HAVING", "Ten business questions in SQL"],
        ["Weeks 4\u20135", "Part 4 \u00b7 SQL II", "INNER/LEFT JOINs, subqueries", "Revenue by region, product and customer"],
        ["Weeks 5\u20136", "Part 5 \u00b7 Python & pandas", "DataFrames, filtering, groupby", "Replayable scripted report"],
        ["Weeks 6\u20137", "Part 6 \u00b7 Cleaning Real Data", "Missing values, duplicates, types, dates", "A dirty file made trustworthy + memo"],
        ["Weeks 7\u20138", "Part 7 \u00b7 Visualization", "Chart choice, matplotlib, finding-titles", "Five charts that each make one point"],
        ["Weeks 8\u20139", "Part 8 \u00b7 Dashboards & Stats", "Looker Studio, KPIs, the five honest ideas", "A live, shareable dashboard"],
        ["Weeks 9\u201310", "Part 9 \u00b7 Capstone & Career", "The NaijaSales analysis end-to-end", "Insight memo + dashboard + portfolio"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Data Analyst Actually Does", "0.2 The Golden Rules of Analysis", "0.3 The Recommended Roadmap (8\u201312 Weeks)", "0.4 Set Up Your Free Toolkit (Practical)", "0.5 How Every Lesson Is Structured"] },
        { title: "Part 1 \u2014 Thinking Like an Analyst: Questions, Metrics & the Loop",
          items: ["1.1 From Vague Worry to Sharp Question", "1.2 The Analysis Loop", "1.3 Checkpoint: Decompose Three Worries"] },
        { title: "Part 2 \u2014 Spreadsheet Power: The Analyst's First Engine",
          items: ["2.1 Why Spreadsheets First", "2.2 Formulas: From Arithmetic to Answers (Practical)", "2.3 Pivot Tables: Answers Without Formulas (Practical)", "2.4 A First Chart, Honestly Drawn", "2.5 Checkpoint Project: The Three-Way Summary"] },
        { title: "Part 3 \u2014 SQL I: Asking Databases Directly",
          items: ["3.1 Why Analysts Must Speak SQL", "3.2 SELECT, WHERE, ORDER BY (Practical)", "3.3 GROUP BY: The Pivot Table's Engine (Practical)", "3.4 Checkpoint Project: Ten Questions, Ten Queries"] },
        { title: "Part 4 \u2014 SQL II: JOINs and Multi-Table Truth",
          items: ["4.1 Why Real Data Lives in Many Tables", "4.2 INNER JOIN and LEFT JOIN (Practical)", "4.3 Subqueries: A Question Inside a Question", "4.4 Checkpoint Project: The Cross-Table Brief"] },
        { title: "Part 5 \u2014 Python & pandas: Analysis You Can Replay",
          items: ["5.1 Why Scripts Beat Clicks", "5.2 DataFrames: The Spreadsheet in Code (Practical)", "5.3 groupby: Pivot Tables, Scripted (Practical)", "5.4 Checkpoint Project: The Replayable Report"] },
        { title: "Part 6 \u2014 Cleaning Real Data: The Janitor and the Judge",
          items: ["6.1 Eighty Percent of the Job", "6.2 The Cleaning Script (Practical)", "6.3 Dates Unlocked", "6.4 Checkpoint Project: The Cleaning Memo"] },
        { title: "Part 7 \u2014 Visualization: Charts That Make One Point",
          items: ["7.1 The Chart-Choice Table", "7.2 matplotlib in One Sitting (Practical)", "7.3 Checkpoint Project: The Five-Chart Story"] },
        { title: "Part 8 \u2014 Dashboards & the Statistics That Protect You",
          items: ["8.1 Reports Answer Once; Dashboards Answer Daily", "8.2 Build the NaijaSales Dashboard (Practical)", "8.3 Five Statistical Ideas That Keep You Honest", "8.4 Checkpoint Project: The Self-Serve Dashboard"] },
        { title: "Part 9 \u2014 The Capstone & Your Career: The NaijaSales Analysis",
          items: ["9.1 THE CAPSTONE: From Worry to Decision", "9.2 The Job Hunt: Selling Judgement, Not Tools"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 Spreadsheet Formulas on One Page", "A.2 SQL on One Page", "A.3 pandas on One Page", "A.4 Chart Manners on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "data-scientist": {
      title: "Data Scientist",
      subtitle: "The complete data science training \u2014 Python, statistics, machine learning and model serving. Recommended duration: 14\u201318 weeks.",
      training: "training/datascientist/index.html",
      roadmap: [
        ["Weeks 1\u20133", "Part 1 \u00b7 Python Foundations", "Variables, logic, functions, lists, dicts", "Loan-eligibility checker CLI"],
        ["Weeks 3\u20135", "Part 2 \u00b7 NumPy & pandas", "Arrays, DataFrames, groupby, joins", "NaijaTel dataset sliced six ways"],
        ["Weeks 5\u20137", "Part 3 \u00b7 Cleaning & EDA", "Judgement-based fixes, exploratory plots", "An EDA that finds the story"],
        ["Weeks 7\u20138", "Part 4 \u00b7 Statistics", "Sampling noise, A/B tests, confounders", "Three honest claims with uncertainty"],
        ["Weeks 8\u20139", "Part 5 \u00b7 Visualization", "Error bars, finding-titles, story order", "A five-chart narrative"],
        ["Weeks 9\u201311", "Part 6 \u00b7 Machine Learning I", "Train/test, baselines, recall vs precision", "First churn model beats the baseline"],
        ["Weeks 11\u201313", "Part 7 \u00b7 Machine Learning II", "Forests, cross-validation, features, leakage", "A tuned model + Model Card"],
        ["Weeks 13\u201314", "Part 8 \u00b7 Model to Product", "joblib, FastAPI /predict, LLM context", "Live prediction API answering curl"],
        ["Weeks 14\u201316", "Part 9 \u00b7 Capstone & Career", "ChurnGuard end-to-end", "Repo + API + executive report"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Data Scientist Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (14\u201318 Weeks)", "0.4 Set Up Your Workstation (Practical)", "0.5 How Every Lesson Is Structured"] },
        { title: "Part 1 \u2014 Python Foundations: Learning to Think in Code",
          items: ["1.1 Variables and Types", "1.2 Decisions: if / elif / else", "1.3 Loops and Functions", "1.4 Lists and Dictionaries: The Shapes of Records", "1.5 Checkpoint Project: The Loan-Eligibility Checker"] },
        { title: "Part 2 \u2014 NumPy & pandas: The Workbench of the Trade",
          items: ["2.1 NumPy: Arithmetic on Everything at Once", "2.2 The Course Dataset: NaijaTel Customers", "2.3 DataFrames: Slice, Group, Join (Practical)", "2.4 Checkpoint Project: Six Slices of NaijaTel"] },
        { title: "Part 3 \u2014 Cleaning & EDA: Interrogating the Data",
          items: ["3.1 Cleaning With Judgement (Practical)", "3.2 EDA: The Structured Interrogation (Practical)", "3.3 Checkpoint Project: The EDA Report"] },
        { title: "Part 4 \u2014 Statistics That Matter: Not Fooling Yourself",
          items: ["4.1 Mean, Median and the Long Tail", "4.2 Sampling Noise: Why Small Groups Scream (Practical)", "4.3 The A/B Test: Did the Change Actually Work? (Practical)", "4.4 Correlation Is Not Causation \u2014 and Confounders Are Why", "4.5 Checkpoint Project: Three Honest Claims"] },
        { title: "Part 5 \u2014 Visualization & Storytelling: Charts That Argue Honestly",
          items: ["5.1 The Chart-Choice Table, Scientist's Edition", "5.2 The Money Chart: Rates With Error Bars (Practical)", "5.3 Checkpoint Project: The Five-Chart Narrative"] },
        { title: "Part 6 \u2014 Machine Learning I: Models That Learn From Examples",
          items: ["6.1 What \u201cLearning\u201d Actually Means", "6.2 The Baseline and the First Model (Practical)", "6.3 The Confusion Matrix: Where Errors Live", "6.4 Checkpoint Project: The Threshold Memo"] },
        { title: "Part 7 \u2014 Machine Learning II: Forests, Validation & Features",
          items: ["7.1 Trees and Forests", "7.2 Overfitting, Caught Red-Handed (Practical)", "7.3 Cross-Validation: A Sturdier Verdict", "7.4 Feature Engineering: Where Skill Lives", "7.5 Checkpoint Project: The Model Card"] },
        { title: "Part 8 \u2014 From Model to Product: Serving Predictions",
          items: ["8.1 A Model in a File", "8.2 The Prediction API (Practical)", "8.3 Deep Learning and LLMs: The Honest Map", "8.4 Checkpoint Project: ChurnGuard, Serving"] },
        { title: "Part 9 \u2014 The Capstone & Your Career: ChurnGuard End-to-End",
          items: ["9.1 THE CAPSTONE: ChurnGuard, Assembled", "9.2 The Job Hunt: A Scientist With Receipts"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 pandas on One Page", "A.2 scikit-learn on One Page", "A.3 Metrics on One Page", "A.4 The Honesty Checklist"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "fullstack-developer": {
      title: "Full-stack Developer",
      subtitle: "The complete full-stack training \u2014 front end, back end and database in one journey. Recommended duration: 12\u201316 weeks.",
      training: "training/fullstack/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 The Web in One Picture", "Client, server, database; your first page AND first server", "One request travels the full stack"],
        ["Weeks 2\u20133", "Part 2 \u00b7 Front-End Foundations", "Semantic HTML, box model, Flexbox, Grid", "MentorMarket's storefront shell"],
        ["Weeks 3\u20136", "Part 3 \u00b7 JavaScript Everywhere", "Logic, functions, data shapes, async", "Cart logic running in the console"],
        ["Weeks 6\u20138", "Part 4 \u00b7 The Back End", "Express routing, middleware, CRUD, validation", "MentorMarket API with full CRUD"],
        ["Weeks 8\u20139", "Part 5 \u00b7 The Database", "SQLite, JOINs, parameterized queries", "Listings survive a restart"],
        ["Weeks 9\u201310", "Part 6 \u00b7 Connecting the Halves", "fetch, CORS, forms that POST", "Storefront powered by your own API"],
        ["Weeks 10\u201312", "Part 7 \u00b7 React", "Components, props, state, effects, Vite", "Storefront rebuilt in React"],
        ["Weeks 12\u201314", "Part 8 \u00b7 Auth Across the Stack", "bcrypt + JWT server-side, tokens in React", "Login working browser-to-database"],
        ["Weeks 14\u201316", "Part 9 \u00b7 Professional Practice", "Git, deployment of both halves, the capstone", "MentorMarket live on the internet"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What \u201cFull-Stack\u201d Actually Means", "0.2 The Golden Rules", "0.3 The 16-Week Fast-Track Roadmap", "0.4 Set Up Your Workstation (Practical)", "0.5 How Every Lesson Is Structured"] },
        { title: "Part 1 \u2014 The Web in One Picture: Your First Page AND First Server",
          items: ["1.1 The Three-Machine Conversation", "1.2 Your First Web Page (Practical)", "1.3 Your First Server (Practical)", "1.4 Connect Them: One Request, Full Stack (Practical)", "1.5 Checkpoint: Narrate the Journey"] },
        { title: "Part 2 \u2014 Front-End Foundations: HTML & CSS That Mean Something",
          items: ["2.1 HTML: Structure With Meaning", "2.2 CSS and the Box Model", "2.3 Flexbox and Grid: The Two Layout Tools", "2.4 Checkpoint Project: The Storefront Shell"] },
        { title: "Part 3 \u2014 JavaScript Everywhere: One Language, Whole Stack",
          items: ["3.1 One Language, Two Homes", "3.2 Variables, Types and Template Strings", "3.3 Decisions and Loops", "3.4 Functions: Small Machines That Compose", "3.5 Arrays and Objects: The Shapes APIs Speak", "3.6 Async: The Kitchen That Never Stands Still", "3.7 Checkpoint Project: Cart Logic in the Console"] },
        { title: "Part 4 \u2014 The Back End: Node, Express & the MentorMarket API",
          items: ["4.1 The Server Mindset", "4.2 Routes and the Listings Resource (Practical)", "4.3 Status Codes and Errors, Done Honestly", "4.4 Checkpoint Project: The Documented API"] },
        { title: "Part 5 \u2014 The Database: SQL Memory for MentorMarket",
          items: ["5.1 Why a Database, Not a File", "5.2 SQL in One Sitting (Practical)", "5.3 Relationships: Sellers Own Listings (JOINs)", "5.4 Checkpoint Project: The API Gets Permanent Memory"] },
        { title: "Part 6 \u2014 Connecting the Halves: The Storefront Meets the API",
          items: ["6.1 The Moment of Truth", "6.2 Rendering Real Data (Practical)", "6.3 Forms That POST: The Sell Page (Practical)", "6.4 Checkpoint Project: The Living Storefront"] },
        { title: "Part 7 \u2014 React for Full-Stack: A Front End That Scales",
          items: ["7.1 Why Teams Reach for React", "7.2 Components and Props: LEGO for Interfaces", "7.3 State and Effects: Data That Drives the Screen (Practical)", "7.4 Checkpoint Project: The React Storefront, Complete"] },
        { title: "Part 8 \u2014 Auth Across the Stack: Accounts From Browser to Database",
          items: ["8.1 One Identity, Three Layers", "8.2 The Server Side: Register, Login, Guard (Practical)", "8.3 The Client Side: Tokens in React (Practical)", "8.4 Checkpoint Project: Ownership"] },
        { title: "Part 9 \u2014 Professional Practice: Git, Deployment & the Capstone",
          items: ["9.1 Git & GitHub: Your Work, Versioned and Visible", "9.2 Making Code Deployment-Ready", "9.3 Deploying Both Halves (Practical)", "9.4 THE CAPSTONE: MentorMarket, Complete", "9.5 The Job Hunt: Selling the Whole Stack"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 The Full-Stack Request Journey", "A.2 Express + SQL on One Page", "A.3 React on One Page", "A.4 fetch on One Page"] },
        { title: "Appendix B \u2014 The 16-Week Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "mobile-developer": {
      title: "Mobile App Developer (iOS/Android)",
      subtitle: "The complete mobile training \u2014 React Native + Expo, one codebase for both platforms. Recommended duration: 10\u201314 weeks.",
      training: "training/mobile/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 First App", "Expo, Expo Go, the dev loop", "\u201cHello\u201d app on YOUR phone"],
        ["Weeks 2\u20134", "Part 2 \u00b7 JavaScript Core", "Logic, functions, shapes, async", "Airtime top-up simulator"],
        ["Weeks 4\u20135", "Part 3 \u00b7 React Thinking", "Components, props, state", "Tappable, stateful profile wall"],
        ["Weeks 5\u20137", "Part 4 \u00b7 Screens & Style", "Core components, StyleSheet, FlatList", "QuickNotes \u2014 a real notes app"],
        ["Weeks 7\u20139", "Part 5 \u00b7 Navigation", "Stacks, tabs, params with Expo Router", "Multi-screen marketplace shell"],
        ["Weeks 9\u201310", "Part 6 \u00b7 Device Powers", "AsyncStorage, camera, location, haptics", "Notes persist; photos attach"],
        ["Weeks 10\u201312", "Part 7 \u00b7 Talking to Servers", "fetch, the loading/error/empty trinity", "NaijaJobs \u2014 live data in hand"],
        ["Weeks 12\u201314", "Part 8 \u00b7 Auth & Integration", "JWT + SecureStore, uploads, payments", "Sign-in working phone-to-server"],
        ["Weeks 14\u201316", "Part 9 \u00b7 Ship It", "EAS builds, store submission, the capstone", "CampusMart installed on real phones"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 The Mobile Landscape \u2014 and the Path We Take", "0.2 The Golden Rules", "0.3 The 16-Week Fast-Track Roadmap", "0.4 Set Up Your Workstation (Practical)", "0.5 How Every Lesson Is Structured"] },
        { title: "Part 1 \u2014 Your First App, On Your Actual Phone",
          items: ["1.1 Create and Run (Practical)", "1.2 Make It Yours (Practical)", "1.3 Checkpoint: The Dev Loop, Internalised"] },
        { title: "Part 2 \u2014 JavaScript for Mobile: The Language Under Every Screen",
          items: ["2.1 Practise Logic Where It's Fast", "2.2 Variables, Types, Template Strings", "2.3 Decisions and Loops", "2.4 Functions: Small Machines", "2.5 Arrays and Objects: What Every List Screen Eats", "2.6 Async: Why Apps Never Freeze", "2.7 Checkpoint Project: Airtime Top-Up Logic"] },
        { title: "Part 3 \u2014 React Thinking: Components, Props & State",
          items: ["3.1 The Inversion That Makes Apps Manageable", "3.2 Components and Props (Practical)", "3.3 State: Data That Repaints (Practical)", "3.4 Checkpoint Project: The Interactive Profile Wall"] },
        { title: "Part 4 \u2014 Screens & Style: The Mobile Component Dictionary",
          items: ["4.1 The Core Component Dictionary", "4.2 Build QuickNotes (Practical)", "4.3 Checkpoint Project: QuickNotes Pro"] },
        { title: "Part 5 \u2014 Navigation: Apps With More Than One Screen",
          items: ["5.1 Files Become Screens", "5.2 A Stack: List \u2192 Detail (Practical)", "5.3 Tabs: The App's Backbone", "5.4 Checkpoint Project: The Navigable Marketplace Shell"] },
        { title: "Part 6 \u2014 Device Powers: Storage, Camera, Location & Haptics",
          items: ["6.1 The Phone Is a Sensor Platform", "6.2 AsyncStorage: The Phone Remembers (Practical)", "6.3 Camera & Image Picker (Practical)", "6.4 Location and Haptics", "6.5 Checkpoint Project: QuickNotes Forever+"] },
        { title: "Part 7 \u2014 Talking to Servers: Live Data in Your Hand",
          items: ["7.1 The Same fetch, Higher Stakes", "7.2 NaijaJobs: A Live-Data App (Practical)", "7.3 Checkpoint Project: NaijaJobs, Searchable"] },
        { title: "Part 8 \u2014 Auth & Integration: Accounts, Uploads & Money on Mobile",
          items: ["8.1 Mobile Auth: Same Dance, Safer Pocket", "8.2 Uploading a Photo to a Server (Practical)", "8.3 Money in Apps: The Shape of Mobile Payments", "8.4 Checkpoint Project: Accounts End-to-End"] },
        { title: "Part 9 \u2014 Ship It: Builds, Stores & the CampusMart Capstone",
          items: ["9.1 Debugging & Performance Habits", "9.2 Identity, Icons & Configuration", "9.3 EAS Build: From Project to Installable App (Practical)", "9.4 The Store Reality Check", "9.5 THE CAPSTONE: CampusMart, Shipped", "9.6 The Job Hunt: A Developer With an Installable"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 Core Components on One Page", "A.2 Hooks & Patterns on One Page", "A.3 Expo Router on One Page", "A.4 Commands You Will Type Forever"] },
        { title: "Appendix B \u2014 The 16-Week Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
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
  /* ---------- PWA install prompt ---------- */
  var deferredInstall = null;
  function installUI() {
    if (window.matchMedia("(display-mode: standalone)").matches || navigator.standalone) return;
    if (localStorage.getItem("ms_install_dismissed") === "1") return;
    if (document.getElementById("msInstall")) return;
    var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    if (!deferredInstall && !isIOS) return;
    var root = location.pathname.indexOf("/training/") !== -1 ? "../../" : "";
    var bar = document.createElement("div");
    bar.id = "msInstall";
    bar.setAttribute("style",
      "position:fixed;bottom:1.2rem;left:1.2rem;z-index:62;display:flex;align-items:center;gap:.7rem;" +
      "background:var(--card, #fff);border:1px solid var(--line, #ddd);border-radius:12px;" +
      "padding:.7rem .9rem;box-shadow:0 12px 32px rgba(0,0,0,.16);max-width:min(330px, calc(100vw - 2.4rem));" +
      "font-family:'DM Sans',sans-serif;font-size:.84rem;color:var(--ink,#111)");
    bar.innerHTML =
      '<img src="' + root + 'assets/logo.svg" alt="" style="height:30px;width:auto">' +
      (deferredInstall
        ? '<span style="flex:1">Install <strong>The Mentorine School</strong> app</span>' +
          '<button id="msInstallGo" style="background:#0d8c4f;color:#fff;border:none;border-radius:8px;padding:.5rem .9rem;cursor:pointer;font-weight:500">Install</button>'
        : '<span style="flex:1">Install this app: tap <strong>Share</strong> \u2192 <strong>Add to Home Screen</strong></span>') +
      '<button id="msInstallX" aria-label="Dismiss" style="background:none;border:none;color:inherit;opacity:.55;cursor:pointer;font-size:1rem">\u2715</button>';
    document.body.appendChild(bar);
    var go = document.getElementById("msInstallGo");
    if (go) go.addEventListener("click", function () {
      deferredInstall.prompt();
      deferredInstall.userChoice.then(function () { bar.remove(); deferredInstall = null; });
    });
    document.getElementById("msInstallX").addEventListener("click", function () {
      localStorage.setItem("ms_install_dismissed", "1");
      bar.remove();
    });
  }
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    deferredInstall = e;
    installUI();
  });
  window.addEventListener("appinstalled", function () {
    var bar = document.getElementById("msInstall");
    if (bar) bar.remove();
  });
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function(){ setTimeout(installUI, 2500); });
  } else { setTimeout(installUI, 2500); }

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
