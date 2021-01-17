const fs = require('fs');
const uuid = require('uuid').v4;

const COLLECTION = process.env.collection || 'todos';
const collectionName = `./collection-storage/${COLLECTION}.json`;

fs.existsSync('./collection-storage') || fs.mkdirSync('./collection-storage');

const collection = fs.existsSync(collectionName)
  ? JSON.parse(fs.readFileSync(collectionName))
  : [];

class Todo {
  static getAll() {
    return collection;
  }

  static get(id) {
    return collection.find((todo) => todo.id === id);
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
