const router = require('express').Router();
const { getAllTodos, createNewTodo, getTodo } = require('../controllers/todos');

router.get('/', getAllTodos);
router.get('/:id', getTodo);
router.post('/', createNewTodo);

module.exports = router;
