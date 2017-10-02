//initializing variables
var lat = 33.7401600;
var lng = -84.4203400;
var sunsetURL = "https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lng + "&formatted=0";
var currentTime = moment();


$.ajax({
    url: sunsetURL,
     method: "GET"
}).done(function(response){
    console.log(response);

    $("#currentSunsetHead").html("Today's Sun Data");

    var currentSunrise = response.results.sunrise;
    currentSunrise = moment(currentSunrise).format("hh:mm a");
    console.log("Sunrise: " + currentSunrise);
    $("#currentSunsetBody").html("Sunrise: " + currentSunrise + "<br>");

    var currentSunset = response.results.sunset;
    currentSunset = moment(currentSunset).format("hh:mm a");
    console.log("Sunset: " + currentSunset);
    $("#currentSunsetBody").append("Sunset: " + currentSunset + "<br>");

    var currentNoon = response.results.solar_noon;
    currentNoon = moment(currentNoon).format("hh:mm a");
    console.log("Solar noon: " + currentNoon);
    $("#currentSunsetBody").append("Solar noon: " + currentNoon + "<br>");

    var currentDaylength = response.results.day_length;
    currentDaylength = moment(currentDaylength).format("hh:mm a");
    console.log("Day length: " + currentDaylength);
    $("#currentSunsetBody").append("Day length: " + currentDaylength + "<br>");

    var nextDay = currentTime.day(0);
    console.log("Next Day: " + nextDay.format("dddd"));
});