const crypto = require('crypto');

function hashTrade(trade) {
  const tradeDetails = `${trade.symbol}-${trade.type}-${trade.price}-${trade.amount}-${trade.orderDate}`;
  return crypto.createHash('md5').update(tradeDetails).digest('hex');
}

module.exports = {
  hashTrade,
};
