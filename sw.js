/* Mentorine School service worker — bump CACHE on EVERY HTML change and deploy sw.js alongside it. */
const CACHE = "mentorine-v5";
const ASSETS = [
  "index.html", "syllabus.html", "login.html", "dashboard.html", "access.html", "admin.html",
  "assets/style.css", "assets/app.js", "assets/liveliness.js", "assets/gate.js",
  "assets/logo.svg", "assets/og-image.png", "assets/icon-192.png", "assets/icon-512.png",
  "manifest.json"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
