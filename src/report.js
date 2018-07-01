const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.marketwatch.com/game/official-reddit-challenge-2018');
  const url = await page.evaluate(() => $('tr td')[1].querySelector('a').href);
  await page.goto(url);
  await page.screenshot({path: 'bin/screenshots/example.png'});
  await browser.close();
})();
