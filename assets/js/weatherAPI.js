
$.ajax({
    url:"https://www.metaweather.com/api/location/search/?lattlong=36.96,-122.02",
    method: "GET"
}).done(function(response){
    console.log(response);
});