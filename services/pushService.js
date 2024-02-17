const webpush = require('../config/webpushConfig');
const Subscription = require('../models/subscriptionModel');

const sendPushNotification = async (title, body) => {
  const subscriptions = await Subscription.find();
  const payload = JSON.stringify({
    notification: {
      title,
      body,
      icon: 'icons/icon-512x512.png',
    },
  });

  subscriptions.forEach((subscription) => {
    webpush.sendNotification(subscription, payload).catch((error) => {
      console.error('Error sending push notification:', error);
    });
  });
};

module.exports = { sendPushNotification };
