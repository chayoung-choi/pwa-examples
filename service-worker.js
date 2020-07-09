var _cachesName = 'test-pwa';
self.addEventListener('install', function(e) {
 console.log('[ServiceWorker] Install');
 e.waitUntil(
   caches.open(_cachesName).then(function(cache) {
     return cache.addAll([
       '/test/',
       '/test/index.html',
       '/test/scripts/index.js',
       '/test/icon.jpg'
     ]);
   })
 );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== _appVersion) {
          log('Removing old cache ' + key);
          return caches.delete(key);
        }
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
