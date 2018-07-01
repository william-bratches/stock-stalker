const puppeteer = require('puppeteer');

const goToTopPlayer = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.marketwatch.com/game/official-reddit-challenge-2018');
  const url = await page.evaluate(() => $('tr td')[1].querySelector('a').href);
  await browser.close();
  return url;
};

const watchPlayer = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  // convert history DOM to JSON
  // check pending orders?
}

module.exports = {
  goToTopPlayer,
  watchPlayer,
};
