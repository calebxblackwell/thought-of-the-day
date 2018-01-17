$(document).ready(function() {
	//dropdown button functionality.
	function navCreateButton(){
		  $('#nav-create-button').on('click', () => {
			$('#new-status').removeClass('.hide-display');
			$('#register-user').addClass('.hide-display');
			$('.start-page').addClass('.hide-display');
		})
	}
	function navLoginButton() {
		$('#nav-login-button').on('click', () => {
			$('#register-user').removeClass('.hide-display');
			$('#new-status').addClass('.hide-display');
			$('.start-page').addClass('.hide-display');
		})
	}
	//when the user clicks on the dropdown menu,
	//toggle between hiding and showing dropdown content.
	function showMenu() {
		$('.dropbtn').on('click', () => {
			console.log('click');
			$('#myDropdown').toggle();
		})
	};
	function hideMenu(){
		$('li').on('click', () => {
			$('div#myDropdown').hide();
		})
	};
//post a new status
function postNewStatus(){
	$('#new-status').on('submit', (e) => {
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
		.done((data) => {
			htmlOutput += data.date;
			htmlOutput += data.textbox;
			$('#statuses').html(htmlOutput);
			$('form#newStatus :input').val("");
			$('#new-entry').addClass('hide-display');
			$('#status-container').removeClass('hide-display');
		})
		.fail((err) => {
			console.log("error");
		});
});
//display all statuses
function displayStatuses() {
	$.ajax({
		type: 'GET',
		url: '/status',
	})
	.done(function(data) {
		if (data.length === 0){
			$('#status-container').html('No statuses found.');
		};
		let htmlOutput = "";
		window.location = "index.html";
		//return data;
	})
	.fail(function(err) {
		console.log("error");
	});
}
}
});
//ajax request to GET authentication info when inputting username/password
$('#login').on('submit', (e) =>{
	e.preventDefault();
	$.ajax({
		type: 'GET',
		url: '/status' ,
		data: JSON.stringify({
			username: $("#text").val(),
			password: $("#password").val()
		}),
	})
	.done((result) => {
		//return data
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
			username: $("#userreg").val(),
			password: $("#passreg").val()
		}),
	})
	.done((result) => {
		//return data;
	})
	.fail((err) => {
		console.log("error");
	});

//end bracket for document ready function
});
