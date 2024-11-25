/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// TODO Use imports when Deck.gl works in more bundlers
// https://github.com/visgl/deck.gl/issues/6351#issuecomment-1079424167

import type * as GeoJSON from "geojson";
// import { GeoJsonLayer } from "deck.gl";
// import { GoogleMapsOverlay } from "@deck.gl/google-maps";

const GeoJsonLayer = deck.GeoJsonLayer;
const GoogleMapsOverlay = deck.GoogleMapsOverlay;

type Properties = { mag: number };
type Feature = GeoJSON.Feature<GeoJSON.Point, Properties>;

// Initialize and add the map
function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      center: { lat: 40, lng: -110 },
      zoom: 4,
    }
  );

  const deckOverlay = new GoogleMapsOverlay({
    layers: [
      new GeoJsonLayer({
        id: "earthquakes",
        data: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
        filled: true,
        pointRadiusMinPixels: 2,
        pointRadiusMaxPixels: 200,
        opacity: 0.4,
        pointRadiusScale: 0.3,
        getRadius: (f: Feature) => Math.pow(10, f.properties.mag),
        getFillColor: [255, 70, 30, 180],
        autoHighlight: true,
        transitions: {
          getRadius: {
            type: "spring",
            stiffness: 0.1,
            damping: 0.15,
            enter: () => [0], // grow from size 0,
            duration: 10000,
          },
        },
        onDataLoad: () => {
          /* eslint-disable no-undef */
          // @ts-ignore defined in include
          progress.done(); // hides progress bar
          /* eslint-enable no-undef */
        },
      }),
    ],
  });

  deckOverlay.setMap(map);
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
