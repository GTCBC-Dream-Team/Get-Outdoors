//input user location as string

//receive lat and long

//place lat and long into variable

//pass lat and long variable into google maps

// 'http://maps.googleapis.com/maps/api/geocode/json'

// function initMap() {
//     var map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 8,
//         center: {lat: 33.748995, lng: -84.387982}
//     });
//     var geocoder = new google.maps.Geocoder();
//
//     document.getElementById('submit').addEventListener('click', function() {
//         geocodeAddress(geocoder, map);
//     });
// }
//
// function geocodeAddress(geocoder, resultsMap) {
//     var address = document.getElementById('address').value;
//     geocoder.geocode({'address': address}, function(results, status) {
//         if (status === 'OK') {
//             resultsMap.setCenter(results[0].geometry.location);
//             var marker = new google.maps.Marker({
//                 map: resultsMap,
//                 position: results[0].geometry.location
//             });
//         } else {
//             alert('Geocode was not successful for the following reason: ' + status);
//         }
//     });
// }
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


// const mapURL = `https://maps.googleapis.com/maps/api/place/textsearch/output?key=${key}&location=${lat},${lng}&radius=500&keyword=${activity}
// `;

// let map;
// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: {lat: 33.7489954, lng: -84.3879824},
//         zoom: 10
//     });
// }


const key = "AIzaSyBWhgudH2tEdR71f3K0SmIUysNLNupoicI";
let lat;
let lng;

function myhelper(lat, lng) {

}

$("#submit").on("click", function() {
    event.preventDefault();
    let address = $("#search").val();
    const queryURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log(response.results[0].geometry.location.lat);
        console.log(response.results[0].geometry.location.lng);
        lat = response.results[0].geometry.location.lat;
        lng =response.results[0].geometry.location.lng;
        myhelper(lat, lng);
        initMap(lat, lng);
    })
});

// $("#submit2").on("click", function() {
//     event.preventDefault();
//   let activity = $("#textarea2").val().trim();
//    console.log(activity);
// });

var map;
var service;
var infowindow;

function initMap(lat, lng) {
    var location = new google.maps.LatLng(lat,lng);

    map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 15
    });

    var request = {
        location: location,
        radius: '500',
        query: 'restaurant'
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
