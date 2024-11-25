/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// @ts-nocheck TODO remove when fixed

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 8,
    }
  );
  const geocoder = new google.maps.Geocoder();

  geocoder
    .geocode({ address: "Toledo" })
    .then((response) => {
      const position = response.results[0].geometry.location;

      map.setCenter(position);
      new google.maps.Marker({
        map,
        position,
      });
    })
    .catch((e) =>
      window.alert("Geocode was not successful for the following reason: " + e)
    );
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
