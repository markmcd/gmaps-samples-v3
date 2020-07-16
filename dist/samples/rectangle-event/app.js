(function(exports) {
  "use strict";

  // This example adds a user-editable rectangle to the map.
  // When the user changes the bounds of the rectangle,
  // an info window pops up displaying the new bounds.

  function initMap() {
    exports.map = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: 44.5452,
        lng: -78.5389
      },
      zoom: 9
    });
    const bounds = {
      north: 44.599,
      south: 44.49,
      east: -78.443,
      west: -78.649
    }; // Define the rectangle and set its editable property to true.

    exports.rectangle = new google.maps.Rectangle({
      bounds: bounds,
      editable: true,
      draggable: true
    });
    exports.rectangle.setMap(exports.map); // Add an event listener on the rectangle.

    exports.rectangle.addListener("bounds_changed", showNewRect); // Define an info window on the map.

    exports.infoWindow = new google.maps.InfoWindow();
  }
  /** Show the new coordinates for the rectangle in an info window. */

  function showNewRect() {
    const ne = exports.rectangle.getBounds().getNorthEast();
    const sw = exports.rectangle.getBounds().getSouthWest();
    const contentString =
      "<b>Rectangle moved.</b><br>" +
      "New north-east corner: " +
      ne.lat() +
      ", " +
      ne.lng() +
      "<br>" +
      "New south-west corner: " +
      sw.lat() +
      ", " +
      sw.lng(); // Set the info window's content and position.

    exports.infoWindow.setContent(contentString);
    exports.infoWindow.setPosition(ne);
    exports.infoWindow.open(exports.map);
  }

  exports.initMap = initMap;
  exports.showNewRect = showNewRect;
})((this.window = this.window || {}));
