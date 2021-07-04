
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

let rooms = {};
const logResponseTime = require("./middleware/endpointLogger");
app.use(logResponseTime, cors());

app.get('/', function (req, res) {
  res.send('Server is running.');
})

app.get('/doesRoomExist', function (req, res) {
  if (req.query['roomID'] in rooms){
    res.send('1');
  }else{
    res.send('0');
  }
})

app.get('/whichColor', function (req, res) {
  res.send({res : null});
})

// 0 : white , 1 : black 
const baseStartingFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
io.on('connection', (socket) => {
  colorMapper = {
    0 : 'white',
    1 : 'black'
  }
  console.log('Connected to by id : %s', socket.id);
  socket.on('joinRoom', (inv) => {
    if (inv in rooms && rooms[inv].currentlyConnected < 2){
      socket.join(inv);
      rooms[inv].currentlyConnected += 1;
      rooms[inv].joinerColor = (rooms[inv].creatorColor == 1) ? 'black' : 'white';
      io.in(inv).emit(
        "connectedToRoom", 
        rooms[inv].currentlyConnected, 
        rooms[inv].gameObj.fen(), 
        rooms[socket.id].joinerColor,
        inv
      );
    }else if (!(socket.id in rooms)){
      rooms[socket.id] = {
        currentlyConnected : 1, 
        gameObj : new Chess(baseStartingFEN),
        creatorColor :  colorMapper[Math.round(Math.random())],
        joinerColor : null
      };
      socket.join(socket.id);
      socket.emit(
        'connectedToRoom', 
        rooms[socket.id].currentlyConnected, 
        rooms[socket.id].gameObj.fen(), 
        rooms[socket.id].creatorColor,
        socket.id
      );
    }
  });
  
  socket.on('moveMade', (pre, target, roomID) => {
    if (
      rooms[roomID].gameObj.move({
        from : pre,
        to : target
      })
    )
    io.in(roomID).emit("updateBoard", rooms[roomID].gameObj.fen());
  })
});

const port = 3000;
http.listen(port, () => {
  console.log('Running on %s', port);
});