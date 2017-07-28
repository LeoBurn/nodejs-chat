var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/room/index.html');
});

//Add folder to public/client files
app.use(express.static('public'));

//User Enter in chat Socket
//Whenever someone connects this gets executed
io.on('connection', function (socket) {
    console.log('A user connected');


    socket.on('connectRoom', function (room) {
        console.log('A user connected into a '+room);
        socket.join(room);
    });

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });

    socket.on('sendMessageEvent', function(room,data){
	    console.log(room+" : "+data);
    });

});
server.listen(8080);  
