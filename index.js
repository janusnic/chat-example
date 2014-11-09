var express     = require('express');
var app 		= express();
var http 		= require('http').Server(app);
var io 			= require('socket.io')(http);
var validUrl 	= require('valid-url');
var port = process.env.PORT || 3000

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.use("/assets", express.static(__dirname + '/assets'));

io.on('connection', function(socket){
	socket.on('chat message', function(msg){

		var response = {};

		response.text = msg;

		var splited = msg.split(' ');

		for (i in splited)
		{
			if(validUrl.isUri(splited[i]))
			{
				response.media = '<img src="'+splited[i]+'" />';
			}
		}

		io.emit('chat message', response);
	});
});

http.listen(port, function(){
	console.log('listening on *:' + port);
});
