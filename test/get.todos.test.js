const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

const { startServer } = require('./setup');
const { CollectionWrapper } = require('./CollectionWrapper');

describe('GET /todos', function () {
  let server;

  before(function () {
    const collectionName = 'todos-test';

    new CollectionWrapper(collectionName, [
      { id: 1, text: 'do the 1st assessment', priority: 1, done: false },
      { id: 2, text: 'do the 2nd assessment', priority: 2, done: false },
    ]);
    server = startServer(collectionName);
  });

  it('returns status code 200', function () {
    return chai
      .request(server)
      .get('/todos')
      .then((res) => {
        res.should.have.status(200);
      });
  });

  it('returns the todos in JSON format', function () {
    return chai
      .request(server)
      .get('/todos')
      .then((res) => {
        res.should.be.json;

        res.body.should.deep.equal([
          { id: 1, text: 'do the 1st assessment', priority: 1, done: false },
          { id: 2, text: 'do the 2nd assessment', priority: 2, done: false },
        ]);
      });
  });

  after(function () {
    server.close();
  });
});
