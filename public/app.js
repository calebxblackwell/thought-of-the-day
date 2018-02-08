//nav bar area
//login button
function navLoginButton(){
	$('.nav-login-button').on('click', () => {
		$('.start-page').removeClass('hide-display');
		$('#new-entry').addClass('hide-display');
		$('#register').addClass('hide-display');
	})
}
//create account button
function navRegisterButton(){
	$('.nav-register-button').on('click', () => {
		$('#register').removeClass('hide-display');
		$('#new-entry').addClass('hide-display');
		$('.start-page').addClass('hide-display');
	})
}
//status button
function navStatusButton(){
	$('.nav-status-button').on('click', () => {
		$('#new-entry').removeClass('hide-display');
		$('#register').addClass('hide-display');
		$('.start-page').addClass('hide-display');
	})
}
//end navbar area

//post a new status
function postNewStatus() {
	$('#new-status').on('submit', (e) => {
		e.preventDefault();
			let loggedInUser = localStorage.getItem('token');
			if (!(loggedInUser)){alert('Please log in or register.');}
			else {
				let dateInput = $('#date').val();
				let textInput = $('#textbox').val();
				let dataInput = {
					'date': dateInput,
					'text': textInput,
				};
				$.ajax({
					type: 'POST',
					data: JSON.stringify(dataInput),
					url: '/status',
					contentType: 'application/JSON',
				}).done((data) => {
					htmlOutput += moment(data.date).format("MMM Do YY");
					htmlOutput += data.text;
						$('#statuses').html(htmlOutput);
					 	$('#new-entry').addClass('hide-display');
				}).fail((err) => {
					console.log("error");
				});
			};
		let htmlOutput = "";
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
	$('#login').on('submit', (e) => {
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
				localStorage.setItem('username', result.username);
				loggedInUser = result;
				  $('.start-page').addClass('hide-display');
				 	$('#new-entry').removeClass('hide-display');
			}).fail((err) => {
				console.log(err);
			});
	})

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
		const checkAuth = localStorage.getItem('token');
			if(checkAuth){
				$('.start-page').addClass('hide-display');
				$('#new-entry').removeClass('hide-display');
			}
			else {
				$('.start-page').removeClass('hide-display');
			}
	}); //end bracket for document ready function
