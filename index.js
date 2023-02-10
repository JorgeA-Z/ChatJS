var express = require('express');
var PORT = process.env.PORT || 4000;
var socket = require('socket.io');

//App setup

var app = express();
var server = app.listen(PORT, function()
{
    console.log("Listening to requiest on port 4000")
});

//Static file

app.use(express.static('public'));

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