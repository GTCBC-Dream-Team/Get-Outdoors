//initializing variables
var APIkey = "d4cbbbed2b7e0999d4caf0c5d818ffe4";
var lat = "37.39";
var lon = "-122.09";
var currentWeatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + APIkey;
var futureWeatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&APPID=" + APIkey;

//call to weather API current weather
$.ajax({
    url: currentWeatherURL,
    method: "GET"
}).done(function(response){
    console.log(response);

    //shows current weather state
    var currentWeatherState = response.weather[0].main;
    console.log("current weather state: " + currentWeatherState);
    $("#currentWeatherHead").html("Today's Weather");
    $("#currentWeatherBody").html(currentWeatherState + "<br>");

    //shows current temperature
    var tempKelvin = response.main.temp;
    var tempFahrenheit = (tempKelvin - 273.15)*1.8000;
    tempFahrenheit = Number(Math.round(tempFahrenheit+'e1')+'e-1');
    console.log("current temperature: " + tempFahrenheit + "F");
    $("#currentWeatherBody").append("Current: " + tempFahrenheit + "<br>");

    //shows today's min temperature
    var minKelvin = response.main.temp_min;
    var minFahrenheit = (minKelvin - 273.15)*1.8000;
    minFahrenheit = Number(Math.round(minFahrenheit+'e1')+'e-1');
    console.log("min temperature: " + minFahrenheit + "F");
    $("#currentWeatherBody").append("Min: " + minFahrenheit + "<br>");

    //shows today's max temperature
    var maxKelvin = response.main.temp_max;
    var maxFahrenheit = (maxKelvin - 273.15)*1.8000;
    maxFahrenheit = Number(Math.round(maxFahrenheit+'e1')+'e-1');
    console.log("max temperature: " + maxFahrenheit + "F");
    $("#currentWeatherBody").append("Max: " + maxFahrenheit + "<br>");
});

//call to weather API future weather forecast
$.ajax({
    url: futureWeatherURL,
    method: "GET"
}).done(function(response2){
    console.log(response2);
});