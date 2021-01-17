const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

let server;

function startServer(collection) {
  process.env.PORT = 666;
  process.env.COLLECTION = collection;

  ({ server } = require('../src/app'));

  return server;
}

module.exports = { startServer, chai };
