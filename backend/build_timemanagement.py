#!/usr/bin/env python3
"""Builds training/timemanagement/ (index + part0–11) from the content below,
using the shared Mentorine training-page head from training/va/part1.html.
Run from the repo root:  python3 backend/build_timemanagement.py
"""
import html, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "training", "timemanagement")
COURSE = "time-management"
COURSE_NAME = "Time Management"
DURATION = "3–5 weeks"

src = open(os.path.join(ROOT, "training", "va", "part1.html"), encoding="utf-8").read()
HEAD = src[: src.index("</head>") + len("</head>")]

def slug(t):
    t = re.sub(r"<[^>]+>", "", t).lower().replace("&amp;", "")
    return re.sub(r"[^a-z0-9]+", "-", t).strip("-")

NAV = """<header class="site" data-live="off">
  <nav class="nav">
    <a class="brand" href="../../index.html" style="text-decoration:none">
      <img class="mark" src="../../assets/logo.svg" alt="The Mentorine School mark">
      <span class="wm">
        <span class="wm-the">THE</span>
        <span class="wm-name">MENTORINE</span>
        <span class="wm-school">SCHOOL</span>
        <span class="wm-sub">BY ONA SERVICES</span>
      </span>
    </a>
    <div class="nav-right">
      <a class="nav-link" href="index.html">Curriculum</a>
      <button class="theme-btn" id="themeBtn" aria-label="Toggle dark mode" title="Toggle dark mode">◐</button>
    </div>
  </nav>
</header>"""

FOOT = f"""<footer class="site">
  <div class="col">
    <div><span class="bm">Mentorine<span class="bm-i">School</span></span> · thementorineschool.com</div>
    <div>{COURSE_NAME} · a recommended {DURATION}</div>
    <div>&copy; 2026 Mentorine School by Ona Services Ltd. All rights reserved.</div>
  </div>
</footer>

<script src="../../assets/app.js"></script>
<script>MS.initTheme();</script>
<script>window.MS_GATE={{course:"{COURSE}",home:"../../"}};</script>
<script src="../../assets/gate.js"></script>
<script>window.LIVELINESS={{accent:"#0D8C4F",distance:14,duration:900}};</script>
<script src="../../assets/liveliness.js" defer></script>
</body>
</html>
"""

def head(title):
    return re.sub(r"<title>.*?</title>",
                  f"<title>{html.escape(title)} — {COURSE_NAME} · The Mentorine School</title>",
                  HEAD, count=1).replace('<html lang="en">', '<html lang="en" data-theme="day">', 1)

def checkpoint(text):
    return f'<div class="callout"><div class="co-label">CHECKPOINT</div><p>{text}</p></div>'

def tip(text, label="REMEMBER"):
    return f'<div class="callout"><div class="co-label">{label}</div><p>{text}</p></div>'

