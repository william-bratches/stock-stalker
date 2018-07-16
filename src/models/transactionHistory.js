const crypto = require('crypto');

function transactionHistory(db) {
  const collection = db.collection('transactionHistories');
  return {
    find() {

    },
    insert(data) {
      const tradeDetails = `${data.symbol}-${data.type}-${data.price}-${data.amount}-${data.orderDate}`;
      const doc = Object.assign({}, data, {
        insertStamp: new Date(),
        hash: crypto.createHash('md5').update(tradeDetails).digest('hex'),
      });
      return collection.insert(doc);
    },
    update() {

    },
  };
}

module.exports = transactionHistory;
