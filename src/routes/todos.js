const router = require('express').Router();
const { getAllTodos, createNewTodo } = require('../controllers/todos');

router.get('/', getAllTodos);
router.post('/', createNewTodo);

module.exports = router;
