const puppeteer = require('puppeteer');
const { convertHistory } = require('./domToJson');

// should I get by top performance overall, or fastest growing player?
const getTopPlayerUrl = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.marketwatch.com/game/official-reddit-challenge-2018');
  const url = await page.evaluate(() => $('tr td')[1].querySelector('a').href);
  await browser.close();
  return url;
};


/// NEW PLAN
// use p attribute in url for player tag
// use that to gather CSVs via standard api url
const getPlayerReport = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await convertHistory(page, url);
  // domToJson

}

module.exports = {
  getTopPlayerUrl,
  getPlayerReport,
};
