$(document).ready(function(){
// input field on page
var userInputCity = document.getElementById("user-city")

// creates a variable to be used to get city names from local storage
var savedCities = JSON.parse(localStorage.getItem("history")) || [];
var city = "" || savedCities[0];
// runs the get weather function on page load to populate anything currently in local storage.
getWeather(city);

// This function makes the initial API call and then dis[lays the following information]
function getWeather(city){
    // var city = userInputCity.value;
    var apiKey = "07fc03bb700aad88a938de39fb56c70a"
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=imperial";
    


    $.ajax({
        url: queryUrl,
        method: "GET"
    }).done(function(response){
        
       $("#city-name").text(""+response.name+" "+moment().format("L")).append($('<img class="images" src ="https://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png"/>'));
       $("#temperature").text("Temperature: "+Math.ceil(response.main.temp)+"°");
       $("#humidity").text("Humidity: "+response.main.humidity+"%");
       $("#wind-speed").text("Wind Speed: "+response.wind.speed+" mph");
    //    passes through the latitude and longitude infromation for the UV Index
        getUV(response.coord.lat, response.coord.lon);
        
    }).fail(function(){
        console.log("Bad request, API");
        return;
    })
    // This gets rid of the city the user entered into the input field after they submit
    userInputCity.value="";
}
// performs another API call with the lat and lon in order to get the UV Index and set the color based off the number.
function getUV(lat, lon){
    var apiKey = "07fc03bb700aad88a938de39fb56c70a"
    var queryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&appid="+apiKey+"";
    
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
            fiveDay(response);
            var uvI = response.current.uvi;
            $("#uv-span").text(uvI);
            $("#uv-span").css("background-color", "green");
            if (uvI > 0 && uvI < 2){
                $("#uv-span").css("background-color", "green"); 
            } else if (uvI > 2 && uvI < 6) {
                $("#uv-span").css("background-color", "yellow");
            } else if (uvI > 6 && uvI < 8) {
                $("#uv-span").css("background-color", "orange");
            } else if (uvI > 8 && uvI < 11) {
                $("#uv-span").css("background-color", "red");
            } else {
                $("#uv-span").css("background-color", "purple");
            }
           
    })
    
}

// This creates the buttons for each city so that they can be clicked on again to be displayed
function prependCities(city){
    
    var cityArray = [];
    cityArray.push(city);
    // saving city to local storage
    savedCities.unshift(city);
    localStorage.setItem("history", JSON.stringify(savedCities));

    for (var i = 0; i < cityArray.length; i++) {
        var newDiv = $("<div>");
       newDiv.append($("<button type='button' class='btn btn-primary m-1'>"+cityArray[i]+"</button>")
       );
         $("#new-city").prepend(newDiv);
    }
}
// This creates the five day forecast
function fiveDay(response){
    
    $("#five-day").empty();
   for (var i = 1; i < 6;i++){

    var day = response.daily[i];
    var newDate = moment().add(i, 'days').format("L");
   
    var newCard = $('<div class="card text-white bg-primary ml-1" style="max-width: 18rem;"></div>'
    );
    newCard.append("<div class='card-header'>"+newDate+"</div>");
    newCard.append($('<img class="images" src ="https://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png"/>'));
    newCard.append('<div class="card-body"></div>').append('<p class="card-title">'+Math.floor(day.temp.min)+"°"+"/"+Math.ceil(day.temp.max)+"°"+'</p>').append('<p class="card-text">'+"Humidity: "+day.humidity+"%"+'</p>')
    
    $("#five-day").append(newCard);
}}
// This repopulates the cities as buttons from local storage when the page is reloaded.
function pageLoad(){

for (var i = 0; i < savedCities.length; i++){
    var newButton = $("<div>");
       newButton.append($("<button type='button' class='btn btn-primary m-1'>"+savedCities[i]+"</button>")
       );
         $("#new-city").prepend(newButton);
}
}
// this runs when the page opens
pageLoad();

// clears all of the cities from local storage and then reloads the page when "clear all cities" is clicked
$("#clear-me").on("click", function(){
    window.localStorage.clear();
    location.reload();
    return false;
   
})

// runs the main functions of the app when a city is submitted
$("#submit-me").on("click", function(event){
    event.preventDefault();
    var letters = /^[A-Za-z]+$/;
    var city = userInputCity.value;
    if (city === ""){
        userInputCity.value="";
        return;
    } else {
    getWeather(city);
    prependCities(city);
    }
})

// reads the text of the button that is clicked and runs it through the getWeather function to be displayed
$("#new-city").on("click", ".btn", function(){
    getWeather(this.textContent);
})























})

