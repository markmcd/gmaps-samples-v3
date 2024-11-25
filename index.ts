/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 18,
      center: { lat: 37.783, lng: -122.403 },
    }
  );

  const bounds: Record<number, [[number, number], [number, number]]> = {
    17: [
      [20969, 20970],
      [50657, 50658],
    ],
    18: [
      [41939, 41940],
      [101315, 101317],
    ],
    19: [
      [83878, 83881],
      [202631, 202634],
    ],
    20: [
      [167757, 167763],
      [405263, 405269],
    ],
  };

  const imageMapType = new google.maps.ImageMapType({
    getTileUrl: function (coord, zoom) {
      if (
        zoom < 17 ||
        zoom > 20 ||
        bounds[zoom][0][0] > coord.x ||
        coord.x > bounds[zoom][0][1] ||
        bounds[zoom][1][0] > coord.y ||
        coord.y > bounds[zoom][1][1]
      ) {
        return "";
      }

      return [
        "https://www.gstatic.com/io2010maps/tiles/5/L2_",
        zoom,
        "_",
        coord.x,
        "_",
        coord.y,
        ".png",
      ].join("");
    },
    tileSize: new google.maps.Size(256, 256),
  });

  map.overlayMapTypes.push(imageMapType);
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
