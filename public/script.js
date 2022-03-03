//some stuff we're probably allowed to do while the site is loading

var socket = io();
function resetMessages(){
    $('#messages').html("");
}
function writeMessagestoPage(messages){
    console.log(messages);
    messageReversed = messages.reverse();
    messageReversed.forEach((message) => {
        const messageContent = message.message;
        $('#messages').append(`<div class="messageBox">${messageContent}</div>`);
    })
}
function scrollToBottom(){
    const elem = document.getElementById('messages');
    elem.scrollTop = elem.scrollHeight;
}

//when the site loads
window.onload = function(){
    //this is where we submit a message
    $(document).keypress(function(e) {
        if(e.which == 13) {
          const messageContent = $('#msg').val();
          const messageObject = {msg:messageContent};
          console.log(messageContent);
          $('#msg').val("");
          $.post('/',messageObject,function(result){
              console.log(result);
          })
        }
      });
    scrollToBottom();
    socket.on('chat message', function(messageContent){
        console.log('the chat message was successfully received');
        resetMessages();
        writeMessagestoPage(messageContent);
        scrollToBottom();
    })


    //closing bracket
}


