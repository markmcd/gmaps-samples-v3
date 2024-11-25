/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

function initMap(): void {
  const center = { lat: -25.363, lng: 131.044 };
  const zoom = 4;

  new google.maps.Map(document.getElementById("map")!, {
    zoom,
    center,
    gestureHandling: "none",
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
