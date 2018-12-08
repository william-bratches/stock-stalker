const Alpaca = require('@alpacahq/alpaca-trade-api');
const env = require('../cfg/env');

const alpaca = new Alpaca({
  keyId: env.alpaca.key,
  secretKey: env.alpaca.secret,
  paper: true,
});

module.exports = alpaca;
