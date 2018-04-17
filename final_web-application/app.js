
$(document).on('click', 'input', function () {
    $("#login").show();
    $("#back-link").show();
  })

// token javascript sdk key 5a584131ea917ba9b748c21c40a7ca0c1250dfab

_500px.init({
  sdk_key: '5a584131ea917ba9b748c21c40a7ca0c1250dfab'
});

$('#login').click(function() {
	_500px.login();
});

// When a successful login to 500px is made, they fire off the 'authorization_obtained' event
_500px.on('authorization_obtained', function() {
  // Successful OAuth login!

  // hide .sign-in-view
  $('.sign-in-view').hide ()
      // show .image-results-view
	  $('.image-results-view').show()
    var searchOptions = {
        term: 'Smokey Eye', // We only want makeup photos
        only: "Fashion",
        sort: "highest_rating",
        image_size: 3 // This isn't neccessary but by default the images are thumbnail sized
      };

    _500px.api('/photos/search', searchOptions, function(response) {
        if (response.data.photos.length === 0) {
          alert('No photos found!');
       } else {
        // Handle the successful response here
        /// iterate over photos
        response.data.photos.forEach(function (photo){
          console.log(photo)
          var img = '<img class="image" src = '+photo.image_url[0]+' >'
          $('.images').append(img)
        })
      }
    });
})

$(document).on('click', '.image', function () {
  $('.image').hide()
  $(this).show()
  navigator.geolocation.getCurrentPosition(handleResponse)
})

navigator.geolocation.getCurrentPosition(handleResponse)

function handleResponse(position) {
  console.log(position)
  buildMap(position.coords.latitude, position.coords.longitude)
}
var map 

function buildMap(latitude, longitude) {
  $("#map").show();
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: latitude,
      lng: longitude,
    },
    zoom: 12
  });

  renderStoreMarkers(stores)
}

var stores = [
  {
    lat: 40.7408075,
    lng: -74.059671,
    name: 'MAC Flatiron'
  },
  {
    lat: 40.7502896,
    lng: -74.0583538,
    name: 'MAC Macys'
  },
  {
    lat: 40.7346589,
    lng: -74.0610496,
    name:'MAC Broadway'
  },
  {
    lat: 40.7341788,
    lng: -74.0745633,
    name: 'MAC Bleecker'
  },
  {
    lat: 40.7580302,
    lng: -74.0548835,
    name: 'MAC Times Square'
  },
  {
    lat: 40.758032,
    lng: -74.0470352,
    name:'MAC 5th Ave'
  },
]

function renderStoreMarkers(stores) {
  stores.forEach(function(store) {
    console.log(store)

    var marker = new google.maps.Marker({
      position: {
        lat: store.lat,
        lng: store.lng,
      },
      map: map,
      title: store.name
    });
  })
}



