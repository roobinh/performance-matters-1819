self.addEventListener('install', (event) => {
    console.log("service worker: install...", event);

    event.waitUntil(
        caches.open('core-cache')
            .then(cache => cache.addAll(['/home']))
            .then(() => self.skipWaiting()))
});

self.addEventListener('activate', (event) => {
    console.log("service worker: activate...", event)
});

self.addEventListener('fetch', (event) => {
    console.log("service worker: fetch...", event.request.url)
    
    if(isHtmlGetRequest(event.request)) {
        event.respondWith(fetch(event.request).catch(err => {
            return caches.open('core-cache').then(cache => {
                console.log(cache);
                return cache.match('/home').then(cacheEntry => {
                    return Response;
                })
            })
        }))
    }
});

function isHtmlGetRequest(request) {
    if(request.method == "GET") {
        console.log("is get request...")
        return true;
    }
    return false;
}