$(document).ready(function() {
	$('.wrapper').hide();
	$('.loginscreen').show();
	$('.login-account').click(function() {
		$('.loginscreen').hide();
		$('.wrapper').show();
	});
	$('.create-account').click(function (){
		$('.register-user').show();
		$('.wrapper').show();
	});


	//clicking add to post a STATUS
	//html button performing a POST request
	//on add button click, be taken to a page which has
	//statuses posted from that day, or if none randomly generated from mock-data.
	$('#new-status').on('submit', (e) => {
		//use ajax to post status to the screen
		e.preventDefault();
		$.ajax({
			type: 'POST',
			data: JSON.stringify({
				text: $("#textbox").val(),
				date: $("#date").val()
			}),
			url: '/status',
			contentType: 'application/JSON',
		})
    .done((result) => {
			//return data;
		})
    .fail((err) => {
      console.log("error");
    });
		//ajax request to get the mock Data
		$.ajax({
			type: 'POST',
			url: '/mockData',
		})
		.done(function(result) {
			window.location = "index.html";
			//return data;
		})
    .fail(function(err) {
		});
	});
});
//ajax request to GET authentication info when inputting username/password
$('#login').on('submit', (e) =>{
	e.preventDefault();
	$.ajax({
		type: 'GET',
		url: '/status' ,
		data: JSON.stringify({
			username: $("#text").val();
			password: $("#password").val();
		}),
	}),
	.done((result) => {
		//return data;
	})
	.fail((err) => {
		console.log("error");
	});
});
$('#register-user').on('submit', (e) => {
	e.preventDefault();
	$.ajax({
		type: 'GET',
		url: '/status',
		data: JSON.stringify({
			username: $("#userreg").val();
			password: $("#passreg").val();
		}),
	}),
	.done((result) => {
		//return data;
	}),
	.fail((err) => {
		console.log("error");
	});
//end bracket 
});
