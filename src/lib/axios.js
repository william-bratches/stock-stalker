const axios = require('axios');
const env = require('../cfg/env');

const instance = axios.create({
  baseURL: env.mw.url,
  timeout: 4000,
});

module.exports = instance;
