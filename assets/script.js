$(document).ready(function(){

var city = "Atlanta"
var apiKey = "07fc03bb700aad88a938de39fb56c70a"
var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+apiKey+"&units=imperial";



$.ajax({
    url: queryUrl,
    method: "GET"
}).then(function(response){
    console.log(response);
})



















})

