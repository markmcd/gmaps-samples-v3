/**
 * @license
 * Copyright 2024 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let title;
let results;
let input;
let token;

// Add an initial request body.
let request = {
    input: "",
    locationRestriction: { west: -122.44, north: 37.8, east: -122.39, south: 37.78 },
    origin: { lat: 37.7893, lng: -122.4039 },
    includedPrimaryTypes: ["restaurant"],
    language: "en-US",
    region: "us",
};

async function init() {
    token = new google.maps.places.AutocompleteSessionToken();

    title = document.getElementById('title');
    results = document.getElementById('results');
    input = document.querySelector("input");
    input.addEventListener("input", makeAcRequest);
    request = refreshToken(request) as any;
}

async function makeAcRequest(input) {
    // Reset elements and exit if an empty string is received.
    if (input.target.value == '') {
        title.innerText = '';
        results.replaceChildren();
        return;
    }

    // Add the latest char sequence to the request.
    request.input = input.target.value;

    // Fetch autocomplete suggestions and show them in a list.
    // @ts-ignore
    const { suggestions } = await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(request);

    title.innerText = 'Query predictions for "' + request.input + '"';

    // Clear the list first.
    results.replaceChildren();

    for (const suggestion of suggestions) {
        const placePrediction = suggestion.placePrediction;

        // Create a link for the place, add an event handler to fetch the place.
        const a = document.createElement('a');
        a.addEventListener('click', () => {
            onPlaceSelected(placePrediction!.toPlace());
        });
        a.innerText = placePrediction!.text.toString();

        // Create a new list element.
        const li = document.createElement('li');
        li.appendChild(a);
        results.appendChild(li);
    }
}

// Event handler for clicking on a suggested place.
async function onPlaceSelected(place) {
    await place.fetchFields({
        fields: ['displayName', 'formattedAddress'],
    });
    let placeText = document.createTextNode(place.displayName + ': ' + place.formattedAddress);
    results.replaceChildren(placeText);
    title.innerText = 'Selected Place:';
    input.value = '';
    refreshToken(request);
}

// Helper function to refresh the session token.
async function refreshToken(request) {
    // Create a new session token and add it to the request.
    token = new google.maps.places.AutocompleteSessionToken();
    request.sessionToken = token;
    return request;
}

declare global {
    interface Window {
      init: () => void;
    }
  }
  window.init = init;
export { };