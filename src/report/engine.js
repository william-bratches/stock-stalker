const { getPlayerReport } = require('./report');
const transactionHistory = require('../models/transactionHistory');

const WATCH_INTERVAL = 60000;

const hasChanged = () => {

};

const watchPlayer = (url, db) => {
  setInterval(async () => {
    const data = await getPlayerReport(url);
    const collection = transactionHistory(db);
    // TODO: fancy parsing here, if timestamp is greater insert, etc.
    collection.insert(data);
  }, WATCH_INTERVAL);
};

const startReporting = (db) => {
  // for now, just a hardcoded url for testing. I'll figure out dynamic stuff later
  const tempHardcodedUrl = 'http://www.marketwatch.com/game/official-reddit-challenge-2018/portfolio?p=2349626&name=Notice%20Me%20Sempai';
  watchPlayer(tempHardcodedUrl, db);
};

module.exports = {
  startReporting,
};
