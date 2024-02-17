const emailService = require('../services/emailService');
const smsService = require('../services/smsService');
const pushService = require('../services/pushService');

exports.sendEmail = async (req, res) => {
  try {
    const { to, subject, text } = req.body;
    await emailService.sendEmail(to, subject, text);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendSms = async (req, res) => {
  try {
    const { to, body } = req.body;
    await smsService.sendSms(to, body);
    res.status(200).json({ message: 'SMS sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendPushNotification = async (req, res) => {
  try {
    const { title, body } = req.body;
    await pushService.sendPushNotification(title, body);
    res.status(200).json({ message: 'Push notification sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
