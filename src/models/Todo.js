const fs = require('fs');

const COLLECTION = process.env.collection || 'todos';
const collection = JSON.parse(fs.readFileSync(`./db/${COLLECTION}.json`));

class Todo {
  static getAll() {
    return collection;
  }
}

module.exports = Todo;
