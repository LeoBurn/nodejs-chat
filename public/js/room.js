var socket;

$(function () {
    //Send button click handler
    $("#btnSendMessage").click(function () {
        var email = getUserName();
        var messageToSend = $("#msgSend").val();

        sendTextToChatArea(new Date().toLocaleString(), email, messageToSend);

        //socket send
        socket.emit('sendMessageEvent','room1' ,'Sent an event from the client!');
        //clean message box
        $("#msgSend").val("");
        $("#btnSendMessage").prop("disabled", true);
    });

    //Connect event button click handler
    $("#connectEvent").click(function () {
        var email = getUserName();
        var roomName = $("#roomName").val();

        //Ui addEvent
        $("#eventsList").append('<li class="list-group-item">' + email + ' <span class="label label-success">' + roomName + '</span><button type="button" class="close"  aria-label="Close" onclick="disconectEventClick(this)"><span aria-hidden="true">&times;</span></button></li>');
        //Activate msgBox
        $("#msgSend").prop("disabled", false);

        //Connect to webSocket
        socket = io.connect();
        socket.on('connect', function () {
            // Connected, let's sign-up for to receive messages for this room
            socket.emit('connectRoom', roomName);
        });

        //clean event
        $("#email").val("");
        $("#roomName").val("");
        $("#connectEvent").prop("disabled", true);
    });

    $("#msgSend").keyup(function () {
        var msg = $(this).val();
        if (msg)
            $("#btnSendMessage").prop("disabled", false);
    });


});

function disconectEventClick(element) {
    $(element).parent().hide();
    if (numberOfConnectedEvents() <= 1) {
        $("#msgSend").val("");
        $("#msgSend").prop("disabled", true);
        $("#btnSendMessage").prop("disabled", true);
        $("#connectEvent").prop("disabled", false);
    }
}

function getUserName() {
    var email = $("#email").val();
    if (!email)
        email = "Guest";
    return email;
}

function sendTextToChatArea(date, user, msg) {
    var msgToChat = '{' + date + '} ' + user + ': ' + msg + '\n';
    $("#chatArea").append(msgToChat);
}

function connectRoom(room) {
    var socket = io.connect();
    socket.emit('connect', room);
}

function numberOfConnectedEvents() {
    return $("#eventsList").children().length;
}