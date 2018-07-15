const { spawn } = require('child_process');

const ADMIN = 'admin';

const stopMongo = () => {
  return spawn(`mongo --eval "db.getSiblingDB(${ADMIN}).shutdownServer()"`, { shell: true });
};

stopMongo();
