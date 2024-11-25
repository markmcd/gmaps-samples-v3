/**
 * @license
 * Copyright 2024 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

async function init() {
    const { Place } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;

    // Use a place ID to create a new Place instance.
    const place = new Place({
        id: 'ChIJydSuSkkUkFQRsqhB-cEtYnw', // Woodland Park Zoo, Seattle WA
    });

    // Call fetchFields, passing the desired data fields.
    await place.fetchFields({ fields: ['displayName', 'photos', 'editorialSummary'] });

    // Get the various HTML elements.
    let heading = document.getElementById('heading') as HTMLElement;
    let summary = document.getElementById('summary') as HTMLElement;
    let gallery = document.getElementById('gallery') as HTMLElement;
    let expandedImageDiv = document.getElementById('expanded-image') as HTMLElement;
    let attributionLabel;

    // Show the display name and summary for the place.
    heading.textContent = place.displayName as string;
    summary.textContent = place.editorialSummary as string;

    // Add photos to the gallery.
    if (place.photos) {
        place.photos?.forEach((photo) => {
            const img = document.createElement('img');
            const expandedImage = document.createElement('img');
            img.src = photo.getURI({maxHeight: 380});
            img.addEventListener('click', (event) => {
                event.preventDefault();
                expandedImage.src = img.src;
                expandedImageDiv.innerHTML = '';
                expandedImageDiv.appendChild(expandedImage);
                attributionLabel = createAttribution(photo.authorAttributions);
                expandedImageDiv.appendChild(attributionLabel);
            });

            gallery.appendChild(img);
        });
    }

    // Display the first photo.
    const img = document.createElement('img');
    img.src = place.photos![0].getURI();
    expandedImageDiv.appendChild(img);
    attributionLabel = createAttribution(place.photos![0].authorAttributions);
    expandedImageDiv.appendChild(attributionLabel);

    // Helper function to create attribution DIV.
    function createAttribution(attribution) {
        attributionLabel = document.createElement("a");
        attributionLabel.classList.add('attribution-label');
        attributionLabel.textContent = attribution[0].displayName;
        attributionLabel.href = attribution[0].uri;
        attributionLabel.target = '_blank;'
        return attributionLabel;
    }
}

init();
