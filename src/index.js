const { getPlayerReport } = require('./report/report');

const tempHardcodedUrl = 'http://www.marketwatch.com/game/official-reddit-challenge-2018/portfolio?p=2349626&name=Notice%20Me%20Sempai';
getPlayerReport(tempHardcodedUrl).then(console.log);
