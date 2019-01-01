const axios = require('axios');
const jsdom = require('jsdom');
const alpaca = require('./index');

const { JSDOM } = jsdom; 

const getProtagonistBuyingPower = () => {
  alpaca.getAccount().then(account => Promise.resolve(account.buying_power));
};

const getTargetBuyingPower = async (target) => {
  const { url } = target;
  const html = await axios.get(url);
  const { document } = new JSDOM(html.data).window;
  const buyingPower = document.querySelectorAll('.kv__primary')[5]; // this sucks
  return Number(buyingPower.replace('$', ''));
};

const calculateSharesToTrade = async (trade, target) => {
  const protagonistBuyingPower = await getProtagonistBuyingPower();
  const targetBuyingPower = getTargetBuyingPower(target);
  const volumeAsNumber = Number(trade.volume.replace(/[^0-9.-]+/g, ''));
  const percentNetWorth = volumeAsNumber / targetBuyingPower;
  // RoundUp((target  cash * percent Net worth) / stock price)
};

module.exports = {
  getProtagonistCash,
};
