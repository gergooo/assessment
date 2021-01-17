const router = require('express').Router();
const { getAllTodos } = require('../controllers/todos');

router.get('/', getAllTodos);

module.exports = router;
