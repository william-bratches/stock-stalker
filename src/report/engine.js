const { getPlayerReport } = require('./report');
const transactionHistory = require('../models/transactionHistory');

const WATCH_INTERVAL = 60000;

const determineIfChanged = () => {
  // find latest document by insertDate


  // do diffing later
};

const updateHistory = (hasChanged) => {
  // if hashes don't match, insert
  // if not, skip


  // do diffing here?
};

const diff = (oldHistory, newHistory) => {
  // what trades are new?

};

const alertBroker = () => {
  // twilio integration?
};

const watchPlayer = (url, db) => {
  setInterval(async () => {
    const data = await getPlayerReport(url);
    const collection = transactionHistory(db);
    const hasChanged = await determineIfChanged(data, collection);

    if (hasChanged) {
      const { oldHistory, newHistory } = await updateHistory(data, collection, hasChanged);
      const newTrades = await diff(oldHistory, newHistory);
      await alertBroker(hasChanged);
    }
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
