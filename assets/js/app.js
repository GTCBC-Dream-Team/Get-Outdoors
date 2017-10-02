//input user location as string

//receive lat and long

//place lat and long into variable

//pass lat and long variable into google maps

$(document).ready(function () {
    // Init Carousel
    $('.carousel').carousel();

    // Init Carousel Slider
    $('.carousel.carousel-slider').carousel({fullWidth: true});

    // Fire off toast
    //Materialize.toast('Hello World', 3000);

    // Init Slider
    $('.slider').slider();

    // Init Modal
    $('.modal').modal();

    // Init Sidenav
    $('.button-collapse').sideNav();
});

const APIkey = "d4cbbbed2b7e0999d4caf0c5d818ffe4";

const key = "AIzaSyBWhgudH2tEdR71f3K0SmIUysNLNupoicI";

function myhelper(lat, lng) {

}

$("#submit").on("click", function () {
    event.preventDefault();
    let address = $("#search").val();
    const queryURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`;
    $.ajax({
        url: queryURL,
        method: "GET",
        success: function (response) {
            let lat = response.results[0].geometry.location.lat;
            let lng = response.results[0].geometry.location.lng;
            const currentWeatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&APPID=" + APIkey;
            const futureWeatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lng + "&APPID=" + APIkey;
            $.ajax({
                url: currentWeatherURL,
                method: "GET",
                success: sunsetFunction(response)
            }).done(function (response) {

                //shows current weather state
                var currentWeatherState = response.weather[0].main;
                $("#currentWeatherHead").html("Today's Weather");
                $("#currentWeatherBody").html(currentWeatherState + "<br>");

                //shows current temperature
                var tempKelvin = response.main.temp;
                var tempFahrenheit = (tempKelvin * 9 / 5) - 459.67;
                tempFahrenheit = Number(Math.round(tempFahrenheit + 'e1') + 'e-1');
                $("#currentWeatherBody").append("Current: " + tempFahrenheit + " F<br>");

                //shows today's min temperature
                var minKelvin = response.main.temp_min;
                var minFahrenheit = (minKelvin * 9 / 5) - 459.67;
                minFahrenheit = Number(Math.round(minFahrenheit + 'e1') + 'e-1');
                $("#currentWeatherBody").append("Min: " + minFahrenheit + " F<br>");

                //shows today's max temperature
                var maxKelvin = response.main.temp_max;
                var maxFahrenheit = (maxKelvin - 273.15) * 1.8000;
                maxFahrenheit = Number(Math.round(maxFahrenheit + 'e1') + 'e-1');
                $("#currentWeatherBody").append("Max: " + maxFahrenheit + " F<br>");
            });
        }
    }).done(function (response) {
        console.log(response.results[0].geometry.location.lat);
        console.log(response.results[0].geometry.location.lng);
        let lat = response.results[0].geometry.location.lat;
        let lng = response.results[0].geometry.location.lng;
        myhelper(lat, lng);
        initMap(lat, lng);
    })
});

function activity() {
    $("#submit2").on("click", function () {
        event.preventDefault();
        let activity = $("#textarea2").val().trim();
        console.log(activity);
    });
}


let map;
let service;
let infowindow;

function initMap(lat, lng) {
    let location = new google.maps.LatLng(lat, lng);

    map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 15
    });
    let request = {
        location: location,
        radius: '5000',
        query: 'trail'
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            let place = results[i];
            createMarker(place);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

function sunsetFunction(response) {
    let lat = response.results[0].geometry.location.lat;
    let lng = response.results[0].geometry.location.lng;

    let currentTime = moment().format("YYYY-MM-DD");
    let sunsetURL = "https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lng + "&date=" + currentTime + "&formatted=0";

    let tomorrowTime = moment().add(1, "days").format("YYYY-MM-DD");
    let tomorrowSunsetURL = "https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lng + "&date=" + tomorrowTime + "&formatted=0";

    let tomorrowTomorrowTime = moment().add(2, "days").format("YYYY-MM-DD");
    let tomorrowTomorrowSunsetURL = "https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lng + "&date=" + tomorrowTomorrowTime + "&formatted=0";

    //ajax call for current day's sunset data
    $.ajax({
        url: sunsetURL,
        method: "GET"
    }).done(function (response) {

        $("#currentSunsetHead").text("Today's Sun Data");

        var currentSunrise = response.results.sunrise;
        currentSunriseFormatted = moment(currentSunrise).format("h:mm a");
        $("#currentSunsetBody").html("Sunrise: " + currentSunriseFormatted + "<br>");

        var currentSunset = response.results.sunset;
        currentSunsetFormatted = moment(currentSunset).format("h:mm a");
        $("#currentSunsetBody").append("Sunset: " + currentSunsetFormatted + "<br>");

        var currentNoon = response.results.solar_noon;
        currentNoonFormatted = moment(currentNoon).format("h:mm a");
        $("#currentSunsetBody").append("Solar noon: " + currentNoonFormatted + "<br>");

        var currentDaylength = moment(currentSunset).diff(currentSunrise, "hours");
        $("#currentSunsetBody").append("Day length: " + currentDaylength + " hours<br>");

    });

    //ajax call for tomorrow's sunset data
    $.ajax({
        url: tomorrowSunsetURL,
        method: "GET"
    }).done(function (response) {

        $("#tomorrowSunsetHead").text("Tomorrow's Sun Data");

        var tomorrowSunrise = response.results.sunrise;
        tomorrowSunriseFormatted = moment(tomorrowSunrise).format("h:mm a");
        $("#tomorrowSunsetBody").html("Sunrise: " + tomorrowSunriseFormatted + "<br>");

        var tomorrowSunset = response.results.sunset;
        tomorrowSunsetFormatted = moment(tomorrowSunset).format("h:mm a");
        $("#tomorrowSunsetBody").append("Sunset: " + tomorrowSunsetFormatted + "<br>");

        var tomorrowNoon = response.results.solar_noon;
        tomorrowNoonFormatted = moment(tomorrowNoon).format("h:mm a");
        $("#tomorrowSunsetBody").append("Solar noon: " + tomorrowNoonFormatted + "<br>");

        var tomorrowDaylength = moment(tomorrowSunset).diff(tomorrowSunrise, "hours");
        $("#tomorrowSunsetBody").append("Day length: " + tomorrowDaylength + " hours<br>");
    });

    $.ajax({
        url: tomorrowTomorrowSunsetURL,
        method: "GET"
    }).done(function (response) {

        $("#tomorrowTomorrowSunsetHead").text("The Next Day's Sun Data");

        var tomorrowTomorrowSunrise = response.results.sunrise;
        tomorrowTomorrowSunriseFormatted = moment(tomorrowTomorrowSunrise).format("h:mm a");
        $("#tomorrowTomorrowSunsetBody").html("Sunrise: " + tomorrowTomorrowSunriseFormatted + "<br>");

        var tomorrowTomorrowSunset = response.results.sunset;
        tomorrowTomorrowSunsetFormatted = moment(tomorrowTomorrowSunset).format("h:mm a");
        $("#tomorrowTomorrowSunsetBody").append("Sunset: " + tomorrowTomorrowSunsetFormatted + "<br>");

        var tomorrowTomorrowNoon = response.results.solar_noon;
        tomorrowTomorrowNoonFormatted = moment(tomorrowTomorrowNoon).format("h:mm a");
        $("#tomorrowTomorrowSunsetBody").append("Solar noon: " + tomorrowTomorrowNoonFormatted + "<br>");

        var tomorrowTomorrowDaylength = moment(tomorrowTomorrowSunset).diff(tomorrowTomorrowSunrise, "hours");
        $("#tomorrowTomorrowSunsetBody").append("Day length: " + tomorrowTomorrowDaylength + " hours<br>");

    });
}

// <<<<<<< HEAD
$(document).ready(function() {
    initMap(33.7489954,-84.3879824);
});
// =======
// $(document).ready(function () {
//     initMap(33.7489954, -84.3879824);
// })
// >>>>>>> origin/julie

//
// function hey(name) {
//     return function () {
//         console.log('Hey', name);
//     }
// }
//
// const showHey = hey('Gene');
// showHey();

//use callbacks

//nearby search request