let cacheName = 'v1';

//Install event
self.addEventListener('install', e => {
    console.log('Service Worker Installed');

});
//Activate event
self.addEventListener('activate', e => {
    console.log('Service Worker Activated');
    //REmove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

//CAll fetch event
self.addEventListener('fetch', e => {
    console.log('ServiceWorker Fetching');
    e.respondWith(fetch(e.request)
        .then(response => {
            let responseClone = response.clone();
            caches
                .open(cacheName)
                .then(cache => {
                    cache.put(e.request, responseClone);
                });
            return response;
        }).catch(error => caches.match(e.request).then(response => response))
    );
});