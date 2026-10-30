/* Video-Lab Service Worker: App offline verfügbar; Videos werden nie zwischengespeichert. */
const C='vlab-app-v1', CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return; const u=new URL(r.url); if(u.origin!==location.origin) return;
  if(r.headers.has('range')||/\.(mp4|mov|m4v|webm|mkv)$/i.test(u.pathname)||/version\.json$/.test(u.pathname)) return; // Videos & Update-Prüfung direkt
  const nav=r.mode==='navigate', key=nav?'index.html':r;
  // Zuerst Netz (immer die neuste Version), offline aus dem Speicher
  e.respondWith(fetch(r).then(res=>{ if(res.ok&&(nav||CORE.some(p=>p!=='./'&&u.pathname.endsWith(p)))){ const cp=res.clone(); caches.open(C).then(c=>c.put(key,cp)); } return res; })
    .catch(()=>caches.match(key).then(m=>m||caches.match('index.html'))));
});
