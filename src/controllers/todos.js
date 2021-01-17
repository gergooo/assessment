const Todo = require('../models/Todo');

class TodosController {
  static getAllTodos(req, res) {
    res.json(Todo.getAll());
  }

  static createNewTodo(req, res) {
    const { text, priority, done } = req.body;

    if (
      TodosController._isTextFieldMissing(text) ||
      TodosController._isAnyInputInvalid(req.body)
    ) {
      return res.status(400).send({ message: 'Invalid input.' });
    }

    const newTodo = Todo.new(text, priority, done);

    res.status(201).json(newTodo);
  }

  static getTodo(req, res) {
    const todo = Todo.get(req.params.id);

    if (!todo) {
      return res
        .status(404)
        .json({ message: 'Todo not found with the given id.' });
    }

    res.status(200).send(todo);
  }

  static updateTodo(req, res) {
    if (
      TodosController._isBodyEmpty(req.body) ||
      TodosController._isAnyInputInvalid(req.body)
    ) {
      return res.status(400).send({ message: 'Invalid input.' });
    }

    const todo = Todo.get(req.params.id);

    if (!todo) {
      return res
        .status(404)
        .json({ message: 'Todo not found with the given id.' });
    }

    const updatedTodo = { ...todo, ...req.body };
    Todo.update(updatedTodo);
    res.status(200).json(updatedTodo);
  }

  static _isBodyEmpty(body) {
    return Object.keys(body).length === 0;
  }

  static _isTextFieldMissing(text) {
    return text === undefined;
  }

  static _isAnyInputInvalid(body) {
    const { text, priority, done } = body;

    return (
      TodosController._isTextInvalid(text) ||
      TodosController._isPriorityInvalid(priority) ||
      TodosController._isDoneInvalid(done) ||
      TodosController._areThereAdditionalKeys(body)
    );
  }

  static _isTextInvalid(text) {
    return text !== undefined && (!text.length || text.match(/[^a-zA-Z 0-9]/));
  }

  static _isPriorityInvalid(priority) {
    return (
      priority !== undefined &&
      (isNaN(priority) || priority < 1 || priority > 5)
    );
  }

  static _isDoneInvalid(done) {
    return done !== undefined && typeof done !== 'boolean';
  }

  static _areThereAdditionalKeys(body) {
    return Object.keys(body).find(
      (key) => key !== 'text' && key !== 'priority' && key !== 'done'
    );
  }
}

module.exports = TodosController;
