//mock data for the api
var mockData = {
  "textEntered": [
    {
      "date": "12/24",
      "text": "Merry Christmas Eve.",

    },
    {
      "date":"12/25",
      "text": "Merry Christmas!",
      
    }
  ]
};
//this is the function that uses AJAX to call to the server
function getData(callbackFn){
  setTimeout(function(){callbackFn(mockData)},1);
}
//these functions stay the same after we have the real API
function displayData(data){
  for (index in data.mockData){
    $('body').append(
      '<p>' + data.mockData[index].text + '</p>');
  }
}
function getAndDisplayData(){
  getData(displayData);
}
//on page load:
$(function(){
  getAndDisplayData();
});
//
