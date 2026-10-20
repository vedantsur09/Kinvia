/* Kinvia service worker: cache the app shell so the prototype opens on weak connections. */
const CACHE = "kinvia-v22";
const SHELL = [
  "./", "index.html", "try.html", "desk.html", "insights.html",
  "styles.css?v=20", "data.js?v=11", "icons.js?v=10", "session.js?v=12", "desk.js?v=11", "insights.js?v=11",
  "logo-mark.png", "logo-lockup.png",
  "icon.svg", "manifest.webmanifest",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("kinvia-") && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // fonts and other hosts go straight to the network
  const response = fetch(e.request);
  e.waitUntil(response.then(async res => {
    if (res.ok && SHELL.some(path => new URL(path, self.registration.scope).href === url.href)) {
      const copy = res.clone(), cache = await caches.open(CACHE);
      await cache.put(e.request, copy);
    }
  }).catch(() => {}));
  e.respondWith(response.catch(async () => {
    const cache = await caches.open(CACHE), cached = await cache.match(e.request);
    return cached || (e.request.mode === "navigate" && await cache.match("index.html")) || Response.error();
  }));
});
