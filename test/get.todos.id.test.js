const { startServer, chai } = require('./setup');
const { CollectionWrapper } = require('./CollectionWrapper');

describe('GET /todos/:id', function () {
  let server;

  before(function () {
    const collectionName = 'todos-test';
    new CollectionWrapper(collectionName, [
      { id: '1', text: 'do the 1st assessment', priority: 1, done: false },
      { id: '2', text: 'do the 2nd assessment', priority: 2, done: false },
    ]);
    server = startServer(collectionName);
  });

  it('returns status code 200 if found', function () {
    return chai
      .request(server)
      .get('/todos/2')
      .then((res) => {
        res.should.have.status(200);
      });
  });

  it('returns the todo in JSON format if found', function () {
    return chai
      .request(server)
      .get('/todos/1')
      .then((res) => {
        res.body.should.deep.equal({
          id: '1',
          text: 'do the 1st assessment',
          priority: 1,
          done: false,
        });
      });
  });

  it('returns 404 not found if not found', function () {
    return chai
      .request(server)
      .get('/todos/3')
      .then((res) => {
        res.should.have.status(404);

        res.body.should.deep.equal({
          message: 'Todo not found with the given id.',
        });
      });
  });

  after(function () {
    server.close();
  });
});
