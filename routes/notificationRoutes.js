const express = require('express');
const router = express.Router();
const notificationController = require('../controllers');

router.post('/email', notificationController.notificationController.sendEmail);
router.post('/sms', notificationController.notificationController.sendSms);
router.post('/push', notificationController.notificationController.sendPushNotification);

module.exports = router;
