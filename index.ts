/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let map;
async function initMap() {
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    map = new Map(document.getElementById('map') as HTMLElement, {
        center: {lat: 47.65196191658531, lng: -122.30716770065949},
        zoom: 19,
        tilt: 67.5,
        heading: 45,
        mapId: '6ff586e93e18149f',
    });
    const pin = new PinElement({
        background: '#4b2e83',
        borderColor: '#b7a57a',
        glyphColor: '#b7a57a',
        scale: 2.0,
    });

    const markerView = new AdvancedMarkerElement({
        map,
        content: pin.element,
        // Set altitude to 20 meters above the ground.
        position: { lat: 47.65170843460547, lng: -122.30754, altitude: 20 } as google.maps.LatLngAltitudeLiteral,
    });
}

initMap();
export { };