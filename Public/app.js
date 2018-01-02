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
$('#AddButton').on('click', function(e){
  $.post('.status', function(data, `/.status`){
    alert("Data: " + data + '/.status: '+ status);
  });
  console.log("Add button clicked");
  let textEntered = {
    status: $('.status').val()
  };
  .then(res => {
    displayData();
  });
}
