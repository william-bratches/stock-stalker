const puppeteer = require('puppeteer');
const { convertHistory } = require('./domToJson');
const GAME_NAME = 'official-reddit-challenge-2018'

// should I get by top performance overall, or fastest growing player?
const getTopPlayerUrl = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.marketwatch.com/game/${GAME_NAME}`);
  const url = await page.evaluate(() => $('tr td')[1].querySelector('a').href);
  await browser.close();
  return url;
};

const getPlayerIdFromUrl = (url) => {
  const parsedUrl = new URL(url);
  return url.searchParams.get('p');
}

const getPlayerReport = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const playerId = getTopPlayerUrl(url);
  const csvUrl = `https://www.marketwatch.com/game/${GAME_NAME}/download?view=transactions&amp;count=16&amp;p=${playerId}`;
  const file = await this.page.evaluate(() => $('.transactions a')[0].click());
  return file;
}

const watchPlayer = async(url) => {
  setInterval(() => {
    const file = await getPlayerReport(url);
    // if timestamp is greater
    // go wild, otherwise pass
  }, 80000);
  // every 80 seconds, get new copy of report
  // check to see if any changes have been made
}

module.exports = {
  getTopPlayerUrl,
  getPlayerReport,
};
