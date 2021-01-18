const express = require('express');
const bodyParser = require('body-parser');
const todosRoutes = require('./routes/todos');
const HttpError = require('./utils/HttpError');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

app.use('/todos', todosRoutes);

function wrongPathHandler(req, res, next) {
  return next(new HttpError(404, 'You are on the wrong path.'));
}
app.use(wrongPathHandler);

// eslint-disable-next-line no-unused-vars
function defaultErrorHandler(error, req, res, next) {
  res
    .status(error.status || 500)
    .json({ message: error.message || 'Unexpected error' });
}
app.use(defaultErrorHandler);

const server = app.listen(PORT);

module.exports = { server };
