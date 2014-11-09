var express     = require('express');
var app 		= express();
var http 		= require('http').Server(app);
var io 			= require('socket.io')(http);
var validUrl 	= require('valid-url');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000

app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended : true
}));
app.use(bodyParser.json());

app.get('/', function(req, res){

	if(req.cookies.name == 'undefined')
	{
		res.redirect('sign');
	}

	res.sendFile(__dirname + '/index.html');

});

app.get('/sign', function(req, res){
	res.sendFile(__dirname + '/sign.html');
});

app.post('/sign', function(req, res){
	var name = req.param('name');

	res.cookie('name', name);
	res.redirect('/');
});

app.use("/assets", express.static(__dirname + '/assets'));

io.on('connection', function(socket){
	socket.on('chat message', function(input){

		var response = {};

		response.text = input.message;
		response.user = input.user;

		var splited = input.message.split(' ');

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
