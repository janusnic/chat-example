$(function() {
	var socket = io();

	$('form').submit(function(){
		socket.emit('chat message', $('#m').val());
		$('#m').val('');
		return false;
	});

	socket.on('chat message', function(msg){
		if(msg)
		{
			$('#messages').append($('<li class="list-group-item">').html(msg));
		}
		$(window).scrollTop($(window).height());
	});
});
