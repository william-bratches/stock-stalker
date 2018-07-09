const defaultCb = () => {};
const { spawn } = require('child_process');
const MAGENTA = "\x1b[35m";

// spawn mongo instance
const startMongo = (cb = defaultCb) => {
  return spawn('mongod', ['--dbpath=/data'], {
    stdio: 'inherit',
  }).on('close', (data) => {
    console.log(MAGENTA, 'Mongo started.');
    cb();
  });
};
// spawn server instance
