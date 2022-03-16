const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
app.use(express.static('public'))

// app.set('view engine', 'ejs')
app.get('/', (req, res) => {
  // res.render('index');
  // res.send("lol")
  // res.sendFile('index.ejs')
  res.sendFile(__dirname + '/public/ticFreakinToe.html')
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('play', msg =>{
    socket.emit('lol', 'satyam')
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message',message)
  });
});

// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));