
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const logResponseTime = require("./middleware/endpointLogger");

app.use(logResponseTime);

app.get('/', function (req, res) {
  res.send('Server is running.');
})

io.on('connection', (socket) => {
  console.log(socket.id);
});

const port = 3000;
http.listen(port, () => {
  console.log('Running on %s', port);
});