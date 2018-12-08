const alpaca = require('../trade');

const executeTrade = (trade, player) => {
  const sharesToTrade = calculateSharesToTrade(trade, player);
  alpaca.createOrder({
    symbol: trade.symbol,
    qty: sharesToTrade,
    side: 'buy' | 'sell',
    type: 'market' | 'limit' | 'stop' | 'stop_limit',
    time_in_force: 'day' | 'gtc' | 'opg' | 'ioc',
    limit_price: number,
    stop_price: number,
    client_order_id: string // optional
  }).then(order => {
    console.log(order);
  })
}


module.exports = executeTrade;
