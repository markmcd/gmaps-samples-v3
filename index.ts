/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example creates a triangular polygon with a hole in it.

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 5,
      center: { lat: 24.886, lng: -70.268 },
    }
  );

  // Define the LatLng coordinates for the polygon's  outer path.
  const outerCoords = [
    { lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
  ];

  // Define the LatLng coordinates for the polygon's inner path.
  // Note that the points forming the inner path are wound in the
  // opposite direction to those in the outer path, to form the hole.
  const innerCoords = [
    { lat: 28.745, lng: -70.579 },
    { lat: 29.57, lng: -67.514 },
    { lat: 27.339, lng: -66.668 },
  ];

  // Construct the polygon, including both paths.
  const bermudaTriangle = new google.maps.Polygon({
    paths: [outerCoords, innerCoords],
    strokeColor: "#FFC107",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FFC107",
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
