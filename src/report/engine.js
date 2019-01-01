const { getPlayerReport } = require('./report');
const transactionHistory = require('../models/transactionHistory');
const { hashTrade } = require('../lib/hash');
const { getPlayerIdFromUrl } = require('../lib/parsing');
const sendMessage = require('../lib/twilio');
const executeTrade = require('../trade/executeTrade');

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

  sendMessage(unrolled);
};

const mainSequence = async (player, db) => {
  const data = await getPlayerReport(player.url);
  const collection = transactionHistory(db);
  const oldHistory = await getLatestHistory(collection, player.url);
  if (!oldHistory || oldHistory.length < 1) {
    updateHistory(collection, data, player.url);
    return;
  }

  const hasChanged = determineIfChanged(data, oldHistory);

  if (hasChanged) {
    const newHistory = await updateHistory(collection, data, player.url);
    const newTrades = await diff(oldHistory, newHistory);
    await alertBroker(newTrades);
  }
};

const watchPlayer = (player, db) => {
  setInterval(async () => {
    const newTrades = await mainSequence(player, db);
    newTrades.forEach(trade => executeTrade(trade, player));
  }, WATCH_INTERVAL);
};

const startReporting = (db, player) => {
  // for now, just a hardcoded url for testing. I'll figure out dynamic stuff later
  watchPlayer(player.url, db);
};

module.exports = startReporting;
