/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// If you're adding a number of markers, you may want to drop them on the map
// consecutively rather than all at once. This example shows how to use
// window.setTimeout() to space your markers' animation.

const neighborhoods: google.maps.LatLngLiteral[] = [
  { lat: 52.511, lng: 13.447 },
  { lat: 52.549, lng: 13.422 },
  { lat: 52.497, lng: 13.396 },
  { lat: 52.517, lng: 13.394 },
];

let markers: google.maps.Marker[] = [];
let map: google.maps.Map;

function initMap(): void {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    zoom: 12,
    center: { lat: 52.52, lng: 13.41 },
  });

  document.getElementById("drop")!.addEventListener("click", drop);
}

function drop(): void {
  clearMarkers();

  for (let i = 0; i < neighborhoods.length; i++) {
    addMarkerWithTimeout(neighborhoods[i], i * 200);
  }
}

function addMarkerWithTimeout(
  position: google.maps.LatLngLiteral,
  timeout: number
): void {
  window.setTimeout(() => {
    markers.push(
      new google.maps.Marker({
        position: position,
        map,
        animation: google.maps.Animation.DROP,
      })
    );
  }, timeout);
}

function clearMarkers(): void {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }

  markers = [];
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
