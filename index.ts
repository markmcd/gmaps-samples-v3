/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initMap(): void {
  // Create the map.
  const pyrmont = { lat: -33.866, lng: 151.196 };
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      center: pyrmont,
      zoom: 17,
      mapId: "8d193001f940fde3",
    } as google.maps.MapOptions
  );

  // Create the places service.
  const service = new google.maps.places.PlacesService(map);
  let getNextPage: () => void | false;
  const moreButton = document.getElementById("more") as HTMLButtonElement;

  moreButton.onclick = function () {
    moreButton.disabled = true;

    if (getNextPage) {
      getNextPage();
    }
  };

  // Perform a nearby search.
  service.nearbySearch(
    { location: pyrmont, radius: 500, type: "store" },
    (
      results: google.maps.places.PlaceResult[] | null,
      status: google.maps.places.PlacesServiceStatus,
      pagination: google.maps.places.PlaceSearchPagination | null
    ) => {
      if (status !== "OK" || !results) return;

      addPlaces(results, map);
      moreButton.disabled = !pagination || !pagination.hasNextPage;

      if (pagination && pagination.hasNextPage) {
        getNextPage = () => {
          // Note: nextPage will call the same handler function as the initial call
          pagination.nextPage();
        };
      }
    }
  );
}

function addPlaces(
  places: google.maps.places.PlaceResult[],
  map: google.maps.Map
) {
  const placesList = document.getElementById("places") as HTMLElement;

  for (const place of places) {
    if (place.geometry && place.geometry.location) {
      const image = {
        url: place.icon!,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      new google.maps.Marker({
        map,
        icon: image,
        title: place.name!,
        position: place.geometry.location,
      });

      const li = document.createElement("li");

      li.textContent = place.name!;
      placesList.appendChild(li);

      li.addEventListener("click", () => {
        map.setCenter(place.geometry!.location!);
      });
    }
  }
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
