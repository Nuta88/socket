const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:4200']
  }
});

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('init', (msg) => {
    console.log(msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('message', (msg) => {
    io.emit('message', `Socket ${socket.id.substr(0, 2)} said ${msg}`);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
