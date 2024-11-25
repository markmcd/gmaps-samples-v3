/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * This sample sets the gesture handling mode to 'cooperative',
 * which means that on a mobile device, the user must swipe with one
 * finger to scroll the page and two fingers to pan the map.
 */
function initMap(): void {
  const center = { lat: -25.363, lng: 131.044 };
  const zoom = 4;

  new google.maps.Map(document.getElementById("map")!, {
    zoom,
    center,
    gestureHandling: "cooperative",
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
