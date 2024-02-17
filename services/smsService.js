const twilio = require('twilio');
const CONFIG=require("../config/config")
const client = twilio(CONFIG.TWILIO_ACCOUNT_SID, CONFIG.TWILIO_AUTH_TOKEN);

const sendSms = async (to, body) => {
  await client.messages.create({
    to,
    from: CONFIG.TWILIO_PHONE_NUMBER,
    body,
  });
};

module.exports = { sendSms };
