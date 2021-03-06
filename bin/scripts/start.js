const { spawn } = require('child_process');
const path = require('path');

const defaultCb = () => {};

const startMongo = (cb = defaultCb) => {
  const mongo = spawn('mongod', ['--dbpath=./bin/db']);

  mongo.stdout.on('data', (data) => {
    console.log(data.toString());
    if (data.toString().indexOf('waiting for connections on port') > -1) {
      // eslint-disable-next-line
      console.log('MongoDB started and ready.');
      cb();
    }
  });
};

const startServer = () => {
  // eslint-disable-next-line
  console.log('Starting server...');
  const context = path.resolve(__dirname, '../../');
  return spawn('node', ['index.js'], {
    stdio: 'inherit',
    cwd: context,
  });
};

startMongo(startServer);
