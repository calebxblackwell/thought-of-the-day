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
//logout button
function navLogoutButton(){
	$('.nav-logout-button').on('click', () => {
		const loggedOutUser = localStorage.removeItem('token');
			if(loggedOutUser){
				$('.start-page').removeClass('hide-display');
				$('#new-entry').addClass('hide-display');
				$('#register').addClass('hide-display');
			}
			else {
				//empty
			}
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
				let htmlOutput = "";
				$.ajax({
					type: 'POST',
					data: JSON.stringify(dataInput),
					url: '/status',
					contentType: 'application/JSON',
				}).done((data) => {
					htmlOutput += '<h2>Date: </h2>';
					htmlOutput += moment(data.date).format("MMM Do YY");
					htmlOutput += '<br><br>';
					htmlOutput += '<h2>Status: </h2>';
					htmlOutput += data.text;
					htmlOutput += '<br><br>';
					htmlOutput += '<input type="hidden" class="statusID" value="';
					htmlOutput += data._id;
					htmlOutput += '">';
					htmlOutput += '<button id="edit-button" class="status-button">Edit</button>';
					htmlOutput += '<button id="delete-button" class="status-button">Delete</button>';
						$('#statuses').html(htmlOutput);
						$('form#new-status :input').val("");
					 	$('#new-entry').addClass('hide-display');
				}).fail((err) => {
					console.log("error");
				});
			};
	});
}

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
	//view statuses by id
	function displayStatusById() {
	    $('#status').on('click', '#current-button', () => {
	        let idParameter = $(this).parent().find('.statusID').val();
	        $.ajax({
	                method: 'GET',
	                url: '/status' + idParameter
	            })
	            .done((data) => {
	                let htmlOutput = "";
									htmlOutput += '<h2>Date: </h2>';
									htmlOutput += moment(data.date).format("MMM Do YY");
									htmlOutput += '<br><br>';
									htmlOutput += '<h2>Status: </h2>';
									htmlOutput += data.text;
									htmlOutput += '<br><br>';
									htmlOutput += '<input type="hidden" class="statusID" value="';
									htmlOutput += data._id;
									htmlOutput += '">';
									htmlOutput += '<button id="edit-button" class="status-button">Edit</button>';
									htmlOutput += '<button id="delete-button" class="status-button">Delete</button>';
									 	$('#new-entry').addClass('hide-display');
	            })
	            .fail((error) => {
	                console.log(error);
	                $('#new-entry').removeClass('hide-display');
	            })
	    })
	}

	//delete statuses
	function deleteStatus() {
	    let idParameter = $('div').find('.statusID').val();
	    $.ajax({
	            method: 'DELETE',
	            url:'/status' + idParameter,
	            contentType: 'application/json',
	            dataType: 'json'
	        })
	        .done((data) => {
	            console.log('deleting status');
	            displayStatusById();
	        })
	        .fail((error) => {
	            console.log(error);
	            $('#new-entry').removeClass('hide-display');
	        })
	}

//update statuses
			//first retrieve the post by id and put data in form
function retrieveStatus() {
    $('#status').on('click', '#edit-button',() => {
        $('#new-entry').removeClass('hide-display');
        let idParameter = $(this).parent().find('.statusID').val();
        $.ajax({
                method: 'GET',
                url: '/status' + idParameter,
                contentType: 'application/json'
            })
						.done((data) => {
							htmlOutput += '<h2>Date: </h2>';
							htmlOutput += moment(data.date).format("MMM Do YY");
							htmlOutput += '<br><br>';
							htmlOutput += '<h2>Status: </h2>';
							htmlOutput += data.text;
							htmlOutput += '<br><br>';
							htmlOutput += '<input type="hidden" class="statusID" value="';
							htmlOutput += data._id;
							htmlOutput += '">';
							htmlOutput += '<button id="edit-button" class="status-button">Edit</button>';
							htmlOutput += '<button id="delete-button" class="status-button">Delete</button>';
            })
            .fail((error) => {
                console.log(error);
            })
    });
}
			//then submit updated reflection
		function updateReflection() {
		    let idParameter = $('form').find('.reflectionID').val();
		    let dateInput = $('form').parent().find('#date').val();
		    let textInput = $('form').parent().find('#text').val();
		    let newDataInput = {
		        'date': dateInput,
		        'text': textInput,
		    };

		    let htmlOutput = "";

		    $.ajax({
		            method: 'PUT',
		            url: '/status'+ idParameter,
		            contentType: 'application/json',
		            dataType: 'json',
		            data: JSON.stringify(newDataInput)
		        })
						.done((data) => {
							htmlOutput += '<h2>Date: </h2>';
							htmlOutput += moment(data.date).format("MMM Do YY");
							htmlOutput += '<br><br>';
							htmlOutput += '<h2>Status: </h2>';
							htmlOutput += data.text;
							htmlOutput += '<br><br>';
							htmlOutput += '<input type="hidden" class="statusID" value="';
							htmlOutput += data._id;
							htmlOutput += '">';
							htmlOutput += '<button id="edit-button" class="status-button">Edit</button>';
							htmlOutput += '<button id="delete-button" class="status-button">Delete</button>';
								$('form#new-status :input').val("");
							 	$('#new-entry').addClass('hide-display');
		        })
		        .fail((error) => {
		            console.log(error);
		        })
		}
//document ready function
	$(document).ready(() => {
		navLoginButton();
		navRegisterButton();
		navStatusButton();
		postNewStatus();
		navLogoutButton();
		deleteStatus();
		displayStatusById();
		retrieveStatus();
		//if you're already logged in, bypass the login page and go to post status
		const checkAuth = localStorage.getItem('token');
			if(checkAuth){
				$('.start-page').addClass('hide-display');
				$('#new-entry').removeClass('hide-display');
			}
			else {
				$('.start-page').removeClass('hide-display');
			}
	}); //end bracket for document ready function
