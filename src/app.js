const express = require('express');

const PORT = process.env.port || 3000;
const app = express();

app.get('/todos', (req, res) => {
  res.status(200);
  res.json({ todos: 'nope' });
});

const server = app.listen(PORT);

module.exports = { server };
