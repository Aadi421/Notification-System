const webpush = require('web-push');
const CONFIG = require('../config/config');

webpush.setVapidDetails(
  'mailto:example@example.com',
  CONFIG.VAPID_PUBLIC_KEY,
  CONFIG.VAPID_PRIVATE_KEY
);

module.exports = webpush;
