/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// eslint-disable no-undef
let map: google.maps.Map;

// Initialize and add the map
async function initMap(): Promise<void> {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
  
  let markers: google.maps.marker.AdvancedMarkerElement[] = [];

  let collisionBehavior = google.maps.CollisionBehavior.REQUIRED;

  map = new Map(
    document.getElementById("map") as HTMLElement,
    {
      mapId: "6ff586e93e18149f",
      center: { lat: 47.609414458375674, lng: -122.33897030353548 },
      zoom: 17,
    } as google.maps.MapOptions
  );

  // @ts-ignore
  const select = new mdc.select.MDCSelect(
    document.querySelector(".mdc-select") as HTMLElement
  );


  select.listen("MDCSelect:change", () => {
    collisionBehavior = select.value;
    markers.forEach((marker) => {
      marker.collisionBehavior = collisionBehavior;
    });
  });

  select.value = collisionBehavior;

  // Create some markers on the map
  let locations = [
    [-122.3402, 47.6093],
    [-122.3402, 47.6094],
    [-122.3403, 47.6094],
    [-122.3384, 47.6098],
    [-122.3389, 47.6095],
    [-122.3396, 47.6095],
    [-122.3379, 47.6097],
    [-122.3378, 47.6097],
    [-122.3396, 47.6091],
    [-122.3383, 47.6089],
    [-122.3379, 47.6093],
    [-122.3381, 47.6095],
    [-122.3378, 47.6095],
  ];

  locations.forEach(([lng, lat]: number[]) => {
    const advancedMarker = new AdvancedMarkerElement({
      position: new google.maps.LatLng({ lat, lng }),
      map,
      collisionBehavior: collisionBehavior,
    });
    markers.push(advancedMarker);
  });
}

initMap();
export { };
