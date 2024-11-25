/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This sample uses the Place Autocomplete widget to allow the user to search
// for and select a place. The sample then displays an info window containing
// the place ID and other information about the place that the user has
// selected.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 13,
    }
  );

  const input = document.getElementById("pac-input") as HTMLInputElement;

  // Specify just the place data fields that you need.
  const autocomplete = new google.maps.places.Autocomplete(input, {
    fields: ["place_id", "geometry", "formatted_address", "name"],
  });

  autocomplete.bindTo("bounds", map);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById(
    "infowindow-content"
  ) as HTMLElement;

  infowindow.setContent(infowindowContent);

  const marker = new google.maps.Marker({ map: map });

  marker.addListener("click", () => {
    infowindow.open(map, marker);
  });

  autocomplete.addListener("place_changed", () => {
    infowindow.close();

    const place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    // Set the position of the marker using the place ID and location.
    // @ts-ignore This should be in @typings/googlemaps.
    marker.setPlace({
      placeId: place.place_id,
      location: place.geometry.location,
    });

    marker.setVisible(true);

    (
      infowindowContent.children.namedItem("place-name") as HTMLElement
    ).textContent = place.name as string;
    (
      infowindowContent.children.namedItem("place-id") as HTMLElement
    ).textContent = place.place_id as string;
    (
      infowindowContent.children.namedItem("place-address") as HTMLElement
    ).textContent = place.formatted_address as string;
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
