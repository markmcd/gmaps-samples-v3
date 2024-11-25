/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
let map: google.maps.Map;
let markers: google.maps.Marker[] = [];

function initMap(): void {
  const haightAshbury = { lat: 37.769, lng: -122.446 };

  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    zoom: 12,
    center: haightAshbury,
    mapTypeId: "terrain",
  });

  // This event listener will call addMarker() when the map is clicked.
  map.addListener("click", (event: google.maps.MapMouseEvent) => {
    addMarker(event.latLng!);
  });

  // add event listeners for the buttons
  document
    .getElementById("show-markers")!
    .addEventListener("click", showMarkers);
  document
    .getElementById("hide-markers")!
    .addEventListener("click", hideMarkers);
  document
    .getElementById("delete-markers")!
    .addEventListener("click", deleteMarkers);

  // Adds a marker at the center of the map.
  addMarker(haightAshbury);
}

// Adds a marker to the map and push to the array.
function addMarker(position: google.maps.LatLng | google.maps.LatLngLiteral) {
  const marker = new google.maps.Marker({
    position,
    map,
  });

  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map: google.maps.Map | null) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function hideMarkers(): void {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers(): void {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers(): void {
  hideMarkers();
  markers = [];
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
