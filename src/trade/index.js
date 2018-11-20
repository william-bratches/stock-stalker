const puppeteer = require('puppeteer');
const loginWithCredentials = require('./login');

const init = async () => {
  const browser = await puppeteer.launch();
  await loginWithCredentials(browser);
  return browser;
};


module.exports = init;
