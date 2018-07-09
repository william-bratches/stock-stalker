const express = require('express');

const defaultCb = () => {};

const start = (port, db, cb = defaultCb) => {
  const app = express();
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    cb(true);
  });
};

module.exports = start;
