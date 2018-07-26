const twilio = require('twilio');
const env = require('../cfg/env');
const log = require('./logger');

const client = twilio(env.twilio.sid, env.twilio.authToken);

const sendMessage = (body) => {
  return client.messages
    .create({
      body,
      from: env.twilio.source,
      to: env.twilio.destination,
    })
    .then(() => log(`Message sent to ${env.twilio.destination}`))
    .done();
};

module.exports = sendMessage;
