//input user location as string

//receive lat and long

//place lat and long into variable

//pass lat and long variable into google maps

// 'http://maps.googleapis.com/maps/api/geocode/json'

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