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

self.addEventListener('fetch', function(e) {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
