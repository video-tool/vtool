/* Video-Lab Field: App offline verfügbar (Videos liegen in der App-Datenbank, nicht im Cache). */
const C='vlab-field-v1', CORE=['./','index.html','manifest.webmanifest'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('vlab-field')&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{ const r=e.request; if(r.method!=='GET') return; const u=new URL(r.url); if(u.origin!==location.origin||!u.pathname.includes('/field/')) return;
  const nav=r.mode==='navigate', key=nav?'index.html':r;
  e.respondWith(fetch(r).then(res=>{ if(res.ok){ const cp=res.clone(); caches.open(C).then(c=>c.put(key,cp)); } return res; }).catch(()=>caches.match(key).then(m=>m||caches.match('index.html')))); });
