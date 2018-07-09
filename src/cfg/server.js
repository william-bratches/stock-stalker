const { MongoClient } = require('mongodb');
const app = require('./app');
const env = require('./env');

MongoClient.connect(env.mongo.url, (err, client) => {
  console.log('Connected to mongoDB successfully.');
  const db = client.db(env.mongo.dbName);
  app.start(env.port, db);
});
