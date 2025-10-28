const CACHE_NAME = 'gimpaco-pwa-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/styles/global.css',
  '/favicon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching App Shell assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // **STRATEGY: Ignore API calls and non-GET requests.**
  // This prevents the Service Worker from interfering with POST requests or any API interactions.
  const isApiCall = event.request.url.includes('/api/');
  if (isApiCall || event.request.method !== 'GET') {
    // Let the network handle it without SW intervention.
    console.log(`Service Worker: Ignoring request: ${event.request.method} ${event.request.url}`);
    return;
  }

  // **STRATEGY: Cache-first for all other (GET) requests.**
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          // Serve from cache
          return response;
        }
        // Not in cache, go to the network
        return fetch(event.request);
      })
  );
});
