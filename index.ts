
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

async function initMap() {
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    const map = new Map(document.getElementById('map') as HTMLElement, {
        center: {lat: 37.424563902650114, lng: -122.09512859577026},
        zoom: 17,
        mapId: '4504f8b37365c3d0',
    });

    const marker01 = new AdvancedMarkerElement({
        map,
        position: { lat: 37.4239163, lng: -122.094 },
        title: 'This marker is visible at zoom level 15 and higher.'
    });

    const marker02 = new AdvancedMarkerElement({
        map,
        position: { lat: 37.4245, lng: -122.096 },
        title: 'This marker is visible at zoom level 16 and higher.'
    });

    const marker03 = new AdvancedMarkerElement({
        map,
        position: { lat: 37.4249, lng: -122.095 },
        title: 'This marker is visible at zoom level 17 and higher.'
    });

    const marker04 = new AdvancedMarkerElement({
        map,
        position: { lat: 37.425, lng: -122.0955 },
        title: 'This marker is visible at zoom level 18 and higher.'
    });
    map.addListener('zoom_changed', () => {
        const zoom = map.getZoom();
        if (zoom) {
            // Only show each marker above a certain zoom level.
            marker01.map = zoom > 14 ? map : null;
            marker02.map = zoom > 15 ? map : null;
            marker03.map = zoom > 16 ? map : null;
            marker04.map = zoom > 17 ? map : null;
        }
    });
}

initMap();
export { };