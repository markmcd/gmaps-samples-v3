// [START maps_landing_page_visualize_data]
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center: { lat: -33.865427, lng: 151.196123 },
    mapTypeId: "terrain",
    zoomControl: false,
    scaleControl: false,
    streetViewControl: false,
    gestureHandling: "cooperative"
  });
  // Create a <script> tag and set the USGS URL as the source.
  const script = document.createElement("script");
  // This example uses a local copy of the GeoJSON stored at
  // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
  script.src =
    "https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js";
  document.getElementsByTagName("head")[0].appendChild(script);
  map.data.setStyle(function(feature) {
    const magnitude = feature.getProperty("mag");
    return {
      icon: getCircle(magnitude)
    };
  });
}

function getCircle(magnitude) {
  return {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: "red",
    fillOpacity: 0.2,
    scale: Math.pow(2, magnitude) / 2,
    strokeColor: "white",
    strokeWeight: 0.5
  };
}

function eqfeed_callback(results) {
  map.data.addGeoJson(results);
}
// [END maps_landing_page_visualize_data]
export { map, initMap, getCircle, eqfeed_callback };
