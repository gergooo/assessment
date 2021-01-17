const router = require('express').Router();
const {
  getAllTodos,
  createNewTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todos');

router.get('/', getAllTodos);
router.get('/:id', getTodo);
router.post('/', createNewTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
