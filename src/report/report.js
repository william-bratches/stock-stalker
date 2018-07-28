const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const parseHistoryFromDom = require('./domParser');
const axios = require('../lib/axios');

const GAME_NAME = 'official-reddit-challenge-2018';

const getTopPlayerUrl = async () => {
  const html = await axios.get(`/game/${GAME_NAME}`);
  const { document } = new JSDOM(html.data).window;
  const url = document.querySelectorAll('tr td')[1].querySelector('a').href;
  return url;
};

const getPlayerReport = async (url) => {
  const html = await axios.get(url);
  const { document } = new JSDOM(html.data).window;

  const history = parseHistoryFromDom(document);
  return history;
};

module.exports = {
  getTopPlayerUrl,
  getPlayerReport,
};
