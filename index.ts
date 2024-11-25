/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example converts a polyline to a dashed line, by
// setting the opacity of the polyline to 0, and drawing an opaque symbol
// at a regular interval on the polyline.

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 6,
      center: { lat: 20.291, lng: 153.027 },
      mapTypeId: "terrain",
    }
  );

  // Define a symbol using SVG path notation, with an opacity of 1.
  const lineSymbol = {
    path: "M 0,-1 0,1",
    strokeOpacity: 1,
    scale: 4,
  };

  // Create the polyline, passing the symbol in the 'icons' property.
  // Give the line an opacity of 0.
  // Repeat the symbol at intervals of 20 pixels to create the dashed effect.
  const line = new google.maps.Polyline({
    path: [
      { lat: 22.291, lng: 153.027 },
      { lat: 18.291, lng: 153.027 },
    ],
    strokeOpacity: 0,
    icons: [
      {
        icon: lineSymbol,
        offset: "0",
        repeat: "20px",
      },
    ],
    map: map,
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
