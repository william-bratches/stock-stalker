const puppeteer = require('puppeteer');

const GAME_NAME = 'official-reddit-challenge-2018';

// should I get by top performance overall, or fastest growing player?
const getTopPlayerUrl = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.marketwatch.com/game/${GAME_NAME}`);
  const url = await page.evaluate(() => $('tr td')[1].querySelector('a').href);
  await browser.close();
  return url;
};

// const getPlayerIdFromUrl = (url) => {
//   const parsedUrl = new URL(url);
//   return parsedUrl.searchParams.get('p');
// };


const getPlayerReport = async (url) => {
  console.log('fetching player report...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // const playerId = getPlayerIdFromUrl(url);
  // const csvUrl = `https://www.marketwatch.com/game/${GAME_NAME}/download?view=transactions&amp;count=16&amp;p=${playerId}`;
  const file = await page.evaluate(() => {
    const tempHardCodedUrl = 'https://www.marketwatch.com/game/official-reddit-challenge-2018/download?view=transactions&amp;count=16&amp;p=2349626';
    return fetch(tempHardCodedUrl, { credentials: 'same-origin', responseType: 'arraybuffer' })
      .then(res => res.json())
      .then(console.log)
      .catch(console.log);
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
