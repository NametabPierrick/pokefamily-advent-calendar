const CACHE_NAME = "pokefamily-advent-2026-v4";
const APP_SHELL = [
  "/",
  "/diego/",
  "/vasco/",
  "/celine/",
  "/pierrick/",
  "/manifest.webmanifest",
  "/icons/advent-icon.svg",
  "/icons/advent-icon-192.png",
  "/icons/advent-icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

const cacheFirst = async (request) => {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
  }
  return response;
};

const networkFirst = async (request) => {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return (await caches.match(request)) || (await caches.match("/"));
  }
};

const dailyNetworkFirst = async (request) => {
  const url = new URL(request.url);
  const cacheKey = new Request(`${url.origin}${url.pathname}`);
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request, { cache: "no-store" });
    if (response.ok) {
      cache.put(cacheKey, response.clone());
    }
    return response;
  } catch {
    return (
      (await cache.match(cacheKey)) ||
      new Response(JSON.stringify({ images: [] }), {
        status: 503,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      })
    );
  }
};

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  if (url.pathname.startsWith("/daily/")) {
    event.respondWith(dailyNetworkFirst(request));
    return;
  }

  if (
    url.pathname.startsWith("/instructions/") ||
    url.pathname.startsWith("/_astro/") ||
    url.pathname.startsWith("/icons/")
  ) {
    event.respondWith(cacheFirst(request));
  }
});
