$(document).ready(function(){
  function getData(query){
    return fetch(query)
      .then(response => {
          return response.json();
      });
  }
});
//clicking add to post a STATUS
//html button performing a POST request
//on add button click, be taken to a page which has
//statuses posted from that day, or if none randomly generated from mock-data.
$('#AddButton').on('click', function(e){
  preventDefault();
  fetch('mockData').then(function(response){
    return response.show();
  });
  $('.status').show();
  $('mockData').show();
return false;//ajax call on a button event.preventdefault alternative

});
//use ajax to post status to the screen
$.ajax({
  type: 'GET',
  data: JSON.stringify({
    text: $("#textbox").val(),
    date: $("#date").val()
  }),
  url: '/status',
  contentType: 'application/JSON',
}).done(function(result){
  populateStatus();
});
.fail(function(err)(
  console.log(error);
))
