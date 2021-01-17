const { startServer, chai } = require('./setup');
const { CollectionWrapper } = require('./CollectionWrapper');

describe('POST /todos', function () {
  let server;
  let collection;

  before(function () {
    const collectionName = 'todos-test';
    collection = new CollectionWrapper(collectionName);
    server = startServer(collectionName);
  });

  it('returns the new todo in JSON format', function () {
    return chai
      .request(server)
      .post('/todos')
      .send({ text: 'New todo!' })
      .then((res) => {
        res.should.have.status(201);
        res.should.be.json;

        res.body.should.have.key(['id', 'text', 'priority', 'done']);
        res.body.should.contain({ text: 'New todo!' });
      });
  });

  it('saves the new todo in the collection', function () {
    return chai
      .request(server)
      .post('/todos')
      .send({ text: 'New todo 2!' })
      .then((res) => {
        const id = res.body.id;

        collection.getTodo(id).should.contain({ text: 'New todo 2!' });
      });
  });

  context('default values', function () {
    it('applies priority and done if given', function () {
      return chai
        .request(server)
        .post('/todos')
        .send({ text: 'New todo!', priority: 5, done: true })
        .then((res) => {
          res.body.should.contain({ priority: 5 });
          res.body.should.contain({ done: true });
        });
    });

    it('applies default priority and done if not given', function () {
      return chai
        .request(server)
        .post('/todos')
        .send({ text: 'New todo!' })
        .then((res) => {
          res.body.should.contain({ priority: 3 });
          res.body.should.contain({ done: false });
        });
    });
  });

  it.skip('input validation', function () {});

  after(function () {
    server.close();
  });
});
