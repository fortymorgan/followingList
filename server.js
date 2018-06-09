const express = require('express');
const fs = require('fs');

const app = express();

app.use('/static/', express.static('static'));
app.use('/foolowing/:user', express.static('static'));

app.get('/', (req, res) => {
  fs.readFile('./static/index.html', 'utf8', (err, data) => {
    res.send(data);
  })
})

app.get('/following/:user', (req, res) => {
  res.send(req.params);
})

app.listen(3000);
