const version = "v1::" //Change if you want to regenerate cache
const staticCacheName = `${version}static-resources`;

const offlineStuff = [
    'index.html',
    'build.js',
    'https://unpkg.com/dexie@2.0.3/dist/dexie.js',
    'http://data.fixer.io/api/latest?access_key=8d981abfaca9f2e4162521b9ecf540db',
    'https://cdnjs.cloudflare.com/ajax/libs/annyang/2.6.0/annyang.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.4/css/bootstrap.css'
]

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(staticCacheName)
            .then((cache) => cache.addAll(offlineStuff))
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then((response) => response || fetch(event.request)
        ).catch(console.log)
    );
});
