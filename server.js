'use strict'
const express = require('express');

var app = express();

app.get('/rooms',(req, res) => {
  res.sendFile(__dirname + '/public/detail.html');
});
app.get('/aboutus',(req, res) => {
  res.sendFile(__dirname + '/public/about.html');
});
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 1010;
app.listen(port, () => {
  console.log(`App listen on ${port}`);
});

// mongodb://localhost/roomhunter
