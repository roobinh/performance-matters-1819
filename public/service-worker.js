'use strict'

var cacheVersion = 1
var currentCache = {
    offline: 'offline-cache' + cacheVersion
}
var offlineUrls = [ '/', '/home', '/results', '/results?', '/offline'];

self.addEventListener('install', (event) => {
    console.log("service worker: install...", event);

    event.waitUntil(
        caches.open(currentCache.offline)
            .then(function(cache) {
                return cache.addAll(offlineUrls);
            })
    );
});

self.addEventListener('activate', (event) => {
    console.log("service worker: activate...", event)
});

self.addEventListener('fetch', (event) => {
    console.log("service worker: fetch...", event.request.url)
    
    event.respondWith(
        fetch(event.request).catch(error => {
            console.log('Fetch failed; returning offline page instead.', error);
            return caches.match('/offline');
        }        
    ))
});

function isHtmlGetRequest(request) {
    if(request.method == "GET") {
        console.log("is get request...")
        return true;
    }
    return false;
}