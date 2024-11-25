/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// @ts-nocheck TODO remove when fixed

function initMap(): void {
  const geocoder = new google.maps.Geocoder();
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 8,
      center: { lat: -33.865, lng: 151.209 },
    }
  );

  (document.getElementById("submit") as HTMLElement).addEventListener(
    "click",
    () => {
      geocodeAddress(geocoder, map);
    }
  );
}

function geocodeAddress(geocoder: google.maps.Geocoder, map: google.maps.Map) {
  geocoder
    .geocode({
      address: "483 George St.",
      componentRestrictions: {
        country: "AU",
        postalCode: "2000",
      },
    })
    .then(({ results }) => {
      map.setCenter(results[0].geometry.location);
      new google.maps.Marker({
        map,
        position: results[0].geometry.location,
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
