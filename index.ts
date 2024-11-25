/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

async function initMap() {
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
    const { Place } =  await google.maps.importLibrary("places") as google.maps.PlacesLibrary;

    const map = new Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 37.42475, lng: -122.0845 },
        zoom: 13,
        mapId: '4504f8b37365c3d0',
    });

    const parser = new DOMParser();

    // A marker with a custom inline SVG.
    const pinSvgString = '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none"><rect width="56" height="56" rx="28" fill="#7837FF"></rect><path d="M46.0675 22.1319L44.0601 22.7843" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.9402 33.2201L9.93262 33.8723" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M27.9999 47.0046V44.8933" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M27.9999 9V11.1113" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M39.1583 43.3597L37.9186 41.6532" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.8419 12.6442L18.0816 14.3506" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9.93262 22.1319L11.9402 22.7843" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M46.0676 33.8724L44.0601 33.2201" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M39.1583 12.6442L37.9186 14.3506" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.8419 43.3597L18.0816 41.6532" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M28 39L26.8725 37.9904C24.9292 36.226 23.325 34.7026 22.06 33.4202C20.795 32.1378 19.7867 30.9918 19.035 29.9823C18.2833 28.9727 17.7562 28.0587 17.4537 27.2401C17.1512 26.4216 17 25.5939 17 24.7572C17 23.1201 17.5546 21.7513 18.6638 20.6508C19.7729 19.5502 21.1433 19 22.775 19C23.82 19 24.7871 19.2456 25.6762 19.7367C26.5654 20.2278 27.34 20.9372 28 21.8649C28.77 20.8827 29.5858 20.1596 30.4475 19.6958C31.3092 19.2319 32.235 19 33.225 19C34.8567 19 36.2271 19.5502 37.3362 20.6508C38.4454 21.7513 39 23.1201 39 24.7572C39 25.5939 38.8488 26.4216 38.5463 27.2401C38.2438 28.0587 37.7167 28.9727 36.965 29.9823C36.2133 30.9918 35.205 32.1378 33.94 33.4202C32.675 34.7026 31.0708 36.226 29.1275 37.9904L28 39Z" fill="#FF7878"></path></svg>';
    
    const pinSvg =
        parser.parseFromString(pinSvgString, 'image/svg+xml').documentElement;

    const pinSvgMarkerView = new AdvancedMarkerElement({
        map,
        position: { lat: 37.42475, lng: -122.094 },
        content: pinSvg,
        title: 'A marker using a custom SVG image.',
    });

    // A marker with a with a URL pointing to a PNG.
    const beachFlagImg = document.createElement('img');
    beachFlagImg.src = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

    const beachFlagMarkerView = new AdvancedMarkerElement({
        map,
        position: { lat: 37.434, lng: -122.082 },
        content: beachFlagImg,
        title: 'A marker using a custom PNG Image',
    });

    // A marker with a custom SVG glyph.
    const glyphImg = document.createElement('img');
    glyphImg.src = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/google_logo_g.svg';

    const glyphSvgPinElement = new PinElement({
        glyph: glyphImg,
    });

    const glyphSvgMarkerView = new AdvancedMarkerElement({
        map,
        position: { lat: 37.425, lng: -122.07 },
        content: glyphSvgPinElement.element,
        title: "A marker using a custom SVG for the glyph.",
    });

    // A marker customized using a place icon and color, name, and geometry.
    const place = new Place({
        id: 'ChIJN5Nz71W3j4ARhx5bwpTQEGg',
    });

    // Call fetchFields, passing the desired data fields.
    await place.fetchFields({ fields: ['location', 'displayName', 'svgIconMaskURI', 'iconBackgroundColor'] });

    const pinElement = new PinElement({
        background: place.iconBackgroundColor,
        glyph: new URL(String(place.svgIconMaskURI)),
    });

    const placeIconMarkerView = new AdvancedMarkerElement({
        map,
        position: place.location,
        content: pinElement.element,
        title: place.displayName,
    });


    // A marker using a Font Awesome icon for the glyph.
    const icon = document.createElement('div');
    icon.innerHTML = '<i class="fa fa-pizza-slice fa-lg"></i>';
    const faPin = new PinElement({
        glyph: icon,
        glyphColor: '#ff8300',
        background: '#FFD514',
        borderColor: '#ff8300',
    });

    const faMarker = new AdvancedMarkerElement({
        map,
        position: { lat: 37.412, lng: -122.095829650878 },
        content: faPin.element,
        title: 'A marker using a FontAwesome icon for the glyph.'
    });
}

initMap();
export { };
