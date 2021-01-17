const express = require('express');

const PORT = process.env.port || 3000;
const app = express();

app.get('/todos', (req, res) => {
  res.json({ todos: 'nope' });
});

app.listen(PORT);
