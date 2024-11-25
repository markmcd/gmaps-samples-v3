/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
  center: { lat: -34.397, lng: 150.644 },
  zoom: 8,
});

declare global {
  interface Window {
    map: google.maps.Map;
  }
}
window.map = map;
export {};
