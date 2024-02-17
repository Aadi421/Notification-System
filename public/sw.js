// sw.js
self.addEventListener('push', function(event) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: 'icons/icon-512x512.png',
      badge: 'icons/icon-128x128.png'
    };
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  });
  