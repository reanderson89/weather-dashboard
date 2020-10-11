$(document).ready(function(){

var userInputCity = document.getElementById("user-city")
var city = "";


function getWeather(){
    var city = userInputCity.value;
    var apiKey = "07fc03bb700aad88a938de39fb56c70a"
    var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+apiKey+"&units=imperial";
    console.log(city);


    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        console.log(response);
       $("#city-name").text(""+response.city.name);
       $("#temperature").text("Temperature: "+response.list[0].main.temp+"°");
       $("#humidity").text("Humidity: "+response.list[0].main.humidity+"%");
       $("#wind-speed").text("Wind Speed: "+response.list[0].wind.speed+" mph");
        getUV(response.city.coord.lat, response.city.coord.lon);
    })
    prependCities();
    fiveDay();

}
function getUV(lat, lon){
    var apiKey = "07fc03bb700aad88a938de39fb56c70a"
    var queryUrl = "http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid="+apiKey+"";
    console.log(lat, lon);
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        console.log(response);
           $("#uv-index").text("UV Index: "+response.value);
    })
    
}
function prependCities(){
    
    var cityArray = [];
    cityArray.push(userInputCity.value);
    for (var i = 0; i < cityArray.length; i++) {
        var newDiv = $("<div>");
       newDiv.append($("<button type='button' class='btn btn-secondary m-1'>"+cityArray[i]+"</button>")
       );
         $("#new-city").prepend(newDiv);
    }
}
function fiveDay(){
   for (var i = 0; i < 5;i++){
    
    var newCard = $('<div class="card text-white bg-info m-1" style="max-width: 18rem;"></div>'
    );
    newCard.append("<div class='card-header'>Header</div>");
    newCard.append('<div class="card-body"></div>').append('<h5 class="card-title">Info card title</h5>').append('<p class="card-text">Temp</p>')
    
    $("#five-day").append(newCard);
}}


$("#submit-me").on("click", function(event){
    event.preventDefault();
    getWeather();
})























})

