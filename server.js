const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log("User connected:", socket.id);
    
    socket.on('answer', (data) => {
        io.to(data.to).emit('answered', { signal: data.signal });
    });

    // 他のユーザーに接続通知
    socket.broadcast.emit('user-connected', socket.id);
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});



// ...
