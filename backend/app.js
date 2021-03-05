
const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');
const { Chess } = require('chess.js');
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});

const logResponseTime = require("./middleware/endpointLogger");
app.use(logResponseTime, cors);

app.get('/', function (req, res) {
  res.send('Server is running.');
})

let rooms = {};
const baseStartingFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
io.on('connection', (socket) => {
  console.log('Connected to by id : %s', socket.id);
  socket.on('joinRoom', (inv) => {
    if (inv in rooms && rooms[inv].currentlyConnected < 2){
      socket.join(inv);
      rooms[inv].currentlyConnected += 1;
      io.in(inv).emit("connectedToRoom", rooms[inv].currentlyConnected, rooms[inv].gameObj.fen(), inv);
    }else if (!(socket.id in rooms)){
      rooms[socket.id] = {currentlyConnected : 1, gameObj : new Chess(baseStartingFEN)};
      socket.join(socket.id);
      socket.emit('connectedToRoom', rooms[socket.id].currentlyConnected, rooms[socket.id].gameObj.fen(), socket.id);
    }
    console.log(rooms);
  });
  
  socket.on('moveMade', (pos, roomID) => {
    // const chessObj = new Chess();
    // rooms[socket.id] = gameObj.load(chessObj.fen(pos));
    io.in(roomID).emit("updateBoard", pos);
  })
});

const port = 3000;
http.listen(port, () => {
  console.log('Running on %s', port);
});