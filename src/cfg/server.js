const { MongoClient } = require('mongodb');
const app = require('./app');
const env = require('./env');

module.exports = MongoClient.connect(env.mongo.url, (err, client) => {
  // eslint-disable-next-line
  if (err) console.log(err);
  // eslint-disable-next-line
  console.log('Server and mongo have connected.');
  const db = client.db(env.mongo.dbName);
  app.start(env.port, db);
});
