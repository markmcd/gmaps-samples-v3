/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example adds three custom symbols to a polyline.

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 6,
      center: { lat: 20.291, lng: 153.027 },
      mapTypeId: "terrain",
    }
  );

  // Define the custom symbols. All symbols are defined via SVG path notation.
  // They have varying stroke color, fill color, stroke weight,
  // opacity and rotation properties.
  const symbolOne = {
    path: "M -2,0 0,-2 2,0 0,2 z",
    strokeColor: "#F00",
    fillColor: "#F00",
    fillOpacity: 1,
  };

  const symbolTwo = {
    path: "M -1,0 A 1,1 0 0 0 -3,0 1,1 0 0 0 -1,0M 1,0 A 1,1 0 0 0 3,0 1,1 0 0 0 1,0M -3,3 Q 0,5 3,3",
    strokeColor: "#00F",
    rotation: 45,
  };

  const symbolThree = {
    path: "M -2,-2 2,2 M 2,-2 -2,2",
    strokeColor: "#292",
    strokeWeight: 4,
  };

  // Create the polyline and add the symbols via the 'icons' property.
  const line = new google.maps.Polyline({
    path: [
      { lat: 22.291, lng: 153.027 },
      { lat: 18.291, lng: 153.027 },
    ],
    icons: [
      {
        icon: symbolOne,
        offset: "0%",
      },
      {
        icon: symbolTwo,
        offset: "50%",
      },
      {
        icon: symbolThree,
        offset: "100%",
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
