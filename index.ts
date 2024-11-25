/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let map: google.maps.Map;

let infoWindow;
let infoStorage;

const districts = {
  a: {
    label: "1",
    location: {
      lat: -1.283975,
      lng: 36.818797,
    },
    name: "Central",
    description:
      "The Central Business District is a hub of economic activity during the day and a destination for great food at night.",
  },
  b: {
    label: "2",
    location: {
      lat: -1.270955,
      lng: 36.810857,
    },
    name: "Westlands",
    description:
      "With many high-end restaurants and a vibrant nightlife, Westlands attracts young professionals and their families. ",
  },
  c: {
    label: "3",
    location: {
      lat: -1.311868,
      lng: 36.838624,
    },
    name: "South",
    description:
      "Known for high-rise apartment buildings, South B and South C are in high demand.",
  },
};

function initMap() {
  const localContextMapView = new google.maps.localContext.LocalContextMapView({
    element: document.getElementById("map"),
    placeTypePreferences: [
      { type: "restaurant" },
      { type: "tourist_attraction" },
    ],
    maxPlaceCount: 12,
  });

  map = localContextMapView.map!;

  map.setOptions({
    center: districts["a"].location,
    zoom: 13,
  });

  // Add 3 custom markers that open InfoWindows on click
  for (const key in districts) {
    const district = districts[key];
    const marker = new google.maps.Marker({
      label: district.label,
      position: district.location,
      map: map,
      zIndex: 30,
    });

    marker.addListener("click", () => {
      // Close any open details or existing InfoWindows
      localContextMapView.hidePlaceDetailsView();

      if (infoWindow) {
        infoWindow.close();
      }

      // Create and open a new InfoWindow
      createInfoWindow(district, marker);

      // Define origin as the selected marker position
      localContextMapView.directionsOptions = {
        origin: district.location,
      };
    });
  }

  // Set the LocalContextMapView event handlers.
  localContextMapView.addListener("placedetailsviewshowstart", () => {
    if (infoWindow) {
      infoWindow.close();
    }
  });

  localContextMapView.addListener("placedetailsviewhidestart", () => {
    if (infoStorage) {
      createInfoWindow(infoStorage.district, infoStorage.marker);
    }
  });
}

// Creates an infoWindow and also stores information associated with the
// InfoWindow so the InfoWindow can be restored after it has been closed
// by non-user-initiated events.
function createInfoWindow(district, marker) {
  // Build the content of the InfoWindow
  const contentDiv = document.createElement("div");
  const nameDiv = document.createElement("div");
  const descriptionDiv = document.createTextNode(district.description);

  contentDiv.classList.add("infowindow-content");
  nameDiv.classList.add("title");
  nameDiv.textContent = district.name;
  descriptionDiv.textContent = district.description;
  contentDiv.appendChild(nameDiv);
  contentDiv.appendChild(descriptionDiv);

  // Create and open a new InfoWindow
  infoWindow = new google.maps.InfoWindow();
  infoWindow.setContent(contentDiv);
  infoWindow.open(map, marker);

  // Store key properties of the InfoWindow for future restoration
  infoStorage = {
    district: district,
    marker: marker,
  };

  // Clear content storage if infoWindow is closed by the user
  infoWindow.addListener("closeclick", () => {
    if (infoStorage) {
      infoStorage = null;
    }
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
