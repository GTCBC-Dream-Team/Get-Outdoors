
$.ajax({
    url:"https://gtproxy2.herokuapp.com/api/metaweather/location/search/?query=san",
    method: "GET"
}).done(function(response){
    console.log(response);
});