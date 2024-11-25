/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let map: google.maps.Map;
let centerCoordinates = { lat: 37.4161493, lng: -122.0812166 };

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

    map = new Map(document.getElementById('map') as HTMLElement, {
        center: centerCoordinates,
        zoom: 14,
        // [START_EXCLUDE]
        mapId: '4504f8b37365c3d0',
        // [END_EXCLUDE]
    });

    getPlaceDetails();
}

async function getPlaceDetails() {
    const { Place } =  await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
    // Use place ID to create a new Place instance.
    const place = new Place({
        id: 'ChIJN5Nz71W3j4ARhx5bwpTQEGg',
        requestedLanguage: 'en', // optional
    });

    // Call fetchFields, passing the desired data fields.
    await place.fetchFields({ fields: ['displayName', 'formattedAddress', 'location'] });

    // Log the result
    console.log(place.displayName);
    console.log(place.formattedAddress);

    // Add an Advanced Marker
    const marker = new AdvancedMarkerElement({
        map,
        position: place.location,
        title: place.displayName,
    });
}

initMap();
export { };
