const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.io

io.on("connection", (socket) => {
    console.log("New User has connected -> ", socket.id);
    socket.on("user-message", (message) => {
        console.log("New User Message -> ", message);
        io.emit("message", message);
    })
})

app.use(express.static(path.resolve('./public')));
app.get('/', (req, res) => {
    return res.sendFile("/public/index.html")
})

server.listen(3333, () => {
  console.log('Server is running on port 3333');
});

