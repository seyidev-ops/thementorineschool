/* ============================================================================
   LIVELINESS LAYER — v1.0
   A drop-in motion layer that brings any existing site "alive" without
   touching its existing design. Warm editorial minimalist motion language:
   quiet entrances, a single orchestrated load, restrained micro-interactions.

   USAGE (one line in <head> or before </body>):
     <script src="liveliness.js" defer></script>

   That's it. The layer auto-injects its own CSS, auto-detects sensible
   targets (headings, paragraphs, cards, images, buttons, links, list items,
   sections), and animates them — while fully respecting any existing styles,
   layout, and prefers-reduced-motion.

   OPT-IN / OPT-OUT via data attributes (no class changes required):
     data-live="reveal"     force-reveal an element
     data-live="rise"       fade + translateY entrance
     data-live="fade"       fade only (no movement)
     data-live="left"       enter from left
     data-live="right"      enter from right
     data-live="scale"      gentle scale-in
     data-live="stagger"    stagger this element's *children*
     data-live="off"        exclude this element (and skip auto-detect)
     data-live-delay="120"  per-element delay in ms

   CONFIG (optional, set BEFORE the script loads):
     window.LIVELINESS = {
       auto: true,            // auto-detect targets (default true)
       distance: 14,          // px of travel for rise/left/right (house = 14)
       duration: 900,         // entrance duration in ms
       stagger: 90,           // ms between staggered siblings
       threshold: 0.12,       // viewport ratio to trigger reveal
       once: true,            // animate each element only once
       hover: true,           // enable hover micro-interactions
       ripple: true,          // enable button press feedback
       smoothAnchors: true,   // smooth in-page anchor scrolling
       accent: null           // override accent color for ripple/focus glow
     };
   ============================================================================ */