# --------------------------------------------------------------------------
# CONTENT. Each part: kicker, short title, card blurb, milestone, sections.
# A section is (heading, html_body).
# --------------------------------------------------------------------------
PARTS = [
 dict(kicker="PART 0 · START HERE", short="Start Here", title="Start Here: How This Guide Works",
  blurb="Why time management is the meta-skill of remote work, the golden rules, the roadmap and the simple toolkit you'll use throughout.",
  mile="Toolkit set up, baseline recorded",
  sections=[
  ("0.1 Why Time Management Is the Meta-Skill", """
<p>Every other skill you learn at The Mentorine School depends on this one. A brilliant designer who misses deadlines loses clients. An average developer who ships reliably gets promoted. In remote work nobody stands over your shoulder: <strong>you are your own manager</strong>, and the way you spend your hours is the main thing people see.</p>
<p>Time management is not squeezing more tasks into a day. It is three things working together:</p>
<ul>
<li><strong>Direction</strong>: knowing what actually matters, so effort goes to the right places.</li>
<li><strong>Organisation</strong>: a trusted system holding every commitment, so nothing slips and your mind is free.</li>
<li><strong>Execution</strong>: the focus, habits and energy to do the work, day after day, without burning out.</li>
</ul>
<p>This guide walks through all three, then has you assemble them into one personal system you'll keep using long after the course ends.</p>"""),
  ("0.2 The Golden Rules", """
<ol>
<li><strong>Effective before efficient.</strong> Doing the wrong task quickly is still wasted time. Decide what matters first.</li>
<li><strong>Capture everything.</strong> Your head is for having ideas, not storing them. If it matters, it goes in the system.</li>
<li><strong>Plan the week, then the day.</strong> Ten minutes of planning saves an hour of drifting.</li>
<li><strong>Protect your focus.</strong> Attention is the scarce resource. Guard it like money.</li>
<li><strong>Start small.</strong> Two minutes of action beats two hours of worrying about the task.</li>
<li><strong>Systems beat willpower.</strong> Design your environment and routines so the right choice is the easy choice.</li>
<li><strong>Rest is part of the work.</strong> Sustainable pace wins over heroic sprints.</li>
</ol>"""),
  ("0.3 The Recommended Roadmap (3–5 Weeks)", """
<div class="tbl-wrap"><table><thead><tr><th>Week</th><th>Parts</th><th>Outcome</th></tr></thead><tbody>
<tr><td>1</td><td>Parts 0–3: Start, Where Your Time Goes, Goals &amp; Priorities, Capturing</td><td>A time audit, clear priorities, a working task system</td></tr>
<tr><td>2</td><td>Parts 4–5: Planning, Focus</td><td>A planned week with protected focus blocks</td></tr>
<tr><td>3</td><td>Parts 6–7: Procrastination, Habits &amp; Routines</td><td>Reliable starts and daily routines</td></tr>
<tr><td>4–5</td><td>Parts 8–9: Energy &amp; Balance, Your System</td><td>A sustainable, documented Productivity System</td></tr>
</tbody></table></div>
<p>The weeks are a recommendation, not a deadline. Checkpoints measure progress, not the calendar. Each part takes about 2–4 hours including the practical, and the practicals are applied to <em>your real life</em>: your actual work, studies and commitments.</p>"""),
  ("0.4 Set Up Your Simple Toolkit (Practical)", """
<p>You don't need expensive apps. Choose one of each and stick with it for the whole course:</p>
<div class="tbl-wrap"><table><thead><tr><th>Purpose</th><th>Free options</th></tr></thead><tbody>
<tr><td>Task list</td><td>Google Tasks, Microsoft To Do, Todoist (free), or a paper notebook</td></tr>
<tr><td>Calendar</td><td>Google Calendar or Outlook Calendar</td></tr>
<tr><td>Notes &amp; planning</td><td>Google Docs, Notion (free), or a notebook</td></tr>
<tr><td>Timer</td><td>Your phone's timer, or any Pomodoro app</td></tr>
</tbody></table></div>
<pre><code>SETUP CHECKLIST
[ ] Pick ONE task app (or notebook) and install it on phone + laptop
[ ] Create calendar on your phone with notifications ON
[ ] Create a document/page called "My Productivity System"
[ ] Write down, honestly (1–10):
      How in control of my time do I feel?      __
      How often do I finish what I planned?     __
      How rested do I feel at the end of a week? __
[ ] Save these numbers. You'll compare them in Part 9.</code></pre>
""" + checkpoint("Your toolkit is installed and your baseline scores are written in \"My Productivity System\". Keep that document open, because every part from here adds a section to it.")),
  ]),

 dict(kicker="PART 1 · WEEK 1", short="Where Your Time Goes", title="Where Your Time Goes",
  blurb="Awareness comes first: audit how you really spend your hours, spot your patterns and leaks, and turn that picture into intention.",
  mile="A clear picture of your time",
  sections=[
  ("1.1 Awareness Comes First", """
<p>Most people badly misjudge where their time goes. They think they work eight hours and actually do three hours of focused work; they think they spend \"a few minutes\" on their phone and it adds up to four hours. You cannot improve what you cannot see.</p>
<p>Common <strong>time leaks</strong>:</p>
<ul>
<li><strong>Switching</strong>: jumping between tasks, chats and tabs. Each switch costs minutes of refocusing.</li>
<li><strong>Reactive work</strong>: answering every message the moment it arrives, so your day is set by other people.</li>
<li><strong>Scrolling</strong>: social media and video, often in \"just a quick check\" bursts.</li>
<li><strong>Unclear tasks</strong>: sitting in front of \"work on the project\" without knowing the next step.</li>
<li><strong>Hidden overhead</strong>: commuting, power cuts, data issues, searching for files, waiting.</li>
</ul>"""),
  ("1.2 Auditing Your Time and Patterns (Practical)", """
<p>For <strong>three ordinary days</strong>, log what you do in 30-minute blocks. Be honest. Nobody else will see it.</p>
<pre><code>TIME LOG — Day __            Energy: H / M / L
Time         What I did                         Category        Energy
06:00–06:30  Woke, phone in bed                 Leak            L
06:30–07:00  Bath, breakfast                    Life            M
07:00–07:30  Replied WhatsApp messages          Reactive        M
...
CATEGORIES:  Deep work · Shallow work · Reactive · Life/admin
             Learning · Rest (real) · Leak</code></pre>
<p>At the end of day three, total the hours per category and answer:</p>
<ol>
<li>How many hours of real <strong>deep work</strong> did I do per day?</li>
<li>What were my two biggest leaks?</li>
<li>When was my energy highest? (This becomes important in Parts 4 and 8.)</li>
<li>What surprised me?</li>
</ol>"""),
  ("1.3 From Awareness to Intention", """
<p>The audit is a mirror, not a judgement. Now decide what you want instead. Write a short <strong>Time Intention</strong>: what you'll do more of, what less of, and one leak you'll plug this week.</p>
<pre><code>MY TIME INTENTION
More of:  2 hours of deep work every weekday morning
Less of:  phone in bed (was 50 min/day)
This week's one plug: phone charges outside the bedroom</code></pre>
""" + tip("Change one leak at a time. Fixing everything at once is the most common way to fix nothing.") +
  checkpoint("Your three-day time log, the category totals, your answers to the four questions, and your Time Intention are in \"My Productivity System\".")),
  ]),

 dict(kicker="PART 2 · WEEK 1", short="Goals & Priorities", title="Goals &amp; Priorities",
  blurb="Effectiveness before efficiency: set goals that matter, then use the Eisenhower matrix and the 80/20 rule to choose what to do first.",
  mile="Clear priorities",
  sections=[
  ("2.1 Effectiveness Before Efficiency", """
<p><strong>Efficiency</strong> is doing things right. <strong>Effectiveness</strong> is doing the right things. A perfectly organised day spent on unimportant tasks is still a wasted day. Before you optimise <em>how</em> you work, decide <em>what</em> deserves your time.</p>
<p>Think of it as three levels, each feeding the next:</p>
<ul>
<li><strong>Direction (1–3 years)</strong>: where you're heading. \"Work remotely as a data analyst for an international company.\"</li>
<li><strong>Goals (this quarter)</strong>: concrete results that move you there. \"Finish the Data Analyst course and publish 3 portfolio projects by March.\"</li>
<li><strong>Priorities (this week/today)</strong>: the tasks that move the goals. \"Finish Part 4 practical; clean dataset for project 1.\"</li>
</ul>"""),
  ("2.2 Goals and Prioritisation (Practical)", """
<h3>Write SMART goals</h3>
<p>Specific, Measurable, Achievable, Relevant, Time-bound. \"Get better at Excel\" becomes \"Complete the Microsoft Office course and build one dashboard by 30 June.\"</p>
<h3>The Eisenhower Matrix</h3>
<div class="tbl-wrap"><table><thead><tr><th></th><th>Urgent</th><th>Not urgent</th></tr></thead><tbody>
<tr><td><strong>Important</strong></td><td><strong>DO</strong>: crises, real deadlines</td><td><strong>SCHEDULE</strong>: learning, planning, health, relationships, deep work</td></tr>
<tr><td><strong>Not important</strong></td><td><strong>DELEGATE / MINIMISE</strong>: many messages, some meetings</td><td><strong>DELETE</strong>: mindless scrolling, busywork</td></tr>
</tbody></table></div>
<p>The quadrant that changes lives is <strong>Important but Not Urgent</strong>. Nothing forces you to do it, so it gets pushed aside, and that's exactly why it must be scheduled.</p>
<h3>The 80/20 rule</h3>
<p>Roughly 20% of your activities produce 80% of your results. Ask of every list: <em>which one or two items, if done, would make the biggest difference?</em></p>
<pre><code>PRACTICAL
1. Write your Direction (1 sentence).
2. Write 1–3 SMART goals for the next 90 days.
3. Brain-dump every task on your mind (aim for 20+).
4. Place each one in the Eisenhower matrix.
5. Circle your top 3 "Important, not urgent" tasks — these get calendar time in Part 4.</code></pre>"""),
  ("2.3 Focusing on What Matters", """
<p>Prioritising means saying no, or \"not now\", to good things so you can say yes to the best things. Practise a polite no:</p>
<pre><code>"Thanks for thinking of me. I can't take this on this week
 because I'm committed to ___. Could I help on ___ instead?"</code></pre>
""" + checkpoint("Your Direction, 90-day SMART goals, filled Eisenhower matrix and top 3 priorities are in \"My Productivity System\".")),
  ]),

 dict(kicker="PART 3 · WEEKS 1–2", short="Capturing & Organising", title="Capturing &amp; Organising Tasks",
  blurb="Your head is a bad to-do list. Build a trusted system that captures everything and organises it into clear next actions.",
  mile="A working task system",
  sections=[
  ("3.1 Your Head Is a Bad To-Do List", """
<p>Every unfinished commitment you're holding in your head (reply to Tunde, pay the electricity bill, finish the assignment) quietly uses mental energy. Your mind reminds you at the wrong times and forgets at the important ones. The fix is to <strong>get it all out</strong> into a system you trust.</p>
<p>The flow, adapted from David Allen's <em>Getting Things Done</em>:</p>
<ol>
<li><strong>Capture</strong>: anything that grabs your attention goes into one inbox (your task app or notebook).</li>
<li><strong>Clarify</strong>: what is it? Is it actionable? What's the very next physical step?</li>
<li><strong>Organise</strong>: put it in the right place (list, calendar, reference or bin).</li>
<li><strong>Review</strong>: check the system regularly so you trust it (Part 4).</li>
<li><strong>Engage</strong>: do the work, choosing confidently from your lists.</li>
</ol>"""),
  ("3.2 Capturing and Organising (Practical)", """
<p>Create these lists in your task app:</p>
<div class="tbl-wrap"><table><thead><tr><th>List</th><th>What goes there</th></tr></thead><tbody>
<tr><td>Inbox</td><td>Everything, quickly, unsorted. Empty it daily.</td></tr>
<tr><td>Next Actions</td><td>Concrete single steps: \"Email Ada the invoice\", not \"Invoice\".</td></tr>
<tr><td>Projects</td><td>Anything needing more than one step. Each must have at least one next action.</td></tr>
<tr><td>Waiting For</td><td>Things you're waiting on from others, with the date you asked.</td></tr>
<tr><td>Someday/Maybe</td><td>Ideas you're not committing to now.</td></tr>
<tr><td>Calendar</td><td>Only things tied to a specific day or time.</td></tr>
</tbody></table></div>
<pre><code>PROCESSING RULES (for each Inbox item)
Is it actionable?
 ├─ No  → Bin it · File it as reference · Someday/Maybe
 └─ Yes → Takes under 2 minutes?  → DO IT NOW
          Someone else should do it? → Delegate + "Waiting For"
          Specific date/time?        → Calendar
          Otherwise                  → Next Actions (or Project + next action)</code></pre>
<p>Now do a full <strong>mind sweep</strong>: 20 minutes writing down every open loop: work, study, home, family, money, health. Then process the inbox to zero.</p>"""),
  ("3.3 A Clear Mind and a Handle on Everything", """
<p>The goal is not a perfect app. It's the feeling that <em>everything is captured and nothing is being forgotten</em>. Make capture effortless: keep your app on your phone's home screen, and when someone asks for something in a WhatsApp chat or a call, capture it immediately.</p>
""" + tip("Write next actions starting with a verb: Call, Email, Draft, Buy, Read. If you can't picture yourself doing it, it's not a next action yet.") +
  checkpoint("Your lists are set up, your mind sweep is done, and your inbox has been processed to zero at least once. Note in \"My Productivity System\" how many open loops you found.")),
  ]),

 dict(kicker="PART 4 · WEEK 2", short="Planning Days & Weeks", title="Planning Your Days &amp; Weeks",
  blurb="A plan turns intention into action: run a weekly review, plan each day, and time-block your calendar so priorities actually happen.",
  mile="A planned week",
  sections=[
  ("4.1 A Plan Turns Intention into Action", """
<p>Goals live in your head; plans live on your calendar. Without a plan, the day fills with whatever shouts loudest. With one, you decide in advance, and the decisions you make calmly on Sunday are better than the ones you make tired on Wednesday afternoon.</p>"""),
  ("4.2 Daily/Weekly Planning and Time Blocking (Practical)", """
<h3>The Weekly Review (30–45 minutes, same time every week)</h3>
<pre><code>WEEKLY REVIEW
1. GET CLEAR   Empty all inboxes (task app, notebook, email flags, WhatsApp saved)
2. LOOK BACK   What got done? What didn't, and why?
3. LOOK AHEAD  Check calendar for the next 2 weeks; note deadlines
4. GOALS       Review 90-day goals. What moves them forward this week?
5. CHOOSE      Pick 3 "Big Rocks" for the week
6. BLOCK       Put the Big Rocks into the calendar as appointments</code></pre>
<h3>Time blocking</h3>
<p>Instead of a list you hope to get through, give each important task a <strong>block of time</strong> on your calendar. Put deep work in your highest-energy hours (from your Part 1 audit). Batch similar shallow tasks together, such as messages, admin and calls.</p>
<pre><code>SAMPLE REMOTE WORKDAY
07:00–07:30  Morning routine (Part 7)
07:30–07:40  Daily plan: review calendar, pick Top 3
07:45–10:15  DEEP WORK BLOCK — Big Rock #1   (phone away)
10:15–10:30  Break
10:30–11:30  Messages & email batch
11:30–13:00  Deep work — Big Rock #2
13:00–14:00  Lunch, walk
14:00–15:30  Meetings / shallow work
15:30–16:00  Buffer (things always overrun)
16:00–16:15  Shutdown: capture loose ends, plan tomorrow</code></pre>
<h3>The daily plan (10 minutes)</h3>
<ol>
<li>Look at today's calendar.</li>
<li>Choose your <strong>Top 3</strong>: if only these get done, today was a good day.</li>
<li>Make sure each one has a time block.</li>
</ol>"""),
  ("4.3 Proactive, Not Reactive", """
<p>Plans will break: power cuts, urgent client requests, family needs. That's normal. Leave <strong>buffer blocks</strong>, plan only about 60–70% of your time, and when things change, re-plan in two minutes rather than abandoning the plan.</p>
""" + checkpoint("Do your first Weekly Review, choose 3 Big Rocks and time-block next week in your calendar. Screenshot the week and add it to \"My Productivity System\".")),
  ]),

 dict(kicker="PART 5 · WEEKS 2–3", short="Focus & Distraction", title="Focus &amp; Beating Distraction",
  blurb="Attention is the scarce resource. Practise deep work, the Pomodoro technique and a distraction-proof environment.",
  mile="Sustained focus",
  sections=[
  ("5.1 Attention Is the Scarce Resource", """
<p>Your phone and apps are designed by very smart people to capture your attention. Every notification pulls you out of focus, and research on task-switching suggests it can take many minutes to fully return to deep concentration. A day of constant interruptions can feel busy and produce very little.</p>
<p><strong>Deep work</strong> (Cal Newport's term) is focused, uninterrupted effort on demanding tasks. It's where valuable output comes from: writing, coding, designing, analysing, learning. <strong>Shallow work</strong> is everything else. Both are necessary, but deep work is what gets you hired and promoted.</p>"""),
  ("5.2 Deep Work and Killing Distraction (Practical)", """
<h3>Design a distraction-proof environment</h3>
<pre><code>FOCUS SETUP
[ ] Phone: notifications OFF for all non-essential apps
[ ] Phone in another room (or face down, out of reach) during deep work
[ ] "Do Not Disturb" / Focus mode scheduled for your deep-work blocks
[ ] Close email and chat tabs during deep work
[ ] One browser window, only the tabs for this task
[ ] Water, charger, notes ready before you start
[ ] Tell people at home/work your focus hours</code></pre>
<h3>The Pomodoro Technique</h3>
<ol>
<li>Pick one task.</li>
<li>Set a timer for <strong>25 minutes</strong> and work only on that task.</li>
<li>If a distracting thought arrives, write it on a \"later\" note and return to the task.</li>
<li>Take a <strong>5-minute break</strong> away from the screen.</li>
<li>After four rounds, take a 20–30 minute break.</li>
</ol>
<p>As your focus grows, try 50/10 blocks. Track how many focused Pomodoros you complete each day this week.</p>"""),
  ("5.3 The Ability to Focus Deeply", """
<p>Focus is a muscle. If you can only manage 15 minutes today, that's your starting point. Add five minutes every few days. Also batch communication: checking messages at set times (e.g. 10:30, 13:00, 16:00) is usually enough for most remote roles. Agree response times with your team or clients so nobody worries.</p>
""" + checkpoint("Complete your Focus Setup and log your Pomodoros for 5 days. Record your daily count and the distraction you had to fight most in \"My Productivity System\".")),
  ]),

 dict(kicker="PART 6 · WEEK 3", short="Beating Procrastination", title="Beating Procrastination",
  blurb="Why we procrastinate (it's emotion, not laziness) and practical techniques to just start and keep going.",
  mile="Reliable execution",
  sections=[
  ("6.1 Why We Procrastinate", """
<p>Procrastination is rarely laziness. It's usually <strong>avoiding an uncomfortable feeling</strong>: the task feels boring, confusing, too big, or scary (\"what if I do it badly?\"). Scrolling gives instant relief, so the brain learns to escape there.</p>
<p>Common triggers: the task is <strong>vague</strong>, <strong>too big</strong>, <strong>boring</strong>, has <strong>no deadline</strong>, or carries <strong>fear of failure or perfectionism</strong>. Name the trigger and you know which technique to use.</p>"""),
  ("6.2 Techniques to Just Start (Practical)", """
<div class="tbl-wrap"><table><thead><tr><th>Trigger</th><th>Technique</th></tr></thead><tbody>
<tr><td>Too vague</td><td>Write the very next physical action (Part 3). \"Open the file and write the heading.\"</td></tr>
<tr><td>Too big</td><td>Break it into 25-minute pieces; do only the first piece.</td></tr>
<tr><td>Boring</td><td>Pair it with something pleasant (music, a good drink), or use a timer race.</td></tr>
<tr><td>No deadline</td><td>Set your own and tell someone. Accountability works.</td></tr>
<tr><td>Fear / perfectionism</td><td>Give yourself permission to do a bad first draft. You can edit a bad page; you can't edit a blank one.</td></tr>
</tbody></table></div>
<h3>The 2-Minute Start</h3>
<p>Commit to just two minutes. Starting is the hardest part; once you've started, continuing is far easier.</p>
<h3>Eat the frog</h3>
<p>Do the task you're most likely to avoid <strong>first</strong> in your day, before your willpower is drained.</p>
<h3>If-then plans</h3>
<pre><code>"IF it's 8:00 on Monday, THEN I open my assignment and write for 25 minutes."
"IF I pick up my phone during a focus block, THEN I put it in the other room."</code></pre>"""),
  ("6.3 Reliable Execution", """
<p>Be kind to yourself when you slip. Research on self-compassion suggests that people who forgive themselves for procrastinating are <em>less</em> likely to procrastinate next time. Reset and start the next small step.</p>
""" + checkpoint("Pick the task you've been avoiding longest. Name its trigger, choose a technique, and do the first 25 minutes. Write what happened in \"My Productivity System\", plus two if-then plans.")),
  ]),

 dict(kicker="PART 7 · WEEKS 3–4", short="Habits & Routines", title="Habits, Systems &amp; Routines",
  blurb="Systems beat willpower. Build habits and morning, shutdown and weekly routines that make productivity run on autopilot.",
  mile="Productive routines",
  sections=[
  ("7.1 Systems Beat Willpower", """
<p>Willpower runs out. Habits don't need it. When the right behaviour is automatic, you no longer negotiate with yourself every morning. As James Clear puts it in <em>Atomic Habits</em>, you don't rise to the level of your goals; you fall to the level of your systems.</p>
<p>The habit loop: <strong>cue → craving → action → reward</strong>. To build a habit, make it <em>obvious, attractive, easy and satisfying</em>. To break one, make it <em>invisible, unattractive, difficult and unsatisfying</em>.</p>"""),
  ("7.2 Building Habits and Routines (Practical)", """
<h3>Habit stacking</h3>
<pre><code>"After I [CURRENT HABIT], I will [NEW HABIT]."
After I pour my morning tea,   I will write my Top 3 for the day.
After I close my laptop,       I will write tomorrow's first task.
After I sit at my desk,        I will put my phone in the drawer.</code></pre>
<h3>Three routines to build</h3>
<div class="tbl-wrap"><table><thead><tr><th>Routine</th><th>Example</th></tr></thead><tbody>
<tr><td><strong>Morning startup</strong> (20–40 min)</td><td>Water → short movement → no phone for the first 30 minutes → daily plan → start deep work</td></tr>
<tr><td><strong>Shutdown</strong> (10–15 min)</td><td>Capture loose ends → check tomorrow's calendar → choose tomorrow's Top 3 → say \"shutdown complete\" and stop working</td></tr>
<tr><td><strong>Weekly review</strong> (30–45 min)</td><td>The review from Part 4, same day and time each week</td></tr>
</tbody></table></div>
<h3>Start tiny</h3>
<p>Make the new habit so small you can't fail: one push-up, one paragraph, one minute of planning. Consistency first, size later. Track it with a simple habit tracker (a grid in your notebook works).</p>"""),
  ("7.3 Productivity on Autopilot", """
<p>Never miss twice. Missing one day is an accident; missing two is the start of a new (bad) habit. If life disrupts your routine, return to it at the next opportunity, even in a smaller version.</p>
""" + checkpoint("Write out your Morning, Shutdown and Weekly routines plus two habit stacks. Track them for 7 days and record your streak in \"My Productivity System\".")),
  ]),

 dict(kicker="PART 8 · WEEK 4", short="Energy & Balance", title="Energy, Balance &amp; Avoiding Burnout",
  blurb="Manage energy, not just time: sleep, breaks, boundaries for remote work, and recognising burnout before it arrives.",
  mile="Sustainable productivity",
  sections=[
  ("8.1 Manage Energy, Not Just Time", """
<p>An hour when you're fresh is worth three when you're exhausted. Your energy has four sources: <strong>physical</strong> (sleep, food, movement), <strong>emotional</strong> (mood, relationships), <strong>mental</strong> (focus) and <strong>purpose</strong> (meaning in the work). Neglect them and no time-management technique will save you.</p>
<p>Use your Part 1 energy notes: schedule demanding work in your peak hours and admin in your low hours.</p>"""),
  ("8.2 Energy, Boundaries, and Balance (Practical)", """
<h3>Energy basics</h3>
<ul>
<li><strong>Sleep</strong>: protect 7–9 hours. Keep a consistent wake time, including weekends.</li>
<li><strong>Breaks</strong>: step away from the screen every 60–90 minutes. Stand, stretch, look at something far away.</li>
<li><strong>Movement</strong>: even a 10-minute walk improves mood and focus.</li>
<li><strong>Food and water</strong>: heavy lunches cause afternoon slumps; keep water at your desk.</li>
</ul>
<h3>Remote-work boundaries</h3>
<pre><code>MY BOUNDARIES
Working hours:          __:__ to __:__  (shared with clients/team)
Workspace:              a defined spot, even a corner — work stays there
Notifications after hours: OFF (work apps)
Response-time promise:  e.g. "within 4 working hours"
Days fully off:         ______
Time zone note:         if clients are abroad, agree overlap hours —
                        don't silently become available 24/7</code></pre>
<h3>Burnout warning signs</h3>
<p>Constant exhaustion, cynicism about work you used to like, falling performance, poor sleep, getting sick often. If you notice two or more for weeks, reduce load, talk to someone you trust, and treat rest as a priority task, not a reward.</p>"""),
  ("8.3 Productivity That Lasts", """
<p>The goal is not maximum output this week; it's strong output for years. Schedule rest and things you enjoy in your calendar the same way you schedule work. People who rest well do better work.</p>
""" + checkpoint("Write your Boundaries, share your working hours with at least one person (client, team or family), and plan one genuinely restful activity this week. Add all of it to \"My Productivity System\".")),
  ]),

 dict(kicker="PART 9 · WEEKS 4–5", short="Your System & Beyond", title="Your System &amp; Beyond",
  blurb="The capstone: assemble everything into Your Productivity System, measure your progress, and carry self-management into your remote career.",
  mile="A personal system + a plan",
  sections=[
  ("9.1 THE CAPSTONE: Your Productivity System", """
<p>Bring together everything you've built into one clean document you'll actually use. Keep it to two or three pages.</p>
<pre><code>MY PRODUCTIVITY SYSTEM
1. DIRECTION & GOALS     My direction + current 90-day SMART goals      (Part 2)
2. MY TOOLS              Task app · calendar · notes · timer             (Part 0)
3. MY LISTS              Inbox · Next Actions · Projects · Waiting For   (Part 3)
                         · Someday/Maybe — and my processing rules
4. MY PLANNING RHYTHM    Weekly Review (day/time) · Daily plan · Top 3   (Part 4)
                         · My ideal week (time-blocked template)
5. MY FOCUS RULES        Focus setup · deep-work hours · message batches (Part 5)
6. MY ANTI-PROCRASTINATION KIT   Triggers → techniques · if-then plans   (Part 6)
7. MY ROUTINES           Morning · Shutdown · Weekly · habit stacks      (Part 7)
8. MY BOUNDARIES         Hours · response times · days off · rest         (Part 8)
9. MY RESULTS            Baseline vs now (the 3 scores from Part 0)</code></pre>
<p>Then <strong>run it for one full week</strong> exactly as written. At the end, re-score the three Part 0 questions and compare with your baseline.</p>
""" + checkpoint("Your completed Productivity System, one week of running it, and your before/after scores. This is your capstone. Keep it and revisit it every quarter.")),
  ("9.2 Self-Management in Your Remote Career", """
<p>Employers and clients hiring remotely look hardest for one trait: <em>can this person manage themselves?</em> You can now show it.</p>
<ul>
<li><strong>In interviews</strong>, describe your system: \"I plan my week every Friday, time-block deep work in the mornings and batch messages three times a day.\" It's concrete and memorable.</li>
<li><strong>With clients</strong>, share your working hours and response times up front. Reliability builds trust faster than talent.</li>
<li><strong>With your other courses</strong>, use your weekly review to schedule study blocks. This course makes every other Mentorine track easier to finish.</li>
</ul>
<p>Revisit your system every 90 days: new goals, adjusted routines, what's working, what isn't. The system should evolve as your career does.</p>"""),
  ]),

 dict(kicker="APPENDIX A · REFERENCE", short="Cheat Sheets", title="Quick-Reference Cheat Sheets",
  blurb="Awareness, priorities, planning, focus, procrastination, habits and sustainability, each on one page.",
  mile="Everything on one page",
  sections=[
  ("A.1 Awareness, Priorities &amp; Planning on One Page", """
<pre><code>AWARENESS     Log 3 days in 30-min blocks → total by category → find 2 leaks
              → plug ONE leak at a time
PRIORITIES    Direction (1–3 yrs) → 90-day SMART goals → this week's Big Rocks
              Eisenhower: DO · SCHEDULE · DELEGATE · DELETE
              80/20: which 1–2 items make the biggest difference?
CAPTURE       Everything → Inbox → Clarify → Organise → Review → Engage
              2-minute rule: if it takes < 2 min, do it now
PLANNING      Weekly Review (30–45 min) → 3 Big Rocks → time-block them
              Daily: calendar → Top 3 → each has a block
              Plan only 60–70% of the day; keep buffers</code></pre>"""),
  ("A.2 Focus &amp; Procrastination on One Page", """
<pre><code>FOCUS         Notifications off · phone in another room · one window
              Pomodoro 25/5 (×4 → long break) · grow to 50/10
              Batch messages at set times · agree response times
PROCRASTINATION  Name the trigger:
              Vague → next physical action      Big → 25-min pieces
              Boring → pair with pleasure       No deadline → set one + tell someone
              Fear → permission for a bad first draft
              2-minute start · eat the frog · if-then plans · self-compassion</code></pre>"""),
  ("A.3 Habits &amp; Sustainability on One Page", """
<pre><code>HABITS        Obvious · attractive · easy · satisfying
              Stack: "After I ___, I will ___."  Start tiny. Never miss twice.
ROUTINES      Morning startup · Shutdown · Weekly review
ENERGY        Sleep 7–9h · break every 60–90 min · move daily · water
BOUNDARIES    Set hours · defined workspace · after-hours notifications off
              Agree overlap with clients abroad
BURNOUT       Exhaustion · cynicism · poor sleep · falling performance
              → reduce load, talk to someone, schedule rest</code></pre>"""),
  ]),

 dict(kicker="APPENDIX B · STUDY PLAN", short="Study Plan", title="The Recommended Daily Study Plan",
  blurb="A day-by-day schedule from your first time audit to a finished Productivity System.",
  mile="Your schedule",
  sections=[
  ("B.1 The Plan", """
<p>About 45–60 minutes a day, five days a week. The practicals run in the background of your normal life, which is the point.</p>
<div class="tbl-wrap"><table><thead><tr><th>Day</th><th>Study</th><th>Practice</th></tr></thead><tbody>
<tr><td>Week 1 · Day 1</td><td>Part 0</td><td>Set up toolkit, record baseline scores</td></tr>
<tr><td>Day 2</td><td>Part 1.1–1.2</td><td>Start your 3-day time log</td></tr>
<tr><td>Day 3</td><td>Part 2</td><td>Direction, SMART goals, Eisenhower matrix (log continues)</td></tr>
<tr><td>Day 4</td><td>Part 1.3</td><td>Total your log, write your Time Intention</td></tr>
<tr><td>Day 5</td><td>Part 3</td><td>Set up lists, mind sweep, process inbox to zero</td></tr>
<tr><td>Week 2 · Day 1</td><td>Part 4.1–4.2</td><td>First Weekly Review; time-block the week</td></tr>
<tr><td>Day 2</td><td>Part 4.3</td><td>Daily plan + Top 3 (do this every day from now)</td></tr>
<tr><td>Day 3</td><td>Part 5.1–5.2</td><td>Focus setup; first Pomodoros</td></tr>
<tr><td>Day 4–5</td><td>Part 5.3</td><td>Log Pomodoros; batch messages</td></tr>
<tr><td>Week 3 · Day 1–2</td><td>Part 6</td><td>Tackle your most-avoided task; write if-then plans</td></tr>
<tr><td>Day 3–5</td><td>Part 7</td><td>Write routines + habit stacks; start the 7-day tracker</td></tr>
<tr><td>Week 4 · Day 1–2</td><td>Part 8</td><td>Boundaries; share your hours; plan rest</td></tr>
<tr><td>Day 3–5</td><td>Part 9.1</td><td>Assemble Your Productivity System</td></tr>
<tr><td>Week 5</td><td>Part 9.2</td><td>Run the system for a full week; re-score and compare</td></tr>
</tbody></table></div>
""" + tip("Behind schedule? That's fine. Durations are recommendations. Keep the daily plan and the weekly review going and you'll catch up.", "NOTE")),
  ]),
]

