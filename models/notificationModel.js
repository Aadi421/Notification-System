const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: String,
  recipient: String,
  message: String,
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
