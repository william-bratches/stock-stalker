const crypto = require('crypto');

function transactionHistory(db) {
  const collection = db.collection('transactionHistories');
  return {
    find() {

    },
    insert(data, url) {
      const lastTrade = data[0];
      const lastTradeDetails = `${lastTrade.symbol}-${lastTrade.type}-${lastTrade.price}-${lastTrade.amount}-${lastTrade.orderDate}`;
      const doc = {
        data: data.slice(),
        insertStamp: new Date(),
        hash: crypto.createHash('md5').update(lastTradeDetails).digest('hex'),
        url,
      };

      return collection.insert(doc);
    },
    update() {

    },
  };
}

module.exports = transactionHistory;
