const { startServer, chai, collection, clock } = require('./setup');
const {
  scheduleAllDoneTodosForDeletion,
} = require('../src/services/removing-finished-todos');

describe('Finished todo remover service', function () {
  let server;

  before(function () {
    server = startServer();
  });

  it('removes a newly created finished todo after 5 minutes', function () {
    return chai
      .request(server)
      .post('/todos')
      .send({ text: 'Remove me', done: true })
      .then((res) => {
        const id = res.body.id;
        collection.getTodo(id).should.exist;

        clock.tick(299 * 1000);
        collection.getTodo(id).should.exist;

        clock.tick(1 * 1000);
        chai.expect(collection.getTodo(id)).to.not.exist;
      });
  });

  it('removes a previously created, now finished todo after 5 minutes', function () {
    let id;

    return chai
      .request(server)
      .post('/todos')
      .send({ text: 'Not done yet' })
      .then((res) => {
        id = res.body.id;
        clock.tick(300 * 1000);

        return chai.request(server).put(`/todos/${id}`).send({ done: true });
      })
      .then(() => {
        collection.getTodo(id).should.exist;

        clock.tick(299 * 1000);
        collection.getTodo(id).should.exist;

        clock.tick(1 * 1000);
        chai.expect(collection.getTodo(id)).to.not.exist;
      });
  });

  it('keeps the todo if it set back to undone', function () {
    let id;

    return chai
      .request(server)
      .post('/todos')
      .send({ text: 'Done already', done: true })
      .then((res) => {
        id = res.body.id;
        clock.tick(229 * 1000);

        return chai.request(server).put(`/todos/${id}`).send({ done: false });
      })
      .then(() => {
        clock.tick(300 * 1000);
        collection.getTodo(id).should.exist;
      });
  });

  it('deletes a finished todo in 5 minutes after (re)start', async function () {
    const id = await chai
      .request(server)
      .post('/todos')
      .send({ text: 'only after restart', done: true })
      .then((res) => res.body.id);

    clock.tick(299 * 1000);
    collection.getTodo(id).should.exist;

    // simulating a restart:
    clock.reset();
    scheduleAllDoneTodosForDeletion();

    clock.tick(299 * 1000);
    collection.getTodo(id).should.exist;

    clock.tick(1 * 1000);
    chai.expect(collection.getTodo(id)).to.not.exist;
  });

  after(function () {
    server.close();
  });
});
