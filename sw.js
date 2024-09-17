self.addEventListener("install", (e) => {
  console.log("install!");
});

//Temp disabled until fixed

// self.addEventListener("install", (e) => {
//   e.waitUntil(
//     caches.open("static").then((cache) => {
//       return cache.addAll([
//         "./",
//         "/src/index.css",
//         "/src/icons/android-launchericon-192-192.png",
//       ]);
//     })
//   );
// });

// self.addEventListener("fetch", (e) => {
//   e.respondWith(
//     caches.match(e.request).then((response) => {
//       return response || fetch(e.request);
//     })
//   );
// });
