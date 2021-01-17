const fs = require('fs');
const uuid = require('uuid').v4;

const COLLECTION = process.env.collection || 'todos';
const collectionName = `./collection-storage/${COLLECTION}.json`;

fs.existsSync('./collection-storage') || fs.mkdirSync('./collection-storage');

let collection = fs.existsSync(collectionName)
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
    this._persist(collection);

    return newTodo;
  }

  static update(todo) {
    const index = Todo._findIndex(todo.id);

    if (index > -1) {
      collection[index] = todo;
      this._persist(collection);
    }
  }

  static delete(id) {
    const index = Todo._findIndex(id);

    if (index > -1) {
      collection = [
        ...collection.slice(0, index),
        ...collection.slice(index + 1),
      ];
      this._persist(collection);
    }
  }

  static _findIndex(id) {
    return collection.findIndex((todo) => todo.id === id);
  }

  static _persist(collection) {
    fs.writeFileSync(collectionName, JSON.stringify(collection));
  }
}

module.exports = Todo;
