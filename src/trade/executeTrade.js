const orderTypeMap = {
  Buy: 'order-buy',
  Sell: 'order-sell',
  Cover: 'order-cover',
  Short: 'order-short',
}


const executeTrade = async (browser, trade, currentNetWorth) => {
  const page = await browser.newPage();
  await page.goto('https://www.marketwatch.com/game/official-reddit-challenge-2018');
  await page.type('.j-miniTrade', trade.symbol);
  await page.waitFor('.btn--secodary.j-trade.t-trade');
  await page.evaluate(() => {
    $('.btn--secondary.j-trade.t-trade').first().click();
  });
  await page.waitFor('.company__name');
  await page.click(`#${orderTypeMap[trade.type]}`);
  // check if actually selected - if not, abandon

  // set type of trade - if none, just return and cancel this action
  // calculate amount to buy based on % of portfolio - need to add total portfolio value to trade information
  // click submit order
};

module.exports = executeTrade;
