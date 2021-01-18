const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

const FakeTimers = require('@sinonjs/fake-timers');
const clock = FakeTimers.install();

const { CollectionWrapper } = require('./CollectionWrapper');
const COLLECTION_NAME = 'todo-test';
let collection = new CollectionWrapper(COLLECTION_NAME, [
  { id: '1', text: 'do the 1st assessment', priority: 1, done: false },
  { id: '2', text: 'do the 2nd assessment', priority: 2, done: false },
]);

function startServer() {
  process.env.PORT = 666;
  process.env.COLLECTION = COLLECTION_NAME;
  let { server } = require('../src/app');
  return server;
}

const server = startServer();

after(function () {
  server.close();
  clock.uninstall();
});

module.exports = { server, chai, collection, clock };
