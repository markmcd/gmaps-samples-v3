/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Sample showing capturing a KML file click
 *   and displaying the contents in a side panel instead of
 *   an InfoWindow
 */
let map: google.maps.Map;

const url =
  "https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml";

function initMap(): void {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: new google.maps.LatLng(-19.257753, 146.823688),
    zoom: 2,
    mapTypeId: "terrain",
  });

  const kmlLayer = new google.maps.KmlLayer({
    suppressInfoWindows: true,
    preserveViewport: false,
    map,
    url,
  });

  kmlLayer.addListener("click", (event) => {
    const content = event.featureData.infoWindowHtml;
    const testimonial = document.getElementById("capture") as HTMLElement;

    testimonial.innerHTML = content;
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
