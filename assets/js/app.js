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

const key = "AIzaSyBWhgudH2tEdR71f3K0SmIUysNLNupoicI";

function myhelper(lat, lng) {

}

$("#submit").on("click", function () {
    event.preventDefault();
    let address = $("#search").val();
    const queryURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`;
    $.ajax({
        url: queryURL,
        method: "GET"
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

var map;
var service;
var infowindow;

function initMap(lat, lng) {
    var location = new google.maps.LatLng(lat, lng);
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 15
    });
    
    var request = {
        location: location,
        radius: '5000',
        query: activity()
    };
    
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
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
