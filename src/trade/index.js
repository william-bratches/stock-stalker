const puppeteer = require('puppeteer');
const loginWithCredentials = require('./login');

const init = async () => {
  console.log('launching browser...');
  const browser = await puppeteer.launch();
  console.log('browser launched. logging in...');
  await loginWithCredentials(browser);
  console.log('login seemed ok');
  return browser;
};


module.exports = init;
