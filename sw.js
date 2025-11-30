const CACHE_NAME = 'pwa-firebase-v1';
const FILES_TO_CACHE = [
  '/index.html',
  '/perfil.html',
  '/style.css',
  '/perfil.css',
  '/app.js',
  '/authService.js',
  '/manifest.json'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then(resp => resp || fetch(evt.request))
  );
});
