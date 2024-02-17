const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers');

router.post('/subscribe', subscriptionController.subscriptionController.subscribe);
router.get('/getSubscription', subscriptionController.subscriptionController.getSubscription);
router.post('/send', subscriptionController.subscriptionController.sendPushToAll);

module.exports = router;
