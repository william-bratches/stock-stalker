const cfg = require('../cfg/env');

const loginWithCredentials = async (browser) => {
  const page = await browser.newPage();
  await page.goto('https://www.marketwatch.com/');
  await page.click('.btn--login');
  await page.waitFor('.sign-in-title');
  await page.type('#username', cfg.mw.username);
  await page.type('#password', cfg.mw.password);
  await page.keyboard.press('Enter');
  await page.waitForNavigation();
  await page.close();
};

module.exports = loginWithCredentials;
