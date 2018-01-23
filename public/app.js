//post a new status
function postNewStatus() {
	$('#new-status').on('submit', (e) => {
		e.preventDefault();
		let dateInput = $(this).parent().find('#date').val();
		let textInput = $(this).parent().find('#textbox').val();
		let dataInput = {
			'date': dateInput,
			'text': textInput,
		};
		let htmlOutput = "";
		//console.log('date: ' + $(this).parent().find('#date').val(););
		$.ajax({
			type: 'POST',
			dataType: 'json',
			data: JSON.stringify(dataInput),
			url: '/status',
			contentType: 'application/JSON',
		}).done((data) => {
			htmlOutput += data.date;
			htmlOutput += data.text;
			$('#statuses').html(htmlOutput);
			$('#new-entry').addClass('hide-display');
			$('#status-container').removeClass('hide-display');
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
	$('.login-account').click(function() {
		const inputUsername = $('.login-username').val();
		const inputPassword = $('.login-password').val();
		const loginObject = {
			username: inputUsername,
			password: inputPassword
		};
		user= inputUsername;
			$.ajax({
				type: 'GET',
				url: '/status',
				data: JSON.stringify(loginObject),
			}).done((result) => {
				//return data
			}).fail((err) => {
				console.log("error");
			});
	})
	//create account Area
	$('.register-account').click(function() {
		event.preventDefault();
		const inputUsername = $('.register-username').val();
		const inputPassword = $('.register-password').val();
		const newUserObject = {
			username: inputUsername,
			password: inputPassword
		};
		$.ajax({
			type: 'GET',
			url: '/status',
			data: JSON.stringify(newUserObject),
		}).done((result) => {
			//return data;
		}).fail((err) => {
			console.log("error");
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
