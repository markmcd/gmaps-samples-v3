/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

async function initMap(): Promise<void> {
    // Request needed libraries.
    //@ts-ignore
    await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
    // Create the input HTML element, and append it.
    //@ts-ignore
    const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement();
    //@ts-ignore
    document.body.appendChild(placeAutocomplete);

    // Inject HTML UI.
    const selectedPlaceTitle = document.createElement('p');
    selectedPlaceTitle.textContent = '';
    document.body.appendChild(selectedPlaceTitle);

    const selectedPlaceInfo = document.createElement('pre');
    selectedPlaceInfo.textContent = '';
    document.body.appendChild(selectedPlaceInfo);

    // Add the gmp-placeselect listener, and display the results.
    //@ts-ignore
    placeAutocomplete.addEventListener('gmp-placeselect', async ({ place }) => {
        await place.fetchFields({ fields: ['displayName', 'formattedAddress', 'location'] });

        selectedPlaceTitle.textContent = 'Selected Place:';
        selectedPlaceInfo.textContent = JSON.stringify(
            place.toJSON(), /* replacer */ null, /* space */ 2);
    });
}

initMap();
export { };