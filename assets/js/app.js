//input user location as string

//receive lat and long

//place lat and long into variable

//pass lat and long variable into google maps

    // initMap(33.7489954, -84.3879824);

//on click on large oragne button, focus mouse on location input
$("#download-button").on("click",function(){
    $("#search").focus();
});

//on document ready, carousel slide, modals, and buttons collapse functions defined in materialize are called.
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

//API keys for google maps ajax calls
const APIkey = "d4cbbbed2b7e0999d4caf0c5d818ffe4";

const key = "AIzaSyBWhgudH2tEdR71f3K0SmIUysNLNupoicI";

function myhelper(lat, lng) {

}

//on click, checks location input for not empty, focuses on slider, reveals hidden divs, and calls google maps api
$("#submit").on("click", function () {
    event.preventDefault();
    if ($("#search").val() != "") {
        //changes button text of GET STARTED to NEW LOCATION
        $("#download-button").text("NEW LOCATION");
        let address = $("#search").val();
        const queryURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`;
        //displays hidden divs
        $(".slider").css("display", "block");
        $("#icons").css("display", "block");
        $("#map").css("display", "block");
        $(".hiddenHead").css("display","block");
        document.getElementById("icons").scrollIntoView();
        $.ajax({
            url: queryURL,
            method: "GET",
            success: function (response) {
                let lat = response.results[0].geometry.location.lat;
                let lng = response.results[0].geometry.location.lng;
                //calls open weather api using lat and lng from google maps api
                const currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&APPID=" + APIkey;
                $.ajax({
                    url: currentWeatherURL,
                    method: "GET",
                    success: sunsetFunction(response)
                }).done(function (response) {

                    //shows current weather state
                    var currentWeatherState = response.weather[0].main;
                    $("#currentWeatherHead").html("Today's Weather");
                    $("#currentWeatherBody").html("Today:<br><br>" + currentWeatherState + "<br>");

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
                    var maxFahrenheit = (maxKelvin * 9 / 5) - 459.67;
                    maxFahrenheit = Number(Math.round(maxFahrenheit + 'e1') + 'e-1');
                    $("#currentWeatherBody").append("Max: " + maxFahrenheit + " F<br>");
                });
            }
        }).done(function (response) {
            let lat = response.results[0].geometry.location.lat;
            let lng = response.results[0].geometry.location.lng;
            myhelper(lat, lng);
            initMap(lat, lng);
        })
    }
});

//grabs sunrise/sunset information from sunrise sunset api and displays on the page
function sunsetFunction(response) {
    let lat = response.results[0].geometry.location.lat;
    let lng = response.results[0].geometry.location.lng;

    //current time and current day url for api call
    let currentTime = moment().format("YYYY-MM-DD");
    let sunsetURL = "https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lng + "&date=" + currentTime + "&formatted=0";

    //next day and next day url for api call
    let tomorrowTime = moment().add(1, "days").format("YYYY-MM-DD");
    let tomorrowSunsetURL = "https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lng + "&date=" + tomorrowTime + "&formatted=0";

    //next next day and next next day url for api call
    let tomorrowTomorrowTime = moment().add(2, "days").format("YYYY-MM-DD");
    let tomorrowTomorrowSunsetURL = "https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lng + "&date=" + tomorrowTomorrowTime + "&formatted=0";

    //ajax call for current day's sunset data
    $.ajax({
        url: sunsetURL,
        method: "GET",
        success: futureWeather(response)
    }).done(function (response) {
        
        $("#currentSunsetHead").text("Today's Sun Data");
        
        let currentSunrise = response.results.sunrise;
        currentSunriseFormatted = moment(currentSunrise).format("h:mm a");
        $("#currentSunsetBody").html("Today:<br><br>Sunrise: " + currentSunriseFormatted + "<br>");

        let currentSunset = response.results.sunset;
        currentSunsetFormatted = moment(currentSunset).format("h:mm a");
        $("#currentSunsetBody").append("Sunset: " + currentSunsetFormatted + "<br>");

        let currentNoon = response.results.solar_noon;
        currentNoonFormatted = moment(currentNoon).format("h:mm a");
        $("#currentSunsetBody").append("Solar noon: " + currentNoonFormatted + "<br>");

        let currentDaylength = moment(currentSunset).diff(currentSunrise, "hours");
        $("#currentSunsetBody").append("Day length: " + currentDaylength + " hours<br>");

    });
    //ajax call for tomorrow's sunset data
    $.ajax({
        url: tomorrowSunsetURL,
        method: "GET"
    }).done(function (response) {
        $("#tomorrowSunsetHead").text("Tomorrow's Sun Data");

        let tomorrowSunrise = response.results.sunrise;
        tomorrowSunriseFormatted = moment(tomorrowSunrise).format("h:mm a");
        $("#tomorrowSunsetBody").html("Tomorrow:<br><br>Sunrise: " + tomorrowSunriseFormatted + "<br>");

        let tomorrowSunset = response.results.sunset;
        tomorrowSunsetFormatted = moment(tomorrowSunset).format("h:mm a");
        $("#tomorrowSunsetBody").append("Sunset: " + tomorrowSunsetFormatted + "<br>");

        let tomorrowNoon = response.results.solar_noon;
        tomorrowNoonFormatted = moment(tomorrowNoon).format("h:mm a");
        $("#tomorrowSunsetBody").append("Solar noon: " + tomorrowNoonFormatted + "<br>");

        let tomorrowDaylength = moment(tomorrowSunset).diff(tomorrowSunrise, "hours");
        $("#tomorrowSunsetBody").append("Day length: " + tomorrowDaylength + " hours<br>");
    });

    //tomorrow tomorrow ajax call
    $.ajax({
        url: tomorrowTomorrowSunsetURL,
        method: "GET"
    }).done(function (response) {

        $("#tomorrowTomorrowSunsetHead").text("The Next Day's Sun Data");

        let tomorrowTomorrowSunrise = response.results.sunrise;
        tomorrowTomorrowSunriseFormatted = moment(tomorrowTomorrowSunrise).format("h:mm a");
        $("#tomorrowTomorrowSunsetBody").html("The Next Day:<br><br>Sunrise: " + tomorrowTomorrowSunriseFormatted + "<br>");

        let tomorrowTomorrowSunset = response.results.sunset;
        tomorrowTomorrowSunsetFormatted = moment(tomorrowTomorrowSunset).format("h:mm a");
        $("#tomorrowTomorrowSunsetBody").append("Sunset: " + tomorrowTomorrowSunsetFormatted + "<br>");

        let tomorrowTomorrowNoon = response.results.solar_noon;
        tomorrowTomorrowNoonFormatted = moment(tomorrowTomorrowNoon).format("h:mm a");
        $("#tomorrowTomorrowSunsetBody").append("Solar noon: " + tomorrowTomorrowNoonFormatted + "<br>");

        let tomorrowTomorrowDaylength = moment(tomorrowTomorrowSunset).diff(tomorrowTomorrowSunrise, "hours");
        $("#tomorrowTomorrowSunsetBody").append("Day length: " + tomorrowTomorrowDaylength + " hours<br>");

    });
    //empties location search input
    $("#search").val("");
}

//ajax call to open weather forecast api
function futureWeather(response) {
    
    const APIkey = "d4cbbbed2b7e0999d4caf0c5d818ffe4";
    let lat = response.results[0].geometry.location.lat;
    let lng = response.results[0].geometry.location.lng;
    const futureWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lng + "&APPID=" + APIkey;
    
    let todayList = [];
    let tomorrowList = [];
    let tomorrowTomorrowList = [];
    
    $.ajax({
        url: futureWeatherURL,
        method: "GET"
    }).done(function (response) {

        //variables for today, tomorrow, and the next day's time
        let momentOffset = moment();
        let currentTime = moment().format("YYYY-MM-DD");
        let tomorrowTime = moment().add(1, "days").format("YYYY-MM-DD");
        let tomorrowTomorrowTime = moment().add(2, "days").format("YYYY-MM-DD");
        
        let weatherList = response.list;

        //pushes weather items into arrays based on which day they fall into
        for (let i = 0; i < weatherList.length; i++) {
            let weatherDay = weatherList[i].dt_txt;
            weatherDay = moment(weatherDay).format("YYYY-MM-DD");
            if (weatherDay === currentTime) {
                todayList.push(weatherList[i]);
            } else if (weatherDay === tomorrowTime) {
                tomorrowList.push(weatherList[i]);
            } else if (weatherDay === tomorrowTomorrowTime) {
                tomorrowTomorrowList.push(weatherList[i]);
            }
        }

        
        var clearState = "Clear";
        var rainState = "Rain";
        var cloudState = "Clouds";
        
        var todayClear = [];
        var todayRain = [];
        var todayClouds = [];

        //sorts today's array by weather state
        for (i = 0; i < todayList.length; i++) {
            var weatherState = todayList[i].weather[0].main;
            
            if (weatherState === clearState) {
                todayClear.push(todayList[i]);
            } else if (weatherState === rainState) {
                todayRain.push(todayList[i]);
            } else if (weatherState === cloudState) {
                todayClouds.push(todayList[i]);
            }
        }

        //we'll repeat this process for the other days as well
        var tomorrowClear = [];
        var tomorrowRain = [];
        var tomorrowClouds = [];

        //sorts tomorrow's array by weather state
        for (i = 0; i < tomorrowList.length; i++) {
            weatherState = tomorrowList[i].weather[0].main;
            
            if (weatherState === clearState) {
                tomorrowClear.push(tomorrowList[i]);
            } else if (weatherState === rainState) {
                tomorrowRain.push(tomorrowList[i]);
            } else if (weatherState === cloudState) {
                tomorrowClouds.push(tomorrowList[i]);
            }
        }
        
        //tomorrowTomorrowList
        var tomorrowTomorrowClear = [];
        var tomorrowTomorrowRain = [];
        var tomorrowTomorrowClouds = [];

        //sorts tomorrow tomorrow's array by weather state
        for (i = 0; i < tomorrowTomorrowList.length; i++) {
            weatherState = tomorrowTomorrowList[i].weather[0].main;
            
            if (weatherState === clearState) {
                tomorrowTomorrowClear.push(tomorrowTomorrowList[i]);
            } else if (weatherState === rainState) {
                tomorrowTomorrowRain.push(tomorrowTomorrowList[i]);
            } else if (weatherState === cloudState) {
                tomorrowTomorrowClouds.push(tomorrowTomorrowList[i]);
            }
        }

        //then we'll check the length of each weather state array and declare the longest array as the day's forecast
        //I haven't figured out what to do if they're the same yet

        //checks to see which weather state is most common today for display in a later update
        if (todayClear.length > todayRain.length && todayClear.length > todayClouds.length) {
        }
        else if (todayRain.length > todayClear && todayRain.length > todayClouds.length) {
        }
        else {
        }

        //checks to see which weather state is most common tomorrow
        if (tomorrowClear.length > tomorrowRain.length && tomorrowClear.length > tomorrowClouds.length) {
            $("#tomorrowWeatherBody").html("Tomorrow:<br><br>Clear<br>");
        }
        else if (tomorrowRain.length > tomorrowClear && tomorrowRain.length > tomorrowClouds.length) {
            $("#tomorrowWeatherBody").html("Tomorrow:<br><br>Rain<br>");
        }
        else {
            $("#tomorrowWeatherBody").html("Tomorrow:<br><br>Clouds<br>");
        }

        //checks to see which weather state is most common tomorrow tomorrow
        if (tomorrowTomorrowClear.length > tomorrowTomorrowRain.length && tomorrowTomorrowClear.length > tomorrowTomorrowClouds.length) {
            $("#tomorrowTomorrowWeatherBody").html("The Next Day:<br><br>Clear<br>");
        }
        else if (tomorrowTomorrowRain.length > tomorrowTomorrowClear && tomorrowTomorrowRain.length > tomorrowTomorrowClouds.length) {
            $("#tomorrowTomorrowWeatherBody").html("The Next Day:<br><br>Rain<br>");
        }
        else {
            $("#tomorrowTomorrowWeatherBody").html("The Next Day:<br><br>Clouds<br>");
        }

        
        let todayMaxTemp = 0;
        let todayMinTemp = 0;

        //calculates the average max and min temperatures for today to be used in a later update
        for (let i = 0; i < todayList.length; i++) {
            todayMaxTemp += todayList[i].main.temp_max;
            todayMinTemp += todayList[i].main.temp_min;
            if ( (i + 1) === todayList.length) {
                todayMaxTemp /= todayList.length;
                let todayMaxF = (todayMaxTemp - 273.15) * 1.80 + 32;
                todayMinTemp /= todayList.length;
                let todayMinF = (todayMinTemp - 273.15) * 1.80 + 32;
            }
        }

        let tomorrowMaxTemp = 0;
        // let tomorrowMinTemp = 0;

        //calculates tomorrow's max and min states for a later update, currently uses the average max temp for the average overall
        for (let i = 0; i < tomorrowList.length; i++) {
            tomorrowMaxTemp += tomorrowList[i].main.temp_max;
            // tomorrowMinTemp += tomorrowList[i].main.temp_min;
            if ( (i + 1) === tomorrowList.length) {
                tomorrowMaxTemp /= tomorrowList.length;
                let tomorrowMaxF = (tomorrowMaxTemp - 273.15) * 1.80 + 32;
                tomorrowMaxF = Number(Math.round(tomorrowMaxF+'e1')+'e-1');
                $("#tomorrowWeatherBody").append("Average Temp: " + tomorrowMaxF + " F<br>");
                // tomorrowMinTemp /= tomorrowList.length;
                // let tomorrowMinF = (tomorrowMaxTemp - 273.15) * 1.80 + 32;
                // tomorrowMinF = Number(Math.round(tomorrowMinF+'e1')+'e-1');
                // console.log(tomorrowMinF);
                // $("#tomorrowWeatherBody").append("Min: " + tomorrowMinF + "F<br>")
            }
        }
        
        let tomorrowTomorrowMaxTemp = 0;
        // let tomorrowTomorrowMinTemp = 0;

        //calculates tomorrow tomorrow's max and min states for a later update, currently uses the average max temp for the average overall
        for (let i = 0; i < tomorrowTomorrowList.length; i++) {
            tomorrowTomorrowMaxTemp += tomorrowTomorrowList[i].main.temp_max;
            // tomorrowTomorrowMinTemp += tomorrowTomorrowList[i].main.temp_min;
            if ( (i + 1) === tomorrowTomorrowList.length) {
                tomorrowTomorrowMaxTemp /= tomorrowTomorrowList.length;
                let tomorrowTomorrowMaxF = (tomorrowTomorrowMaxTemp - 273.15) * 1.80 + 32;
                tomorrowTomorrowMaxF = Number(Math.round(tomorrowTomorrowMaxF+'e1')+'e-1');
                $("#tomorrowTomorrowWeatherBody").append("Average Temp: " + tomorrowTomorrowMaxF + " F<br>");
                // tomorrowTomorrowMinTemp /= tomorrowTomorrowList.length;
                // let tomorrowTomorrowMinF = (tomorrowTomorrowMinTemp - 273.15) * 1.80 + 32;
                // tomorrowTomorrowMinF = Number(Math.round(tomorrowTomorrowMinF+'e1')+'e-1');
                // console.log(tomorrowTomorrowMinF);
                // $("#tomorrowTomorrowWeatherBody").append("Min: " + tomorrowTomorrowMinF + "F<br>");
            }
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

//zooms on google map based on location input, shows places data for "trail"
function initMap(lat, lng) {
    let location = new google.maps.LatLng(lat, lng);
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 12
    });
    let request = {
        location: location,
        radius: '5000',
        query: 'trail'
    };
    
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
}

//function for google places
function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            let place = results[i];
            createMarker(place);
        }
    }
}

//fucntions for google places
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