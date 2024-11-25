/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let map: google.maps.Map;

function initMap(): void {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: { lat: 40.76, lng: -73.983 },
    zoom: 15,
    mapTypeId: "satellite",
    heading: 90,
    tilt: 45,
  });

  // add listener to button
  document.getElementById("rotate")!.addEventListener("click", autoRotate);
}

function rotate90(): void {
  const heading = map.getHeading() || 0;

  map.setHeading(heading + 90);
}

function autoRotate(): void {
  // Determine if we're showing aerial imagery.
  if (map.getTilt() !== 0) {
    window.setInterval(rotate90, 3000);
  }
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
