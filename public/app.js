//nav bar area
//login button
function navLoginButton() {
	$('.nav-login-button').on('click', () => {
		$('.start-page').removeClass('hide-display');
		$('#new-entry').addClass('hide-display');
		$('#register').addClass('hide-display');
	})
}
//create account button
function navRegisterButton() {
	$('.nav-register-button').on('click', () => {
		$('#register').removeClass('hide-display');
		$('#new-entry').addClass('hide-display');
		$('.start-page').addClass('hide-display');
	})
}
//status button
function navStatusButton() {
	$('.nav-status-button').on('click', () => {
		$('#new-entry').removeClass('hide-display');
		$('#register').addClass('hide-display');
		$('.start-page').addClass('hide-display');
	})
}
//logout button
function navLogoutButton() {
	$('.nav-logout-button').on('click', () => {
		localStorage.removeItem('token');
		$('.start-page').removeClass('hide-display');
		$('#new-entry').addClass('hide-display');
		$('#register').addClass('hide-display');
		$('.nav-logout-button').addClass('hide-display');
		$('.nav-login-button').removeClass('hide-display');
	})
}
//end navbar area
//post a new status
function postNewStatus() {
    $('#new-status').on('submit', (e) => {
        e.preventDefault();
        let loggedInUser = localStorage.getItem('token');
        let username = localStorage.getItem('username');
        if (!(loggedInUser)) {
            alert('Please log in or register.');
        } else {
            let dateInput = $('#date').val();
            let textInput = $('#textbox').val();
            let dataInput = {
                date: dateInput,
                text: textInput,
                username: username
            };
            let htmlOutput = "";
            $.ajax({
                type: 'POST',
                data: JSON.stringify(dataInput),
                url: '/status',
                contentType: 'application/JSON',
            }).done((statuses) => {
                displayAllStatuses()
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
	user = inputUsername;
	$.ajax({
		type: 'POST',
		url: '/users/signin',
		headers: {
			'content-type': "application/json",
		},
		data: JSON.stringify(loginObject),
	}).done((result) => {
		localStorage.setItem('token', result.authToken);
		localStorage.setItem('username', result.username);
		loggedInUser = result;
		$('.start-page').addClass('hide-display');
		$('#new-entry').removeClass('hide-display');
		$('.nav-login-button').addClass('hide-display');
		$('.nav-logout-button').removeClass('hide-display');
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
//

//display all statuses
function displayAllStatuses() {
	$('#statuses').html("");
	$.ajax({
			method: 'GET',
			url: '/status',
			dataType: 'json'
		})
		.done((statuses) => {
			statuses.forEach((status) => {
				$('#statuses').append(`
									<div class="current-status row list-group">
										<div class="item  col-xs-4 col-lg-4">
											<input type="hidden" class="statusID" value="${status._id}">
											<div class="status-date group inner list-group-item-heading">
												<h5>Date:</h5>
												<h6> ${moment(status.date).format("MMM Do YY")}</h6>
											</div>
											<div class="status-text group inner list-group-item-text">
												<h5> Status: </h5>
												<h6> ${status.text}</h6>
											</div>
											<button id="edit-button" data-id="${status._id}" class="status-button col-xs-12 col-md-6">Edit</button>
											<button id="delete-button" data-id="${status._id}" class="status-button col-xs-12 col-md-6">Delete</button>
											<button id="view-all-button" data-id="${status._id}" class="status-button col-xs-12 col-md-6">View All</button>
										</div>
									</div>
														`)
				const checkAuth = localStorage.getItem('token');
				if (checkAuth) {
					$('#edit-button').removeClass('hide-display');
					$('#delete-button').removeClass('hide-display');
					$('#view-all-button').removeClass('hide-display');
				} else {
					$('#edit-button').addClass('hide-display');
					$('#delete-button').addClass('hide-display');
					$('#view-all-button').addClass('hide-display');
				}
			})

			$('form#new-status :input').val("");
			$('#new-entry').addClass('hide-display');
		}).fail((error) => {
			console.log(error);
			$('#new-entry').removeClass('hide-display');
		})
}
//view statuses by id

$('#statuses').on('click', '#view-all-button', function() {
	let idParameter = $(this).attr("data-id")
	console.log(idParameter);
	$.ajax({
		method: 'GET',
		url: '/status/' + idParameter,
		dataType: 'json'
	}).done((statuses) => {
			displayAllStatuses()
	}).fail((error) => {
		console.log(error);
		$('#new-entry').removeClass('hide-display');
	})
})

//delete statuses by id

$('#statuses').on('click', '#delete-button', function() {
	let idParameter = $(this).attr("data-id")
	$.ajax({
		method: 'DELETE',
		url: '/status/' + idParameter,
		contentType: 'application/json',
		dataType: 'json'
	}).done((data) => {
		displayAllStatuses();
	}).fail((error) => {
		console.log(error);
		$('#new-entry').removeClass('hide-display');
	})
})

//update statuses
//first retrieve the post by id and put data in form
$('#statuses').on('click', '#edit-button', function() {
	$('.update-status').removeClass('hide-display');
	let idParameter = $(this).attr("data-id")
	let dateInput = $('form').parent().find('#date').val();
	let textInput = $('form').parent().find('#text').val();
	$.ajax({
		method: 'GET',
		url: '/status/' + idParameter,
		contentType: 'application/json',
		dataType: 'json'
	}).done((statuses) => {
		console.log("done edit onclick");
		$('.update-status').html(`
			<div class="update-status row list-group">
				<div class="item  col-xs-4 col-lg-4">
					<input type="hidden" class="statusID" value="${status._id}">
					<div class="status-date group inner list-group-item-heading">
					<form id="update-status" method="get" name="update-status">
						<h2>Edit your status.</h2>
						<input class="date" id="update-date" placeholder="Today's Date" type="date">
						<input class="title" id="update-textbox" placeholder="New Status" type="text">
						<button class="btn-update" id="update-button">Update</button>
					</form>
					</div>
					</div>
				</div>
			`)
	}).fail((error) => {
		console.log(error);
	})
});
//then submit updated status
$('.update-status').on('click', '#update-button', function() {
	console.log("begin update status after done onclick");
	let idParameter = $(this).attr("data-id");
	let dateInput = $('form').parent().find('#date').val();
	let textInput = $('form').parent().find('#text').val();
	let newDataInput = {
		'date': dateInput,
		'text': textInput,
	};
	let htmlOutput = "";
	$.ajax({
			method: 'PUT',
			url: '/status/' + idParameter,
			contentType: 'application/json',
			dataType: 'json',
			data: JSON.stringify(newDataInput)
		})
		.done((statuses) => {
			console.log("done update status after done onclick");
			displayAllStatuses()
		}).fail((error) => {
			console.log(error);
		})

})

//document ready function
$(document).ready(() => {
	navLoginButton();
	navRegisterButton();
	navStatusButton();
	postNewStatus();
	navLogoutButton();
	displayAllStatuses()
	//updateStatus();

	//if you're already logged in, bypass the login page and go to post status
	const checkAuth = localStorage.getItem('token');
	if (checkAuth) {
		$('.nav-login-button').addClass('hide-display');
		$('.start-page').addClass('hide-display');
		$('#new-entry').removeClass('hide-display');
		$('.update-status').addClass('hide-display');
	} else {
		$('.nav-logout-button').addClass('hide-display');
		$('.nav-login-button').removeClass('hide-display');
		$('.start-page').removeClass('hide-display');
		$('.update-status').addClass('hide-display');
	}
}); //end bracket for document ready function