def label(i):
    return PARTS[i]["kicker"].split(" · ")[0].title().replace("Part", "Part") + " · " + PARTS[i]["short"]

def build_part(i):
    p = PARTS[i]
    anchors = "".join(f'<a href="#{slug(h)}">{h}</a>' for h, _ in p["sections"])
    body = "\n".join(f'<h2 id="{slug(h)}">{h}</h2>\n{b.strip()}' for h, b in p["sections"])
    prev = (f'<a href="part{i-1}.html"><span class="dir">← PREVIOUS</span><span class="pt">{label(i-1)}</span></a>'
            if i > 0 else '<a href="index.html"><span class="dir">← BACK</span><span class="pt">Curriculum</span></a>')
    nxt = (f'<a class="next" href="part{i+1}.html"><span class="dir">NEXT →</span><span class="pt">{label(i+1)}</span></a>'
           if i < len(PARTS) - 1 else '<a class="next" href="index.html"><span class="dir">DONE →</span><span class="pt">Back to the curriculum</span></a>')
    return f"""{head(re.sub('&amp;', '&', p['title']))}
<body>

{NAV}

<main class="col">
  <div class="part-hero">
    <div class="kicker">{p['kicker']}</div>
    <h1>{p['title']}</h1>
    <div class="anchor-row" data-live="stagger">{anchors}</div>
  </div>
  <article>
{body}
  </article>
<nav class="pager" data-live="off">
  {prev}
  {nxt}
</nav>
</main>

{FOOT}"""

