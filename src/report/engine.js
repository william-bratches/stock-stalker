const { getPlayerReport } = require('./report');
const transactionHistory = require('../models/transactionHistory');
const { hashTrade } = require('../lib/hash');
const { getPlayerIdFromUrl } = require('../lib/parsing');

const WATCH_INTERVAL = 60000;

const getLatestHistory = async (collection, url) => {
  const playerId = getPlayerIdFromUrl(url);
  await collection.find(playerId);
};

const determineIfChanged = async (data, lastDocument) => {
  const newTradeHash = hashTrade(data[0]);
  const oldTradeHash = lastDocument.hash;
  return newTradeHash !== oldTradeHash;
};

const updateHistory = (collection) => {
  return


  // return new document after insert
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
    const oldHistory = await getLatestHistory(collection, url);
    const hasChanged = await determineIfChanged(data, oldHistory);

    if (hasChanged) {
      const newHistory = await updateHistory(data, collection, hasChanged);
      const newTrades = await diff(oldHistory, newHistory);
      await alertBroker(newTrades);
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
