const CACHE_NAME = 'contextplate-v2';
const ASSETS = [
  './',
  './index.html',
  './styles/main.css',
  './js/ui.js',
  './js/engine.js',
  './data/swaps.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('ContextPlate caching shell assets');
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
