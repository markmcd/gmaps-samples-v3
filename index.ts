/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example adds a UI control allowing users to remove the polyline from the
// map.

let flightPath: google.maps.Polyline;
let map: google.maps.Map;

function initMap(): void {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    zoom: 3,
    center: { lat: 0, lng: -180 },
    mapTypeId: "terrain",
  });

  const flightPathCoordinates: google.maps.LatLngLiteral[] = [
    { lat: 37.772, lng: -122.214 },
    { lat: 21.291, lng: -157.821 },
    { lat: -18.142, lng: 178.431 },
    { lat: -27.467, lng: 153.027 },
  ];

  flightPath = new google.maps.Polyline({
    path: flightPathCoordinates,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  // add event listener for click event
  document.getElementById("add-line")!.addEventListener("click", addLine);
  document.getElementById("remove-line")!.addEventListener("click", removeLine);

  // initialize with line
  addLine();
}

function addLine(): void {
  flightPath.setMap(map);
}

function removeLine(): void {
  flightPath.setMap(null);
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
