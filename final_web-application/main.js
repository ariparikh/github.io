navigator.geolocation.getCurrentPosition(handleResponse)

function handleResponse(position) {
  console.log(position)
  buildMap(position.coords.latitude, position.coords.longitude)
}

function buildMap(latitude, longitude) {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: latitude,
      lng: longitude,
    },
    zoom: 12
  });
  var marker = new google.maps.Marker({
  position: {
      lat: latitude,
      lng: longitude,
  },
  map: map,
  title: 'My Location'
  });
}
 

		 	 