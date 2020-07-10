var _cachesName = 'test-pwa';
self.addEventListener('install', function(e) {
 console.log('[ServiceWorker] Install');
 e.waitUntil(
   caches.open(_cachesName).then(function(cache) {
     return cache.addAll([
       '/pwa-examples/',
       '/pwa-examples/index.html',
       '/pwa-examples/scripts/index.js',
       '/pwa-examples/icon.jpg'
     ]);
   })
 );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        // if (key !== _cachesName) {
        console.log('[ServiceWorker] Removing old cache ' + key);
          return caches.delete(key);
        // }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
