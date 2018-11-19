const puppeteer = require('puppeteer');

const init = async () => {
  await puppeteer.launch();
};

module.exports = init;
