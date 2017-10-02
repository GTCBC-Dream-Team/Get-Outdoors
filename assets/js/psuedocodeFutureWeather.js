let currentTime = moment().format("YYYY-MM-DD");
let tomorrowTime = moment().add(1, "days").format("YYYY-MM-DD");
let tomorrowTomorrowTime = moment().add(2, "days").format("YYYY-MM-DD");

var APIkey = "d4cbbbed2b7e0999d4caf0c5d818ffe4";
var lat = 33.7401600;
var lng = -84.4203400;

const futureWeatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lng + "&APPID=" + APIkey;

var todayList = [];
var tomorrowList = [];
var tomorrowTomorrowList = [];

$.ajax({
    url: futureWeatherURL,
    method: "GET"
}).done(function(response){
    console.log(response);

    var weatherList = response.list;

    console.log(weatherList);

    for (var i = 0; i < weatherList.length; i++) {
        var weatherDay = weatherList[i].clouds.dt;
        weatherDay = moment(weatherDay).format("YYYY-MM-DD");
        if (weatherDay === currentTime){
            todayList.push(weatherList[i]);
        } else if (weatherDay === tomorrowTime){
            tomorrowList.push(weatherList[i]);
        } else if (weatherDay === tomorrowTomorrowTime){
            tomorrowTomorrowList.push(weatherList[i]);
        }
        console.log("Today:" + todayList);
        console.log("Tomorrow: " + tomorrowList);
        console.log("Tomorrow tomorrow: " + tomorrowTomorrowList);
    }
    //the previous code doesn't exactly work, so I'll be pseuodocoding from here

    //we will iterate through todayList, tomorrowList, and tomorrowTomorrowList, looking for weather states and sorting them into new weather state arrays by day still

    //var clearState = "Clear";
    //var rainState = "Rain";
    //var cloudState = "Clouds";

    //var todayClear = [];
    //var todayRain = [];
    //var todayClouds = [];

    //for (i = 0; i < todayList; i++) {
    //  var weatherState = response.list[i].weather.main
    //  if (weatherState === clearState) {
    //      todayClear.push(todayList[i]);
    //} else if (weatherState === rainState) {
    //      todayRain.push(todayList[i]);
    //} else if (weatherState === cloudState) {
    //      todayClouds.push(todayList[i]);
    //}
    //}

    //we'll repeat this process for the other days as well

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
});
