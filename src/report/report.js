const puppeteer = require('puppeteer');

// PLAN C: parse table to array via pupeteer

const GAME_NAME = 'official-reddit-challenge-2018';

const parseTransactionRow = (node) => {

};

// should I get by top performance overall, or fastest growing player?
const getTopPlayerUrl = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.marketwatch.com/game/${GAME_NAME}`);
  const url = await page.evaluate(() => $('tr td')[1].querySelector('a').href);
  await browser.close();
  return url;
};

const getPlayerReport = async (url) => {
  console.log(url);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const file = await page.evaluate(() => {
    $('.ranking')[0].querySelector('tbody').childNodes.reduce((acc, node) => {
      const transactionRecord = parseTransactionRow(node);

    }, []);

    // cycle through table, reduce to object

  });
  return file;
};

// const watchPlayer = (url) => {
//   setInterval(async () => {
//     const file = await getPlayerReport(url);
//     // if timestamp is greater
//     // go wild, otherwise pass
//   }, 80000);
//   // every 80 seconds, get new copy of report
//   // check to see if any changes have been made
// }

module.exports = {
  getTopPlayerUrl,
  getPlayerReport,
};
