var C='ftp-v3';
var U=['./','./index.html','./manifest.json'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(U)}));self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==C}).map(function(k){return caches.delete(k)}))}));self.clients.claim()});
self.addEventListener('fetch',function(e){e.respondWith(caches.match(e.request).then(function(r){return fetch(e.request).then(function(res){if(res&&res.status===200){var cl=res.clone();caches.open(C).then(function(c){c.put(e.request,cl)})}return res}).catch(function(){return r})}))});
