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

        let currentSunrise = response.results.sunrise;
        currentSunriseFormatted = moment(currentSunrise).format("h:mm a");
        $("#currentSunsetBody").html("Sunrise: " + currentSunriseFormatted + "<br>");

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
        $("#tomorrowSunsetBody").html("Sunrise: " + tomorrowSunriseFormatted + "<br>");

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
        $("#tomorrowTomorrowSunsetBody").html("Sunrise: " + tomorrowTomorrowSunriseFormatted + "<br>");

        let tomorrowTomorrowSunset = response.results.sunset;
        tomorrowTomorrowSunsetFormatted = moment(tomorrowTomorrowSunset).format("h:mm a");
        $("#tomorrowTomorrowSunsetBody").append("Sunset: " + tomorrowTomorrowSunsetFormatted + "<br>");

        let tomorrowTomorrowNoon = response.results.solar_noon;
        tomorrowTomorrowNoonFormatted = moment(tomorrowTomorrowNoon).format("h:mm a");
        $("#tomorrowTomorrowSunsetBody").append("Solar noon: " + tomorrowTomorrowNoonFormatted + "<br>");

        let tomorrowTomorrowDaylength = moment(tomorrowTomorrowSunset).diff(tomorrowTomorrowSunrise, "hours");
        $("#tomorrowTomorrowSunsetBody").append("Day length: " + tomorrowTomorrowDaylength + " hours<br>");

    });
}

function futureWeather(response) {
    
    const APIkey = "d4cbbbed2b7e0999d4caf0c5d818ffe4";
    let lat = response.results[0].geometry.location.lat;
    let lng = response.results[0].geometry.location.lng;
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
        
        //we also want to get the average high and low temperatures for the day
        //so we'll iterate through each day's list, add the max temps, add the min temps, and divide each temp by the array length
        
        //var todayMaxTemp = 0;
        //var todayMinTemp = 0;
        //var tomorrowMaxTemp = 0;
        //var tomorrowMinTemp = 0;
        //var tomorrowTomorrowMaxTemp = 0;
        //var tomorrowTomorrowMinTemp = 0;
        
        //for (i = 0; i < todayList.length; i++) {
        //  todayThisMax = response.todayList[i].main.temp_max;
        //  todayThisMin = response.todayList[i].main.temp_min;
        //  todayMaxTemp = todayMaxTemp + todayThisMax;
        //  todayMinTemp = todayMinTemp + todayThisMin;
        //}
        //todayMaxTemp = (todayMaxTemp)/(todayList.length)
        //todayMinTemp = (todayMinTemp)/(todaylist.length)
        
        //we'll repeat this process for the other two days
        //I realized after typing this, that it might be better to grab the overall highest temp for max and overall highest temp for min...but I'm choosing to ignore that.
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