(function () {
  "use strict";

  var CFG = Object.assign({
    auto: true,
    distance: 14,
    duration: 900,
    stagger: 90,
    threshold: 0.12,
    once: true,
    hover: true,
    ripple: true,
    smoothAnchors: true,
    accent: null
  }, window.LIVELINESS || {});

  var REDUCED = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var EASE = "cubic-bezier(.22,.61,.36,1)"; // house "quiet entrance" easing

  /* ---- inject stylesheet ------------------------------------------------ */
  function injectCSS() {
    if (document.getElementById("liveliness-css")) return;
    var accentRule = CFG.accent
      ? "--ll-accent:" + CFG.accent + ";"
      : "--ll-accent:currentColor;";

    var css = [
      ":root{" + accentRule +
        "--ll-dur:" + CFG.duration + "ms;" +
        "--ll-dist:" + CFG.distance + "px;" +
        "--ll-ease:" + EASE + ";}",

      /* base hidden state — only applied to flagged elements */
      ".ll-prep{opacity:0;will-change:opacity,transform;}",
      ".ll-prep.ll-rise{transform:translateY(var(--ll-dist));}",
      ".ll-prep.ll-left{transform:translateX(calc(var(--ll-dist) * -1.6));}",
      ".ll-prep.ll-right{transform:translateX(calc(var(--ll-dist) * 1.6));}",
      ".ll-prep.ll-scale{transform:scale(.97);}",
      ".ll-prep.ll-fade{transform:none;}",

      /* revealed state */
      ".ll-in{opacity:1!important;transform:none!important;" +
        "transition:opacity var(--ll-dur) var(--ll-ease)," +
        "transform var(--ll-dur) var(--ll-ease);}",

      /* hover micro-interactions (quiet, never loud) */
      ".ll-hover-lift{transition:transform .3s var(--ll-ease)," +
        "box-shadow .3s var(--ll-ease);}",
      ".ll-hover-lift:hover{transform:translateY(-2px);}",
      ".ll-hover-press{transition:transform .12s var(--ll-ease);}",
      ".ll-hover-press:active{transform:scale(.97);}",
      ".ll-hover-arrow{transition:transform .3s var(--ll-ease);" +
        "display:inline-block;}",
      "a:hover > .ll-hover-arrow,button:hover > .ll-hover-arrow{" +
        "transform:translateX(4px);}",

      /* ripple */
      ".ll-ripple-host{position:relative;overflow:hidden;}",
      ".ll-ripple{position:absolute;border-radius:50%;pointer-events:none;" +
        "transform:scale(0);opacity:.18;background:var(--ll-accent);" +
        "animation:ll-ripple .55s var(--ll-ease) forwards;}",
      "@keyframes ll-ripple{to{transform:scale(2.4);opacity:0;}}",

      /* honor reduced motion completely */
      "@media (prefers-reduced-motion:reduce){" +
        ".ll-prep,.ll-in{opacity:1!important;transform:none!important;" +
        "transition:none!important;animation:none!important;}" +
        ".ll-ripple{display:none!important;}}"
    ].join("");

    var style = document.createElement("style");
    style.id = "liveliness-css";
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ---- decide what to animate ------------------------------------------- */
  var AUTO_SELECTOR = [
    "h1", "h2", "h3", "h4",
    "p", "blockquote",
    "img", "figure", "picture", "video",
    "ul > li", "ol > li",
    ".card", "[class*=card]", "[class*=Card]",
    "section > *", "article > *",
    "button", ".btn", "[class*=button]",
    "a[class]"
  ].join(",");

  function classify(el) {
    var v = el.getAttribute("data-live");
    if (v === "off") return null;
    if (v) return v;                       // explicit wins
    if (!CFG.auto) return null;

    var tag = el.tagName.toLowerCase();
    if (tag === "img" || tag === "figure" || tag === "picture" || tag === "video")
      return "scale";
    if (tag === "h1" || tag === "h2" || tag === "h3" || tag === "h4")
      return "rise";
    return "rise";
  }

  function isExcluded(el) {
    // skip if an ancestor opted out, or element is fixed/sticky chrome
    if (el.closest("[data-live='off']")) return true;
    var pos = getComputedStyle(el).position;
    if (pos === "fixed" || pos === "sticky") return true;
    return false;
  }

  /* ---- prepare elements (set hidden state) ------------------------------ */
  function prep(el, kind, delayMs) {
    if (el.__llDone) return;
    el.classList.add("ll-prep");
    if (kind === "fade") el.classList.add("ll-fade");
    else if (kind === "left") el.classList.add("ll-left");
    else if (kind === "right") el.classList.add("ll-right");
    else if (kind === "scale") el.classList.add("ll-scale");
    else el.classList.add("ll-rise");
    if (delayMs) el.style.transitionDelay = delayMs + "ms";
    el.__llKind = kind;
    el.__llDelay = delayMs || 0;
  }

  function reveal(el) {
    if (el.__llDone) return;
    el.__llDone = true;
    el.classList.remove("ll-prep");
    el.classList.add("ll-in");
    // clean up after the transition so layout/inline styles aren't polluted
    var d = (CFG.duration + el.__llDelay + 80);
    setTimeout(function () {
      el.style.transitionDelay = "";
      el.style.willChange = "";
    }, d);
  }

  /* ---- observer --------------------------------------------------------- */
  function buildObserver() {
    if (!("IntersectionObserver" in window)) {
      // no IO support: just reveal everything immediately
      return { observe: function (el) { reveal(el); } };
    }
    return new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          reveal(e.target);
          if (CFG.once) obs.unobserve(e.target);
        } else if (!CFG.once && e.target.__llDone) {
          // replay mode: reset
          e.target.__llDone = false;
          prep(e.target, e.target.__llKind, e.target.__llDelay);
        }
      });
    }, { threshold: CFG.threshold, rootMargin: "0px 0px -8% 0px" });
  }

  /* ---- hover / micro-interaction wiring --------------------------------- */
  function wireHover() {
    if (!CFG.hover || REDUCED) return;
    document.querySelectorAll(".card,[class*=card],[class*=Card]")
      .forEach(function (el) {
        if (!isExcluded(el)) el.classList.add("ll-hover-lift");
      });
    document.querySelectorAll("button,.btn,[class*=button],a[class]")
      .forEach(function (el) {
        if (!isExcluded(el)) el.classList.add("ll-hover-press");
      });
  }

  function wireRipple() {
    if (!CFG.ripple || REDUCED) return;
    document.querySelectorAll("button,.btn,[class*=button]")
      .forEach(function (el) {
        if (isExcluded(el)) return;
        el.classList.add("ll-ripple-host");
        el.addEventListener("click", function (ev) {
          var r = el.getBoundingClientRect();
          var size = Math.max(r.width, r.height);
          var span = document.createElement("span");
          span.className = "ll-ripple";
          span.style.width = span.style.height = size + "px";
          span.style.left = (ev.clientX - r.left - size / 2) + "px";
          span.style.top = (ev.clientY - r.top - size / 2) + "px";
          el.appendChild(span);
          setTimeout(function () { span.remove(); }, 600);
        });
      });
  }

  function wireAnchors() {
    if (!CFG.smoothAnchors) return;
    document.addEventListener("click", function (ev) {
      var a = ev.target.closest && ev.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var t = document.querySelector(id);
      if (!t) return;
      ev.preventDefault();
      t.scrollIntoView({
        behavior: REDUCED ? "auto" : "smooth",
        block: "start"
      });
    });
  }

  /* ---- staggering ------------------------------------------------------- */
  function applyStagger(parent) {
    var kids = Array.prototype.filter.call(parent.children, function (c) {
      return c.getAttribute("data-live") !== "off";
    });
    kids.forEach(function (c, i) {
      var k = classify(c) || "rise";
      prep(c, k, i * CFG.stagger);
      OBS.observe(c);
      c.__llStaggered = true;
    });
  }

  /* ---- init ------------------------------------------------------------- */
  var OBS;
  function init() {
    injectCSS();
    if (REDUCED) { wireAnchors(); return; } // motion off, keep smooth scroll

    OBS = buildObserver();

    // 1) explicit stagger containers first
    document.querySelectorAll('[data-live="stagger"]').forEach(applyStagger);

    // 2) everything else
    var targets = document.querySelectorAll(
      CFG.auto ? AUTO_SELECTOR + ",[data-live]" : "[data-live]"
    );
    targets.forEach(function (el) {
      if (el.__llStaggered || el.__llDone) return;
      if (isExcluded(el)) return;
      var kind = classify(el);
      if (!kind || kind === "stagger") return;
      var d = parseInt(el.getAttribute("data-live-delay") || "0", 10);
      prep(el, kind, d);
      OBS.observe(el);
    });

    wireHover();
    wireRipple();
    wireAnchors();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // expose a manual hook for dynamically injected content
  window.Liveliness = {
    refresh: init,
    reveal: reveal,
    config: CFG
  };
})();
