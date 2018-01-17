$(document).ready(function() {

	function newStatusButton() {
$('#nav-create-button').on('click', function () {
		$('#new-status').removeClass('hide-display');
		$('.start-page').addClass('hide-display');
});
}
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
//dropdown button functionality.
function navCreateButton(){
	$('.dropdown-content').on('click', '#nav-create-button', function(){
		$('form#new-status :input').val("");
		$('#new-entry').removeClass('hide-display').html(`<form id="new-status" method="post" name="new-status">
			<input class="date" id="date" placeholder="Today's Date" type="date"> <input class="title" id="textbox" placeholder="New Status" type="text"> <button class="btn-info" id="addbutton">Add</button>
		</form>`);
		$('#status-container').addClass('hide-display');
		postNewStatus();
	})
}
function navLoginButton() {
	$('#nav-login-button').click(function (){
		displayStatuses();
		$('#status-container').removeClass('hide-display');
		$('#new-status').addClass('hide-display');
		$('.start-page').addClass('hide-display');
	})
}
//when the user clicks on the dropdown menu,
//toggle between hiding and showing dropdown content.
function showMenu() {
	$('.dropbtn').click(function (){
		console.log('click');
		$('#myDropdown').toggle();
	})
};
function hideMenu(){
	$('li').on('click', function(){
		$('div#myDropdown').hide();
	})
};

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
	$(function () {
		postNewStatus();
 		NewStatusButton();
 		showMenu();
 		hideMenu();
 		displayStatuses();
 		navCreateButton();
 		navLoginButton();
	})
//end bracket
});
