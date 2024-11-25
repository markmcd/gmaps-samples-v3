/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example defines an image map type using the Gall-Peters
// projection.
// https://en.wikipedia.org/wiki/Gall%E2%80%93Peters_projection

function initMap(): void {
  // Create a map. Use the Gall-Peters map type.
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 0,
      center: { lat: 0, lng: 0 },
      mapTypeControl: false,
    }
  );

  initGallPeters();
  map.mapTypes.set("gallPeters", gallPetersMapType);
  map.setMapTypeId("gallPeters");

  // Show the lat and lng under the mouse cursor.
  const coordsDiv = document.getElementById("coords") as HTMLElement;

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(coordsDiv);
  map.addListener("mousemove", (event: google.maps.MapMouseEvent) => {
    coordsDiv.textContent =
      "lat: " +
      Math.round(event.latLng!.lat()) +
      ", " +
      "lng: " +
      Math.round(event.latLng!.lng());
  });

  // Add some markers to the map.
  map.data.setStyle((feature) => {
    return {
      title: feature.getProperty("name") as string,
      optimized: false,
    };
  });
  map.data.addGeoJson(cities);
}

let gallPetersMapType;

function initGallPeters() {
  const GALL_PETERS_RANGE_X = 800;
  const GALL_PETERS_RANGE_Y = 512;

  // Fetch Gall-Peters tiles stored locally on our server.
  gallPetersMapType = new google.maps.ImageMapType({
    getTileUrl: function (coord, zoom) {
      const scale = 1 << zoom;

      // Wrap tiles horizontally.
      const x = ((coord.x % scale) + scale) % scale;

      // Don't wrap tiles vertically.
      const y = coord.y;

      if (y < 0 || y >= scale) return "";

      return (
        "https://developers.google.com/maps/documentation/" +
        "javascript/examples/full/images/gall-peters_" +
        zoom +
        "_" +
        x +
        "_" +
        y +
        ".png"
      );
    },
    tileSize: new google.maps.Size(GALL_PETERS_RANGE_X, GALL_PETERS_RANGE_Y),
    minZoom: 0,
    maxZoom: 1,
    name: "Gall-Peters",
  });

  // Describe the Gall-Peters projection used by these tiles.
  gallPetersMapType.projection = {
    fromLatLngToPoint: function (latLng) {
      const latRadians = (latLng.lat() * Math.PI) / 180;
      return new google.maps.Point(
        GALL_PETERS_RANGE_X * (0.5 + latLng.lng() / 360),
        GALL_PETERS_RANGE_Y * (0.5 - 0.5 * Math.sin(latRadians))
      );
    },
    fromPointToLatLng: function (point, noWrap) {
      const x = point.x / GALL_PETERS_RANGE_X;
      const y = Math.max(0, Math.min(1, point.y / GALL_PETERS_RANGE_Y));

      return new google.maps.LatLng(
        (Math.asin(1 - 2 * y) * 180) / Math.PI,
        -180 + 360 * x,
        noWrap
      );
    },
  };
}

// GeoJSON, describing the locations and names of some cities.
const cities = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-87.65, 41.85] },
      properties: { name: "Chicago" },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-149.9, 61.218] },
      properties: { name: "Anchorage" },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-99.127, 19.427] },
      properties: { name: "Mexico City" },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-0.126, 51.5] },
      properties: { name: "London" },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [28.045, -26.201] },
      properties: { name: "Johannesburg" },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [15.322, -4.325] },
      properties: { name: "Kinshasa" },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [151.207, -33.867] },
      properties: { name: "Sydney" },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [0, 0] },
      properties: { name: "0°N 0°E" },
    },
  ],
};

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
