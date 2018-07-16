const express = require('express');
const startReporting = require('../report/engine');

const defaultCb = () => {};

const start = (port, db, cb = defaultCb) => {
  const app = express();
  app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`Server listening on port ${port}`);
    startReporting(db);
    cb(true);
  });
};

module.exports = { start };
