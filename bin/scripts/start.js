const { spawn } = require('child_process');
const path = require('path');

const defaultCb = () => {};

const startMongo = (cb = defaultCb) => {
  const mongo = spawn('mongod', ['--dbpath=./bin/db']);

  mongo.stdout.on('data', (data) => {
    if (data.toString().indexOf('waiting for connections on port') > -1) {
      // eslint-disable-next-line
      console.log('MongoDB started and ready.');
      cb();
    }
  });
};

const startServer = () => {
  // eslint-disable-next-line
  console.log('starting server...');
  const context = path.resolve(__dirname, '../../src');
  console.log(context);
  return spawn('node', ['index.js'], {
    stdio: 'inherit',
    cwd: context,
  });
};

startMongo(startServer);
