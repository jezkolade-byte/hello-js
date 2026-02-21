const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/intro', (req, res) => {
  res.json({
    name: 'Jezreel Odeneye',
    age: 13,
    favourite_language: 'Python'
  });
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
