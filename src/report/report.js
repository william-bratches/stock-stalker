const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const parseHistoryFromDom = require('./domParser');
const axios = require('../lib/axios');

const GAME_NAME = 'official-reddit-challenge-2018';

const getTopPlayerUrl = async () => {
  const html = await axios.get(`/game/${GAME_NAME}`);
  const dom = new JSDOM(html.data);
  const { document } = dom.window;
  const url = document.querySelector('tr td').innerHTML;//[1].querySelector('a').href;
  console.log(url);
  return url;
};

// const getPlayerReport = async (url) => {
//   const html = await axios.get(url);
//   const $ = cheerio.load(html);
//
//   const history = await page.evaluate(parseHistoryFromDom);
//   await browser.close();
//   return history;
// };

module.exports = {
  getTopPlayerUrl,
  // getPlayerReport,
};
