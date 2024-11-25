/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * This demo illustrates the coordinate system used to display map tiles in the
 * API.
 *
 * Tiles in Google Maps are numbered from the same origin as that for
 * pixels. For Google's implementation of the Mercator projection, the origin
 * tile is always at the northwest corner of the map, with x values increasing
 * from west to east and y values increasing from north to south.
 *
 * Try panning and zooming the map to see how the coordinates change.
 */

class CoordMapType implements google.maps.MapType {
  tileSize: google.maps.Size;
  alt: string|null = null;
  maxZoom: number = 17;
  minZoom: number = 0;
  name: string|null = null;
  projection: google.maps.Projection|null = null;
  radius: number = 6378137;

  constructor(tileSize: google.maps.Size) {
    this.tileSize = tileSize;
  }
  getTile(
    coord: google.maps.Point,
    zoom: number,
    ownerDocument: Document
  ): HTMLElement {
    const div = ownerDocument.createElement("div");

    div.innerHTML = String(coord);
    div.style.width = this.tileSize.width + "px";
    div.style.height = this.tileSize.height + "px";
    div.style.fontSize = "10";
    div.style.borderStyle = "solid";
    div.style.borderWidth = "1px";
    div.style.borderColor = "#AAAAAA";
    return div;
  }
  releaseTile(tile: Element): void {}
}

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 10,
      center: { lat: 41.85, lng: -87.65 },
    }
  );

  // Insert this overlay map type as the first overlay map type at
  // position 0. Note that all overlay map types appear on top of
  // their parent base map.
  const coordMapType = new CoordMapType(new google.maps.Size(256, 256))
  map.overlayMapTypes.insertAt(
    0,
    coordMapType
  );
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
