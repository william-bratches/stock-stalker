require('dotenv').config({ silent: true });

module.exports = {
  mongo: {
    dbName: 'stockStalker',
    url: 'mongodb://localhost:27017',
  },
  twilio: {
    sid: process.env.TWILIO_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    source: process.env.TWILIO_SOURCE,
    destination: process.env.TWILIO_DESTINATION,
  },
  port: '7111',
};
