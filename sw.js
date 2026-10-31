const CACHE_NAME = 'offline-v2';
const ASSETS = [
  './',
  './index.html', // Erstat med dit præcise filnavn hvis det ikke er index.html
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((response) => response || fetch(e.request)));
});
