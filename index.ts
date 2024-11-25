/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let map: google.maps.Map;

const NEW_ZEALAND_BOUNDS = {
  north: -34.36,
  south: -47.35,
  west: 166.28,
  east: -175.81,
};
const AUCKLAND = { lat: -37.06, lng: 174.58 };

function initMap(): void {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: AUCKLAND,
    restriction: {
      latLngBounds: NEW_ZEALAND_BOUNDS,
      strictBounds: false,
    },
    zoom: 7,
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
