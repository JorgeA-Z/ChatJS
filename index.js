var express = require('express');
var PORT = process.env.PORT || 4000;
var socket = require('socket.io');

var http = require('http')

//App setup

var app = express();
var server = http.Server(app);

//Static file

app.use(express.static('public'));

server.listen(PORT, function()
{
    console.log("Listening to requiest on port 4000")
});

//Socket setup

var io = socket(server);


io.on('connection', function(socket)
{
    console.log("Made socket connection", socket.id);

    socket.on('chat', function(data)
    {
        io.sockets.emit('chat', data);

    });

    socket.on('typing', function(data)
    {
        socket.broadcast.emit('typing', data)

    })
});