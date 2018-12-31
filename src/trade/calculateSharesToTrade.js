const alpaca = require('./index');

const getProtagonistBuyingPower = () => {
  alpaca.getAccount().then(account => Promise.resolve(account.buying_power));
};

const getTargetBuyingPower = (target) => {
  //  get player url
  // navigate to get page
  // from page, extract net worth
  // convert to number

};

const calculateSharesToTrade = async (trade, target) => {
  const protagonistBuyingPower = await getProtagonistBuyingPower();
  const targetBuyingPower = getTargetBuyingPower(target);
  const volumeAsNumber = Number(trade.volume.replace(/[^0-9.-]+/g, ''));
  const percentNetWorth = volumeAsNumber / targetCash;
  // RoundUp((target  cash * percent Net worth) / stock price)
};

module.exports = {
  getProtagonistCash,
};