def build_index():
    cards = "\n".join(f"""    <a class="part-card" href="part{i}.html">
      <div class="pc-kicker">{p['kicker']}</div>
      <h3>{p['title']}</h3>
      <p>{p['blurb']}</p>
      <div class="pc-mile"><strong>Milestone</strong> — {p['mile']}</div>
    </a>""" for i, p in enumerate(PARTS))
    tools = "".join(f'<div class="proj"><span class="dot">•</span>{t}</div>' for t in
        ["Time audit", "Eisenhower matrix", "80/20 rule", "Capture → Clarify → Organise", "Weekly review",
         "Time blocking", "Pomodoro", "Focus setup", "If-then plans", "Habit stacking", "Shutdown routine", "Boundaries plan"])
    return f"""{head('Curriculum')}
<body>

{NAV}

<main>
  <div class="col">
    <section class="hero">
      <div class="kicker">Mentorine School · {COURSE_NAME}</div>
      <h1>Take control of your <span class="em">time</span> in {DURATION}.</h1>
      <p class="sub">The meta-skill for remote work: where your time goes, goals and priorities, capturing and organising tasks, planning your days and weeks, focus and beating distraction, beating procrastination, habits and routines, and energy, balance and avoiding burnout. It ends in Your Productivity System, a personal system you'll keep using. Free tools only; no experience needed.</p>
      <div class="cta-row">
        <a class="btn-primary" href="./part0.html">Start with Part 0 <span class="arr">→</span></a>
        <a class="link-quiet" href="#curriculum">See the curriculum</a>
      </div>
    </section>

    <div class="stat-strip" data-live="stagger">
      <div class="stat"><div class="n">3–5</div><div class="l">Weeks</div></div>
      <div class="stat"><div class="n">12</div><div class="l">Parts</div></div>
      <div class="stat"><div class="n">10</div><div class="l">Practicals</div></div>
      <div class="stat"><div class="n">1</div><div class="l">Personal system</div></div>
    </div>
  </div>

  <div class="wide">
    <section class="section" id="curriculum">
      <div class="kicker">The curriculum</div>
      <h2 class="section-head">Twelve parts. One system that's yours.</h2>
      <p class="section-sub">Each part explains the idea in plain English, gives you a practical to apply to your own life, and ends with a checkpoint. Everything feeds one document, "My Productivity System", which becomes your capstone in Part 9.</p>
      <div class="parts-grid" data-live="stagger">
{cards}
      </div>
    </section>

    <section class="section">
      <div class="kicker">The toolbox</div>
      <h2 class="section-head">Techniques you'll actually use.</h2>
      <p class="section-sub">Not just named: each one is practised on your real work, studies and commitments.</p>
      <div class="proj-strip" data-live="stagger">{tools}</div>
    </section>
  </div>

  <div class="col">
    <section class="cta-band">
      <div class="kicker">Day one starts now</div>
      <h2>Ten minutes of setup, then a lifetime of better weeks.</h2>
      <p>Part 0 gets your simple toolkit ready and records where you're starting from, so in five weeks you can see how far you've come.</p>
      <a class="btn-primary" href="./part0.html">Begin Part 0 <span class="arr">→</span></a>
    </section>
  </div>
</main>

{FOOT}"""

os.makedirs(OUT, exist_ok=True)
for i in range(len(PARTS)):
    open(os.path.join(OUT, f"part{i}.html"), "w", encoding="utf-8").write(build_part(i))
open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(build_index())
print("built", len(PARTS) + 1, "pages in", OUT)
