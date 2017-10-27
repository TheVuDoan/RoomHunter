'use strict'
const express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 1010;
app.listen(port, () => {
  console.log(`App listen on ${port}`);
});

// mongodb://localhost/roomhunter
