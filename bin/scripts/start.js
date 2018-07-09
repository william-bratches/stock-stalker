const { spawn } = require('child_process');
const path = require('path');

const defaultCb = () => {};
const MAGENTA = "\x1b[35m";

const startMongo = (cb = defaultCb) => {
  return spawn('mongod', ['--dbpath=/data'], {
    stdio: 'inherit',
  }).on('data', cb);
};

const startServer = (cb = defaultcb) => {
  const context = path.resolve(__dirname, '../../src');
  return spawn('node', ['index.js'], {
    stdio: 'inherit',
    cwd: context,
  }).on('data', cb);
};

startMongo(startServer);
