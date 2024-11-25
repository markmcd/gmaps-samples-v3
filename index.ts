/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example creates a rectangle based on the viewport
// on any 'zoom-changed' event.

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 11,
      center: { lat: 40.74852, lng: -73.981687 },
      mapTypeId: "terrain",
    }
  );

  const rectangle = new google.maps.Rectangle();

  map.addListener("zoom_changed", () => {
    // Get the current bounds, which reflect the bounds before the zoom.
    rectangle.setOptions({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map,
      bounds: map.getBounds() as google.maps.LatLngBounds,
    });
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
