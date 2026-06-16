/* Offline cache for Free App Solutions. Bump CACHE to invalidate. */
var CACHE = "fas-site-v1";
var CORE = [
    "/",
    "/css/bootstrap.min.css",
    "/css/all.css",
    "/css/Custom.css",
    "/js/bootstrap.min.js",
    "/assets/js/main.js",
    "/assets/img/icon.svg",
    "/manifest.webmanifest"
];

self.addEventListener("install", function (e) {
    e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
    e.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(keys.map(function (k) { if (k !== CACHE) return caches.delete(k); }));
        }).then(function () { return self.clients.claim(); })
    );
});

self.addEventListener("fetch", function (e) {
    var req = e.request;
    if (req.method !== "GET") return;
    var url = new URL(req.url);
    if (url.origin !== self.location.origin) return;

    if (req.mode === "navigate") {
        e.respondWith(fetch(req).then(function (res) {
            var copy = res.clone();
            caches.open(CACHE).then(function (c) { c.put("/", copy); });
            return res;
        }).catch(function () { return caches.match("/"); }));
        return;
    }
    e.respondWith(
        caches.open(CACHE).then(function (cache) {
            return cache.match(req).then(function (cached) {
                var network = fetch(req).then(function (res) {
                    if (res && res.ok && res.type === "basic") cache.put(req, res.clone());
                    return res;
                }).catch(function () { return cached; });
                return cached || network;
            });
        })
    );
});
