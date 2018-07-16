const { hashTrade } = require('../lib/hash');

function getPlayerIdFromUrl(url) {
  const parsedUrl = new URL(url);
  return parsedUrl.searchParams.get('p');
}

function transactionHistory(db) {
  const collection = db.collection('transactionHistories');
  return {
    find(playerId) {
      return new Promise((resolve, reject) => {
        return collection.findOne({ playerId }, (err, doc) => {
          if (err) {
            return reject(err);
          }

          return resolve(doc);
        });
      });
    },
    insert(data, url) {
      const lastTrade = data[0];
      const hash = hashTrade(lastTrade);
      const doc = {
        data: data.slice(),
        insertStamp: new Date(),
        playerId: getPlayerIdFromUrl(url),
        hash,
        url,
      };

      return new Promise((resolve, reject) => {
        collection.insertOne(doc, (err, status) => {
          if (err) {
            return reject(err);
          }

          return resolve(status);
        });
      });
    },
    update() {

    },
  };
}

module.exports = transactionHistory;
