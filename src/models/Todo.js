const fs = require('fs');
const uuid = require('uuid').v4;

const COLLECTION = process.env.collection || 'todos';
const collectionName = `./collection-storage/${COLLECTION}.json`;
const collection = JSON.parse(fs.readFileSync(collectionName));

class Todo {
  static getAll() {
    return collection;
  }

  static new(text, priority = 3, done = false) {
    const newTodo = {
      id: uuid(),
      text: text,
      priority: priority,
      done: done,
    };

    collection.push(newTodo);
    fs.writeFileSync(collectionName, JSON.stringify(collection));

    return newTodo;
  }
}

module.exports = Todo;
