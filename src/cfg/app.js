const express = require('express');
const startReporting = require('../report/engine');
const target = require('../models/target');

const defaultCb = () => {};

const start = (port, db, cb = defaultCb) => {
  const app = express();
  app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`Server listening on port ${port}`);
    const william = target('https://www.marketwatch.com/game/official-reddit-challenge-2018/portfolio?p=1037665&name=William%20Bratches');
    startReporting(db, william);
    cb(true);
  });
};

module.exports = { start };
