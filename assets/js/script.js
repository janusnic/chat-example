$(function() {
	definePanelHeight();

	$(window).on('resize', definePanelHeight);

	var socket = io();

	$('form').submit(function(){
		socket.emit('chat message', $('#m').val());
		$('#m').val('');
		return false;
	});

	socket.on('chat message', function(response){
		console.log(response);
		var li = $('<li class="list-group-item">');

		if(response.text)
		{
			li.html($('<div>').addClass('text').html(response.text));
		}

		if(response.media)
		{
			li.append($('<div>').addClass('media').html(response.media));
		}

		$('#messages').append(li);

		$('.panel-body').scrollTop($('.panel-body').prop('scrollHeight'));
	});
});

function definePanelHeight()
{

	$('.panel-body').css('height',
		$(window).height()  - $('.panel-heading').height() - ($('.panel-footer').height() * 3.5)
	);
}