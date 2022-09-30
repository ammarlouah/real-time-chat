const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
require('dotenv').config();


const app = express()
const server = http.createServer(app)
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname,'public')))

// Run when a client connects
io.on('connection',socket => {

    // Welcome current user
    socket.emit('message','Welcome to ChatCord');

    // Broadcast when a user connect
    socket.broadcast.emit('message','A user has joined the chat');

    // Runs when the user disconnect
    socket.on('disconnect',()=>{
        io.emit('message','A user has left the chat')
    })
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT,()=>{
    console.log(`Server running on PORT : ${PORT} .... `);
})