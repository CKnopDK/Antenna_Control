const CACHE_NAME = 'offline-v2'; // <--- Husk at tælle denne op (v3, v4 osv.) når du ændrer index.html
const ASSETS = [
  './',
  './index.html',
];

// 1. Installer og TVING den nye service worker til at blive aktiv med det samme
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // Tvinger den nye version i gang uden at vente på at faner lukkes
});

// 2. Ryd op i gamle caches, så telefonen ikke viser forældet data
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Sletter gammel cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // Tager kontrol over siden med det samme
});

// 3. Hent fra cache
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((response) => response || fetch(e.request)));
});
