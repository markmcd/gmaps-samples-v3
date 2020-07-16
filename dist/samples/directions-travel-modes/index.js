// [START maps_directions_travel_modes]
function initMap() {
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const directionsService = new google.maps.DirectionsService();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: { lat: 37.77, lng: -122.447 }
  });
  directionsRenderer.setMap(map);
  calculateAndDisplayRoute(directionsService, directionsRenderer);
  document.getElementById("mode").addEventListener("change", function() {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  });
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  const selectedMode = document.getElementById("mode").value;
  directionsService.route(
    {
      origin: { lat: 37.77, lng: -122.447 },
      destination: { lat: 37.768, lng: -122.511 },
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      // @ts-ignore
      travelMode: google.maps.TravelMode[selectedMode]
    },
    function(response, status) {
      if (status == "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}
// [END maps_directions_travel_modes]
export { initMap, calculateAndDisplayRoute };
