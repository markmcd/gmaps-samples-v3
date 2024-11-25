/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example creates a simple polygon representing the Bermuda Triangle. Note
// that the code specifies only three LatLng coordinates for the polygon. The
// API automatically draws a stroke connecting the last LatLng back to the first
// LatLng.

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 5,
      center: { lat: 24.886, lng: -70.268 },
      mapTypeId: "terrain",
    }
  );

  // Define the LatLng coordinates for the polygon's path. Note that there's
  // no need to specify the final coordinates to complete the polygon, because
  // The Google Maps JavaScript API will automatically draw the closing side.
  const triangleCoords = [
    { lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
  ];

  const bermudaTriangle = new google.maps.Polygon({
    paths: triangleCoords,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });

  bermudaTriangle.setMap(map);
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
