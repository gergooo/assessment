const router = require('express').Router();
const {
  getAllTodos,
  createNewTodo,
  getTodo,
  updateTodo,
} = require('../controllers/todos');

router.get('/', getAllTodos);
router.get('/:id', getTodo);
router.post('/', createNewTodo);
router.put('/:id', updateTodo);

module.exports = router;
