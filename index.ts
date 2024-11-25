/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let map: google.maps.Map;
let centerCoordinates = { lat: 42.349134, lng: -71.083184 }; // Boston, MA
let infoWindow;
let contentString;

async function initMap() {
    const { Map, InfoWindow } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary;
    const { Place, Review } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;

    map = new Map(document.getElementById('map') as HTMLElement, {
        center: centerCoordinates,
        zoom: 14,
        // [START_EXCLUDE]
        mapId: '4504f8b37365c3d0',
        // [END_EXCLUDE]
    });

    // Use a place ID to create a new Place instance.
    const place = new Place({
        id: 'ChIJpyiwa4Zw44kRBQSGWKv4wgA', // Faneuil Hall Marketplace, Boston, MA
    });

    // Call fetchFields, passing 'reviews' and other needed fields.
    await place.fetchFields({
        fields: ['displayName', 'formattedAddress', 'location', 'reviews'],
    });

    // If there are any reviews display the first one.
    if (place.reviews && place.reviews.length > 0) {
        // Get info for the first review.
        let reviewRating = place.reviews[0].rating;
        let reviewText = place.reviews[0].text;
        let authorName = place.reviews[0].authorAttribution!.displayName;
        let authorUri = place.reviews[0].authorAttribution!.uri;

        // Format the review using HTML.
        contentString =`
            <div id="title"><b>${place.displayName}</b></div>
            <div id="address">${place.formattedAddress}</div>
            <a href="${authorUri}" target="_blank">Author: ${authorName}</a>
            <div id="rating">Rating: ${reviewRating} stars</div>
            <div id="rating"><p>Review: ${reviewText}</p></div>`;
    } else {
        contentString = 'No reviews were found for ' + place.displayName + '.';
    }

    // Create an infowindow to display the review.
    infoWindow = new InfoWindow({
        content: contentString,
        ariaLabel: place.displayName,
    });

    // Add a marker.
    const marker = new AdvancedMarkerElement({
        map,
        position: place.location,
        title: place.displayName,
    });

    // Show the info window.
    infoWindow.open({
        anchor: marker,
        map,
    });
}

initMap();
export { };
