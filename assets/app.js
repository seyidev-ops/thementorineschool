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
        { slug: "video-editor",     name: "Video Editor", courses: "12 guided parts", duration: "6–10 weeks", featured: true, training: "training/video/index.html",
          blurb: "The cut, pacing, sound design, colour grading, captions and social/long-form editing — ending in the Lagos Eats content package and showreel, with full training pages inside." },
        { slug: "3d-artist",        name: "3D Artist / Animator", courses: "12 guided parts", duration: "12–16 weeks", featured: true, training: "training/threed/index.html",
          blurb: "Modelling, PBR texturing, lighting, rendering, animation and rigging in Blender — ending in The Still Life scene and turntable, with full training pages inside." },
        { slug: "brand-designer",   name: "Brand Identity Designer", courses: "12 guided parts", duration: "6–8 weeks", featured: true, training: "training/brand/index.html",
          blurb: "Brand strategy, naming and voice, logo systems, colour and type, imagery, applications and brand guidelines — ending in the Terra brand identity, with full training pages inside." }
      ]
    },
    {
      id: "marketing", label: "Marketing & Content",
      tracks: [
        { slug: "digital-marketer", name: "Digital Marketer", courses: "12 guided parts", duration: "7–10 weeks", featured: true, training: "training/digitalmarketer/index.html",
          blurb: "Audience & funnel strategy, content & inbound, social, SEO basics, email, paid ads & their economics, and analytics — ending in The Growth Plan strategy & campaign, with full training pages inside." },
        { slug: "content-creator",  name: "Content Creator", courses: "12 guided parts", duration: "8–12 weeks", featured: true, training: "training/contentcreator/index.html",
          blurb: "Niche & brand, ideas, scripting & hooks, creating video & visuals with just a phone, platforms & algorithms, growth & community, and monetisation — ending in The Creator Kit, with full training pages inside." },
        { slug: "seo-specialist",   name: "SEO Specialist", courses: "12 guided parts", duration: "7–10 weeks", featured: true, training: "training/seospecialist/index.html",
          blurb: "How search works, keyword research, search intent, on-page & technical SEO, authority/backlinks, local SEO and measurement — ending in The SEO Blueprint strategy & audit, with full training pages inside." },
        { slug: "social-media-manager", name: "Social Media Manager", courses: "12 guided parts", duration: "6–9 weeks", featured: true, training: "training/socialmedia/index.html",
          blurb: "Strategy, platforms & brand voice, content creation, the calendar & scheduling, engagement & community, growth, campaigns & paid basics, and analytics — ending in The Social Playbook, with full training pages inside." },
        { slug: "email-marketer",   name: "Email Marketing Specialist", courses: "12 guided parts", duration: "5–8 weeks", featured: true, training: "training/emailmarketing/index.html",
          blurb: "List building, writing emails & subject lines, automation & welcome sequences, campaigns, segmentation & personalisation, deliverability & compliance, and analytics — the highest-ROI channel, ending in The Email Engine, with full training pages inside." },
        { slug: "copywriter",       name: "Copywriter", courses: "12 guided parts", duration: "6–9 weeks", featured: true, training: "training/copywriter/index.html",
          blurb: "Research & the reader, headlines, persuasion psychology, frameworks (AIDA/PAS), the sales/landing page, copy across formats, and editing & brand voice — words that sell, ending in The Copy Portfolio, with full training pages inside." }
      ]
    },
    {
      id: "business", label: "Business & Operations",
      tracks: [
        { slug: "project-manager",  name: "Project Manager", courses: "12 guided parts", duration: "8–12 weeks", featured: true, training: "training/projectmanager/index.html",
          blurb: "The triple constraint, the project charter, scope & the WBS, scheduling & the critical path, budgeting, risk & quality, stakeholders & communication, execution & closeout, and Waterfall/Agile — ending in The Project Playbook, with full training pages inside." },
        { slug: "product-manager",  name: "Product Manager", courses: "12 guided parts", duration: "8–12 weeks", featured: true, training: "training/productmanager/index.html",
          blurb: "The three lenses, user research & personas, vision & strategy, prioritisation & the MVP, requirements & user stories, Agile delivery, product metrics, and roadmaps — the ‘mini-CEO of the product’ role, ending in The Product Kit, with full training pages inside." },
        { slug: "business-analyst", name: "Business Analyst", courses: "12 guided parts", duration: "7–11 weeks", featured: true, training: "training/businessanalyst/index.html",
          blurb: "The bridge role, defining the real problem, eliciting requirements, process modelling (as-is/to-be), writing requirements, evaluating solutions, data analysis, and validation/UAT — ending in The BA Toolkit, with full training pages inside." },
        { slug: "operations-manager", name: "Operations Manager", courses: "12 guided parts", duration: "7–11 weeks", featured: true, training: "training/operationsmanager/index.html",
          blurb: "The operations role & trade-offs, process & workflow mapping, Lean & efficiency (waste, bottlenecks), KPIs & dashboards, quality management, supply/inventory/capacity, team leadership, and continuous improvement (Kaizen/PDCA) — ending in The Operations Playbook, with full training pages inside." },
        { slug: "scrum-master",     name: "Scrum Master", courses: "12 guided parts", duration: "5–8 weeks", featured: true, training: "training/scrummaster/index.html",
          blurb: "Agile & servant-leadership, the Scrum framework (pillars & values), the team & roles, artefacts & the backlog, sprint planning, the daily scrum & facilitation, review & retrospective, and impediments, coaching & anti-patterns — ending in The Scrum Master Kit, ready for PSM/CSM, with full training pages inside." },
        { slug: "healthcare-analyst", name: "Healthcare Analyst", courses: "12 guided parts", duration: "8–12 weeks", featured: true, training: "training/healthcareanalyst/index.html",
          blurb: "Data skill + healthcare domain — the care system & coding (ICD/CPT), data & privacy (HIPAA/GDPR), analysis foundations, clinical & outcomes analysis (risk adjustment), operational & financial/claims analysis, quality metrics & population health, and reporting — ending in The Healthcare Analytics Portfolio, with full training pages inside." },
        { slug: "salesforce-admin", name: "Salesforce Administrator", courses: "12 guided parts", duration: "6–10 weeks", featured: true, training: "training/salesforceadmin/index.html",
          blurb: "Configure & manage the world’s #1 CRM — mostly without code — users & security, the data model, UI customisation, Flow automation, data management, reports & dashboards, and Sales/Service Cloud, ending in The Admin Portfolio in a real org and aimed at the CSA certification, with full training pages inside." }
      ]
    },
    {
      id: "support", label: "Support, Admin & Community",
      tracks: [
        { slug: "virtual-assistant", name: "Virtual Assistant", courses: "12 guided parts", duration: "5–8 weeks", featured: true, training: "training/va/index.html",
          blurb: "Core admin, inbox & calendar systems, client communication, tools, research, SOPs, specialising and getting clients — ending in The VA Toolkit, with full training pages inside." },
        { slug: "customer-support",  name: "Customer Support Specialist", courses: "12 guided parts", duration: "5–8 weeks", featured: true, training: "training/support/index.html",
          blurb: "The support mindset, empathetic communication, the ticket process, channels, de-escalation, troubleshooting and metrics — ending in the SupportDesk portfolio, with full training pages inside." },
        { slug: "community-manager", name: "Community Manager", courses: "12 guided parts", duration: "6–8 weeks", featured: true, training: "training/community/index.html",
          blurb: "Strategy, onboarding, engagement, moderation, events, brand voice, crisis handling and community metrics — ending in The Hub community plan, with full training pages inside." },
        { slug: "executive-assistant", name: "Executive Assistant (Remote)", courses: "12 guided parts", duration: "5–8 weeks", featured: true, training: "training/execassistant/index.html",
          blurb: "Calendar mastery, inbox & writing in their voice, prioritisation & gatekeeping, meetings & travel, anticipation, discretion and the operating rhythm — the premium, high-trust EA tier, ending in The EA Command Center, with full training pages inside." },
        { slug: "technical-support", name: "Technical Support Specialist", courses: "12 guided parts", duration: "6–10 weeks", featured: true, training: "training/techsupport/index.html",
          blurb: "Technical foundations, systematic troubleshooting, the browser dev console, technical communication, escalation & bug reporting, and documentation — empathy plus competence, ending in The Tech Support Toolkit, with full training pages inside." },
        { slug: "remote-team-lead",  name: "Remote Team Lead", courses: "12 guided parts", duration: "6–10 weeks", featured: true, training: "training/remotelead/index.html",
          blurb: "Communication & async, trust & accountability, goals & delegation, effective meetings, one-on-ones & coaching, feedback & hard conversations, and culture & wellbeing — leading a distributed team deliberately, ending in The Remote Team Playbook, with full training pages inside." }
      ]
    },
    {
      id: "nocode", label: "No-Code & Automation",
      tracks: [
        { slug: "nocode-developer",   name: "No-Code Developer (Bubble/Adalo)", courses: "12 guided parts", duration: "6–10 weeks", featured: true, training: "training/nocodedeveloper/index.html",
          blurb: "Build real web & mobile apps without code — the developer mindset, data design, building in Bubble, logic & workflows, users & auth, mobile apps in Adalo, integrations & payments, and launch, ending in The No-Code Portfolio of two real apps, with full training pages inside." },
        { slug: "automation-specialist", name: "Zapier/Make Automation Specialist", courses: "12 guided parts", duration: "4–6 weeks", featured: true, training: "training/automationspecialist/index.html",
          blurb: "Make software work by itself — the trigger-action model, building in Zapier, data & formatting, logic, filters & paths, building in Make, APIs & webhooks, and reliability, ending in The Automation Toolkit of real, value-framed workflows, with full training pages inside." },
        { slug: "ai-prompt-engineer", name: "AI Prompt Engineer", courses: "4 courses", duration: "3–5 weeks" },
        { slug: "lowcode-builder",    name: "Low-Code App Builder", courses: "6 courses", duration: "6–8 weeks" }
      ]
    }
  ];

  /* ---------- SYLLABI ----------
     Software Development syllabus is extracted directly from the
     JavaScript-HTML Developer Training Guide (Parts 0–9 + appendices). */
  const SYLLABI = {
    "salesforce-admin": {
      title: "Salesforce Administrator",
      subtitle: "The complete Salesforce Administrator training \u2014 users & security, the data model, UI customisation, Flow automation, data management, reports & dashboards, and Sales/Service Cloud. Built in a real org, aimed at the CSA certification. Recommended duration: 6\u201310 weeks.",
      training: "training/salesforceadmin/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 Salesforce & the Admin Role", "CRM, the platform, the admin, your free org", "A free org + orientation"],
        ["Weeks 1\u20132", "Part 2 \u00b7 Users, Security & Access", "Users, profiles, roles, permissions, sharing", "A configured user & security model"],
        ["Weeks 2\u20133", "Part 3 \u00b7 The Data Model", "Objects, fields, relationships, integrity", "A custom data model"],
        ["Weeks 3\u20134", "Part 4 \u00b7 Customising the UI", "Page layouts, Lightning App Builder, apps", "A customised app & pages"],
        ["Weeks 4\u20135", "Part 5 \u00b7 Process Automation", "Flow, automation tools, when to use what", "Automated business processes"],
        ["Week 5", "Part 6 \u00b7 Data Management", "Import/export, cleaning, data quality", "A clean, well-managed dataset"],
        ["Weeks 5\u20136", "Part 7 \u00b7 Reports & Dashboards", "Building reports, dashboards, insights", "Reports & a dashboard"],
        ["Weeks 6\u20137", "Part 8 \u00b7 Sales, Service & AppExchange", "The core clouds, adding apps", "A configured sales/service process"],
        ["Weeks 7\u20138", "Part 9 \u00b7 Capstone, CSA & Career", "The Admin Portfolio, the exam, the job hunt", "A portfolio + a CSA exam plan"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Salesforce Administrator Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (6\u201310 Weeks)", "0.4 Set Up Your Free Salesforce Org (Practical)"] },
        { title: "Part 1 \u2014 Salesforce & the Admin Role",
          items: ["1.1 CRM and Why Salesforce Dominates", "1.2 The Admin: The Platform's Owner", "1.3 A Tour of the Platform (Practical)"] },
        { title: "Part 2 \u2014 Users, Security & Access",
          items: ["2.1 Security Is the Admin's Core Duty", "2.2 Users, Profiles, and Permissions (Practical)", "2.3 Designing Access for a Business"] },
        { title: "Part 3 \u2014 The Data Model",
          items: ["3.1 The Data Model Shapes Everything", "3.2 Objects, Fields, and Relationships (Practical)", "3.3 Data Integrity by Design"] },
        { title: "Part 4 \u2014 Customising the UI",
          items: ["4.1 The User Experience Drives Adoption", "4.2 Page Layouts and the Lightning App Builder (Practical)", "4.3 Tailoring for Different Teams"] },
        { title: "Part 5 \u2014 Process Automation",
          items: ["5.1 Automate the Repetitive", "5.2 Flow: The Automation Powerhouse (Practical)", "5.3 Designing Good Automation"] },
        { title: "Part 6 \u2014 Data Management",
          items: ["6.1 Salesforce Is Only as Good as Its Data", "6.2 Importing, Exporting, and Cleaning (Practical)", "6.3 Data as an Ongoing Discipline"] },
        { title: "Part 7 \u2014 Reports & Dashboards",
          items: ["7.1 Turning Data into Insight", "7.2 Building Reports and Dashboards (Practical)", "7.3 Reporting That Drives Decisions"] },
        { title: "Part 8 \u2014 Sales, Service & AppExchange",
          items: ["8.1 The Core Clouds: Sales and Service", "8.2 Configuring Sales and Service Processes (Practical)", "8.3 Extending with AppExchange and Going Further"] },
        { title: "Part 9 \u2014 Capstone, CSA Certification & Career",
          items: ["9.1 THE CAPSTONE: The Admin Portfolio", "9.2 The CSA Certification and the Job Hunt"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 Platform & Security on One Page", "A.2 Data Model & UI on One Page", "A.3 Automation, Data & Reporting on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "nocode-developer": {
      title: "No-Code Developer (Bubble/Adalo)",
      subtitle: "The complete no-code development training \u2014 thinking like a builder, data design, building in Bubble, logic & workflows, users & auth, mobile apps in Adalo, integrations & payments, and launch. Recommended duration: 6\u201310 weeks.",
      training: "training/nocodedeveloper/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 No-Code & Thinking Like a Builder", "What no-code is, the platforms, the mindset", "An app concept + plan"],
        ["Weeks 1\u20132", "Part 2 \u00b7 Designing the Data", "Databases, data types, relationships", "An app data model"],
        ["Weeks 2\u20133", "Part 3 \u00b7 Building the UI (Bubble)", "Visual design, pages, elements, responsive", "A web app interface"],
        ["Weeks 3\u20134", "Part 4 \u00b7 Logic & Workflows", "Workflows, actions, conditions", "A working web app core"],
        ["Weeks 4\u20135", "Part 5 \u00b7 Users, Auth & Data Operations", "Sign-up/login, permissions, CRUD", "User accounts + data flows"],
        ["Week 5", "Part 6 \u00b7 Mobile Apps (Adalo)", "Building native mobile apps", "A mobile app"],
        ["Weeks 5\u20136", "Part 7 \u00b7 Integrations, APIs & Payments", "Connecting services, APIs, payments", "An integrated, paid feature"],
        ["Weeks 6\u20137", "Part 8 \u00b7 Launch, Polish & Going Live", "Testing, polish, publishing", "A live, published app"],
        ["Weeks 7\u20138", "Part 9 \u00b7 Capstone & Career", "The No-Code Portfolio, freelancing & jobs", "Two portfolio apps + a plan"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a No-Code Developer Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (6\u201310 Weeks)", "0.4 Set Up Your Free Tools (Practical)"] },
        { title: "Part 1 \u2014 No-Code & Thinking Like a Builder",
          items: ["1.1 What No-Code Is (and Isn't)", "1.2 The Platforms: Bubble and Adalo", "1.3 Think Like a Developer (Practical)"] },
        { title: "Part 2 \u2014 Designing the Data",
          items: ["2.1 The Database Is the Foundation", "2.2 Data Types, Fields, and Relationships (Practical)", "2.3 Data Design Determines Everything"] },
        { title: "Part 3 \u2014 Building the UI (Bubble)",
          items: ["3.1 The Interface Is the App, to the User", "3.2 Pages, Elements, and Responsiveness (Practical)", "3.3 Designing for Usability"] },
        { title: "Part 4 \u2014 Logic & Workflows",
          items: ["4.1 Workflows Make the App Work", "4.2 Triggers, Actions, and Conditions (Practical)", "4.3 Building Real Functionality"] },
        { title: "Part 5 \u2014 Users, Auth & Data Operations",
          items: ["5.1 Real Apps Have Users", "5.2 Authentication and Per-User Data (Practical)", "5.3 Security and Data Privacy in No-Code"] },
        { title: "Part 6 \u2014 Mobile Apps (Adalo)",
          items: ["6.1 Mobile Apps with Adalo", "6.2 Building in Adalo (Practical)", "6.3 Web vs Mobile: Choosing the Right Tool"] },
        { title: "Part 7 \u2014 Integrations, APIs & Payments",
          items: ["7.1 Apps Don't Live Alone", "7.2 Integrations, APIs, and Payments (Practical)", "7.3 Building Complete, Real Products"] },
        { title: "Part 8 \u2014 Launch, Polish & Going Live",
          items: ["8.1 From Built to Launched", "8.2 Testing, Polishing, and Publishing (Practical)", "8.3 The Launch Mindset"] },
        { title: "Part 9 \u2014 Capstone, Portfolio & Career",
          items: ["9.1 THE CAPSTONE: The No-Code Portfolio", "9.2 Freelancing, Startups, and the Job Hunt"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 Mindset & Data on One Page", "A.2 UI & Logic on One Page", "A.3 Users, Mobile, Integrations & Launch on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "automation-specialist": {
      title: "Zapier/Make Automation Specialist",
      subtitle: "The complete workflow-automation training \u2014 the trigger-action model, building in Zapier, data & formatting, logic & branching, building in Make, APIs & webhooks, and reliability. Recommended duration: 4\u20136 weeks.",
      training: "training/automationspecialist/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 Automation & the Specialist", "What automation is, the platforms, the value", "An automation-opportunity list"],
        ["Week 1", "Part 2 \u00b7 The Core Model", "Triggers, actions, the anatomy of a workflow", "A mapped workflow"],
        ["Weeks 1\u20132", "Part 3 \u00b7 Building in Zapier", "Zaps, triggers, actions, first automations", "Working Zaps"],
        ["Week 2", "Part 4 \u00b7 Data, Fields & Formatting", "Moving data, mapping, formatting", "Clean data flows"],
        ["Weeks 2\u20133", "Part 5 \u00b7 Logic, Filters & Paths", "Conditions, filters, branching", "A smart, branching automation"],
        ["Week 3", "Part 6 \u00b7 Building in Make", "Visual scenarios, deeper power", "A Make scenario"],
        ["Weeks 3\u20134", "Part 7 \u00b7 APIs, Webhooks & Going Further", "Connecting anything via webhooks/APIs", "An API/webhook automation"],
        ["Week 4", "Part 8 \u00b7 Reliability, Errors & Best Practice", "Testing, error handling, monitoring", "A robust, monitored automation"],
        ["Weeks 4\u20135", "Part 9 \u00b7 Capstone & Career", "The Automation Toolkit, freelancing & jobs", "A toolkit + a client/job plan"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What an Automation Specialist Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (4\u20136 Weeks)", "0.4 Set Up Your Free Tools (Practical)"] },
        { title: "Part 1 \u2014 Automation & the Specialist",
          items: ["1.1 Automation: Making Software Work by Itself", "1.2 The Platforms: Zapier and Make", "1.3 The Value Lens (Practical)"] },
        { title: "Part 2 \u2014 The Core Model",
          items: ["2.1 Trigger Then Actions: The Universal Pattern", "2.2 The Anatomy of a Workflow (Practical)", "2.3 Mapping Before Building"] },
        { title: "Part 3 \u2014 Building in Zapier",
          items: ["3.1 From Concept to Working Zap", "3.2 Creating Zaps Step by Step (Practical)", "3.3 Building a Library of Real Automations"] },
        { title: "Part 4 \u2014 Data, Fields & Formatting",
          items: ["4.1 Automation Is Really About Moving Data", "4.2 Mapping and Formatting Data (Practical)", "4.3 Data Done Right"] },
        { title: "Part 5 \u2014 Logic, Filters & Paths",
          items: ["5.1 Beyond Linear: Adding Logic", "5.2 Filters, Paths, and Conditions (Practical)", "5.3 Modelling Real Processes"] },
        { title: "Part 6 \u2014 Building in Make (Advanced)",
          items: ["6.1 When You Need More Power", "6.2 Visual Scenarios in Make (Practical)", "6.3 Choosing the Right Tool"] },
        { title: "Part 7 \u2014 APIs, Webhooks & Going Further",
          items: ["7.1 Connecting to Anything", "7.2 Webhooks and API Requests (Practical)", "7.3 No Limits"] },
        { title: "Part 8 \u2014 Reliability, Errors & Best Practice",
          items: ["8.1 Automations Run Unattended at Scale", "8.2 Testing, Errors, and Monitoring (Practical)", "8.3 Professional Automation Practice"] },
        { title: "Part 9 \u2014 Capstone, Toolkit & Career",
          items: ["9.1 THE CAPSTONE: The Automation Toolkit", "9.2 Freelancing and the Job Hunt"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 The Model & Zapier on One Page", "A.2 Data & Logic on One Page", "A.3 Make, APIs & Reliability on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "operations-manager": {
      title: "Operations Manager",
      subtitle: "The complete operations management training \u2014 processes, Lean efficiency, KPIs, quality, supply & capacity, team leadership and continuous improvement. Recommended duration: 7\u201311 weeks.",
      training: "training/operationsmanager/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 The Operations Role", "Operations vs projects, the value chain, trade-offs", "An operations-role brief"],
        ["Weeks 1\u20132", "Part 2 \u00b7 Processes & Workflow", "Mapping how work flows, SOPs", "A process map"],
        ["Weeks 2\u20133", "Part 3 \u00b7 Efficiency & Lean", "Eliminating waste, bottlenecks", "A process-improvement proposal"],
        ["Weeks 3\u20134", "Part 4 \u00b7 Metrics, KPIs & Dashboards", "The right KPIs, dashboards", "An operations KPI dashboard"],
        ["Weeks 4\u20135", "Part 5 \u00b7 Quality Management", "Standards, control, prevention", "A quality management approach"],
        ["Week 5", "Part 6 \u00b7 Supply, Inventory & Resources", "Supply chain, inventory, capacity", "A supply/resource plan"],
        ["Weeks 5\u20136", "Part 7 \u00b7 People & Team Operations", "Scheduling, productivity, performance", "A team & capacity plan"],
        ["Weeks 6\u20137", "Part 8 \u00b7 Continuous Improvement", "Kaizen, PDCA, problem-solving", "A continuous-improvement framework"],
        ["Weeks 7\u20138", "Part 9 \u00b7 Capstone & Career", "The Operations Playbook, the job hunt", "A portfolio-ready playbook"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What an Operations Manager Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (7\u201311 Weeks)", "0.4 Set Up Your Free Toolkit (Practical)"] },
        { title: "Part 1 \u2014 The Operations Role",
          items: ["1.1 Operations Is the Ongoing Engine", "1.2 The Value Chain and Transformation", "1.3 The Operations Trade-Offs (Practical)"] },
        { title: "Part 2 \u2014 Processes & Workflow",
          items: ["2.1 Operations Is Made of Processes", "2.2 Mapping the Process (Practical)", "2.3 Standardising with SOPs"] },
        { title: "Part 3 \u2014 Efficiency & Lean",
          items: ["3.1 The Lean Mindset: Eliminate Waste", "3.2 Finding and Removing Waste (Practical)", "3.3 Bottlenecks and the Theory of Constraints"] },
        { title: "Part 4 \u2014 Metrics, KPIs & Dashboards",
          items: ["4.1 Measure to Manage", "4.2 The Right KPIs (Practical)", "4.3 The Operations Dashboard"] },
        { title: "Part 5 \u2014 Quality Management",
          items: ["5.1 Quality Is Consistency and Reliability", "5.2 Standards, Control, and Prevention (Practical)", "5.3 Quality Methodologies"] },
        { title: "Part 6 \u2014 Supply, Inventory & Resources",
          items: ["6.1 The Operation Needs the Right Inputs at the Right Time", "6.2 Inventory and Supply (Practical)", "6.3 Capacity and Demand"] },
        { title: "Part 7 \u2014 People & Team Operations",
          items: ["7.1 Operations Runs on People", "7.2 Scheduling, Productivity, and Performance (Practical)", "7.3 The Human Side of Operations"] },
        { title: "Part 8 \u2014 Continuous Improvement",
          items: ["8.1 Improvement Never Ends", "8.2 PDCA and Structured Problem-Solving (Practical)", "8.3 Building a Culture of Improvement"] },
        { title: "Part 9 \u2014 Capstone, Operations Playbook & Career",
          items: ["9.1 THE CAPSTONE: The Operations Playbook", "9.2 The Remote Job Hunt"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 Fundamentals & Process on One Page", "A.2 Efficiency & Metrics on One Page", "A.3 Quality, Resources & Improvement on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "scrum-master": {
      title: "Scrum Master",
      subtitle: "The complete Scrum Master training \u2014 the Agile mindset, the Scrum framework, roles, artefacts, the events, facilitation, impediments & coaching. Recommended duration: 5\u20138 weeks. Prepares you for PSM/CSM.",
      training: "training/scrummaster/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 Agile & the Scrum Master", "Agile values, servant-leadership", "An Agile & role brief"],
        ["Week 1", "Part 2 \u00b7 The Scrum Framework", "Pillars, values, how it fits together", "A Scrum framework map"],
        ["Weeks 1\u20132", "Part 3 \u00b7 The Scrum Team & Roles", "Scrum Master, Product Owner, Developers", "A team setup + working agreement"],
        ["Week 2", "Part 4 \u00b7 Artefacts & the Backlog", "Backlogs, increment, Definition of Done", "A backlog + DoD"],
        ["Weeks 2\u20133", "Part 5 \u00b7 Sprint Planning & the Sprint", "Planning, the sprint, the goal", "A sprint planning guide"],
        ["Weeks 3\u20134", "Part 6 \u00b7 Daily Scrum & Facilitation", "Standups, facilitation craft", "Facilitation guides"],
        ["Week 4", "Part 7 \u00b7 Review, Retrospective & Improvement", "Review, retro, inspect & adapt", "Review & retro guides"],
        ["Weeks 4\u20135", "Part 8 \u00b7 Impediments, Coaching & Anti-Patterns", "Unblocking, coaching, dysfunction", "An impediment & coaching playbook"],
        ["Weeks 5\u20136", "Part 9 \u00b7 Capstone & Career", "The Scrum Master Kit, certification", "A kit + PSM/CSM plan"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Scrum Master Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (5\u20138 Weeks)", "0.4 Set Up Your Free Toolkit (Practical)"] },
        { title: "Part 1 \u2014 Agile & the Scrum Master",
          items: ["1.1 The Agile Mindset", "1.2 The Scrum Master Is Not a Boss", "1.3 Why the Role Exists (Practical)"] },
        { title: "Part 2 \u2014 The Scrum Framework",
          items: ["2.1 Scrum: A Lightweight Framework", "2.2 The Three Pillars and the Values (Practical)", "2.3 Mapping How It Fits Together"] },
        { title: "Part 3 \u2014 The Scrum Team & Roles",
          items: ["3.1 One Team, Three Accountabilities", "3.2 The Three Roles (Practical)", "3.3 Building a Healthy Team"] },
        { title: "Part 4 \u2014 Artefacts & the Backlog",
          items: ["4.1 The Three Artefacts", "4.2 The Backlog and Its Refinement (Practical)", "4.3 The Commitments: Goal and Definition of Done"] },
        { title: "Part 5 \u2014 Sprint Planning & the Sprint",
          items: ["5.1 The Sprint: Scrum's Heartbeat", "5.2 Facilitating Sprint Planning (Practical)", "5.3 Protecting the Sprint"] },
        { title: "Part 6 \u2014 Daily Scrum & Facilitation",
          items: ["6.1 The Daily Scrum: The Team's Daily Sync", "6.2 The Craft of Facilitation (Practical)", "6.3 Facilitation Beyond the Events"] },
        { title: "Part 7 \u2014 Review, Retrospective & Improvement",
          items: ["7.1 Inspect the Product: The Sprint Review", "7.2 Inspect the Process: The Retrospective (Practical)", "7.3 The Inspect-and-Adapt Engine"] },
        { title: "Part 8 \u2014 Impediments, Coaching & Anti-Patterns",
          items: ["8.1 Removing Impediments", "8.2 Coaching Toward Self-Sufficiency (Practical)", "8.3 Recognising Anti-Patterns and 'Bad Scrum'"] },
        { title: "Part 9 \u2014 Capstone, Scrum Master Kit & Career",
          items: ["9.1 THE CAPSTONE: The Scrum Master Kit", "9.2 Certification and the Job Hunt"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 Agile, the Role & the Framework on One Page", "A.2 Team, Artefacts & Events on One Page", "A.3 Facilitation, Impediments & Coaching on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "healthcare-analyst": {
      title: "Healthcare Analyst",
      subtitle: "The complete healthcare analytics training \u2014 the domain, data & privacy, analysis, clinical & outcomes, operational & financial, quality & population health, and reporting. Recommended duration: 8\u201312 weeks.",
      training: "training/healthcareanalyst/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 The Healthcare Analyst Role", "Data + domain, data types", "A role & domain brief"],
        ["Weeks 1\u20132", "Part 2 \u00b7 The Healthcare Domain", "Care, payers, terminology, coding", "A healthcare-context map"],
        ["Weeks 2\u20133", "Part 3 \u00b7 Healthcare Data & Privacy", "EHRs, claims, HIPAA/GDPR", "A data & privacy primer"],
        ["Weeks 3\u20134", "Part 4 \u00b7 Data Analysis Foundations", "Cleaning, exploring, analysing", "A cleaned, explored dataset"],
        ["Weeks 4\u20135", "Part 5 \u00b7 Clinical & Outcomes Analysis", "Outcomes, cohorts, risk adjustment", "A clinical/outcomes analysis"],
        ["Weeks 5\u20136", "Part 6 \u00b7 Operational & Financial Analysis", "Efficiency, capacity, cost, claims", "An operational/cost analysis"],
        ["Weeks 6\u20137", "Part 7 \u00b7 Quality, Metrics & Population Health", "Quality measures, population health", "A quality-metrics dashboard"],
        ["Weeks 7\u20138", "Part 8 \u00b7 Visualisation, Reporting & Tools", "Dashboards, reports, BI/SQL", "A healthcare report + dashboard"],
        ["Weeks 8\u20139", "Part 9 \u00b7 Capstone & Career", "The Healthcare Analytics Portfolio", "A portfolio-ready body of analyses"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Healthcare Analyst Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (8\u201312 Weeks)", "0.4 Set Up Your Free Toolkit (Practical)"] },
        { title: "Part 1 \u2014 The Healthcare Analyst Role",
          items: ["1.1 Data Skill Meets Healthcare Knowledge", "1.2 The Questions Healthcare Analysts Answer", "1.3 The Data and the Mindset (Practical)"] },
        { title: "Part 2 \u2014 The Healthcare Domain",
          items: ["2.1 You Can't Analyse What You Don't Understand", "2.2 Care Delivery and Payers (Practical)", "2.3 Healthcare Terminology and Coding"] },
        { title: "Part 3 \u2014 Healthcare Data & Privacy",
          items: ["3.1 The Sources and Shape of Healthcare Data", "3.2 Privacy: The Non-Negotiable Duty (Practical)", "3.3 Data Standards and Interoperability"] },
        { title: "Part 4 \u2014 Data Analysis Foundations",
          items: ["4.1 The Analytical Process", "4.2 Cleaning and Exploring Healthcare Data (Practical)", "4.3 The Analyst's Tools"] },
        { title: "Part 5 \u2014 Clinical & Outcomes Analysis",
          items: ["5.1 Analysing the Care Itself", "5.2 Outcomes, Cohorts, and Risk Adjustment (Practical)", "5.3 Turning Analysis into Better Care"] },
        { title: "Part 6 \u2014 Operational & Financial Analysis",
          items: ["6.1 Making Healthcare Run Better and Cost Less", "6.2 Operational Analysis (Practical)", "6.3 Financial and Claims Analysis"] },
        { title: "Part 7 \u2014 Quality, Metrics & Population Health",
          items: ["7.1 Measuring Quality and Safety", "7.2 Quality Metrics and Dashboards (Practical)", "7.3 Population and Public Health Analytics"] },
        { title: "Part 8 \u2014 Visualisation, Reporting & Tools",
          items: ["8.1 Insight No One Can Act On Is Worthless", "8.2 Visualisation and Reporting (Practical)", "8.3 The Tools That Deliver It"] },
        { title: "Part 9 \u2014 Capstone, Portfolio & Career",
          items: ["9.1 THE CAPSTONE: The Healthcare Analytics Portfolio", "9.2 The Remote Job Hunt"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 Role, Domain & Privacy on One Page", "A.2 Analysis & Clinical/Outcomes on One Page", "A.3 Operational, Quality & Reporting on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "project-manager": {
      title: "Project Manager",
      subtitle: "The complete project management training \u2014 the charter, scope & WBS, scheduling, budgeting, risk, stakeholders, execution and methodologies. Recommended duration: 8\u201312 weeks.",
      training: "training/projectmanager/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 What a Project Is", "Projects, the triple constraint, the lifecycle", "A project-vision brief"],
        ["Weeks 1\u20132", "Part 2 \u00b7 Initiation & the Charter", "Defining the project, the charter, stakeholders", "A project charter"],
        ["Weeks 2\u20133", "Part 3 \u00b7 Scope & Requirements", "Scope, the WBS, scope creep", "A scope statement + WBS"],
        ["Weeks 3\u20134", "Part 4 \u00b7 Schedule & Time", "Dependencies, estimating, the critical path", "A project schedule"],
        ["Week 4", "Part 5 \u00b7 Cost & Resources", "Budgeting, estimating, resourcing", "A budget & resource plan"],
        ["Weeks 4\u20135", "Part 6 \u00b7 Risk & Quality", "The risk register, ensuring quality", "A risk register + quality plan"],
        ["Weeks 5\u20136", "Part 7 \u00b7 People & Communication", "Leading, stakeholders, communicating", "A stakeholder & communication plan"],
        ["Weeks 6\u20137", "Part 8 \u00b7 Execution & Closeout", "Running, tracking, change control, closing", "A tracking & closeout approach"],
        ["Weeks 7\u20138", "Part 9 \u00b7 Methodologies & Career", "Waterfall, Agile, the capstone, the job hunt", "The Project Playbook + cert path"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Project Manager Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (8\u201312 Weeks)", "0.4 Set Up Your Free Toolkit (Practical)"] },
        { title: "Part 1 \u2014 What a Project Is",
          items: ["1.1 Projects Are Temporary and Unique", "1.2 The Triple Constraint", "1.3 The Project Lifecycle (Practical)"] },
        { title: "Part 2 \u2014 Initiation & the Charter",
          items: ["2.1 Get the Why and What Right First", "2.2 The Project Charter (Practical)", "2.3 Identifying Stakeholders"] },
        { title: "Part 3 \u2014 Scope & Requirements",
          items: ["3.1 Scope: Exactly What Will (and Won't) Be Delivered", "3.2 The Work Breakdown Structure (Practical)", "3.3 Scope Creep: The Silent Killer"] },
        { title: "Part 4 \u2014 Schedule & Time",
          items: ["4.1 From Tasks to a Timeline", "4.2 Dependencies, Estimating, and the Critical Path (Practical)", "4.3 Managing the Schedule"] },
        { title: "Part 5 \u2014 Cost & Resources",
          items: ["5.1 The Money Constraint", "5.2 Budgeting and Estimating (Practical)", "5.3 Resource Management"] },
        { title: "Part 6 \u2014 Risk & Quality",
          items: ["6.1 Manage Risk Before It Bites", "6.2 The Risk Register (Practical)", "6.3 Quality Management"] },
        { title: "Part 7 \u2014 People, Stakeholders & Communication",
          items: ["7.1 Projects Are Delivered Through People", "7.2 Stakeholder Management (Practical)", "7.3 Communication: Most of the Job"] },
        { title: "Part 8 \u2014 Execution, Tracking & Closeout",
          items: ["8.1 Execution: Making the Plan Happen", "8.2 Tracking, Issues, and Change Control (Practical)", "8.3 Closeout: Finishing Properly"] },
        { title: "Part 9 \u2014 Methodologies, Capstone & Career",
          items: ["9.1 Methodologies: Waterfall and Agile", "9.2 THE CAPSTONE: The Project Playbook", "9.3 Certification and the Job Hunt"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 Fundamentals & Planning on One Page", "A.2 Schedule, Cost, Risk & People on One Page", "A.3 Execution, Closeout & Methods on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "product-manager": {
      title: "Product Manager",
      subtitle: "The complete product management training \u2014 the three lenses, user research, vision & strategy, prioritisation, requirements, Agile delivery, metrics and roadmaps. Recommended duration: 8\u201312 weeks.",
      training: "training/productmanager/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 What PM Is", "The three lenses, outcomes over output", "A product-thinking brief"],
        ["Weeks 1\u20132", "Part 2 \u00b7 Users & Problems", "User research, personas, jobs-to-be-done", "User research + personas"],
        ["Weeks 2\u20133", "Part 3 \u00b7 Vision & Strategy", "Vision, strategy, positioning", "A product vision & strategy"],
        ["Weeks 3\u20134", "Part 4 \u00b7 Prioritisation", "Frameworks, the MVP, saying no", "A prioritised backlog"],
        ["Weeks 4\u20135", "Part 5 \u00b7 Requirements", "Specs, user stories, working with design & eng", "A feature spec + user stories"],
        ["Weeks 5\u20136", "Part 6 \u00b7 Building (Agile)", "Agile/Scrum, the PM in delivery, shipping", "A delivery & release approach"],
        ["Weeks 6\u20137", "Part 7 \u00b7 Metrics & Data", "Success metrics, the North Star, experiments", "A product metrics framework"],
        ["Week 7", "Part 8 \u00b7 Roadmaps & Stakeholders", "The roadmap, stakeholder buy-in", "A product roadmap"],
        ["Weeks 7\u20138", "Part 9 \u00b7 Capstone & Career", "The Product Kit, the job hunt", "A portfolio-ready product kit"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Product Manager Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (8\u201312 Weeks)", "0.4 Set Up Your Free Toolkit (Practical)"] },
        { title: "Part 1 \u2014 What Product Management Is",
          items: ["1.1 The Intersection of Business, Users, and Technology", "1.2 Leading Through Influence", "1.3 Outcomes Over Output (Practical)"] },
        { title: "Part 2 \u2014 Users & Problems",
          items: ["2.1 Fall in Love With the Problem", "2.2 User Research (Practical)", "2.3 Personas and Jobs-to-be-Done"] },
        { title: "Part 3 \u2014 Vision & Strategy",
          items: ["3.1 The Vision: The North Star", "3.2 Strategy: How You'll Get There (Practical)", "3.3 From Strategy to Decisions"] },
        { title: "Part 4 \u2014 Prioritisation",
          items: ["4.1 The Core Skill Is Saying No", "4.2 Prioritisation Frameworks (Practical)", "4.3 The MVP and Iterative Value"] },
        { title: "Part 5 \u2014 Requirements & User Stories",
          items: ["5.1 The PM Defines the What, Not the How", "5.2 User Stories and Specs (Practical)", "5.3 Working With Design and Engineering"] },
        { title: "Part 6 \u2014 Building (Agile & the Team)",
          items: ["6.1 How Modern Products Are Built: Agile", "6.2 The PM in Agile Delivery (Practical)", "6.3 Ship, Learn, Iterate"] },
        { title: "Part 7 \u2014 Metrics & Data",
          items: ["7.1 Define Success, Then Measure It", "7.2 Product Metrics (Practical)", "7.3 Experiments and Data-Informed Decisions"] },
        { title: "Part 8 \u2014 Roadmaps & Stakeholders",
          items: ["8.1 The Roadmap: The Plan, Communicated", "8.2 Building a Useful Roadmap (Practical)", "8.3 Stakeholders and Communication"] },
        { title: "Part 9 \u2014 Capstone, Product Kit & Career",
          items: ["9.1 THE CAPSTONE: The Product Kit", "9.2 The Remote Job Hunt"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 Mindset & Users on One Page", "A.2 Strategy & Prioritisation on One Page", "A.3 Requirements, Building, Metrics & Roadmap on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "business-analyst": {
      title: "Business Analyst",
      subtitle: "The complete business analysis training \u2014 the problem, stakeholders, elicitation, process modelling, requirements, solutions, data and validation. Recommended duration: 7\u201311 weeks.",
      training: "training/businessanalyst/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 The BA Role", "The bridge, the analytical mindset, the lifecycle", "A BA role brief"],
        ["Weeks 1\u20132", "Part 2 \u00b7 Stakeholders & the Problem", "Root cause, the real problem, stakeholders", "A problem & stakeholder analysis"],
        ["Weeks 2\u20133", "Part 3 \u00b7 Eliciting Requirements", "Interviews, workshops, drawing out needs", "An elicitation plan + findings"],
        ["Weeks 3\u20134", "Part 4 \u00b7 Process Analysis", "As-is/to-be modelling, finding improvements", "Current & future process models"],
        ["Weeks 4\u20135", "Part 5 \u00b7 Documenting Requirements", "Clear requirements, user stories, the BRD", "A requirements document"],
        ["Weeks 5\u20136", "Part 6 \u00b7 Solutions & Design", "Evaluating options, the BA in delivery", "A solution recommendation"],
        ["Week 6", "Part 7 \u00b7 Data Analysis for BAs", "Using data to analyse & decide", "A data analysis"],
        ["Weeks 6\u20137", "Part 8 \u00b7 Validation & Delivery", "Testing, UAT, solving the real problem", "A validation & delivery approach"],
        ["Weeks 7\u20138", "Part 9 \u00b7 Capstone & Career", "The BA Toolkit, certification, the job hunt", "A portfolio-ready BA toolkit"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Business Analyst Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (7\u201311 Weeks)", "0.4 Set Up Your Free Toolkit (Practical)"] },
        { title: "Part 1 \u2014 The BA Role",
          items: ["1.1 The Bridge Between Problems and Solutions", "1.2 The Analytical Mindset", "1.3 Where the BA Fits (Practical)"] },
        { title: "Part 2 \u2014 Stakeholders & the Problem",
          items: ["2.1 Define the Real Problem", "2.2 Root-Cause Analysis (Practical)", "2.3 Stakeholder Analysis"] },
        { title: "Part 3 \u2014 Eliciting Requirements",
          items: ["3.1 Elicitation: Drawing Out the Real Needs", "3.2 Elicitation Techniques (Practical)", "3.3 From Elicitation to Understanding"] },
        { title: "Part 4 \u2014 Process Analysis & Modelling",
          items: ["4.1 Understand the Process to Improve It", "4.2 Process Modelling (Practical)", "4.3 Process Improvement and Gap Analysis"] },
        { title: "Part 5 \u2014 Documenting Requirements",
          items: ["5.1 Requirements: The BA's Central Deliverable", "5.2 Types of Requirements and How to Write Them (Practical)", "5.3 Validating and Managing Requirements"] },
        { title: "Part 6 \u2014 Solutions & Design",
          items: ["6.1 The Right Solution to the Real Problem", "6.2 Evaluating Solution Options (Practical)", "6.3 The BA in Delivery (Agile and Waterfall)"] },
        { title: "Part 7 \u2014 Data Analysis for BAs",
          items: ["7.1 Evidence, Not Just Opinion", "7.2 Data Analysis for Business Analysis (Practical)", "7.3 Communicating Insights"] },
        { title: "Part 8 \u2014 Validation & Delivery",
          items: ["8.1 Did It Actually Solve the Problem?", "8.2 Testing and UAT (Practical)", "8.3 Delivery, Rollout, and Realising Value"] },
        { title: "Part 9 \u2014 Capstone, BA Toolkit & Career",
          items: ["9.1 THE CAPSTONE: The BA Toolkit", "9.2 Certification and the Job Hunt"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 The Role & The Problem on One Page", "A.2 Elicitation & Process on One Page", "A.3 Requirements, Solutions, Data & Validation on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "social-media-manager": {
      title: "Social Media Manager",
      subtitle: "The complete social media management training \u2014 strategy, content, the calendar, engagement, growth, campaigns and analytics. Recommended duration: 6\u20139 weeks.",
      training: "training/socialmedia/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 Role & Strategy", "The role, goals, audience, strategy", "A social media strategy"],
        ["Weeks 1\u20132", "Part 2 \u00b7 Platforms & Voice", "Choosing platforms, profiles, brand voice", "A platform & voice plan"],
        ["Weeks 2\u20133", "Part 3 \u00b7 Content Creation", "Content types, formats, the workflow", "A set of created posts"],
        ["Weeks 3\u20134", "Part 4 \u00b7 Planning & Scheduling", "The calendar, batching, scheduling tools", "A content calendar + queue"],
        ["Week 4", "Part 5 \u00b7 Engagement & Community", "Replying, community, social listening", "An engagement plan"],
        ["Weeks 4\u20135", "Part 6 \u00b7 Growth", "Followers, reach, hooks, collaborations", "A growth plan"],
        ["Weeks 5\u20136", "Part 7 \u00b7 Campaigns & Paid", "Campaigns, launches, boosting/ads", "A social campaign"],
        ["Week 6", "Part 8 \u00b7 Analytics & Reporting", "Metrics, the client report", "An analytics & reporting framework"],
        ["Weeks 6\u20137", "Part 9 \u00b7 Capstone & Career", "The Social Playbook, the job hunt", "A portfolio-ready playbook"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Social Media Manager Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (6\u20139 Weeks)", "0.4 Set Up Your Free Toolkit (Practical)"] },
        { title: "Part 1 \u2014 The SMM Role & Strategy",
          items: ["1.1 Strategy Before Posting", "1.2 Goals, Audience, and the Strategy (Practical)", "1.3 Auditing Social Media (Practical)"] },
        { title: "Part 2 \u2014 Platforms & Brand Voice",
          items: ["2.1 Choosing the Right Platforms", "2.2 Optimising Profiles (Practical)", "2.3 Defining the Brand Voice"] },
        { title: "Part 3 \u2014 Content Creation",
          items: ["3.1 The Content Mix", "3.2 Formats and Creation (Practical)", "3.3 On-Brand and Efficient"] },
        { title: "Part 4 \u2014 Planning & Scheduling",
          items: ["4.1 The Content Calendar Is the Operating System", "4.2 Building the Calendar and Batching (Practical)", "4.3 Scheduling Tools"] },
        { title: "Part 5 \u2014 Engagement & Community",
          items: ["5.1 Social Media Is Social", "5.2 Engaging and Building Community (Practical)", "5.3 Social Listening and Customer Care"] },
        { title: "Part 6 \u2014 Growth",
          items: ["6.1 Growth Comes From the Fundamentals", "6.2 The Growth Levers (Practical)", "6.3 Growth as Strategy and Patience"] },
        { title: "Part 7 \u2014 Campaigns & Paid Basics",
          items: ["7.1 Campaigns: Coordinated Pushes Toward a Goal", "7.2 Planning a Campaign (Practical)", "7.3 Boosting and Paid Social Basics"] },
        { title: "Part 8 \u2014 Analytics & Reporting",
          items: ["8.1 Measure to Improve and to Prove", "8.2 What to Measure (Practical)", "8.3 Reporting and Continuous Improvement"] },
        { title: "Part 9 \u2014 Capstone, Social Playbook & Career",
          items: ["9.1 THE CAPSTONE: The Social Playbook", "9.2 The Remote Job Hunt"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 Strategy, Platforms & Content on One Page", "A.2 Planning, Engagement & Growth on One Page", "A.3 Campaigns & Analytics on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "email-marketer": {
      title: "Email Marketing Specialist",
      subtitle: "The complete email marketing training \u2014 list building, writing, automation, campaigns, segmentation, deliverability and analytics. Recommended duration: 5\u20138 weeks.",
      training: "training/emailmarketing/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 Why Email Wins", "ROI, owned channels, the strategy", "An email strategy"],
        ["Week 1", "Part 2 \u00b7 List Building", "Lead magnets, opt-ins, permission", "A list-growth plan"],
        ["Weeks 1\u20132", "Part 3 \u00b7 Writing Emails", "Subject lines, copy, the one CTA", "Written sample emails"],
        ["Weeks 2\u20133", "Part 4 \u00b7 Automation & Sequences", "Welcome series, drip campaigns", "A welcome automation sequence"],
        ["Week 3", "Part 5 \u00b7 Campaigns & Broadcasts", "Newsletters, promotions, launches", "A broadcast campaign"],
        ["Weeks 3\u20134", "Part 6 \u00b7 Segmentation", "Targeting, personalisation, lifecycle", "A segmentation plan"],
        ["Week 4", "Part 7 \u00b7 Deliverability & Compliance", "Inbox placement, spam, the law", "A deliverability & compliance checklist"],
        ["Weeks 4\u20135", "Part 8 \u00b7 Analytics", "Metrics, A/B testing, ROI", "An analytics & testing framework"],
        ["Weeks 5\u20136", "Part 9 \u00b7 Capstone & Career", "The Email Engine, the job hunt", "A portfolio-ready email system"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What an Email Marketing Specialist Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (5\u20138 Weeks)", "0.4 Set Up Your Free Toolkit (Practical)"] },
        { title: "Part 1 \u2014 Why Email Wins",
          items: ["1.1 The Highest-ROI, Owned Channel", "1.2 What Email Marketing Involves", "1.3 Setting an Email Strategy (Practical)"] },
        { title: "Part 2 \u2014 List Building",
          items: ["2.1 The List Is the Asset", "2.2 Lead Magnets and Opt-Ins (Practical)", "2.3 List Quality and Hygiene"] },
        { title: "Part 3 \u2014 Writing Emails",
          items: ["3.1 The Subject Line Decides Everything", "3.2 Writing the Email (Practical)", "3.3 Different Emails, Different Jobs"] },
        { title: "Part 4 \u2014 Automation & Sequences",
          items: ["4.1 Email That Works While You Sleep", "4.2 The Welcome Sequence (Practical)", "4.3 Other Key Automations"] },
        { title: "Part 5 \u2014 Campaigns & Broadcasts",
          items: ["5.1 Broadcasts: The Timely, One-Off Sends", "5.2 Newsletters and Promotional Campaigns (Practical)", "5.3 Planning the Broadcast Calendar"] },
        { title: "Part 6 \u2014 Segmentation & Personalisation",
          items: ["6.1 Not Everyone Should Get the Same Email", "6.2 Segmenting and Personalising (Practical)", "6.3 Behaviour-Based and Lifecycle Email"] },
        { title: "Part 7 \u2014 Deliverability & Compliance",
          items: ["7.1 If It Lands in Spam, Nothing Else Matters", "7.2 Protecting Deliverability (Practical)", "7.3 Compliance and the Law"] },
        { title: "Part 8 \u2014 Analytics & Optimisation",
          items: ["8.1 Email Is Precisely Measurable", "8.2 Reading the Metrics and A/B Testing (Practical)", "8.3 Continuous Optimisation and Proving ROI"] },
        { title: "Part 9 \u2014 Capstone, Email Engine & Career",
          items: ["9.1 THE CAPSTONE: The Email Engine", "9.2 The Remote Job Hunt"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 Why Email Wins, Lists & Writing on One Page", "A.2 Automation & Campaigns on One Page", "A.3 Segmentation, Deliverability & Analytics on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "copywriter": {
      title: "Copywriter",
      subtitle: "The complete copywriting training \u2014 research, headlines, persuasion, frameworks, sales pages, multi-format copy and editing. Recommended duration: 6\u20139 weeks.",
      training: "training/copywriter/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 What Copywriting Is", "Copy vs writing, the persuasion mindset", "A copy audit + swipe file"],
        ["Weeks 1\u20132", "Part 2 \u00b7 Research & The Reader", "Audience, product, the big idea", "A research & message brief"],
        ["Week 2", "Part 3 \u00b7 Headlines", "Hooks that stop & pull in", "20 headlines"],
        ["Weeks 2\u20133", "Part 4 \u00b7 Persuasion & Psychology", "Benefits, emotion, influence", "A persuasion toolkit applied"],
        ["Weeks 3\u20134", "Part 5 \u00b7 Frameworks", "AIDA, PAS, persuasive structures", "Copy built on frameworks"],
        ["Weeks 4\u20135", "Part 6 \u00b7 The Sales/Landing Page", "Long-form persuasion that sells", "A full sales/landing page"],
        ["Week 5", "Part 7 \u00b7 Copy Across Formats", "Ads, emails, web, product, social", "A multi-format copy set"],
        ["Weeks 5\u20136", "Part 8 \u00b7 Editing & Voice", "Editing to power, brand voice", "Edited, voiced copy"],
        ["Weeks 6\u20137", "Part 9 \u00b7 Capstone & Career", "The Copy Portfolio, the job hunt", "A portfolio-ready body of copy"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Copywriter Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (6\u20139 Weeks)", "0.4 Set Up Your Free Toolkit (Practical)"] },
        { title: "Part 1 \u2014 What Copywriting Is",
          items: ["1.1 Copy Has a Job: To Get Action", "1.2 The Persuasion Mindset", "1.3 The Swipe File and Copy Audit (Practical)"] },
        { title: "Part 2 \u2014 Research & The Reader",
          items: ["2.1 Great Copy Is Mostly Research", "2.2 Understanding the Reader (Practical)", "2.3 Product, Market, and the Big Idea"] },
        { title: "Part 3 \u2014 Headlines",
          items: ["3.1 The Headline Does 80% of the Work", "3.2 Writing Powerful Headlines (Practical)", "3.3 Headlines Everywhere"] },
        { title: "Part 4 \u2014 Persuasion & Psychology",
          items: ["4.1 People Buy with Emotion, Justify with Logic", "4.2 Benefits, Emotion, and Proof (Practical)", "4.3 Principles of Influence"] },
        { title: "Part 5 \u2014 Copywriting Frameworks",
          items: ["5.1 Frameworks Give Copy Its Structure", "5.2 AIDA, PAS, and the Core Frameworks (Practical)", "5.3 Frameworks in Practice"] },
        { title: "Part 6 \u2014 The Sales/Landing Page",
          items: ["6.1 The Page That Sells", "6.2 Anatomy of a Sales Page (Practical)", "6.3 Long Copy, Flow, and the One Goal"] },
        { title: "Part 7 \u2014 Copy Across Formats",
          items: ["7.1 Same Craft, Different Formats", "7.2 Writing for Each Format (Practical)", "7.3 Specialising and Versatility"] },
        { title: "Part 8 \u2014 Editing & Voice",
          items: ["8.1 Copy Is Rewritten, Not Written", "8.2 Editing to Power (Practical)", "8.3 Writing in a Brand's Voice"] },
        { title: "Part 9 \u2014 Capstone, Copy Portfolio & Career",
          items: ["9.1 THE CAPSTONE: The Copy Portfolio", "9.2 The Remote Job Hunt"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 Fundamentals & Research on One Page", "A.2 Headlines & Persuasion on One Page", "A.3 Frameworks, Sales Pages & Editing on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "digital-marketer": {
      title: "Digital Marketer",
      subtitle: "The complete digital marketing training \u2014 audience, the funnel, content, social, SEO, email, paid ads and analytics. Recommended duration: 7\u201310 weeks.",
      training: "training/digitalmarketer/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 Foundations", "The customer, value, the marketing mindset", "An audience & positioning brief"],
        ["Weeks 1\u20132", "Part 2 \u00b7 Strategy & the Funnel", "The funnel, the journey, goals", "A marketing funnel + strategy"],
        ["Weeks 2\u20133", "Part 3 \u00b7 Content & Inbound", "Attracting with value, lead magnets", "A content plan + sample"],
        ["Weeks 3\u20134", "Part 4 \u00b7 Social Media", "Platforms, hooks, community", "A social media campaign"],
        ["Week 4", "Part 5 \u00b7 Search & SEO Basics", "How search works, getting found", "An SEO foundation"],
        ["Weeks 4\u20135", "Part 6 \u00b7 Email & Owned", "Lists, automation, retention", "An email sequence"],
        ["Weeks 5\u20136", "Part 7 \u00b7 Paid Advertising", "Targeting, budgets, the economics", "A paid campaign plan"],
        ["Weeks 6\u20137", "Part 8 \u00b7 Analytics", "Metrics, attribution, testing, ROI", "An analytics & testing framework"],
        ["Weeks 7\u20138", "Part 9 \u00b7 Capstone & Career", "The Growth Plan, the job hunt", "A portfolio-ready growth plan"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Digital Marketer Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (7\u201310 Weeks)", "0.4 Set Up Your Free Toolkit (Practical)"] },
        { title: "Part 1 \u2014 Marketing Foundations",
          items: ["1.1 Marketing Starts With the Customer", "1.2 The Audience and the Value Exchange", "1.3 Audience & Positioning (Practical)"] },
        { title: "Part 2 \u2014 Strategy & the Funnel",
          items: ["2.1 The Marketing Funnel", "2.2 Mapping the Journey (Practical)", "2.3 Goals and Metrics"] },
        { title: "Part 3 \u2014 Content & Inbound Marketing",
          items: ["3.1 Attract, Don't Interrupt", "3.2 Creating Valuable Content (Practical)", "3.3 Lead Magnets and Capturing Interest"] },
        { title: "Part 4 \u2014 Social Media Marketing",
          items: ["4.1 Meet the Audience Where They Are", "4.2 Creating Content That Works on Social (Practical)", "4.3 Building a Social Strategy"] },
        { title: "Part 5 \u2014 Search & SEO Basics",
          items: ["5.1 Search Captures Intent", "5.2 How Search Ranking Works (Practical)", "5.3 SEO as a Long Game"] },
        { title: "Part 6 \u2014 Email & Owned Channels",
          items: ["6.1 Email: The Highest-ROI Channel You Own", "6.2 Building and Emailing a List (Practical)", "6.3 Owned vs Rented Channels"] },
        { title: "Part 7 \u2014 Paid Advertising",
          items: ["7.1 Paid Ads: Fast, Controllable, and Unforgiving", "7.2 The Anatomy of a Paid Campaign (Practical)", "7.3 The Economics: Making Ads Pay"] },
        { title: "Part 8 \u2014 Analytics & Optimisation",
          items: ["8.1 The Superpower Is Measurability", "8.2 What to Measure (Practical)", "8.3 Attribution and Testing"] },
        { title: "Part 9 \u2014 Capstone, Growth Plan & Career",
          items: ["9.1 THE CAPSTONE: The Growth Plan", "9.2 The Remote Job Hunt"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 Foundations & the Funnel on One Page", "A.2 The Channels on One Page", "A.3 Analytics & Economics on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "content-creator": {
      title: "Content Creator",
      subtitle: "The complete content creation training \u2014 niche, ideas, writing, video, platforms, growth and monetisation. Recommended duration: 8\u201312 weeks.",
      training: "training/contentcreator/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 The Creator Mindset", "Serving the audience, authenticity", "A creator audit"],
        ["Weeks 1\u20132", "Part 2 \u00b7 Niche, Brand & Audience", "Choosing a niche, your brand", "A niche & brand identity"],
        ["Weeks 2\u20133", "Part 3 \u00b7 Ideas & Strategy", "Idea systems, pillars, the calendar", "A content strategy + idea bank"],
        ["Weeks 3\u20134", "Part 4 \u00b7 Writing & Scripting", "Hooks, storytelling, CTAs", "Scripts & captions that work"],
        ["Weeks 4\u20135", "Part 5 \u00b7 Video & Visuals", "Filming, editing, design with a phone", "Created video & visual content"],
        ["Weeks 5\u20136", "Part 6 \u00b7 Platforms & Algorithms", "How each platform & algorithm works", "A platform-specific plan"],
        ["Weeks 6\u20137", "Part 7 \u00b7 Growth & Engagement", "Growing an audience, community", "A growth & engagement plan"],
        ["Weeks 7\u20138", "Part 8 \u00b7 Monetisation", "Turning content into income", "A monetisation strategy"],
        ["Weeks 8\u20139", "Part 9 \u00b7 Capstone & Career", "The Creator Kit, going independent or for clients", "A portfolio-ready creator kit"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Content Creator Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (8\u201312 Weeks)", "0.4 Set Up Your Free Toolkit (Practical)"] },
        { title: "Part 1 \u2014 The Creator Mindset",
          items: ["1.1 It's About the Audience, Not You", "1.2 Authenticity, Consistency, and the Long Game", "1.3 A Creator Audit (Practical)"] },
        { title: "Part 2 \u2014 Niche, Brand & Audience",
          items: ["2.1 The Niche: Focus Beats Broad", "2.2 Finding Your Niche and Brand (Practical)", "2.3 Knowing Your Audience"] },
        { title: "Part 3 \u2014 Ideas & Content Strategy",
          items: ["3.1 Ideas Are a System, Not a Lightning Bolt", "3.2 Content Pillars and the Idea Bank (Practical)", "3.3 The Content Calendar"] },
        { title: "Part 4 \u2014 Writing & Scripting",
          items: ["4.1 The Hook Is Everything", "4.2 Writing and Scripting for Content (Practical)", "4.3 Writing the Call to Action"] },
        { title: "Part 5 \u2014 Creating Video & Visuals",
          items: ["5.1 A Phone and Free Apps Are Enough", "5.2 Filming and Editing (Practical)", "5.3 Visuals, Thumbnails and Design"] },
        { title: "Part 6 \u2014 Platforms & Algorithms",
          items: ["6.1 Each Platform Is Its Own Game", "6.2 How Algorithms Work (Practical)", "6.3 Choosing Where to Focus"] },
        { title: "Part 7 \u2014 Growth & Engagement",
          items: ["7.1 Growth Comes From Great Content, Consistently", "7.2 Engagement and Community (Practical)", "7.3 Patience and Reading the Data"] },
        { title: "Part 8 \u2014 Monetisation",
          items: ["8.1 Many Ways to Earn", "8.2 The Monetisation Menu (Practical)", "8.3 Building Toward Income"] },
        { title: "Part 9 \u2014 Capstone, Creator Kit & Career",
          items: ["9.1 THE CAPSTONE: The Creator Kit", "9.2 Launching Your Creator Career"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 Mindset, Niche & Strategy on One Page", "A.2 Creation Craft on One Page", "A.3 Platforms, Growth & Money on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "seo-specialist": {
      title: "SEO Specialist",
      subtitle: "The complete SEO training \u2014 how search works, keywords, intent, on-page, technical, authority, local and measurement. Recommended duration: 7\u201310 weeks.",
      training: "training/seospecialist/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 How Search Works", "Crawl, index, rank, the three pillars", "An SEO mental model"],
        ["Weeks 1\u20132", "Part 2 \u00b7 Keyword Research", "Finding, evaluating, strategy", "A keyword strategy"],
        ["Weeks 2\u20133", "Part 3 \u00b7 Search Intent & Content", "Matching intent, content that ranks", "A content plan for rankings"],
        ["Weeks 3\u20134", "Part 4 \u00b7 On-Page SEO", "Titles, structure, internal linking", "An on-page optimisation plan"],
        ["Weeks 4\u20135", "Part 5 \u00b7 Technical SEO", "Crawling, speed, mobile, structured data", "A technical SEO audit"],
        ["Weeks 5\u20136", "Part 6 \u00b7 Off-Page & Authority", "Backlinks, E-E-A-T, link-earning", "An off-page strategy"],
        ["Week 6", "Part 7 \u00b7 Local & Specialised", "Local SEO, e-commerce, niches", "A local/specialised plan"],
        ["Weeks 6\u20137", "Part 8 \u00b7 Measurement & Tools", "Rankings, traffic, the SEO toolkit", "An SEO measurement dashboard"],
        ["Weeks 7\u20138", "Part 9 \u00b7 Capstone & Career", "The SEO Blueprint, the job hunt", "A portfolio-ready SEO blueprint"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What an SEO Specialist Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (7\u201310 Weeks)", "0.4 Set Up Your Free Toolkit (Practical)"] },
        { title: "Part 1 \u2014 How Search Works",
          items: ["1.1 Google's Goal Is Your Strategy", "1.2 Crawl, Index, Rank (Practical)", "1.3 The SEO Landscape"] },
        { title: "Part 2 \u2014 Keyword Research",
          items: ["2.1 Keywords Are the Foundation", "2.2 Finding and Evaluating Keywords (Practical)", "2.3 Building a Keyword Strategy"] },
        { title: "Part 3 \u2014 Search Intent & Content",
          items: ["3.1 Intent Beats Keywords", "3.2 Creating Content That Matches Intent (Practical)", "3.3 Content and SEO Are Inseparable"] },
        { title: "Part 4 \u2014 On-Page SEO",
          items: ["4.1 Making a Page Its Best Self for Search", "4.2 The On-Page Checklist (Practical)", "4.3 Internal Linking and Site Structure"] },
        { title: "Part 5 \u2014 Technical SEO",
          items: ["5.1 If Google Can't Access It, Nothing Else Matters", "5.2 The Technical SEO Audit (Practical)", "5.3 Structured Data and the Technical Edge"] },
        { title: "Part 6 \u2014 Off-Page SEO & Authority",
          items: ["6.1 Authority Is a Vote of Confidence", "6.2 Earning Authority and Links (Practical)", "6.3 Off-Page as a Long-Term Strategy"] },
        { title: "Part 7 \u2014 Local & Specialised SEO",
          items: ["7.1 Local SEO: Winning the Map", "7.2 Local SEO Essentials (Practical)", "7.3 E-Commerce and Other Specialisms"] },
        { title: "Part 8 \u2014 Measurement & Tools",
          items: ["8.1 SEO Must Be Measured to Be Managed", "8.2 What to Track and the Toolkit (Practical)", "8.3 The Long Game and Continuous Improvement"] },
        { title: "Part 9 \u2014 Capstone, SEO Blueprint & Career",
          items: ["9.1 THE CAPSTONE: The SEO Blueprint", "9.2 The Remote Job Hunt"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 How Search Works & Keywords on One Page", "A.2 Intent, On-Page & Technical on One Page", "A.3 Authority & Measurement on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "remote-team-lead": {
      title: "Remote Team Lead",
      subtitle: "The complete remote leadership training \u2014 communication, trust, goals, meetings, 1:1s, feedback, culture and wellbeing. Recommended duration: 6\u201310 weeks.",
      training: "training/remotelead/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 The Remote Shift", "What changes when the team is distributed", "A leadership self-audit"],
        ["Weeks 1\u20132", "Part 2 \u00b7 Communication & Async", "Sync vs async, clarity, over-communication", "A communication charter"],
        ["Weeks 2\u20133", "Part 3 \u00b7 Trust & Accountability", "Leading by outcomes, no micromanaging", "An accountability framework"],
        ["Weeks 3\u20134", "Part 4 \u00b7 Goals & Delegation", "Goal-setting, delegating, visible tracking", "A goals + delegation system"],
        ["Weeks 4\u20135", "Part 5 \u00b7 Meetings That Work", "Purposeful meetings, facilitation, cadence", "A meeting system"],
        ["Week 5", "Part 6 \u00b7 1:1s & Coaching", "Developing people, the 1:1, coaching", "A 1:1 framework"],
        ["Weeks 5\u20136", "Part 7 \u00b7 Feedback & Hard Talks", "Feedback, performance, conflict remotely", "A feedback + hard-conversation kit"],
        ["Weeks 6\u20137", "Part 8 \u00b7 Culture & Wellbeing", "Belonging, burnout, inclusion across distance", "A culture & wellbeing plan"],
        ["Weeks 7\u20138", "Part 9 \u00b7 Capstone & Career", "The Remote Team Playbook, the job hunt", "A portfolio-ready toolkit"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Remote Team Lead Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (6\u201310 Weeks)", "0.4 Set Up Your Free Toolkit (Practical)"] },
        { title: "Part 1 \u2014 The Remote Leadership Shift",
          items: ["1.1 Distance Breaks the Defaults", "1.2 What Changes, Concretely", "1.3 A Leadership Self-Audit (Practical)"] },
        { title: "Part 2 \u2014 Communication & Async",
          items: ["2.1 Communication Is the Whole Job", "2.2 Synchronous vs Asynchronous (Practical)", "2.3 The Communication Charter"] },
        { title: "Part 3 \u2014 Trust & Accountability",
          items: ["3.1 You Cannot Watch, So You Must Trust", "3.2 Building Trust Across Distance", "3.3 Accountability Without Micromanagement (Practical)"] },
        { title: "Part 4 \u2014 Goals, Delegation & Tracking",
          items: ["4.1 Clear Goals Align a Scattered Team", "4.2 Delegating Effectively (Practical)", "4.3 Visible Tracking"] },
        { title: "Part 5 \u2014 Meetings That Work",
          items: ["5.1 Most Remote Meetings Shouldn't Exist", "5.2 Running a Great Remote Meeting (Practical)", "5.3 The Meeting Cadence"] },
        { title: "Part 6 \u2014 One-on-Ones & Coaching",
          items: ["6.1 The 1:1 Is Where Remote Leadership Happens", "6.2 Running a Great 1:1 (Practical)", "6.3 Coaching, Not Just Directing"] },
        { title: "Part 7 \u2014 Feedback & Difficult Conversations",
          items: ["7.1 Feedback Is Harder and More Important Remotely", "7.2 Giving Constructive Feedback (Practical)", "7.3 Performance Issues and Conflict"] },
        { title: "Part 8 \u2014 Culture, Connection & Wellbeing",
          items: ["8.1 Culture Doesn't Happen by Accident Remotely", "8.2 Building Connection and Belonging (Practical)", "8.3 Wellbeing and Preventing Burnout"] },
        { title: "Part 9 \u2014 Capstone, Playbook & Career",
          items: ["9.1 THE CAPSTONE: The Remote Team Playbook", "9.2 The Leadership Job Hunt"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 Mindset & Communication on One Page", "A.2 Trust, Goals & Meetings on One Page", "A.3 1:1s, Feedback & Culture on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "technical-support": {
      title: "Technical Support Specialist",
      subtitle: "The complete technical support training \u2014 foundations, troubleshooting, communication, escalation, bug reporting and documentation. Recommended duration: 6\u201310 weeks.",
      training: "training/techsupport/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 The Tech Support Role", "Where it sits, empathy plus competence", "A support audit (technical lens)"],
        ["Weeks 1\u20132", "Part 2 \u00b7 Technical Foundations", "How software, accounts, browsers, networks work", "A mental model of the stack"],
        ["Weeks 2\u20133", "Part 3 \u00b7 The Troubleshooting Method", "Systematic diagnosis, reproduce, isolate", "A reusable troubleshooting method"],
        ["Weeks 3\u20134", "Part 4 \u00b7 Technical Communication", "Explaining tech simply, guiding fixes", "A plain-language fix guide"],
        ["Week 4", "Part 5 \u00b7 Common Issue Categories", "Login, performance, errors, data, integration", "A category playbook"],
        ["Weeks 4\u20135", "Part 6 \u00b7 Tools of the Trade", "Help desks, logs, the dev console", "Tool fluency demonstrated"],
        ["Weeks 5\u20136", "Part 7 \u00b7 Escalation & Bug Reporting", "When/how to escalate; great bug reports", "An escalation + bug-report kit"],
        ["Weeks 6\u20137", "Part 8 \u00b7 Documentation & Knowledge", "KB articles, self-service, reducing tickets", "A knowledge-base article"],
        ["Weeks 7\u20138", "Part 9 \u00b7 Capstone & Career", "The Tech Support Toolkit, the job hunt", "A portfolio-ready toolkit"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Technical Support Specialist Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (6\u201310 Weeks)", "0.4 Set Up Your Free Toolkit (Practical)"] },
        { title: "Part 1 \u2014 The Tech Support Role",
          items: ["1.1 Empathy Plus Competence", "1.2 Where Tech Support Sits (and Tiers)", "1.3 A Support Audit, Technical Lens (Practical)"] },
        { title: "Part 2 \u2014 Technical Foundations",
          items: ["2.1 You Diagnose Better When You Understand How Things Work", "2.2 The Essential Mental Model (Practical)", "2.3 Core Concepts to Know"] },
        { title: "Part 3 \u2014 The Troubleshooting Method",
          items: ["3.1 Troubleshooting Is a Method, Not a Guess", "3.2 The Troubleshooting Process (Practical)", "3.3 When You're Stuck"] },
        { title: "Part 4 \u2014 Technical Communication",
          items: ["4.1 Translate, Don't Talk Down or Over", "4.2 Guiding a User Through a Fix (Practical)", "4.3 Communicating Bad News and Limits"] },
        { title: "Part 5 \u2014 Common Issue Categories",
          items: ["5.1 Most Issues Fall Into Familiar Families", "5.2 The Category Playbooks (Practical)", "5.3 Building Your Own Playbook"] },
        { title: "Part 6 \u2014 Tools of the Trade",
          items: ["6.1 The Support Specialist's Toolkit", "6.2 The Browser Developer Console (Practical)", "6.3 Logs, Remote Tools and Learning Fast"] },
        { title: "Part 7 \u2014 Escalation & Bug Reporting",
          items: ["7.1 Knowing When to Escalate", "7.2 Writing a Great Bug Report (Practical)", "7.3 Owning the Handoff"] },
        { title: "Part 8 \u2014 Documentation & Knowledge",
          items: ["8.1 A Solved Problem Documented Is Solved Forever", "8.2 Writing a Knowledge-Base Article (Practical)", "8.3 Reducing Tickets at the Source"] },
        { title: "Part 9 \u2014 Capstone, Toolkit & Career",
          items: ["9.1 THE CAPSTONE: The Tech Support Toolkit", "9.2 The Remote Job Hunt & Tech Career Path"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 The Role & Foundations on One Page", "A.2 The Troubleshooting Method on One Page", "A.3 Communication, Escalation & Docs on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "executive-assistant": {
      title: "Executive Assistant (Remote)",
      subtitle: "The complete EA training \u2014 calendar mastery, communication, prioritisation, meetings & travel, anticipation, discretion and the operating rhythm. Recommended duration: 5\u20138 weeks.",
      training: "training/execassistant/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 The EA Role", "Strategic partner, trust, the partnership", "The role mapped"],
        ["Week 1", "Part 2 \u00b7 Calendar Mastery", "Owning & optimising the calendar, protecting time", "A managed executive calendar"],
        ["Weeks 1\u20132", "Part 3 \u00b7 Inbox & Communication", "Triage, writing in their voice, gatekeeping", "An inbox system + voice samples"],
        ["Weeks 2\u20133", "Part 4 \u00b7 Prioritisation & Gatekeeping", "Filtering, what reaches them, saying no", "A prioritisation framework"],
        ["Week 3", "Part 5 \u00b7 Meetings & Travel", "Meeting prep, agendas, complex travel", "A meeting + travel kit"],
        ["Weeks 3\u20134", "Part 6 \u00b7 Anticipation & Proactivity", "Thinking ahead, follow-through, initiative", "A proactivity system"],
        ["Week 4", "Part 7 \u00b7 Systems & Discretion", "EA tools, systems, confidentiality, security", "A systems + discretion plan"],
        ["Weeks 4\u20135", "Part 8 \u00b7 The Operating Rhythm", "Daily/weekly routines, the cadence", "A daily/weekly operating rhythm"],
        ["Weeks 5\u20136", "Part 9 \u00b7 Capstone & Career", "The EA Command Center, the premium job hunt", "A portfolio-ready EA package"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Remote Executive Assistant Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (5\u20138 Weeks)", "0.4 Set Up Your Free Toolkit (Practical)"] },
        { title: "Part 1 \u2014 The EA Role & Partnership",
          items: ["1.1 A Strategic Partner, Not a Task-Doer", "1.2 The Relationship Is Built on Trust", "1.3 Mapping the Role (Practical)"] },
        { title: "Part 2 \u2014 Calendar Mastery",
          items: ["2.1 The Calendar Is the Job", "2.2 Strategic Calendar Management (Practical)", "2.3 Owning the Calendar"] },
        { title: "Part 3 \u2014 Inbox & Communication",
          items: ["3.1 Taming the Executive Inbox", "3.2 Writing in the Executive's Voice (Practical)", "3.3 Gatekeeping With Grace"] },
        { title: "Part 4 \u2014 Prioritisation & Gatekeeping",
          items: ["4.1 You Are the Filter", "4.2 A Prioritisation Framework (Practical)", "4.3 Saying No on Their Behalf"] },
        { title: "Part 5 \u2014 Meetings & Travel",
          items: ["5.1 Making the Executive Walk in Prepared", "5.2 Meeting Coordination (Practical)", "5.3 Travel and Complex Logistics"] },
        { title: "Part 6 \u2014 Anticipation & Proactivity",
          items: ["6.1 Anticipation Is the Difference", "6.2 Owning Follow-Through (Practical)", "6.3 Taking Initiative Within Trust"] },
        { title: "Part 7 \u2014 Tools, Systems & Discretion",
          items: ["7.1 Systems Make You Reliable at the Highest Level", "7.2 Advanced Tool Use (Practical)", "7.3 Discretion, Confidentiality and Security"] },
        { title: "Part 8 \u2014 The Operating Rhythm",
          items: ["8.1 An EA Runs on Rhythm", "8.2 The Daily & Weekly Rhythm (Practical)", "8.3 The Remote Operating Rhythm"] },
        { title: "Part 9 \u2014 Capstone, Command Center & Career",
          items: ["9.1 THE CAPSTONE: The EA Command Center", "9.2 The Premium Remote Job Hunt"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 The Role & Calendar on One Page", "A.2 Communication & Prioritisation on One Page", "A.3 Meetings, Proactivity & Discretion on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "community-manager": {
      title: "Community Manager",
      subtitle: "The complete community management training \u2014 strategy, engagement, moderation, events and metrics. Recommended duration: 6\u20138 weeks.",
      training: "training/community/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 Foundations", "Audience vs community, the role, platforms", "A community audit"],
        ["Weeks 1\u20132", "Part 2 \u00b7 Strategy & Setup", "Purpose, platform, structure, rules", "A strategy + setup plan"],
        ["Weeks 2\u20133", "Part 3 \u00b7 Onboarding", "First impressions, welcome systems, belonging", "A welcome flow"],
        ["Weeks 3\u20134", "Part 4 \u00b7 Engagement", "Sparking talk, rituals, the calendar", "An engagement calendar"],
        ["Week 4", "Part 5 \u00b7 Moderation & Safety", "Guidelines, conflict, trolls, escalation", "Moderation guidelines"],
        ["Weeks 4\u20135", "Part 6 \u00b7 Events & Programmes", "AMAs, challenges, ambassadors", "A community event plan"],
        ["Weeks 5\u20136", "Part 7 \u00b7 Voice & Crisis", "Tone, announcements, handling backlash", "An announcement + crisis plan"],
        ["Week 6", "Part 8 \u00b7 Metrics & Reporting", "Health metrics, reporting value", "A dashboard & report"],
        ["Weeks 6\u20137", "Part 9 \u00b7 Capstone & Career", "The Hub plan & kit, the job hunt", "A portfolio-ready plan"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Community Manager Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (6\u20138 Weeks)", "0.4 Set Up Your Free Toolkit (Practical)"] },
        { title: "Part 1 \u2014 Community Foundations",
          items: ["1.1 Audience vs Community", "1.2 The True Role of a Community Manager", "1.3 The Platform Landscape & a Community Audit (Practical)"] },
        { title: "Part 2 \u2014 Strategy & Setup",
          items: ["2.1 Purpose Comes First", "2.2 Choosing the Platform and Structure (Practical)", "2.3 The Rules and Culture"] },
        { title: "Part 3 \u2014 Onboarding & Welcoming",
          items: ["3.1 The First Five Minutes Decide Everything", "3.2 Building a Welcome System (Practical)", "3.3 Creating Belonging"] },
        { title: "Part 4 \u2014 Engagement & Conversation",
          items: ["4.1 You Host the Conversation, You Don't Dominate It", "4.2 Content That Invites Participation (Practical)", "4.3 Rituals and the Engagement Calendar"] },
        { title: "Part 5 \u2014 Moderation & Safety",
          items: ["5.1 A Community Is Only as Safe as Its Worst-Tolerated Behaviour", "5.2 Handling Conflict, Spam and Trolls (Practical)", "5.3 Guidelines and Escalation"] },
        { title: "Part 6 \u2014 Events & Programmes",
          items: ["6.1 Events Give People Reasons to Return", "6.2 Event Formats (Practical)", "6.3 Planning and Running an Event"] },
        { title: "Part 7 \u2014 Voice, Communication & Crisis",
          items: ["7.1 You Are the Human Voice of the Brand", "7.2 Clear Announcements (Practical)", "7.3 Handling Crisis and Backlash"] },
        { title: "Part 8 \u2014 Metrics & Reporting",
          items: ["8.1 Measuring What Matters", "8.2 Building a Dashboard (Practical)", "8.3 Reporting Community Value"] },
        { title: "Part 9 \u2014 Capstone, Portfolio & Career",
          items: ["9.1 THE CAPSTONE: The Hub", "9.2 The Job Hunt"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 The Role & Setup on One Page", "A.2 Engagement & Moderation on One Page", "A.3 Events, Voice & Metrics on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "customer-support": {
      title: "Customer Support Specialist",
      subtitle: "The complete customer support training \u2014 empathy, communication, the process, channels, de-escalation and metrics. Recommended duration: 5\u20138 weeks.",
      training: "training/support/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 The Support Mindset", "Empathy, the role, what 'great' means", "A support audit"],
        ["Week 1", "Part 2 \u00b7 Communication", "Tone, clarity, empathy in writing", "A response rewritten the great way"],
        ["Weeks 1\u20132", "Part 3 \u00b7 The Support Process", "Ticket lifecycle, problem-solving, follow-up", "A problem solved end to end"],
        ["Weeks 2\u20133", "Part 4 \u00b7 Channels & Tools", "Email, chat, phone, social; help desks", "Channel-appropriate responses"],
        ["Weeks 3\u20134", "Part 5 \u00b7 Hard Conversations", "Angry customers, de-escalation, saying no", "A de-escalation playbook"],
        ["Week 4", "Part 6 \u00b7 Product & Troubleshooting", "Product knowledge, structured fixes, KB", "A troubleshooting flow + KB article"],
        ["Weeks 4\u20135", "Part 7 \u00b7 Efficiency", "Macros, self-service, working at scale", "A personal macro library"],
        ["Week 5", "Part 8 \u00b7 Metrics & Quality", "CSAT, response/resolution, quality", "How you're measured"],
        ["Weeks 5\u20136", "Part 9 \u00b7 Capstone & Career", "The SupportDesk portfolio, remote jobs", "A portfolio-ready support kit"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Customer Support Specialist Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (5\u20138 Weeks)", "0.4 Set Up Your Free Toolkit (Practical)"] },
        { title: "Part 1 \u2014 The Support Mindset",
          items: ["1.1 Support Is About People, Not Tickets", "1.2 What 'Great Support' Actually Means", "1.3 A Support Audit (Practical)"] },
        { title: "Part 2 \u2014 Communication Skills: The Core Craft",
          items: ["2.1 Empathy in Writing", "2.2 Tone and Clarity (Practical)", "2.3 Active Listening and Asking the Right Questions"] },
        { title: "Part 3 \u2014 The Support Process",
          items: ["3.1 The Ticket Lifecycle", "3.2 Structured Problem-Solving (Practical)", "3.3 Follow-Up: Never Leave Them Hanging"] },
        { title: "Part 4 \u2014 Channels & Tools",
          items: ["4.1 Each Channel Has Its Own Rules", "4.2 Channel-Appropriate Responses (Practical)", "4.3 Help Desks and Tools"] },
        { title: "Part 5 \u2014 Hard Conversations: Angry Customers & Complaints",
          items: ["5.1 The Angry Customer Is Your Real Test", "5.2 The De-Escalation Playbook (Practical)", "5.3 Saying No, and Holding the Line"] },
        { title: "Part 6 \u2014 Product Knowledge & Troubleshooting",
          items: ["6.1 You Can't Help With What You Don't Understand", "6.2 Structured Troubleshooting (Practical)", "6.3 Writing Knowledge-Base Articles"] },
        { title: "Part 7 \u2014 Efficiency & Self-Service",
          items: ["7.1 Fast and Human Are Not Opposites", "7.2 Macros and Templates (Practical)", "7.3 Self-Service and Working at Scale"] },
        { title: "Part 8 \u2014 Metrics & Quality",
          items: ["8.1 How Support Is Measured", "8.2 Quality Over Pure Speed", "8.3 Quality Standards and Continuous Improvement (Practical)"] },
        { title: "Part 9 \u2014 Capstone, Portfolio & Career",
          items: ["9.1 THE CAPSTONE: The SupportDesk Portfolio", "9.2 The Remote Job Hunt"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 Mindset & Communication on One Page", "A.2 Process & Hard Conversations on One Page", "A.3 Troubleshooting & Metrics on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "virtual-assistant": {
      title: "Virtual Assistant",
      subtitle: "The complete VA training \u2014 admin systems, communication, tools, deliverables, SOPs, specialising and getting clients. Recommended duration: 5\u20138 weeks.",
      training: "training/va/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 The VA Landscape", "The role, the services, the opportunity", "Your service map"],
        ["Week 1", "Part 2 \u00b7 Core Admin", "Inbox, calendar, data, files", "A managed inbox & calendar system"],
        ["Weeks 1\u20132", "Part 3 \u00b7 Communication", "Client comms, tone, boundaries", "A client communication kit"],
        ["Weeks 2\u20133", "Part 4 \u00b7 Tools of the Trade", "Workspace, scheduling, PM, comms", "Tool fluency demonstrated"],
        ["Week 3", "Part 5 \u00b7 Research & Documents", "Web research, data, document prep", "A research + document deliverable"],
        ["Weeks 3\u20134", "Part 6 \u00b7 Systems & SOPs", "SOPs, task/time management", "An SOP + a productivity system"],
        ["Week 4", "Part 7 \u00b7 Specialising", "Niches, premium skills, adding value", "A specialism + value plan"],
        ["Weeks 4\u20135", "Part 8 \u00b7 Getting Clients", "Finding, pitching, onboarding, retention", "A pitch + onboarding process"],
        ["Weeks 5\u20136", "Part 9 \u00b7 Capstone & Career", "The VA Toolkit, launching", "A client-ready VA package"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Virtual Assistant Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (5\u20138 Weeks)", "0.4 Set Up Your Free Toolkit (Practical)"] },
        { title: "Part 1 \u2014 The VA Landscape",
          items: ["1.1 The Breadth of VA Work", "1.2 Who Hires VAs and Why", "1.3 The Opportunity & Your Service Map (Practical)"] },
        { title: "Part 2 \u2014 Core Admin Skills",
          items: ["2.1 Inbox Management: Taming the Chaos", "2.2 Calendar & Scheduling (Practical)", "2.3 Data Entry and File Organisation"] },
        { title: "Part 3 \u2014 Communication & Professionalism",
          items: ["3.1 Communication Is Your Real Product", "3.2 Managing Expectations and Updates (Practical)", "3.3 Boundaries and Professionalism"] },
        { title: "Part 4 \u2014 Tools of the Trade",
          items: ["4.1 Google Workspace: The Backbone", "4.2 Scheduling, PM and Communication Tools (Practical)", "4.3 Working Across Tools Smoothly"] },
        { title: "Part 5 \u2014 Research, Data & Documents",
          items: ["5.1 Research: Finding What the Client Needs", "5.2 Data Work and Presentation (Practical)", "5.3 Document Preparation"] },
        { title: "Part 6 \u2014 Systems, SOPs & Productivity",
          items: ["6.1 Your Value Is Making Things Systematic", "6.2 SOPs: Documenting How Things Are Done (Practical)", "6.3 Task & Time Management"] },
        { title: "Part 7 \u2014 Specialising & Adding Value",
          items: ["7.1 General VAs Compete on Price; Specialists Command Rates", "7.2 High-Value Specialisms (Practical)", "7.3 Becoming Indispensable"] },
        { title: "Part 8 \u2014 Getting & Keeping Clients",
          items: ["8.1 Where VA Clients Come From", "8.2 Pitching and Proposals (Practical)", "8.3 Onboarding and Retention"] },
        { title: "Part 9 \u2014 Capstone, Portfolio & Career",
          items: ["9.1 THE CAPSTONE: The VA Toolkit", "9.2 Launching Your VA Career"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 The Role & Core Skills on One Page", "A.2 Communication & Systems on One Page", "A.3 Value & Getting Clients on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "video-editor": {
      title: "Video Editor",
      subtitle: "The complete video editing training \u2014 the cut, sound, colour, captions and social/long-form. Recommended duration: 6\u201310 weeks.",
      training: "training/video/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 Mindset & Workflow", "Story, the timeline, the pipeline", "Footage organised, first rough cut"],
        ["Weeks 1\u20132", "Part 2 \u00b7 The Cut & Pacing", "Cut types, rhythm, J/L cuts", "A scene cut for rhythm"],
        ["Weeks 2\u20133", "Part 3 \u00b7 Sound Design", "Music, SFX, dialogue, mixing", "An edit that sounds professional"],
        ["Weeks 3\u20134", "Part 4 \u00b7 Colour", "Correction, grading, matching shots", "Footage corrected and graded"],
        ["Weeks 4\u20135", "Part 5 \u00b7 Text & Titles", "Captions, lower-thirds, motion", "Captioned, titled, on-brand"],
        ["Weeks 5\u20136", "Part 6 \u00b7 Social & Short-Form", "Vertical, hooks, retention", "A scroll-stopping Reel"],
        ["Weeks 6\u20137", "Part 7 \u00b7 Long-Form & Story", "Interviews, promos, structure", "A structured 60-second promo"],
        ["Week 7", "Part 8 \u00b7 Export & Delivery", "Codecs, settings, per-platform", "Exports that play everywhere"],
        ["Weeks 7\u20138", "Part 9 \u00b7 Capstone & Career", "Lagos Eats package, the reel", "A showreel ready to share"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Video Editor Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (6\u201310 Weeks)", "0.4 Set Up Your Free Editor (Practical)"] },
        { title: "Part 1 \u2014 The Editor's Mindset & Workflow",
          items: ["1.1 Editing Is Decision-Making", "1.2 The Professional Workflow", "1.3 Organise, Then Rough Cut (Practical)"] },
        { title: "Part 2 \u2014 The Cut & Pacing: The Editor's Superpower",
          items: ["2.1 Pacing: When You Cut Is Everything", "2.2 Cut Types (Practical)", "2.3 Cutting to Rhythm"] },
        { title: "Part 3 \u2014 Sound Design: Half the Experience",
          items: ["3.1 Why Sound Matters More Than You Think", "3.2 Music, SFX and Dialogue (Practical)", "3.3 Mixing: Getting the Levels Right"] },
        { title: "Part 4 \u2014 Colour Correction & Grading",
          items: ["4.1 Correction vs Grading: Two Different Jobs", "4.2 Correcting Footage (Practical)", "4.3 Creating a Look (Grading)"] },
        { title: "Part 5 \u2014 Text, Titles & Motion",
          items: ["5.1 Text Carries the Message", "5.2 Captions and Lower-Thirds (Practical)", "5.3 Simple Motion and Branding"] },
        { title: "Part 6 \u2014 Social & Short-Form Editing",
          items: ["6.1 The Rules of Short-Form", "6.2 Cut a Reel (Practical)"] },
        { title: "Part 7 \u2014 Long-Form & Storytelling",
          items: ["7.1 Structure Holds Attention", "7.2 Editing an Interview (Practical)", "7.3 The Branded Promo"] },
        { title: "Part 8 \u2014 Export & Delivery",
          items: ["8.1 Getting the Export Right", "8.2 Exporting Per Platform (Practical)", "8.3 Delivery and File Management"] },
        { title: "Part 9 \u2014 Capstone, Reel & Career",
          items: ["9.1 THE CAPSTONE: The Lagos Eats Content Package", "9.2 The Showreel and the Job Hunt"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 The Cut & Pacing on One Page", "A.2 Sound & Colour on One Page", "A.3 Short-Form & Export on One Page"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "3d-artist": {
      title: "3D Artist / Animator",
      subtitle: "The complete 3D training in Blender \u2014 modelling, texturing, lighting, rendering, animation and rigging. Recommended duration: 12\u201316 weeks.",
      training: "training/threed/index.html",
      roadmap: [
        ["Weeks 1\u20132", "Part 1 \u00b7 The 3D World", "Navigation, viewport, the pipeline", "Comfortable in 3D space"],
        ["Weeks 2\u20134", "Part 2 \u00b7 Modelling", "Meshes, edit mode, core tools", "A clean modelled object"],
        ["Weeks 4\u20135", "Part 3 \u00b7 Materials & Texturing", "Shaders, PBR, UV unwrapping", "A textured, realistic object"],
        ["Weeks 5\u20137", "Part 4 \u00b7 Lighting & Rendering", "Light types, engines, settings", "A beautifully lit render"],
        ["Weeks 7\u20138", "Part 5 \u00b7 Composition & Camera", "Framing, lenses, staging", "A composed product shot"],
        ["Weeks 8\u201310", "Part 6 \u00b7 Animation", "Keyframes, graph editor, principles", "A turntable + bouncing ball"],
        ["Weeks 10\u201311", "Part 7 \u00b7 Character & Rigging", "Armatures, rigging, posing", "A posed, rigged character"],
        ["Weeks 11\u201312", "Part 8 \u00b7 Production", "Render layers, denoising, compositing", "An optimised final render"],
        ["Weeks 12\u201314", "Part 9 \u00b7 Capstone & Career", "The Still Life + turntable, the reel", "A showreel ready to share"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a 3D Artist / Animator Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (12\u201316 Weeks)", "0.4 Install Blender (Practical)"] },
        { title: "Part 1 \u2014 The 3D World & Blender's Interface",
          items: ["1.1 Thinking in Three Dimensions", "1.2 The Viewport and Objects (Practical)", "1.3 The 3D Pipeline"] },
        { title: "Part 2 \u2014 Modelling Fundamentals",
          items: ["2.1 How 3D Models Are Built", "2.2 The Core Modelling Tools (Practical)", "2.3 Modelling Approaches"] },
        { title: "Part 3 \u2014 Materials & Texturing",
          items: ["3.1 PBR: How Surfaces Work", "3.2 Building Materials (Practical)", "3.3 UV Unwrapping"] },
        { title: "Part 4 \u2014 Lighting & Rendering",
          items: ["4.1 Light Makes the Image", "4.2 Three-Point Lighting (Practical)", "4.3 The Render Engines"] },
        { title: "Part 5 \u2014 Composition & the Camera",
          items: ["5.1 The Camera Is a Designed Choice", "5.2 Composing the Shot (Practical)", "5.3 Telling a Story With the Scene"] },
        { title: "Part 6 \u2014 Animation Fundamentals",
          items: ["6.1 Keyframes and the Graph Editor", "6.2 The Turntable and the Bouncing Ball (Practical)", "6.3 The Principles, in 3D"] },
        { title: "Part 7 \u2014 Character & Rigging Basics",
          items: ["7.1 Rigging: Giving a Model a Skeleton", "7.2 Rig and Pose a Simple Character (Practical)", "7.3 A Simple Walk or Action"] },
        { title: "Part 8 \u2014 Production & Optimisation",
          items: ["8.1 Rendering Efficiently", "8.2 Compositing: The Final Polish (Practical)", "8.3 Output: Stills and Animation"] },
        { title: "Part 9 \u2014 Capstone, Reel & Career",
          items: ["9.1 THE CAPSTONE: The Still Life", "9.2 The Reel and the Job Hunt"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 Blender Essentials on One Page", "A.2 Materials & Lighting on One Page", "A.3 Pipeline, Animation & Output"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
    "brand-designer": {
      title: "Brand Identity Designer",
      subtitle: "The complete brand identity training \u2014 strategy, naming, logo systems, colour, type, imagery and guidelines. Recommended duration: 6\u20138 weeks.",
      training: "training/brand/index.html",
      roadmap: [
        ["Week 1", "Part 1 \u00b7 What a Brand Is", "Strategy, the system, recognition", "A brand audit"],
        ["Weeks 1\u20132", "Part 2 \u00b7 Brand Strategy", "Purpose, audience, positioning, personality", "A brand strategy brief"],
        ["Week 2", "Part 3 \u00b7 Naming & Voice", "Names, taglines, voice & tone", "A name, tagline & voice"],
        ["Weeks 2\u20133", "Part 4 \u00b7 Logo Design", "Logo types, the process, the system", "A logo system"],
        ["Weeks 3\u20134", "Part 5 \u00b7 Colour & Type", "Brand palettes, type systems, meaning", "A palette + type system"],
        ["Weeks 4\u20135", "Part 6 \u00b7 Imagery & Elements", "Photo style, patterns, the look", "A complete visual language"],
        ["Week 5", "Part 7 \u00b7 Applications", "Cards, packaging, social, signage", "The brand applied, on mockups"],
        ["Weeks 5\u20136", "Part 8 \u00b7 Brand Guidelines", "The brand book that protects it all", "A full guidelines document"],
        ["Weeks 6\u20137", "Part 9 \u00b7 Capstone & Career", "The Terra identity, the case study", "Portfolio-ready brand identity"]
      ],
      modules: [
        { title: "Part 0 \u2014 Start Here: How This Guide Works",
          items: ["0.1 What a Brand Identity Designer Actually Does", "0.2 The Golden Rules", "0.3 The Recommended Roadmap (6\u20138 Weeks)", "0.4 Set Up Your Free Toolkit (Practical)"] },
        { title: "Part 1 \u2014 What a Brand Really Is",
          items: ["1.1 Brand vs Identity vs Logo", "1.2 Why Systems Create Recognition", "1.3 The Brand Audit (Practical)"] },
        { title: "Part 2 \u2014 Brand Strategy: The Foundation",
          items: ["2.1 Strategy Comes Before Aesthetics", "2.2 The Strategy Components (Practical)", "2.3 Brand Personality and Archetypes"] },
        { title: "Part 3 \u2014 Naming & Verbal Identity",
          items: ["3.1 The Brand Is Also Words", "3.2 Naming and Taglines", "3.3 Brand Voice and Tone (Practical)"] },
        { title: "Part 4 \u2014 Logo Design: The Cornerstone Mark",
          items: ["4.1 What Makes a Logo Work", "4.2 The Logo Process (Practical)", "4.3 The Logo System"] },
        { title: "Part 5 \u2014 Colour & Typography: The Brand's Voice in Visuals",
          items: ["5.1 Colour as Brand Recognition", "5.2 Typography as Personality", "5.3 Building the Visual Voice"] },
        { title: "Part 6 \u2014 Imagery & Brand Elements",
          items: ["6.1 The Rest of the Visual Language", "6.2 Imagery Style (Practical)", "6.3 Patterns, Icons and Graphic Devices"] },
        { title: "Part 7 \u2014 Applications & Mockups",
          items: ["7.1 A Brand Lives on Touchpoints", "7.2 Designing Key Applications (Practical)", "7.3 Presenting With Mockups"] },
        { title: "Part 8 \u2014 Brand Guidelines: The Crown Deliverable",
          items: ["8.1 Why Guidelines Are the Point", "8.2 Building the Brand Book (Practical)", "8.3 The Complete System"] },
        { title: "Part 9 \u2014 Capstone, Portfolio & Career",
          items: ["9.1 THE CAPSTONE: The Terra Brand Identity", "9.2 The Business of Brand Design"] },
        { title: "Appendix A \u2014 Quick-Reference Cheat Sheets",
          items: ["A.1 The Brand System on One Page", "A.2 Strategy & Verbal on One Page", "A.3 Logo & Guidelines Checklist"] },
        { title: "Appendix B \u2014 The Recommended Daily Study Plan",
          items: ["B.1 The Plan"] }
      ]
    },
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
