/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let map;
let featureLayer;
let center;

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

    center = {lat: 41.059, lng: -124.151}; // Trinidad, CA

    map = new Map(document.getElementById('map') as HTMLElement, {
        center: center,
        zoom: 15,
        // In the cloud console, configure this Map ID with a style that enables the
        // "Locality" Data Driven Styling type.
        mapId: 'a3efe1c035bad51b', // <YOUR_MAP_ID_HERE>,
    });

    featureLayer = map.getFeatureLayer('LOCALITY');

    findBoundary();
}
async function findBoundary() {
    const request = {
        query: 'Trinidad, CA',
        fields: ['id', 'location'],
        includedType: 'locality',
        locationBias: center,
    };

    const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
    //@ts-ignore
    const { places } = await Place.searchByText(request);

    if (places.length) {
        const place = places[0];
        styleBoundary(place.id);
        map.setCenter(place.location);
    } else {
        console.log('No results');
    }
}

function styleBoundary(placeid) {
    // Define a style of transparent purple with opaque stroke.
    const styleFill = {
        strokeColor: '#810FCB',
        strokeOpacity: 1.0,
        strokeWeight: 3.0,
        fillColor: '#810FCB',
        fillOpacity: 0.5
    };

    // Define the feature style function.
    featureLayer.style = (params) => {
        if (params.feature.placeId == placeid) {
            return styleFill;
        }
    };
}
initMap();

export { };