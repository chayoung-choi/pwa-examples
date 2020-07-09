self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('test-pwa').then(function(cache) {
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
