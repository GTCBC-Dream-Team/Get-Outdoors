//input user location as string

//receive lat and long

//place lat and long into variable

//pass lat and long variable into google maps

// 'http://maps.googleapis.com/maps/api/geocode/json'

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: 33.748995, lng: -84.387982}
    });
    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function() {
        geocodeAddress(geocoder, map);
    });
}

function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
$(document).ready(function(){
    // Init Carousel
    $('.carousel').carousel();

    // Init Carousel Slider
    $('.carousel.carousel-slider').carousel({fullWidth:true});

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

$("#submit").on("click", function() {
    let address = $("#address").val();
    const queryURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log(response.results[0].geometry.location.lat);
        console.log(response.results[0].geometry.location.lng);
    })
});


//use callbacks

//nearby search request

// let map;
// let service;
// let infowindow;
//
// function initialize() {
//     var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
//
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: pyrmont,
//         zoom: 15
//     });
//
//     var request = {
//         location: pyrmont,
//         radius: '500',
//         type: ['restaurant']
//     };
//
//     service = new google.maps.places.PlacesService(map);
//     service.nearbySearch(request, callback);
// }
//
// function callback(results, status) {
//     if (status == google.maps.places.PlacesServiceStatus.OK) {
//         for (var i = 0; i < results.length; i++) {
//             var place = results[i];
//             createMarker(results[i]);
//         }
//     }
// }