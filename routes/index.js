const express = require('express');
const router = express.Router();
const notificationRoutes = require('./notificationRoutes');
const subscriptionRoutes = require('./subscriptionRoutes');
const CONFIG = require('../config/config');

// Render the index view
router.get('/', (req, res) => {
    res.render('index');
});

// Render the subscribe view
router.get('/subscribe', (req, res) => {
    res.render('subscribe',{ vapidPublicKey: CONFIG.VAPID_PUBLIC_KEY });
});

router.post('api/notifications', notificationRoutes);
router.post('subscribe', subscriptionRoutes);

module.exports = router;