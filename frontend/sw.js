/* Kinvia service worker: cache the app shell so the prototype opens on weak connections. */
const CACHE = "kinvia-v20";
const SHELL = [
  "./", "index.html", "try.html", "desk.html", "insights.html",
  "styles.css?v=18", "data.js?v=10", "icons.js?v=10", "session.js?v=10", "desk.js?v=10", "insights.js?v=10",
  "logo-mark.png", "logo-lockup.png",
  "icon.svg", "manifest.webmanifest",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // fonts and other hosts go straight to the network
  e.respondWith(
    fetch(e.request)
      .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; })
      .catch(() => caches.match(e.request).then(r => r || caches.match("index.html")))
  );
});
