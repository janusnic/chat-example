$(function() {
	definePanelHeight();

	$('.panel-heading').append('as [' + getCookie('name') + ']');


	$(window).on('resize', definePanelHeight);

	var socket = io();

	$('form').submit(function(e){
		socket.emit('chat message', {
			user : getCookie('name'),
			message : $('#m').val()
		});

		$('#m').val('');

		e.preventDefault();
	});

	socket.on('chat message', function(response){
		var li = $('<li class="list-group-item">');

		li.html($('<div>').addClass('user label label-primary').css('display', 'inline-block').html(response.user + ':'));

		if(response.text)
		{
			li.append($('<div>').addClass('text').html(response.text));
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

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}