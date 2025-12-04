const CACHE_NAME = 'pwa-firebase-v1';
const BASE_PATH = '/Malu-git-11'; // <- caminho do repositório

const FILES_TO_CACHE = [
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/perfil.html`,
  `${BASE_PATH}/style.css`,
  `${BASE_PATH}/perfil.css`,
  `${BASE_PATH}/app.js`,
  `${BASE_PATH}/authService.js`,
  `${BASE_PATH}/manifest.json`
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
