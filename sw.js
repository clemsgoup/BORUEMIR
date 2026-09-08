/* Bei Änderungen an Dateien CACHE auf eine neue Versionsnummer setzen. */
const CACHE='boruemir-shell-v1';
const FILES=['./','./index.html','./manifest.webmanifest','./assets/css/styles.css','./assets/js/core.js','./assets/js/app.js','./assets/js/install.js','./assets/icons/favicon.svg','./assets/icons/icon-192.png','./assets/icons/icon-512.png','./assets/icons/icon-maskable-512.png','./assets/icons/apple-touch-icon.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('boruemir-shell-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 event.respondWith(caches.open(CACHE).then(async cache=>{
 const cached=await cache.match(event.request);if(cached)return cached;
 try{return await fetch(event.request);}catch(error){if(event.request.mode==='navigate')return await cache.match('./index.html');throw error;}
 }));
});
