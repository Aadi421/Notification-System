const Subscription = require('../models/subscriptionModel');
const webpush = require('../config/webpushConfig');

exports.subscribe = async (req, res) => {
  const subscription = req.body;
  const newSubscription = new Subscription(subscription);
  await newSubscription.save();
  res.status(201).json({ message: 'Subscription added successfully' });
};

exports.getSubscription = async (req, res) => {
  const subscriptions = await Subscription.find();
  res.status(200).json(subscriptions);
};

exports.sendPushToAll = async (req, res) => {
  try {
    const { title, body } = req.body;
    const subscriptions = await Subscription.find();

    const notificationPayload = {
      notification: {
        title,
        body,
        icon: 'icons/icon-512x512.png',
      },
    };

    const promises = [];
    subscriptions.forEach((subscription) => {
      promises.push(
        webpush.sendNotification(subscription, JSON.stringify(notificationPayload))
      );
    });

    await Promise.all(promises);
    res.status(200).json({ message: 'Push notifications sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
