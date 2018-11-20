const initTrade = require('../trade/index');
const executeTrade = require('../trade/executeTrade');

const testSequence = async () => {
  const browser = await initTrade();
  await executeTrade(browser);
};

module.exports = testSequence;
