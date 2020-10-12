$(document).ready(function(){

var userInputCity = document.getElementById("user-city")


var savedCities = JSON.parse(localStorage.getItem("history")) || [];
var city = "" || savedCities[0];
getWeather(city);

function getWeather(city){
    // var city = userInputCity.value;
    var apiKey = "07fc03bb700aad88a938de39fb56c70a"
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=imperial";
    


    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        
       $("#city-name").text(""+response.name+" "+moment().format("L")).append($('<img class="images" src ="https://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png"/>'));
       $("#temperature").text("Temperature: "+Math.ceil(response.main.temp)+"°");
       $("#humidity").text("Humidity: "+response.main.humidity+"%");
       $("#wind-speed").text("Wind Speed: "+response.wind.speed+" mph");
        getUV(response.coord.lat, response.coord.lon);
        
    })
    
    userInputCity.value="";
}
function getUV(lat, lon){
    var apiKey = "07fc03bb700aad88a938de39fb56c70a"
    var queryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&appid="+apiKey+"";
    
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        
           $("#uv-index").text("UV Index: "+response.current.uvi);
           fiveDay(response);
    })
    
}
function prependCities(city){
    
    var cityArray = [];
    cityArray.push(city);
    // saving city to local storage
    savedCities.unshift(city);
    localStorage.setItem("history", JSON.stringify(savedCities));

    for (var i = 0; i < cityArray.length; i++) {
        var newDiv = $("<div>");
       newDiv.append($("<button type='button' class='btn btn-secondary m-1'>"+cityArray[i]+"</button>")
       );
         $("#new-city").prepend(newDiv);
    }
}
function fiveDay(response){
    
    $("#five-day").empty();
   for (var i = 1; i < 6;i++){

    var day = response.daily[i];
    var newDate = moment().add(i, 'days').format("L");
   
    var newCard = $('<div class="card text-white bg-info m-1" style="max-width: 18rem;"></div>'
    );
    newCard.append("<div class='card-header'>"+newDate+"</div>");
    newCard.append($('<img class="images" src ="https://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png"/>'));
    newCard.append('<div class="card-body"></div>').append('<p class="card-title">'+Math.floor(day.temp.min)+"°"+"/"+Math.ceil(day.temp.max)+"°"+'</p>').append('<p class="card-text">'+"Humidity: "+day.humidity+"%"+'</p>')
    
    $("#five-day").append(newCard);
}}

function pageLoad(){

for (var i = 0; i < savedCities.length; i++){
    var newButton = $("<div>");
       newButton.append($("<button type='button' class='btn btn-secondary m-1'>"+savedCities[i]+"</button>")
       );
         $("#new-city").prepend(newButton);
}
}
pageLoad();


$("#submit-me").on("click", function(event){
    event.preventDefault();
    var city = userInputCity.value;
    getWeather(city);
    prependCities(city);
})

$("#new-city").on("click", ".btn", function(){
    getWeather(this.textContent);
})























})

