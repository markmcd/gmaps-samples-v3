/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example requires the Geometry library. Include the libraries=geometry
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry">

let marker1: google.maps.Marker, marker2: google.maps.Marker;
let poly: google.maps.Polyline, geodesicPoly: google.maps.Polyline;

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 4,
      center: { lat: 34, lng: -40.605 },
    }
  );

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(
    document.getElementById("info") as HTMLElement
  );

  marker1 = new google.maps.Marker({
    map,
    draggable: true,
    position: { lat: 40.714, lng: -74.006 },
  });

  marker2 = new google.maps.Marker({
    map,
    draggable: true,
    position: { lat: 48.857, lng: 2.352 },
  });

  const bounds = new google.maps.LatLngBounds(
    marker1.getPosition() as google.maps.LatLng,
    marker2.getPosition() as google.maps.LatLng
  );

  map.fitBounds(bounds);

  google.maps.event.addListener(marker1, "position_changed", update);
  google.maps.event.addListener(marker2, "position_changed", update);

  poly = new google.maps.Polyline({
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 3,
    map: map,
  });

  geodesicPoly = new google.maps.Polyline({
    strokeColor: "#CC0099",
    strokeOpacity: 1.0,
    strokeWeight: 3,
    geodesic: true,
    map: map,
  });

  update();
}

function update() {
  const path = [
    marker1.getPosition() as google.maps.LatLng,
    marker2.getPosition() as google.maps.LatLng,
  ];

  poly.setPath(path);
  geodesicPoly.setPath(path);

  const heading = google.maps.geometry.spherical.computeHeading(
    path[0],
    path[1]
  );

  (document.getElementById("heading") as HTMLInputElement).value =
    String(heading);
  (document.getElementById("origin") as HTMLInputElement).value = String(
    path[0]
  );
  (document.getElementById("destination") as HTMLInputElement).value = String(
    path[1]
  );
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
