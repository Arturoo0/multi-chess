
const express = require('express');
const app = express();
const { performance } = require('perf_hooks');

const msgLog = (logMsg, time) => {console.log(logMsg, time)};

app.get('/', function (req, res) {
  res.send('Server is running.');
  
})

app.listen(3000)