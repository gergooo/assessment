const { startServer, chai, collection } = require('./setup');

describe('DELETE /todos/:id', function () {
  let server;
  let id;

  before(function () {
    server = startServer();

    return chai
      .request(server)
      .post('/todos')
      .send({ text: 'Todo to delete' })
      .then((res) => {
        id = res.body.id;
      });
  });

  it('removes the todo from the collection', function () {
    return chai
      .request(server)
      .delete(`/todos/${id}`)
      .then((res) => {
        res.should.have.status(200);
        res.body.should.contain({ message: 'Todo is deleted.' });

        chai.expect(collection.getTodo(id)).to.be.undefined;

        return chai
          .request(server)
          .get(`/todos/${id}`)
          .then((res) => res.should.have.status(404));
      });
  });

  it('returns 404 when there is no such todo', function () {
    return chai
      .request(server)
      .delete(`/todos/no-such-todo`)
      .then((res) => {
        res.should.have.status(404);
      });
  });

  after(function () {
    server.close();
  });
});
