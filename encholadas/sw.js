const CACHE_NAME = 'encholadas-v1';
const ASSETS_TO_CACHE = [
  './',
  './menu.html',
  './manifest.json',
  './img/icon-192.png',
  './img/icon-512.png',
  './img/Icono.png',
  './img/logo.png',
  './img/zyncosoft.png',
  './img/encholadas_logomotion-720p.mp4'
];

// Instalación del Service Worker y almacenamiento en caché inicial
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('Error al precargar recursos en caché:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activación del Service Worker y limpieza de cachés antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estrategia Network-First con fallback a Caché para respuestas siempre actualizadas
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('./menu.html');
          }
        });
      })
  );
});
