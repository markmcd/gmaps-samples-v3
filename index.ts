/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let map: google.maps.Map;

function initMap(): void {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: { lat: 20, lng: -160 },
    zoom: 2,
    styles: mapStyle,
  });

  map.data.setStyle(styleFeature);

  // Get the earthquake data (JSONP format)
  // This feed is a copy from the USGS feed, you can find the originals here:
  //   http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
  const script = document.createElement("script");

  script.setAttribute(
    "src",
    "https://storage.googleapis.com/mapsdevsite/json/quakes.geo.json"
  );
  document.getElementsByTagName("head")[0].appendChild(script);
}

// Defines the callback function referenced in the jsonp file.
function eqfeed_callback(data: any) {
  map.data.addGeoJson(data);
}

function styleFeature(feature: google.maps.Data.Feature) {
  const low = [151, 83, 34]; // color of mag 1.0
  const high = [5, 69, 54]; // color of mag 6.0 and above
  const minMag = 1.0;
  const maxMag = 6.0;

  // fraction represents where the value sits between the min and max
  let mag = feature.getProperty("mag") as number;
  const fraction =
    (Math.min(mag, maxMag) - minMag) / (maxMag - minMag);

  const color = interpolateHsl(low, high, fraction);

  return {
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      strokeWeight: 0.5,
      strokeColor: "#fff",
      fillColor: color,
      fillOpacity: 2 / mag,
      // while an exponent would technically be correct, quadratic looks nicer
      scale: Math.pow(mag, 2),
    },
    zIndex: Math.floor(mag),
  };
}

function interpolateHsl(lowHsl: number[], highHsl: number[], fraction: number) {
  const color: number[] = [];

  for (let i = 0; i < 3; i++) {
    // Calculate color based on the fraction.
    color.push((highHsl[i] - lowHsl[i]) * fraction + lowHsl[i]);
  }

  return "hsl(" + color[0] + "," + color[1] + "%," + color[2] + "%)";
}

const mapStyle: google.maps.MapTypeStyle[] = [
  {
    featureType: "all",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ visibility: "on" }, { color: "#fcfcfc" }],
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ visibility: "on" }, { hue: "#5f94ff" }, { lightness: 60 }],
  },
];

declare global {
  interface Window {
    initMap: () => void;
    eqfeed_callback: (results: any) => void;
  }
}
window.initMap = initMap;
window.eqfeed_callback = eqfeed_callback;
export {};
