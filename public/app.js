// //header login button area
 $('.login-page').click(function(){
 	window.location.reload();
 })
 //user should have to be logged in in order to post a status.
 var loggedInUser = "";
//post a new status
function postNewStatus() {
	$('#new-status').on('submit', (e) => {
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
			console.log(data);
			// htmlOutput += data.date;
			// htmlOutput += data.text;
			// $('#statuses').html(htmlOutput);
			// $('#new-entry').addClass('hide-display');
			// $('#status-container').removeClass('hide-display');
		}).fail((err) => {
			console.log("error");
		});
	});
}
	//display all statuses
	function displayStatuses() {
		$.ajax({
				type: 'GET',
				url: '/status',
			}).done((data) => {
				if (data.length === 0) {
					$('#status-container').html('<h3> No statuses found.</h3>');
				};
				let statusInput = Object.keys(data).map((status, index) => {
					return `<div id="statuses"><input type="hidden" class="statusID" value="${status._id}">
			<p class="status-info">Date:</p> <p class="status-text">${status.date}</p><br><br>
			<div id="truncate"><p class="status-info">Entry:</p> <p class="status-text"> ${status.text}</p></div><br><br>
			<button id="current-button" class="reflections-button">View</button></div>`;
		});
				$('#status').html(statusInput);
			})
			.fail((err) => {
				console.log("error");
			})

}
	//login Area
	$('#login').on('submit', function(e) {
		e.preventDefault();
		const inputUsername = $('.login-username').val();
		const inputPassword = $('.login-password').val();
		const loginObject = {
			username: inputUsername,
			password: inputPassword
		};
		user= inputUsername;
		console.log(loginObject);
			$.ajax({
				type: 'POST',
				url: '/users/signin',
				headers: {
	    'content-type': "application/json",
	  },
				data:JSON.stringify(loginObject),
			}).done((result) => {
				console.log(result);
				localStorage.setItem('token',result.authToken);
				loggedInUser = result;
				//return data
			}).fail((err) => {
				console.log("error");
			});
	})
	//create account Area
	$('#register-user').on('submit', function(e) {
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
			console.log(result);
			alert('Thanks for signing up! You may now sign in with your username and password.');
			loggedInUser = result;
			//return data;
		}).fail((err) => {
			console.log(err);
		});
	})
	//dropdown button functionality.
	function navCreateButton() {
		$('.dropdown-content').on('click', '#nav-create-button', () => {
			$('form#new-status :input').val("");
			$('#new-status').removeClass('.hide-display').html(`<form id="new-status" method="post" name="new-status">
					<input class="date" id="date" placeholder="Today's Date" type="date">
					<input class="title" id="textbox" placeholder="New Status" type="text">
					<button class="btn-info" id="addbutton">Add</button>
				</form>`);
			$('#register-user').addClass('.hide-display');
			$('.start-page').addClass('.hide-display');
			$('#status-container').addClass('.hide-display');
			postNewStatus();
		})
	}

	function navLoginButton() {
		$('#nav-login-button').on('click', () => {
			$('#register-user').removeClass('.hide-display');
			$('#new-status').addClass('.hide-display');
			$('.start-page').addClass('.hide-display');
			$('#status-container').addClass('.hide-display');
		})
	}

	function navShowStatuses() {
		$('#nav-status-button').on('click', () => {
			displayStatuses();
			$('#status-container').removeClass('.hide-display');
			$('#new-status').addClass('.hide-display');
			$('.start-page').addClass('.hide-display');
			$('#register-user').addClass('.hide-display');
		})
	}
	//when the user clicks on the dropdown menu,
	//toggle between hiding and showing dropdown content.
	function showMenu() {
		$('.dropbtn').on('click', () => {
			$('#myDropdown').toggle();
		})
	};

	function hideMenu() {
		$('li').on('click', () => {
			$('div#myDropdown').hide();
		})
	};

	function dropdownKB() {
		  $('.nav-button').on('click', function(e) {
		    e.preventDefault();

		    var $this = $(this);
		    var action = $this.attr('data-action');

		    $('.page').addClass('hide-display');
		    $('#' + action).removeClass('hide-display');
		  });
		}

	$(document).ready(function() {
		navCreateButton();
		navLoginButton();
		navShowStatuses();
		postNewStatus();
		displayStatuses();
		dropdownKB();
		showMenu();
		hideMenu();
	}); //end bracket for document ready function
