
const app = require('express')();
const http = require('http').createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});const cors = require('cors');

const logResponseTime = require("./middleware/endpointLogger");
app.use(logResponseTime, cors);

app.get('/', function (req, res) {
  res.send('Server is running.');
})

io.on('connection', (socket) => {
  console.log('Connected to by id : %s', socket.id);
  socket.on('testCom', (arg) => {
    console.log(arg);
  });
});

const port = 3000;
http.listen(port, () => {
  console.log('Running on %s', port);
});