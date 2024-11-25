/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example adds a user-editable rectangle to the map.
function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      center: { lat: 44.5452, lng: -78.5389 },
      zoom: 9,
    }
  );

  const bounds = {
    north: 44.599,
    south: 44.49,
    east: -78.443,
    west: -78.649,
  };

  // Define a rectangle and set its editable property to true.
  const rectangle = new google.maps.Rectangle({
    bounds: bounds,
    editable: true,
    draggable: true,
  });

  rectangle.setMap(map);

  // listen to changes
  ["bounds_changed", "dragstart", "drag", "dragend"].forEach((eventName) => {
    rectangle.addListener(eventName, () => {
      console.log({ bounds: rectangle.getBounds()?.toJSON(), eventName });
    });
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
