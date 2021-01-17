const express = require('express');
const bodyParser = require('body-parser');
const todosRoutes = require('./routes/todos');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

app.use('/todos', todosRoutes);

const server = app.listen(PORT);

module.exports = { server };
