const { hashTrade } = require('../lib/hash');
const { getPlayerIdFromUrl } = require('../lib/parsing');

function transactionHistory(db) {
  const collection = db.collection('transactionHistories');
  return {
    find(playerId) {
      return new Promise((resolve, reject) => {
        return collection
          .find({ playerId })
          .sort({ insertStamp: -1 })
          .limit(1)
          .toArray((err, doc) => {
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
        collection.insertOne(doc, (err) => {
          if (err) {
            return reject(err);
          }

          return resolve(doc);
        });
      });
    },
    update() {

    },
  };
}

module.exports = transactionHistory;
