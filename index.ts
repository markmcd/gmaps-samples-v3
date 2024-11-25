/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let map: google.maps.Map;

function initMap(): void {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: { lat: -33.86, lng: 151.209 },
    zoom: 13,
    mapTypeControl: false,
  });

  // Add controls to the map, allowing users to hide/show features.
  const styleControl = document.getElementById(
    "style-selector-control"
  ) as HTMLElement;

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(styleControl);

  // Apply new JSON when the user chooses to hide/show features.
  (document.getElementById("hide-poi") as HTMLElement).addEventListener(
    "click",
    () => {
      map.setOptions({ styles: styles["hide"] });
    }
  );
  (document.getElementById("show-poi") as HTMLElement).addEventListener(
    "click",
    () => {
      map.setOptions({ styles: styles["default"] });
    }
  );
}

const styles: Record<string, google.maps.MapTypeStyle[]> = {
  default: [],
  hide: [
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
  ],
};


declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
