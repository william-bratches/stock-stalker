const puppeteer = require('puppeteer');
const parseHistoryFromDom = require('./domParser');

const GAME_NAME = 'official-reddit-challenge-2018';

const getTopPlayerUrl = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.marketwatch.com/game/${GAME_NAME}`);
  const url = await page.evaluate(() => $('tr td')[1].querySelector('a').href);
  await browser.close();
  return url;
};

const getPlayerReport = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const history = await page.evaluate(parseHistoryFromDom);
  await browser.close();
  return history;
};

module.exports = {
  getTopPlayerUrl,
  getPlayerReport,
};
