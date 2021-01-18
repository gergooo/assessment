const { startServer, chai } = require('./setup');

describe('Error handling', function () {
  let server;

  before(function () {
    server = startServer();
  });

  it('default error handler', function () {
    return chai
      .request(server)
      .post('/todos')
      .set('Content-Type', 'application/json')
      .send('dslgfns')
      .then((res) => {
        res.should.have.status(400);
        res.body.message.should.contain('Unexpected token');
      });
  });

  it('404 on wrong path', function () {
    return chai
      .request(server)
      .get('/todo')
      .then((res) => {
        res.should.have.status(404);
        res.body.should.contain({ message: 'You are on the wrong path.' });
      });
  });

  after(function () {
    server.close();
  });
});
