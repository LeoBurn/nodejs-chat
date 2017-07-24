var socket = io.connect('/');
    $("#btnSendMessage").click(function () {
        var email = $("#email").val();
        if (!email)
            email = "Guest";

        var messageToSend = $("#msgSend").val();
        var currentChatMessages = $("#chatArea").val();
        var messageFinal = email + ": " + messageToSend;
        socket.emit('event', { message: messageFinal });
        $("#msgSend").val("");
    });


    // socket.on('announcements', function (data) {
    //     var currentChatMessages = $("#chatArea").val();
    //     $("#chatArea").val(currentChatMessages + "\n" + data.message);
    // });

    $("#chatArea")

    $("#connectEvent").click(function(){
        var roomName = $("#roomName").val();
        var email = $("#email").val();
        //Ui addEvent
        $("#eventsList").append('<li class="list-group-item">'+email+' <span class="label label-success">'+roomName+'</span><button type="button" class="close"  aria-label="Close"><span aria-hidden="true">&times;</span></button></li>');
    });