const Todo = require('../models/Todo');

class TodosController {
  static getAllTodos(req, res) {
    res.json(Todo.getAll());
  }

  static createNewTodo(req, res) {
    const { text, priority, done } = req.body;

    if (TodosController._isInputInvalid(req.body)) {
      return res.status(400).send({ message: 'Invalid input.' });
    }

    const newTodo = Todo.new(text, priority, done);

    res.status(201).json(newTodo);
  }

  static getTodo(req, res) {
    const todo = Todo.get(req.params.id);

    if (todo) {
      res.status(200).send(todo);
    } else {
      res.status(404).json({ message: 'Todo not found with the given id.' });
    }
  }

  static _isInputInvalid(body) {
    const { text, priority, done } = body;

    const isTextInvalid = !text || text.match(/[^a-zA-Z 0-9]/);

    const isPriorityInvalid =
      priority !== undefined &&
      (isNaN(priority) || priority < 1 || priority > 5);

    const isDoneInvalid = done !== undefined && typeof done !== 'boolean';

    const areThereAdditionalKeys = Object.keys(body).find(
      (key) => key !== 'text' && key !== 'priority' && key !== 'done'
    );

    return (
      isTextInvalid ||
      isPriorityInvalid ||
      isDoneInvalid ||
      areThereAdditionalKeys
    );
  }
}

module.exports = TodosController;
