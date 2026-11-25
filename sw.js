/* Quelle: vtool-dev/sw.src.js (build.py kopiert sie als sw.js nach vtool). Video-Lab Service Worker: App offline verfügbar; Videos werden nie zwischengespeichert. Staging (/staging/) und Field (eigener Worker) bleiben unberührt. */
const C='vlab-app-v1', CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('vlab-app')&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return; const u=new URL(r.url); if(u.origin!==location.origin) return;
  if(u.pathname.includes('/staging/')||u.pathname.includes('/field/')||u.pathname.includes('/s/')) return; // eigene Bereiche, nicht hier zwischenspeichern
  if(r.headers.has('range')||/\.(mp4|mov|m4v|webm|mkv)$/i.test(u.pathname)||/version\.json$/.test(u.pathname)) return; // Videos & Update-Prüfung direkt
  const nav=r.mode==='navigate', key=nav?'index.html':r;
  // a/: Schriften und Bilder der App, versioniert über ?v= → zuerst aus dem Speicher, sonst laden und merken (auch offline verfügbar)
  if(/\/a\/[^/]+$/.test(u.pathname)){ e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{ if(res.ok){ const cp=res.clone(); caches.open(C).then(c=>c.put(r,cp)); } return res; }))); return; }
  // Zuerst Netz (immer die neuste Version), offline aus dem Speicher
  e.respondWith(fetch(r).then(res=>{ if(res.ok&&(nav||CORE.some(p=>p!=='./'&&u.pathname.endsWith(p)))){ const cp=res.clone(); caches.open(C).then(c=>c.put(key,cp)); } return res; })
    .catch(()=>caches.match(key).then(m=>m||caches.match('index.html'))));
});
