var app = require('express')();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);

app.get('/', function(req, res) {  
    res.sendFile(__dirname + '/views/index.html');
});

//User Enter in chat Socket
io.on('connection', function(socket) {  
    socket.on('event', function(data) {
        console.log(data.message);
        //BroadCast
        //Dummy Example this send message only to socket created in scope of this client
        //socket.emit('announcements', { message: data.message });
        io.sockets.emit('announcements', { message: data.message });
    });
});
server.listen(8080);  
