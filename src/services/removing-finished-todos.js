const Todo = require('../models/Todo');

const DELETE_TIMEOUT = 300 * 1000;
const activeSchedules = {};

scheduleAllDoneTodosForDeletion();

function scheduleAllDoneTodosForDeletion() {
  Todo.getAll()
    .filter((todo) => todo.done)
    .forEach((todo) => scheduleForDeletion(todo.id));
}

function scheduleForDeletion(id) {
  const timerId = setTimeout(() => {
    Todo.delete(id);
    delete activeSchedules[id];
  }, DELETE_TIMEOUT);

  activeSchedules[id] = timerId;
}

function cancelDeletionSchedule(id) {
  if (activeSchedules[id]) {
    clearTimeout(activeSchedules[id]);
    delete activeSchedules[id];
  }
}

module.exports = {
  scheduleForDeletion,
  cancelDeletionSchedule,
  scheduleAllDoneTodosForDeletion,
};
