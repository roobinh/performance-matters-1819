'use strict'

var cacheVersion = 1
var currentCache = {
    offline: 'offline-cache' + cacheVersion
}
var offlineUrl = '/home';

self.addEventListener('install', (event) => {
    console.log("service worker: install...", event);

    event.waitUntil(
        caches.open(currentCache.offline)
            .then(function(cache) {
                return cache.addAll([
                    offlineUrl
                ]);
            })
    );
});

self.addEventListener('activate', (event) => {
    console.log("service worker: activate...", event)
});

self.addEventListener('fetch', (event) => {
    console.log("service worker: fetch...", event.request.url)
    
    if(isHtmlGetRequest(event.request)) {
        event.respondWith(
            fetch(event.request.url).catch(err => {
                // Return the offline page
                return caches.match(offlineUrl)
            })
        )
    }
});

function isHtmlGetRequest(request) {
    if(request.method == "GET") {
        console.log("is get request...")
        return true;
    }
    return false;
}