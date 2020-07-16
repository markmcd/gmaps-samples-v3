(function(exports) {
  "use strict";

  function initMap() {
    exports.map = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: 20,
        lng: -160
      },
      zoom: 2
    }); // Get the earthquake data (JSONP format)
    // This feed is a copy from the USGS feed, you can find the originals here:
    //   http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

    const script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://storage.googleapis.com/mapsdevsite/json/quakes.geo.json"
    );
    document.getElementsByTagName("head")[0].appendChild(script); // Add a basic style.

    exports.map.data.setStyle(function(feature) {
      const mag = Math.exp(parseFloat(feature.getProperty("mag"))) * 0.1;
      return (
        /** @type {google.maps.Data.StyleOptions} */
        ({
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: mag,
            fillColor: "#f00",
            fillOpacity: 0.35,
            strokeWeight: 0
          }
        })
      );
    });
  } // Defines the callback function referenced in the jsonp file.

  function eqfeed_callback(data) {
    exports.map.data.addGeoJson(data);
  }

  exports.eqfeed_callback = eqfeed_callback;
  exports.initMap = initMap;
})((this.window = this.window || {}));
