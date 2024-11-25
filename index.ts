/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 8,
      center: { lat: 63.333, lng: -150.5 }, // Denali.
      mapTypeId: "terrain",
    }
  );
  const elevator = new google.maps.ElevationService();
  const infowindow = new google.maps.InfoWindow({});

  infowindow.open(map);

  // Add a listener for the click event. Display the elevation for the LatLng of
  // the click inside the infowindow.
  map.addListener("click", (event) => {
    displayLocationElevation(event.latLng, elevator, infowindow);
  });
}

function displayLocationElevation(
  location: google.maps.LatLng,
  elevator: google.maps.ElevationService,
  infowindow: google.maps.InfoWindow
) {
  // Initiate the location request
  elevator
    .getElevationForLocations({
      locations: [location],
    })
    .then(({ results }) => {
      infowindow.setPosition(location);

      // Retrieve the first result
      if (results[0]) {
        // Open the infowindow indicating the elevation at the clicked position.
        infowindow.setContent(
          "The elevation at this point <br>is " +
            results[0].elevation +
            " meters."
        );
      } else {
        infowindow.setContent("No results found");
      }
    })
    .catch((e) =>
      infowindow.setContent("Elevation service failed due to: " + e)
    );
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
