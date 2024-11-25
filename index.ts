/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let panorama: google.maps.StreetViewPanorama;

function initialize() {
  panorama = new google.maps.StreetViewPanorama(
    document.getElementById("street-view") as HTMLElement,
    {
      position: { lat: 37.86926, lng: -122.254811 },
      pov: { heading: 165, pitch: 0 },
      zoom: 1,
    }
  );
}
declare global {
  interface Window {
    initialize: () => void;
  }
}
window.initialize = initialize;
export {};
