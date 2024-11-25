/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let map: google.maps.Map;
let marker: google.maps.marker.AdvancedMarkerElement;
let infoWindow: google.maps.InfoWindow;
async function initMap(): Promise<void> {
    // Request needed libraries.
    //@ts-ignore
    const [{ Map }, { AdvancedMarkerElement }] = await Promise.all([
        google.maps.importLibrary("marker"),
        google.maps.importLibrary("places")
      ]);

    // Initialize the map.
    map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 40.749933, lng: -73.98633 },
        zoom: 13,
        mapId: '4504f8b37365c3d0',
        mapTypeControl: false,
    });
    //@ts-ignore
    const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement();
    //@ts-ignore
    placeAutocomplete.id = 'place-autocomplete-input';

    const card = document.getElementById('place-autocomplete-card') as HTMLElement;
    //@ts-ignore
    card.appendChild(placeAutocomplete);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

    // Create the marker and infowindow
    marker = new google.maps.marker.AdvancedMarkerElement({
        map,
    });
    
    infoWindow = new google.maps.InfoWindow({});

    // Add the gmp-placeselect listener, and display the results on the map.
    //@ts-ignore
    placeAutocomplete.addEventListener('gmp-placeselect', async ({ place }) => {
        await place.fetchFields({ fields: ['displayName', 'formattedAddress', 'location'] });

        // If the place has a geometry, then present it on a map.
        if (place.viewport) {
            map.fitBounds(place.viewport);
        } else {
            map.setCenter(place.location);
            map.setZoom(17);
        }

        let content = '<div id="infowindow-content">' +
        '<span id="place-displayname" class="title">' + place.displayName + '</span><br />' +
        '<span id="place-address">' + place.formattedAddress + '</span>' +
        '</div>';

        updateInfoWindow(content, place.location);
        marker.position = place.location;
    });
}

// Helper function to create an info window.
function updateInfoWindow(content, center) {
    infoWindow.setContent(content);
    infoWindow.setPosition(center);
    infoWindow.open({
        map,
        anchor: marker,
        shouldFocus: false,
    });
}

initMap();
export { };