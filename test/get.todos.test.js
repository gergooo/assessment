const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

process.env.PORT = 666;
const { server } = require('../src/app');

describe('GET /todos', function () {
  it('returns the todos JSON', function () {
    return chai
      .request(server)
      .get('/todos')
      .then((res) => {
        res.should.have.status(200);
        res.should.be.json;

        res.body.should.deep.equal({ todos: 'nope' });
      });
  });

  after(function () {
    server.close();
  });
});
