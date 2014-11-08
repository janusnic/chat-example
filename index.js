var express     = require('express');
var app 		= express();
var http 		= require('http').Server(app);
var io 			= require('socket.io')(http);
var validUrl 	= require('valid-url');

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
			// console.log(msgSplit[i]);
			if(validUrl.isUri(splited[i]))
			{
				response.media = '<img src="'+splited[i]+'" />';
			}
		}

		// console.log(response);

		io.emit('chat message', response);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
