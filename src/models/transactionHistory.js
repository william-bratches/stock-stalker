function transactionHistory(db) {
  const collection = db.collection('transactionHistories');
  return {
    find() {

    },
    insert(doc) {
      return collection.insert(doc);
    },
    update() {

    },
  };
}

module.exports = transactionHistory;
