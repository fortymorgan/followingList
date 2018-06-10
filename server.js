const express = require('express');
const path = require('path');

const app = express();

app.use('/static', (req, res) => {
  res.sendFile(path.join(__dirname, "static" + req.path));
});

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, "static/index.html"));
});
// app.use('/', express.static('static'));


app.listen(3000);
