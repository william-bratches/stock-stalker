const alpaca = require('../trade');
const calculateSharesToTrade = require('./calculateSharesToTrade');

const determineTradeType = (type) => {
  // Buy, Sell - ignore COVER and SHORT
  const lowcaseType = type.toLowerCase();
  if (lowcaseType === 'buy' || lowcaseType === 'sell') {
    return lowcaseType;
  }
};

const executeTrade = (trade, player) => {
  const sharesToTrade = calculateSharesToTrade(trade, player);
  const tradeType = determineTradeType(trade.type);
  if (tradeType) {
    alpaca.createOrder({
      symbol: trade.symbol,
      qty: sharesToTrade,
      side: tradeType,
      type: 'market',
      time_in_force: 'gtc',
    }).then((order) => {
      console.log(order);
    });
  }
  console.log(`Order was ${trade.type}, not executing`);
};


module.exports = executeTrade;
