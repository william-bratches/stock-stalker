const { MongoClient } = require('mongodb');
const app = require('./app');
const env = require('./env');

const options = { useNewUrlParser: true };

module.exports = () => {
  MongoClient.connect(env.mongo.url, options, (err, client) => {
    // eslint-disable-next-line
    console.log('Mongo has connected to server.');
    const db = client.db(env.mongo.dbName);
    app.start(env.port, db);
  });
};
