var locationName = "36.176346,-95.938979";
$.ajax({
    url:"https://gtproxy2.herokuapp.com/api/metaweather/location/search/?lattlong=" + locationName,
    method: "GET"
}).done(function(response){
    console.log(locationName);
    console.log(response);
});