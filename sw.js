const cacheName = 'ic-v1';
const staticAssets = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
});

self.addEventListener('fetch', e => {
  const req = e.request;
  e.respondWith(networkFirst(req));
});

async function networkFirst(req) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(req);
    cache.put(req, res.clone());
    return res;
  } catch (error) {
    return await cache.match(req);
  }
}