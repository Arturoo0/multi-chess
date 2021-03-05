
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

let rooms = {};
io.on('connection', (socket) => {
  console.log('Connected to by id : %s', socket.id);
  socket.on('testCom', (arg) => {
    console.log(arg);
  });

  socket.on('joinRoom', () => {
    if (!(socket.id in rooms)){
      rooms[socket.id] = {currentlyConnected : 1};
      socket.join(socket.id);
    } else if (rooms[socket.id] < 2){
      socket.join(socket.id);
      rooms[socket.id].currentlyConnected += 1; 
    }
    console.log(rooms);
    socket.emit('connectedToRoom', rooms[socket.id].currentlyConnected);
  });
});

const port = 3000;
http.listen(port, () => {
  console.log('Running on %s', port);
});