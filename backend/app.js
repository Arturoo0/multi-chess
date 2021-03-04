
const express = require('express');
const app = express();
const logResponseTime = require("./middleware/endpointLogger");

app.use(logResponseTime);

app.get('/', function (req, res) {
  res.send('Server is running.');
})

app.listen(3000)