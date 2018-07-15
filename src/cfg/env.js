require('dotenv').config();

module.exports = {
  mongo: {
    dbName: 'stockStalker',
    url: 'mongodb://localhost:27017',
  },
  port: '7111',
};
