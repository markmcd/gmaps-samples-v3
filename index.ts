/**
 * @license
 * Copyright 2021 Google LLC.
 * SPDX-License-Identifier: Apache-2.0
 */

// TODO Use imports when Deck.gl works in more bundlers
// https://github.com/visgl/deck.gl/issues/6351#issuecomment-1079424167

import type * as GeoJSON from "geojson";
// import { ArcLayer} from "deck.gl";
// import { GoogleMapsOverlay } from "@deck.gl/google-maps";

const ArcLayer = deck.ArcLayer;
const GoogleMapsOverlay = deck.GoogleMapsOverlay;

type Properties = { scalerank: number };
type Feature = GeoJSON.Feature<GeoJSON.Point, Properties>;
type Data = GeoJSON.FeatureCollection<GeoJSON.Point, Properties>;

const AIRPORTS =
  "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson";

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      center: { lat: 50, lng: 14 },
      tilt: 30,
      mapId: "90f87356969d889c",
      zoom: 3,
    }
  );

  const flightsLayer = new ArcLayer({
    id: "flights",
    data: AIRPORTS,
    dataTransform: (d: Data) =>
      d.features.filter((f) => f.properties.scalerank < 4),
    getSourcePosition: () => [14.42076, 50.08804], // Prague
    getTargetPosition: (f: Feature) => f.geometry.coordinates,
    getSourceColor: [0, 128, 200],
    getTargetColor: [0, 0, 80],
    getWidth: 1,
  });

  const overlay = new GoogleMapsOverlay({
    layers: [flightsLayer],
  });

  overlay.setMap(map);
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
