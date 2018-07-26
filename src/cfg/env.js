require('dotenv').config();

module.exports = {
  mongo: {
    dbName: 'stockStalker',
    url: 'mongodb://localhost:27017',
  },
  twilio: {
    sid: process.env.TWILIO_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
  },
  port: '7111',
};
