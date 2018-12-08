const calculateSharesToTrade = async (trade) => {
  // if buy or short order,  calculate based on net worth
  // if sell, just sell all of it
  const volumeAsNumber = Number(trade.volume.replace(/[^0-9.-]+/g, ''));
  const traderNetWorthAsNumber = Number(traderNetWorth.replace(/[^0-9.-]+/g, ''));
  const percentNetWorth = volumeAsNumber / traderNetWorthAsNumber;
};

const getTargetNetWorth = (player) => {

};
