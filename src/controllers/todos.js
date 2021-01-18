const Todo = require('../models/Todo');
const {
  scheduleForDeletion,
  cancelDeletionSchedule,
} = require('../services/removing-finished-todos');
const HttpError = require('../utils/HttpError');

class TodosController {
  static getAllTodos(req, res) {
    res.json(Todo.getAll());
  }

  static createNewTodo(req, res, next) {
    const { text, priority, done } = req.body;

    if (
      TodosController._isTextFieldMissing(text) ||
      TodosController._isAnyInputInvalid(req.body)
    ) {
      return next(new HttpError(400, 'Invalid input.'));
    }

    const newTodo = Todo.new(text, priority, done);

    if (done) {
      scheduleForDeletion(newTodo.id);
    }

    res.status(201).json(newTodo);
  }

  static getTodo(req, res, next) {
    const todo = Todo.get(req.params.id);

    if (!todo) {
      return next(new HttpError(404, 'Todo not found with the given id.'));
    }

    res.status(200).send(todo);
  }

  static updateTodo(req, res, next) {
    if (
      TodosController._isBodyEmpty(req.body) ||
      TodosController._isAnyInputInvalid(req.body)
    ) {
      return next(new HttpError(400, 'Invalid input.'));
    }

    const todo = Todo.get(req.params.id);

    if (!todo) {
      return next(new HttpError(404, 'Todo not found with the given id.'));
    }

    const updatedTodo = { ...todo, ...req.body };

    if (updatedTodo.done && !todo.done) {
      scheduleForDeletion(todo.id);
    } else if (!updatedTodo.done && todo.done) {
      cancelDeletionSchedule(todo.id);
    }

    Todo.update(updatedTodo);
    res.status(200).json(updatedTodo);
  }

  static deleteTodo(req, res, next) {
    if (!Todo.get(req.params.id)) {
      return next(new HttpError(404, 'Todo not found with the given id.'));
    }

    Todo.delete(req.params.id);
    res.status(200).json({ message: 'Todo is deleted.' });
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
