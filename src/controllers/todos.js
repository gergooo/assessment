const Todo = require('../models/Todo');

class TodosController {
  static getAllTodos(req, res) {
    res.json(Todo.getAll());
  }

  static createNewTodo(req, res) {
    const newTodo = Todo.new(req.body.text, req.body.priority, req.body.done);

    res.status(201);
    res.json(newTodo);
  }
}

module.exports = TodosController;
