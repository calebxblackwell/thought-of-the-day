//nav bar area
//login button
function navLoginButton(){
	$('#nav-login-button').on('click', () => {
		$('.start-page').removeClass('.hide-display');
		$('#new-status').addClass('.hide-display');
		$('#register-user').addClass('.hide-display');
	})
}
//create account button
function navRegisterButton(){
	$('.nav-register-button').on('click', () => {
		$('#register-user').removeClass('.hide-display');
		$('#new-status').addClass('.hide-display');
		$('.start-page').addClass('.hide-display');
	})
}
//status button
function navStatusButton(){
	$('#nav-status-button').on('click', () => {
		$('#new-status').removeClass('.hide-display');
		$('#register-user').addClass('.hide-display');
		$('.start-page').addClass('.hide-display');
	})
}
//end navbar area
//user should have to be logged in in order to post a status.
 var loggedInUser = "";
//post a new status
function postNewStatus() {
	$('.addbutton').on('submit', (e) => {
		e.preventDefault();
			if (!(loggedInUser)){alert('Please log in or register.');}
			else {
			let dateInput = $('#date').val();
			let textInput = $('#textbox').val();
			let dataInput = {
				'date': dateInput,
				'text': textInput,
		};
	};
		let htmlOutput = "";

		$.ajax({
			type: 'POST',
			data: JSON.stringify(dataInput),
			url: '/status' + loggedInUser,
			contentType: 'application/JSON',
		}).done((data) => {
			// htmlOutput += data.date;
			// htmlOutput += data.text;
			// $('#statuses').html(htmlOutput);
			 $('#new-status').addClass('.hide-display');
		}).fail((err) => {
			console.log("error");
		});
	});
}
	//display all statuses
// 	function displayStatuses() {
// 		$.ajax({
// 				type: 'GET',
// 				url: '/status',
// 			}).done((data) => {
// 				if (data.length === 0) {
// 					$('#status-container').html('<h3> No statuses found.</h3>');
// 				};
// 				let statusInput = Object.keys(data).map((status, index) => {
// 					return `<div id="statuses"><input type="hidden" class="statusID" value="${status._id}">
// 			<p class="status-info">Date:</p> <p class="status-text">${status.date}</p><br><br>
// 			<div id="truncate"><p class="status-info">Entry:</p> <p class="status-text"> ${status.text}</p></div><br><br>
// 			<button id="current-button" class="reflections-button">View</button></div>`;
// 		});
// 				$('#status').html(statusInput);
// 			})
// 			.fail((err) => {
// 				console.log("error");
// 			})
//
// }
	//login Area
	$('#nav-login-button').on('submit', (e) => {
		e.preventDefault();
		const inputUsername = $('.login-username').val();
		const inputPassword = $('.login-password').val();
		const loginObject = {
			username: inputUsername,
			password: inputPassword
		};
		user= inputUsername;
			$.ajax({
				type: 'POST',
				url: '/users/signin',
				headers: {
	    'content-type': "application/json",
	  },
				data:JSON.stringify(loginObject),
			}).done((result) => {
				localStorage.setItem('token',result.authToken);
				loggedInUser = result;
				  $('.start-page').addClass('.hide-display');
				 	$('#new-status').removeClass('hide-display');
			}).fail((err) => {
				console.log(err);
			});
	})
	//new ajax request to redirect user to status page upon loggedInUser
	$('#login').on('submit', (e) => {
		e.preventDefault();
		$.ajax({
			type: 'GET',
			url: '/status' +loggedInUser,
			headers: {
				'content-type': "application/json",
		},
	})
		.done((result) => {
			$('#login').addClass('hide-display');
			$('#new-status').removeClass('hide-display');
	})
		.fail((err) => {
			console.log(err);
	});
});
	//create account Area
	$('#register-user').on('submit', (e) => {
		e.preventDefault();
		const inputUsername = $('.register-username').val();
		const inputPassword = $('.register-password').val();
		const newUserObject = {
			username: inputUsername,
			password: inputPassword
		};
		$.ajax({
			type: 'POST',
			url: '/user',
			data: JSON.stringify(newUserObject),
			contentType: 'application/json',
		 	dataType: 'json',
		}).done((result) => {
			alert('Thanks for signing up! You may now sign in with your username and password.');
			loggedInUser = result;
			  $('#register-user').addClass('hide-display');
			  $('.start-page').removeClass('hide-display');
		}).fail((err) => {
			console.log(err);
		});
	})

	$(document).ready(() => {
		navLoginButton();
		navRegisterButton();
		navStatusButton();
		postNewStatus();
		//displayStatuses();
		//navBar();
	}); //end bracket for document ready function
