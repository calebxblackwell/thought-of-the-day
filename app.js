$(document).ready(function(){
  function getData(query){
    return fetch(query)
      .then(response => {
          return response.json();
      });
  }
  
});
