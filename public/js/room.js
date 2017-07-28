
$(function() {
    //Send button click handler
    $("#btnSendMessage").click(function () {
        var email = getUserName();
        var messageToSend = $("#msgSend").val();

        sendTextToChatArea(new Date().toLocaleString(),email,messageToSend)
        //clean message box
        $("#msgSend").val("");
        $("#btnSendMessage").prop( "disabled", true );
    });

    //Connect event button click handler
    $("#connectEvent").click(function(){
        var email = getUserName();
        var roomName = $("#roomName").val();
        
        //Ui addEvent
        $("#eventsList").append('<li class="list-group-item">'+email+' <span class="label label-success">'+roomName+'</span><button type="button" class="close"  aria-label="Close" onclick="disconectEventClick(this)"><span aria-hidden="true">&times;</span></button></li>');
        //Activate msgBox
        $("#msgSend").prop( "disabled", false );

        //clean event
        $("#email").val("");
        $("#roomName").val("");
    });

    $("#msgSend").keyup(function(){
        var msg = $(this).val();
        if(msg)
            $("#btnSendMessage").prop( "disabled", false );
    });
        

    
});

function disconectEventClick(element)
{
    $(element).parent().hide();
    if(numberOfConnectedEvents() <= 1)
    {
        $("#msgSend").val("");
        $("#msgSend").prop( "disabled", true );
        $("#btnSendMessage").prop( "disabled", true );
    }   
}

function getUserName(){
    var email = $("#email").val();
        if (!email)
            email = "Guest";
    return email;
}

function sendTextToChatArea(date,user,msg)
{
    var msgToChat = '{'+date+'} '+user +': '+msg+'\n';
    $("#chatArea").append(msgToChat);
}

function numberOfConnectedEvents(){
    return $("#eventsList").children().length;
}