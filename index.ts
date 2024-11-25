/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

const parser = new DOMParser();

async function initMap() {
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    const map = new Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 37.419, lng: -122.02 },
        zoom: 14,
        mapId: '4504f8b37365c3d0',
    });

    // Each PinElement is paired with a MarkerView to demonstrate setting each parameter.

    // Default marker with title text (no PinElement).
    const markerViewWithText = new AdvancedMarkerElement({
        map,
        position: { lat: 37.419, lng: -122.03 },
        title: 'Title text for the marker at lat: 37.419, lng: -122.03',
    });

    // Adjust the scale.
    const pinScaled = new PinElement({
        scale: 1.5,
    });
    const markerViewScaled = new AdvancedMarkerElement({
        map,
        position: { lat: 37.419, lng: -122.02 },
        content: pinScaled.element,
    });

    // Change the background color.
    const pinBackground = new PinElement({
        background: '#FBBC04',
    });
    const markerViewBackground = new AdvancedMarkerElement({
        map,
        position: { lat: 37.419, lng: -122.01 },
        content: pinBackground.element,
    });

    // Change the border color.
    const pinBorder = new PinElement({
        borderColor: '#137333',
    });
    const markerViewBorder = new AdvancedMarkerElement({
        map,
        position: { lat: 37.415, lng: -122.035 },
        content: pinBorder.element,
    });

    // Change the glyph color.
    const pinGlyph = new PinElement({
        glyphColor: 'white',
    });
    const markerViewGlyph = new AdvancedMarkerElement({
        map,
        position: { lat: 37.415, lng: -122.025 },
        content: pinGlyph.element,
    });

    const pinTextGlyph = new PinElement({
        glyph: 'T',
        glyphColor: 'white',
    });
    const markerViewGlyphText = new AdvancedMarkerElement({
        map,
        position: { lat: 37.415, lng: -122.015 },
        content: pinTextGlyph.element,
    });

    // Hide the glyph.
    const pinNoGlyph = new PinElement({
        glyph: '',
    });
    const markerViewNoGlyph = new AdvancedMarkerElement({
        map,
        position: { lat: 37.415, lng: -122.005 },
        content: pinNoGlyph.element,
    });

}

initMap();
export { };