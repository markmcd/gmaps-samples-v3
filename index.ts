/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example adds a UI control allowing users to remove the
// ground overlay from the map.

let historicalOverlay: google.maps.GroundOverlay;
let map: google.maps.Map;

function initMap(): void {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    zoom: 13,
    center: { lat: 40.74, lng: -74.18 },
  });

  const imageBounds = {
    north: 40.773941,
    south: 40.712216,
    east: -74.12544,
    west: -74.22655,
  };

  historicalOverlay = new google.maps.GroundOverlay(
    "https://storage.googleapis.com/geo-devrel-public-buckets/newark_nj_1922-661x516.jpeg",
    imageBounds
  );

  // add event listener for click event
  document
    .getElementById("restore-overlay")!
    .addEventListener("click", restoreOverlay);
  document
    .getElementById("remove-overlay")!
    .addEventListener("click", removeOverlay);

  // restore overlay to map
  restoreOverlay();
}

function restoreOverlay() {
  historicalOverlay.setMap(map);
}

function removeOverlay() {
  historicalOverlay.setMap(null);
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
