// Make connection

var socket = io.connect('http://localhost:4000');

//Querry DOM

var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');


// Emit events
handle.disabled = false;

btn.addEventListener('click', function()
{
    if(handle.disabled == false)
    {
        if(handle.value == '')
        {
            alert("Invalid Username")
            return
        }else
        {
            handle.disabled = true;
        }
    }

    if(message.value == '')
    {
        return
    }

    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = ''
});

message.addEventListener('keypress', function()
{
    if(handle.disabled == true)
    {
        socket.emit('typing', handle.value);
    }
});

//Listen for events

socket.on('chat', function(data)
{
    feedback.innerHTML = ""
    output.innerHTML += '<p> <strong>' + data.handle + ': </strong>' + data.message + '</p>';

});

socket.on('typing', function(data)
{
    feedback.innerHTML = '<p> <em>' + data + 'is typing a message...' + '</m> </p>'
});