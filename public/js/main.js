const subscribeBtn = document.getElementById('subscribeBtn');

subscribeBtn.addEventListener('click', async () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      // Register the service worker
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);

      // Wait for the service worker to become active
      if (registration.active) {
        console.log('Service Worker is active and ready to subscribe to push notifications');
      } else {
        await new Promise(resolve => {
          const interval = setInterval(() => {
            if (registration.active) {
              clearInterval(interval);
              resolve();
            }
          }, 100);
        });
        console.log('Service Worker has become active');
      }

      // Subscribe to push notifications
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });
      console.log('Subscribed to push notifications:', subscription);

      // Send the subscription to your server
      await fetch('/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });
      console.log('Subscription sent to the server');

    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
    }
  } else {
    console.warn('Push messaging is not supported');
  }
});

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
