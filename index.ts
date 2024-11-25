/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example retrieves autocomplete predictions programmatically from the
// autocomplete service, and displays them as an HTML list.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
function initService(): void {
  const displaySuggestions = function (
    predictions: google.maps.places.QueryAutocompletePrediction[] | null,
    status: google.maps.places.PlacesServiceStatus
  ) {
    if (status != google.maps.places.PlacesServiceStatus.OK || !predictions) {
      alert(status);
      return;
    }

    predictions.forEach((prediction) => {
      const li = document.createElement("li");

      li.appendChild(document.createTextNode(prediction.description));
      (document.getElementById("results") as HTMLUListElement).appendChild(li);
    });
  };

  const service = new google.maps.places.AutocompleteService();

  service.getQueryPredictions({ input: "pizza near Syd" }, displaySuggestions);
}

declare global {
  interface Window {
    initService: () => void;
  }
}
window.initService = initService;
export {};
