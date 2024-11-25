/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example displays a map with the language set to Arabic and the
// regions set to Egypt. These settings are specified in the HTML script
// element when loading the Google Maps JavaScript API.
// Setting the language shows the map in the language of your choice.
// Setting the region biases the geocoding results to that region.
// In addition, the page's html element sets the text direction to
// right-to-left.
function initMap(): void {
  const cairo = { lat: 30.064742, lng: 31.249509 };

  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      scaleControl: true,
      center: cairo,
      zoom: 10,
    }
  );

  const infowindow = new google.maps.InfoWindow();

  infowindow.setContent("<b>القاهرة</b>");

  const marker = new google.maps.Marker({ map, position: cairo });

  marker.addListener("click", () => {
    infowindow.open(map, marker);
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
