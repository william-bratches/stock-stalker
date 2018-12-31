require('dotenv').config({ silent: true });

module.exports = {
  alpaca: {
    key: process.env.ALPACA_KEY,
    secret: process.env.ALPACA_SECRET,
  },
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
  mw: {
    username: process.env.MW_USERNAME,
    password: process.env.MW_PASSWORD,
    url: 'https://www.marketwatch.com',
  },
  port: '7111',
};
