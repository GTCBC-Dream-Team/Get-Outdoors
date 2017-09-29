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

