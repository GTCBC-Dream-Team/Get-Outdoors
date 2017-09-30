//initializing variables
var locationName = "36.176346,-95.938979";
var woeidLocation = "placeholder";
var date = "placeholder";
var sunriseTime = "placeholder";
var sunsetTime = "placeholder";

//first ajax call to meta weather API to get woeid
$.ajax({
    url: "https://gtproxy2.herokuapp.com/api/metaweather/location/search/?lattlong=" + locationName,
    method: "GET",
    success: function (response) {
        console.log(locationName);
        console.log(response);
        woeidLocation = response[1].woeid;
    }
    //second ajax call to meta weather API to get weather data
}).done(function (response2) {
    $.ajax({
        url: "https://gtproxy2.herokuapp.com/api/metaweather/location/" + woeidLocation + "/",
        method: "GET"
    }).done(function (response2) {
        console.log(response2);
        //times are in moment default format
        date = response2.time;
        sunriseTime = response2.sun_rise;
        sunsetTime = response2.sun_set;
        console.log("Date: " + moment(date).format("MMMM Do YYYY"));
        console.log("sunrise: " + moment(sunriseTime).format("h:mm:ss a"));
        console.log("sunset: " + moment(sunsetTime).format("h:mm:ss a"));
    });
});