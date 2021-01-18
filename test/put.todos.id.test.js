const { server, chai, collection } = require('./setup');

describe('PUT /todos/:id', function () {
  let id;

  before(function () {
    return chai
      .request(server)
      .post('/todos')
      .send({ text: 'Todo to update' })
      .then((res) => {
        id = res.body.id;
      });
  });

  it('returns with the updated todo object', function () {
    return chai
      .request(server)
      .put(`/todos/${id}`)
      .send({ text: 'Todo is updated once' })
      .then((res) => {
        res.should.have.status(200);
        res.body.should.contain({ text: 'Todo is updated once' });
      });
  });

  it('saves the updated todo in the collection', function () {
    return chai
      .request(server)
      .put(`/todos/${id}`)
      .send({ text: 'Todo is updated and saved' })
      .then(() => {
        collection
          .getTodo(id)
          .should.contain({ text: 'Todo is updated and saved' });
      });
  });

  it('returns 404 when there is no such todo', function () {
    return chai
      .request(server)
      .put(`/todos/i-definetely-do-not-exist`)
      .send({ text: 'No todo here' })
      .then((res) => {
        res.should.have.status(404);
      });
  });

  it('can update done only', function () {
    return chai
      .request(server)
      .put(`/todos/${id}`)
      .send({ done: true })
      .then((res) => {
        res.should.have.status(200);
        res.body.should.contain({ done: true });
      });
  });

  it('can update priority only', function () {
    return chai
      .request(server)
      .put(`/todos/${id}`)
      .send({ priority: 5 })
      .then((res) => {
        res.should.have.status(200);
        res.body.should.contain({ priority: 5 });
      });
  });

  context('input validation - mostly same as for POST', function () {
    context('text', function () {
      it('returns error (400) if empty', function () {
        return chai
          .request(server)
          .put(`/todos/${id}`)
          .send({ text: '' })
          .then((res) => {
            res.should.have.status(400);
          });
      });
    });

    context('priority', function () {
      it('returns error (400) if not a number', function () {
        return chai
          .request(server)
          .put(`/todos/${id}`)
          .send({ text: 'todo', priority: 'not number' })
          .then((res) => {
            res.should.have.status(400);
          });
      });
    });

    context('done', function () {
      it('returns error (400) if not boolean', function () {
        return chai
          .request(server)
          .put(`/todos/${id}`)
          .send({ text: 'todo', done: 'not bool' })
          .then((res) => {
            res.should.have.status(400);
          });
      });
    });

    context('additional fields', function () {
      it('returns error (400) if any additional field is included', function () {
        return chai
          .request(server)
          .put(`/todos/${id}`)
          .send({ text: 'todo', additionalField: true })
          .then((res) => {
            res.should.have.status(400);
          });
      });
    });

    context('empty body', function () {
      it('returns error (400) if there are no fields at all', function () {
        return chai
          .request(server)
          .put(`/todos/${id}`)
          .then((res) => {
            res.should.have.status(400);
          });
      });
    });
  });
});
