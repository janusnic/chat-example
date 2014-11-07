var app 		= require('express')();
var http 		= require('http').Server(app);
var io 			= require('socket.io')(http);
var validUrl 	= require('valid-url');

app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){

  	if(validUrl.isUri(msg))
  	{
  		io.emit('chat message', '<img src="'+msg+'" />');
  		return;
  	}


    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
