/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let map: google.maps.Map;

function initMap(): void {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    zoom: 4,
    center: { lat: -28, lng: 137 },
  });

  // Load GeoJSON.
  map.data.loadGeoJson(
    "https://storage.googleapis.com/maps-devrel/google.json"
  );

  // Add some style.
  map.data.setStyle((feature) => {
    return /** @type {google.maps.Data.StyleOptions} */ {
      fillColor: feature.getProperty("color") as string,
      strokeWeight: 1,
    };
  });

  // Set mouseover event for each feature.
  map.data.addListener("mouseover", (event) => {
    (document.getElementById("info-box") as HTMLElement).textContent =
      event.feature.getProperty("letter");
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
