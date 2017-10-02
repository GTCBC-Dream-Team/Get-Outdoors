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
            $.ajax({
                url: currentWeatherURL,
                method: "GET",
                success: sunsetFunction(response)
            }).done(function (response) {
                console.log(response);
                
                //shows current weather state
                var currentWeatherState = response.weather[0].main;
                console.log("current weather state: " + currentWeatherState);
                $("#currentWeatherHead").html("Today's Weather");
                $("#currentWeatherBody").html(currentWeatherState + "<br>");
                
                //shows current temperature
                var tempKelvin = response.main.temp;
                var tempFahrenheit = (tempKelvin * 9 / 5) - 459.67;
                tempFahrenheit = Number(Math.round(tempFahrenheit + 'e1') + 'e-1');
                console.log("current temperature: " + tempFahrenheit + "F");
                $("#currentWeatherBody").append("Current: " + tempFahrenheit + "<br>");
                
                //shows today's min temperature
                var minKelvin = response.main.temp_min;
                var minFahrenheit = (minKelvin * 9 / 5) - 459.67;
                minFahrenheit = Number(Math.round(minFahrenheit + 'e1') + 'e-1');
                console.log("min temperature: " + minFahrenheit + "F");
                $("#currentWeatherBody").append("Min: " + minFahrenheit + "<br>");
                
                //shows today's max temperature
                var maxKelvin = response.main.temp_max;
                var maxFahrenheit = (maxKelvin - 273.15) * 1.8000;
                maxFahrenheit = Number(Math.round(maxFahrenheit + 'e1') + 'e-1');
                console.log("max temperature: " + maxFahrenheit + "F");
                $("#currentWeatherBody").append("Max: " + maxFahrenheit + "<br>");
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

function sunsetFunction(response) {
    let lat = response.results[0].geometry.location.lat;
    let lng = response.results[0].geometry.location.lng;
    let sunsetURL = "https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lng;
    let currentTime = moment();
    $.ajax({
        url: sunsetURL,
        method: "GET",
        success: futureWeather(response)
    }).done(function (response) {
        console.log(response);
        
        $("#currentSunsetHead").text("Today's Sun Data");
        
        var currentSunrise = response.results.sunrise;
        console.log("Sunrise: " + currentSunrise);
        
        var currentSunset = response.sunset;
        console.log("Sunset: " + currentSunset);
        
        var currentNoon = response.results.solar_noon;
        console.log("Solar noon: " + currentNoon);
        
        var currentDaylength = response.results.day_length;
        console.log("Day length: " + currentDaylength);
        
        var nextDay = currentTime.day(0);
        console.log("Next Day: " + nextDay.format("dddd"));
    });
}

function futureWeather(response) {
    
    const APIkey = "d4cbbbed2b7e0999d4caf0c5d818ffe4";
    let lat = 33.7401600;
    let lng = -84.4203400;
    const futureWeatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lng + "&APPID=" + APIkey;
    
    let todayList = [];
    var tomorrowList = [];
    var tomorrowTomorrowList = [];
    
    $.ajax({
        url: futureWeatherURL,
        method: "GET"
    }).done(function (response) {
        console.log(response);
        let currentTime = moment().format("YYYY-MM-DD");
        console.log(currentTime + "current time");
        let tomorrowTime = moment().add(1, "days").format("YYYY-MM-DD");
        console.log(tomorrowTime + "tomorrow time");
        let tomorrowTomorrowTime = moment().add(2, "days").format("YYYY-MM-DD");
        console.log(tomorrowTomorrowTime + "tomorrow Tomorrow time");
    
        var weatherList = response.list;
    
        console.log(weatherList);
    
        for (var i = 0; i < weatherList.length; i++) {
            var weatherDay = weatherList[i].dt_txt;
            weatherDay = moment(weatherDay).format("YYYY-MM-DD");
            console.log(weatherDay);
            if (weatherDay === currentTime) {
                todayList.push(weatherList[i]);
                console.log("todayList");
            } else if (weatherDay === tomorrowTime) {
                tomorrowList.push(weatherList[i]);
                console.log("tomorrowList");
            } else if (weatherDay === tomorrowTomorrowTime) {
                tomorrowTomorrowList.push(weatherList[i]);
                console.log("tomorrowTomorrowList");
            }
            console.log( todayList);
            console.log(tomorrowList);
            console.log(tomorrowTomorrowList);
        }
    })
}

// function activity() {
//     $("#submit2").on("click", function () {
//         event.preventDefault();
//         let activity = $("#textarea2").val().trim();
//         console.log(activity);
//     });
// }


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

$(document).ready(function () {
    initMap(33.7489954, -84.3879824);
});

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