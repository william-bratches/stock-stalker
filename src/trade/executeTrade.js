const orderTypeMap = {
  Buy: 'order-buy',
  Sell: 'order-sell',
  Cover: 'order-cover',
  Short: 'order-short',
}

const calculateSharesToTrade = async (trade, networths) => {
  // if buy or short order,  calculate based on net worth
  // if sell, just sell all of it
  const volumeAsNumber = Number(trade.volume.replace(/[^0-9.-]+/g, ''));
  const traderNetWorthAsNumber = Number(traderNetWorth.replace(/[^0-9.-]+/g, ''));
  const percentNetWorth = volumeAsNumber / traderNetWorthAsNumber;
};


const executeTrade = async (browser, trade, protagonistNetWorth, traderNetWorth) => {
  // check if actually selected - if not, abandon

  // set type of trade - if none, just return and cancel this action

  // calculate amount to buy based on % of portfolio - need to add total portfolio value to trade information
  // after calc, set shares and go
  // what happens if sets more than can be afforded?
  // click submit order
};

module.exports = executeTrade;
