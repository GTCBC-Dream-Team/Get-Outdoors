//input user location as string

//receive lat and long

//place lat and long into variable

//pass lat and long variable into google maps

    // initMap(33.7489954, -84.3879824);

$("#download-button").on("click",function(){
    $("#search").focus();
});


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
    if ($("#search").val() != "") {
        $("#download-button").text("NEW LOCATION");
        let address = $("#search").val();
        const queryURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`;
        $(".slider").css("display", "block");
        $(".section").css("display", "block");
        $("#map").css("display", "block");
        document.getElementById("icons").scrollIntoView();
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
                    $("#currentWeatherBody").html("Today:<br><br>" + currentWeatherState + "<br>");

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
    }
});

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
        method: "GET",
        success: futureWeather(response)
    }).done(function (response) {
        console.log(response);
        
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
        console.log(response);
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
        console.log(response);

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
    $("#search").val("");
}

function futureWeather(response) {
    
    const APIkey = "d4cbbbed2b7e0999d4caf0c5d818ffe4";
    let lat = response.results[0].geometry.location.lat;
    let lng = response.results[0].geometry.location.lng;
    const futureWeatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lng + "&APPID=" + APIkey;
    
    let todayList = [];
    let tomorrowList = [];
    let tomorrowTomorrowList = [];
    
    $.ajax({
        url: futureWeatherURL,
        method: "GET"
    }).done(function (response) {
        console.log(response);
        let momentOffset = moment();
        console.log(momentOffset);
        let currentTime = moment().format("YYYY-MM-DD");
        console.log(currentTime + "current time");
        let tomorrowTime = moment().add(1, "days").format("YYYY-MM-DD");
        console.log(tomorrowTime + "tomorrow time");
        let tomorrowTomorrowTime = moment().add(2, "days").format("YYYY-MM-DD");
        console.log(tomorrowTomorrowTime + "tomorrow Tomorrow time");
        
        let weatherList = response.list;
        
        console.log(weatherList);
        
        for (let i = 0; i < weatherList.length; i++) {
            let weatherDay = weatherList[i].dt_txt;
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
            console.log(todayList);
            console.log(tomorrowList);
            console.log(tomorrowTomorrowList);
        }
        //we will iterate through todayList, tomorrowList, and tomorrowTomorrowList, looking for weather states and sorting them into new weather state arrays by day still
        
        var clearState = "Clear";
        var rainState = "Rain";
        var cloudState = "Clouds";
        
        var todayClear = [];
        var todayRain = [];
        var todayClouds = [];
        
        console.log("outside the todayList loop");
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
        console.log(todayClear);
        console.log(todayRain);
        console.log(todayClouds);
        
        //we'll repeat this process for the other days as well
        var tomorrowClear = [];
        var tomorrowRain = [];
        var tomorrowClouds = [];

        console.log("outside the tomorrowList loop");
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
        console.log(tomorrowClear);
        console.log(tomorrowRain);
        console.log(tomorrowClouds);
        
        //tomorrowTomorrowList
        var tomorrowTomorrowClear = [];
        var tomorrowTomorrowRain = [];
        var tomorrowTomorrowClouds = [];

        console.log("outside the tomorrowTomorrowList loop");
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
        console.log(tomorrowTomorrowClear);
        console.log(tomorrowTomorrowRain);
        console.log(tomorrowTomorrowClouds);

        //then we'll check the length of each weather state array and declare the longest array as the day's forecast
        //I haven't figured out what to do if they're the same yet
        
        if (todayClear.length > todayRain.length && todayClear.length > todayClouds.length) {
            console.log("the average weather is clear");
        }
        else if (todayRain.length > todayClear && todayRain.length > todayClouds.length) {
            console.log("the average weather is rainy");
        }
        else {
            console.log("the average weather is cloudy");
        }

        //tomorrowList
        if (tomorrowClear.length > tomorrowRain.length && tomorrowClear.length > tomorrowClouds.length) {
            console.log("the average weather is clear");
            $("#tomorrowWeatherBody").html("Tomorrow:<br><br>Clear<br>");
        }
        else if (tomorrowRain.length > tomorrowClear && tomorrowRain.length > tomorrowClouds.length) {
            console.log("the average weather is rainy");
            $("#tomorrowWeatherBody").html("Tomorrow:<br><br>Rain<br>");
        }
        else {
            console.log("the average weather is cloudy");
            $("#tomorrowWeatherBody").html("Tomorrow:<br><br>Clouds<br>");
        }

        //tomorrowTomorrowList
        if (tomorrowTomorrowClear.length > tomorrowTomorrowRain.length && tomorrowTomorrowClear.length > tomorrowTomorrowClouds.length) {
            console.log("the average weather is clear");
            $("#tomorrowTomorrowWeatherBody").html("The Next Day:<br><br>Clear<br>");
        }
        else if (tomorrowTomorrowRain.length > tomorrowTomorrowClear && tomorrowTomorrowRain.length > tomorrowTomorrowClouds.length) {
            console.log("the average weather is rainy");
            $("#tomorrowTomorrowWeatherBody").html("The Next Day:<br><br>Rain<br>");
        }
        else {
            console.log("the average weather is cloudy");
            $("#tomorrowTomorrowWeatherBody").html("The Next Day:<br><br>Clouds<br>");
        }

        //we also want to get the average high and low temperatures for the day
        //so we'll iterate through each day's list, add the max temps, add the min temps, and divide each temp by the array length
        
        let todayMaxTemp = 0;
        let todayMinTemp = 0;
        
        for (let i = 0; i < todayList.length; i++) {
            todayMaxTemp += todayList[i].main.temp_max;
            todayMinTemp += todayList[i].main.temp_min;
            if ( (i + 1) === todayList.length) {
                todayMaxTemp /= todayList.length;
                let todayMaxF = (todayMaxTemp - 273.15) * 1.80 + 32;
                console.log(todayMaxF);
                todayMinTemp /= todayList.length;
                let todayMinF = (todayMinTemp - 273.15) * 1.80 + 32;
                console.log(todayMinF);
            }
        }

        let tomorrowMaxTemp = 0;
        // let tomorrowMinTemp = 0;

        for (let i = 0; i < tomorrowList.length; i++) {
            tomorrowMaxTemp += tomorrowList[i].main.temp_max;
            // tomorrowMinTemp += tomorrowList[i].main.temp_min;
            if ( (i + 1) === tomorrowList.length) {
                tomorrowMaxTemp /= tomorrowList.length;
                let tomorrowMaxF = (tomorrowMaxTemp - 273.15) * 1.80 + 32;
                tomorrowMaxF = Number(Math.round(tomorrowMaxF+'e1')+'e-1');
                console.log(tomorrowMaxF);
                $("#tomorrowWeatherBody").append("Average Temp: " + tomorrowMaxF + "F<br>");
                // tomorrowMinTemp /= tomorrowList.length;
                // let tomorrowMinF = (tomorrowMaxTemp - 273.15) * 1.80 + 32;
                // tomorrowMinF = Number(Math.round(tomorrowMinF+'e1')+'e-1');
                // console.log(tomorrowMinF);
                // $("#tomorrowWeatherBody").append("Min: " + tomorrowMinF + "F<br>")
            }
        }
        
        let tomorrowTomorrowMaxTemp = 0;
        // let tomorrowTomorrowMinTemp = 0;

        for (let i = 0; i < tomorrowTomorrowList.length; i++) {
            tomorrowTomorrowMaxTemp += tomorrowTomorrowList[i].main.temp_max;
            // tomorrowTomorrowMinTemp += tomorrowTomorrowList[i].main.temp_min;
            if ( (i + 1) === tomorrowTomorrowList.length) {
                tomorrowTomorrowMaxTemp /= tomorrowTomorrowList.length;
                let tomorrowTomorrowMaxF = (tomorrowTomorrowMaxTemp - 273.15) * 1.80 + 32;
                tomorrowTomorrowMaxF = Number(Math.round(tomorrowTomorrowMaxF+'e1')+'e-1');
                console.log(tomorrowTomorrowMaxF);
                $("#tomorrowTomorrowWeatherBody").append("Average Temp: " + tomorrowTomorrowMaxF + "F<br>");
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