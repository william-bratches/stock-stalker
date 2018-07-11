const { spawn } = require('child_process');
const path = require('path');

const defaultCb = () => {};

const startMongo = (cb = defaultCb) => {
  const mongo = spawn('mongod', ['--dbpath=./bin/db'], { stdio: 'inherit' });

  mongo.stdout.on('data', (data) => {
    // if waiting for connections magic toString
    // start server
  });
};

const startServer = (cb = defaultCb) => {
  console.log('starting server...');
  const context = path.resolve(__dirname, '../../src');
  return spawn('node', ['index.js'], {
    stdio: 'inherit',
    cwd: context,
  }).on('data', cb);
};

startMongo(() => startServer());
