/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example requires the Geometry library. Include the libraries=geometry
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry">

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 14,
      center: { lat: 34.366, lng: -89.519 },
    }
  );
  const poly = new google.maps.Polyline({
    strokeColor: "#000000",
    strokeOpacity: 1,
    strokeWeight: 3,
    map: map,
  });

  // Add a listener for the click event
  google.maps.event.addListener(map, "click", (event) => {
    addLatLngToPoly(event.latLng, poly);
  });
}

/**
 * Handles click events on a map, and adds a new point to the Polyline.
 * Updates the encoding text area with the path's encoded values.
 */
function addLatLngToPoly(
  latLng: google.maps.LatLng,
  poly: google.maps.Polyline
) {
  const path = poly.getPath();

  // Because path is an MVCArray, we can simply append a new coordinate
  // and it will automatically appear
  path.push(latLng);

  // Update the text field to display the polyline encodings
  const encodeString = google.maps.geometry.encoding.encodePath(path);

  if (encodeString) {
    (document.getElementById("encoded-polyline") as HTMLInputElement).value =
      encodeString;
  }
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
