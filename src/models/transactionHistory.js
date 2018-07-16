const crypto = require('crypto');

const getPlayerIdFromUrl = (url) => {
  const parsedUrl = new URL(url);
  return parsedUrl.searchParams.get('p');
};

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
      const lastTradeDetails = `${lastTrade.symbol}-${lastTrade.type}-${lastTrade.price}-${lastTrade.amount}-${lastTrade.orderDate}`;
      const doc = {
        data: data.slice(),
        insertStamp: new Date(),
        hash: crypto.createHash('md5').update(lastTradeDetails).digest('hex'),
        playerId: getPlayerIdFromUrl(url),
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
