const { getPlayerReport, getTopPlayerUrl } = require('./report');
const transactionHistory = require('../models/transactionHistory');
const { hashTrade } = require('../lib/hash');
const { getPlayerIdFromUrl } = require('../lib/parsing');
const sendMessage = require('../lib/twilio');

// const WATCH_INTERVAL = 30000;

const getLatestHistory = async (collection, url) => {
  const playerId = getPlayerIdFromUrl(url);
  const latestRecord = await collection.find(playerId);
  return latestRecord;
};

const determineIfChanged = (data, lastDocument) => {
  const newTradeHash = hashTrade(data[0]);
  const oldTradeHash = lastDocument.hash;
  return newTradeHash !== oldTradeHash;
};

const updateHistory = async (collection, data, url) => {
  await collection.insert(data, url);
};

const diff = (oldHistory, newHistory) => {
  // we can assume data is ordered chronologically
  const previousHash = hashTrade(oldHistory.data[0]);
  const newHashes = newHistory.data.map(hashTrade);

  const intersection = newHashes.findIndex(hash => hash === previousHash);
  return intersection > 0 ? newHashes.slice(intersection) : [];
};

const alertBroker = (trades) => {
  console.log(trades);
  // TODO: parse trades in text-readable format
  sendMessage(trades);
};

const mainSequence = async (url, db) => {
  const data = await getPlayerReport(url);
  console.log(data);
  const collection = transactionHistory(db);
  const oldHistory = await getLatestHistory(collection, url);
  if (!oldHistory || oldHistory.length < 1) {
    updateHistory(collection, data, url);
    return;
  }

  const hasChanged = determineIfChanged(data, oldHistory);
  console.log(hasChanged);

  if (hasChanged) {
    const newHistory = await updateHistory(collection, data, url);
    const newTrades = await diff(oldHistory, newHistory);
    await alertBroker(newTrades);
  }
};

// const watchPlayer = (url, db) => {
//   setInterval(async () => {
//     mainSequence();
//   }, WATCH_INTERVAL);
// };

const startReporting = (db) => {
  // for now, just a hardcoded url for testing. I'll figure out dynamic stuff later
  const tempHardcodedUrl = 'http://www.marketwatch.com/game/official-reddit-challenge-2018/portfolio?p=2349626&name=Notice%20Me%20Sempai';
  // watchPlayer(tempHardcodedUrl, db);
  mainSequence(tempHardcodedUrl, db);
};

module.exports = startReporting;
