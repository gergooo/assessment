const fs = require('fs');

class CollectionWrapper {
  constructor(collectionName, content = []) {
    fs.existsSync('./collection-storage') ||
      fs.mkdirSync('./collection-storage');

    this.collection = `./collection-storage/${collectionName}.json`;

    fs.writeFileSync(this.collection, JSON.stringify(content));
  }

  getTodos() {
    return JSON.parse(fs.readFileSync(this.collection));
  }

  getTodo(id) {
    const collection = JSON.parse(fs.readFileSync(this.collection));

    return collection.find((todo) => todo.id === id);
  }
}

module.exports = { CollectionWrapper };
