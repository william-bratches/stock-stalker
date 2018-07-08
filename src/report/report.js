const puppeteer = require('puppeteer');

// PLAN C: parse table to array via pupeteer

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
  const transactionHistory = await page.evaluate(() => {
    // due to limitations with evaluate, we have to write all code within scope :(
    const tableLabelMap = {
      0: 'Symbol',
      1: 'Order Date',
      2: 'Transaction Date',
      3: 'Type',
      4: 'Amount',
      5: 'Price',
      6: 'Volume',
    }

    const parseTransactionRow = (node) => {
      const cells = node.querySelectorAll('td');
      const acc = {};
      return cells.forEach((cell, index) => {
        const label = tableLabelMap[index];
        return Object.assign(acc, { [label]: cell.innerText });
      });
    };

    // iterate through HTML table, construct array of objects
    const history = [];
    $('.ranking')[0].querySelector('tbody').querySelectorAll('tr').forEach((node) => {
      const transactionRecord = parseTransactionRow(node);
      history.push(transactionRecord);
    });

    return history;
  });

  await browser.close();
  return transactionHistory;
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
