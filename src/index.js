const { getTopPlayerUrl, getPlayerReport } = require('./report/report');

getTopPlayerUrl().then(getPlayerReport);
