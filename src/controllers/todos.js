const Todo = require('../models/Todo');

class TodosController {
  static getAllTodos(req, res) {
    res.json(Todo.getAll());
  }
}

module.exports = TodosController;
