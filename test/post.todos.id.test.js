const { server, chai, collection } = require('./setup');

describe('POST /todos', function () {
  it('returns the new todo in JSON format', function () {
    return chai
      .request(server)
      .post('/todos')
      .send({ text: 'New todo' })
      .then((res) => {
        res.should.have.status(201);
        res.should.be.json;

        res.body.should.have.key(['id', 'text', 'priority', 'done']);
        res.body.should.contain({ text: 'New todo' });
      });
  });

  it('saves the new todo in the collection', function () {
    return chai
      .request(server)
      .post('/todos')
      .send({ text: 'New todo' })
      .then((res) => {
        const id = res.body.id;

        collection.getTodo(id).should.contain({ text: 'New todo' });
      });
  });

  context('default values', function () {
    it('applies priority and done if given', function () {
      return chai
        .request(server)
        .post('/todos')
        .send({ text: 'New todo', priority: 5, done: true })
        .then((res) => {
          res.body.should.contain({ priority: 5 });
          res.body.should.contain({ done: true });
        });
    });

    it('applies default priority and done if not given', function () {
      return chai
        .request(server)
        .post('/todos')
        .send({ text: 'New todo 2' })
        .then((res) => {
          res.body.should.contain({ priority: 3 });
          res.body.should.contain({ done: false });
        });
    });
  });

  context('input validation', function () {
    context('text', function () {
      it('returns error (400) if not included', function () {
        return chai
          .request(server)
          .post('/todos')
          .then((res) => {
            res.should.have.status(400);

            res.body.should.contain({ message: 'Invalid input.' });
          });
      });

      it('returns error (400) if empty', function () {
        return chai
          .request(server)
          .post('/todos')
          .send({ text: '' })
          .then((res) => {
            res.should.have.status(400);

            res.body.should.contain({ message: 'Invalid input.' });
          });
      });

      it('returns error (400) if contains exclamation mark (not letter/number)', function () {
        return chai
          .request(server)
          .post('/todos')
          .send({ text: 'This is it!!!' })
          .then((res) => {
            res.should.have.status(400);

            res.body.should.contain({ message: 'Invalid input.' });
          });
      });

      it('returns error (400) if contains accented letter', function () {
        return chai
          .request(server)
          .post('/todos')
          .send({ text: 'á' })
          .then((res) => {
            res.should.have.status(400);

            res.body.should.contain({ message: 'Invalid input.' });
          });
      });
    });

    context('priority', function () {
      it('returns error (400) if not a number', function () {
        return chai
          .request(server)
          .post('/todos')
          .send({ text: 'todo', priority: 'not number' })
          .then((res) => {
            res.should.have.status(400);

            res.body.should.contain({ message: 'Invalid input.' });
          });
      });

      it('returns error (400) if <1', function () {
        return chai
          .request(server)
          .post('/todos')
          .send({ text: 'todo', priority: 0 })
          .then((res) => {
            res.should.have.status(400);

            res.body.should.contain({ message: 'Invalid input.' });
          });
      });

      it('returns error (400) if >5', function () {
        return chai
          .request(server)
          .post('/todos')
          .send({ text: 'todo', priority: 6 })
          .then((res) => {
            res.should.have.status(400);

            res.body.should.contain({ message: 'Invalid input.' });
          });
      });
    });

    context('done', function () {
      it('returns error (400) if not boolean', function () {
        return chai
          .request(server)
          .post('/todos')
          .send({ text: 'todo', done: 'not bool' })
          .then((res) => {
            res.should.have.status(400);

            res.body.should.contain({ message: 'Invalid input.' });
          });
      });
    });

    context('id', function () {
      it('returns error (400) if id is included', function () {
        return chai
          .request(server)
          .post('/todos')
          .send({ text: 'todo', id: '33' })
          .then((res) => {
            res.should.have.status(400);

            res.body.should.contain({ message: 'Invalid input.' });
          });
      });
    });

    context('additional fields', function () {
      it('returns error (400) if any additional field is included', function () {
        return chai
          .request(server)
          .post('/todos')
          .send({ text: 'todo', additionalField: true })
          .then((res) => {
            res.should.have.status(400);

            res.body.should.contain({ message: 'Invalid input.' });
          });
      });
    });
  });
});
