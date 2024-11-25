/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example uses a GroundOverlay to place an image on the map
// showing an antique map of Newark, NJ.

let historicalOverlay;

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 13,
      center: { lat: 40.74, lng: -74.18 },
    }
  );

  const imageBounds = {
    north: 40.773941,
    south: 40.712216,
    east: -74.12544,
    west: -74.22655,
  };

  historicalOverlay = new google.maps.GroundOverlay(
    "https://storage.googleapis.com/geo-devrel-public-buckets/newark_nj_1922-661x516.jpeg",
    imageBounds
  );
  historicalOverlay.setMap(map);
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
