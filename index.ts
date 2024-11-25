/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example creates draggable triangles on the map.
// Note also that the red triangle is geodesic, so its shape changes
// as you drag it north or south.

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 1,
      center: { lat: 24.886, lng: -70.268 },
      mapTypeId: "terrain",
    }
  );

  const blueCoords = [
    { lat: 25.774, lng: -60.19 },
    { lat: 18.466, lng: -46.118 },
    { lat: 32.321, lng: -44.757 },
  ];

  const redCoords = [
    { lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
  ];

  // Construct a draggable red triangle with geodesic set to true.
  new google.maps.Polygon({
    map,
    paths: redCoords,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    draggable: true,
    geodesic: true,
  });

  // Construct a draggable blue triangle with geodesic set to false.
  new google.maps.Polygon({
    map,
    paths: blueCoords,
    strokeColor: "#0000FF",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#0000FF",
    fillOpacity: 0.35,
    draggable: true,
    geodesic: false,
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
