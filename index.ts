/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let map: google.maps.Map;
let maxZoomService: google.maps.MaxZoomService;
let infoWindow: google.maps.InfoWindow;

function initMap(): void {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    zoom: 11,
    center: { lat: 35.6894, lng: 139.692 },
    mapTypeId: "hybrid",
  });

  infoWindow = new google.maps.InfoWindow();

  maxZoomService = new google.maps.MaxZoomService();

  map.addListener("click", showMaxZoom);
}

function showMaxZoom(e: google.maps.MapMouseEvent) {
  maxZoomService.getMaxZoomAtLatLng(
    e.latLng as google.maps.LatLng,
    (result: google.maps.MaxZoomResult) => {
      if (result.status !== "OK") {
        infoWindow.setContent("Error in MaxZoomService");
      } else {
        infoWindow.setContent(
          "The maximum zoom at this location is: " + result.zoom
        );
      }

      infoWindow.setPosition(e.latLng);
      infoWindow.open(map);
    }
  );
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
