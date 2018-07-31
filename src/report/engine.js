const { getPlayerReport } = require('./report');
const transactionHistory = require('../models/transactionHistory');
const { hashTrade } = require('../lib/hash');
const { getPlayerIdFromUrl } = require('../lib/parsing');
const sendMessage = require('../lib/twilio');

const WATCH_INTERVAL = 10000;

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
  const doc = await collection.insert(data, url);
  return doc;
};

const diff = (oldHistory, newHistory) => {
  // we can assume data is ordered chronologically
  const previousHash = hashTrade(oldHistory.data[0]);
  const newHashes = newHistory.data.map(hashTrade);

  const intersection = newHashes.findIndex(hash => hash === previousHash);
  return intersection > 0 ? newHistory.data.slice(0, intersection) : [];
};

const alertBroker = (trades) => {
  const semanticTrades = trades.map((trade) => {
    return `${trade.type} ${trade.amount} ${trade.symbol} @ ${trade.price}`;
  });

  const unrolled = semanticTrades.reduce((next, acc) => {
    return `${acc};;\n${next}`;
  }, '');

  console.log(unrolled);
  sendMessage(unrolled);
};

const mainSequence = async (url, db) => {
  const data = await getPlayerReport(url);
  const collection = transactionHistory(db);
  const oldHistory = await getLatestHistory(collection, url);
  if (!oldHistory || oldHistory.length < 1) {
    updateHistory(collection, data, url);
    return;
  }

  const hasChanged = determineIfChanged(data, oldHistory);
  console.log('hasChanged', hasChanged);

  if (hasChanged) {
    const newHistory = await updateHistory(collection, data, url);
    console.log('newHistory');
    const newTrades = await diff(oldHistory, newHistory);
    console.log('newTrades');
    await alertBroker(newTrades);
  }
};

const watchPlayer = (url, db) => {
  setInterval(async () => {
    mainSequence(url, db);
  }, WATCH_INTERVAL);
};

const startReporting = (db) => {
  // for now, just a hardcoded url for testing. I'll figure out dynamic stuff later
  const tempHardcodedUrl = 'https://www.marketwatch.com/game/official-reddit-challenge-2018/portfolio?p=1869479&name=Marcos%20Izquierdo';
  watchPlayer(tempHardcodedUrl, db);
};

module.exports = startReporting;
