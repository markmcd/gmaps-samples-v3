/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// @ts-nocheck TODO remove when fixed

let panorama: google.maps.StreetViewPanorama;

// StreetViewPanoramaData of a panorama just outside the Google Sydney office.
let outsideGoogle: google.maps.StreetViewPanoramaData;

// StreetViewPanoramaData for a custom panorama: the Google Sydney reception.
function getReceptionPanoramaData(): google.maps.StreetViewPanoramaData {
  return {
    location: {
      pano: "reception", // The ID for this custom panorama.
      description: "Google Sydney - Reception",
      latLng: new google.maps.LatLng(-33.86684, 151.19583),
    },
    links: [
      {
        heading: 195,
        description: "Exit",
        pano: (outsideGoogle.location as google.maps.StreetViewLocation).pano,
      },
    ],
    copyright: "Imagery (c) 2010 Google",
    tiles: {
      tileSize: new google.maps.Size(1024, 512),
      worldSize: new google.maps.Size(2048, 1024),
      centerHeading: 105,
      getTileUrl: function (
        pano: string,
        zoom: number,
        tileX: number,
        tileY: number
      ): string {
        return (
          "https://developers.google.com/maps/documentation/javascript/examples/full/images/" +
          "panoReception1024-" +
          zoom +
          "-" +
          tileX +
          "-" +
          tileY +
          ".jpg"
        );
      },
    },
  };
}

function initPanorama() {
  panorama = new google.maps.StreetViewPanorama(
    document.getElementById("street-view") as HTMLElement,
    { pano: (outsideGoogle.location as google.maps.StreetViewLocation).pano }
  );
  // Register a provider for the custom panorama.
  panorama.registerPanoProvider(
    (pano: string): google.maps.StreetViewPanoramaData => {
      if (pano === "reception") {
        return getReceptionPanoramaData();
      }
      // @ts-ignore TODO fix typings
      return null;
    }
  );

  // Add a link to our custom panorama from outside the Google Sydney office.
  panorama.addListener("links_changed", () => {
    if (
      panorama.getPano() ===
      (outsideGoogle.location as google.maps.StreetViewLocation).pano
    ) {
      panorama.getLinks().push({
        description: "Google Sydney",
        heading: 25,
        pano: "reception",
      });
    }
  });
}

function initMap(): void {
  // Use the Street View service to find a pano ID on Pirrama Rd, outside the
  // Google office.
  new google.maps.StreetViewService()
    .getPanorama({ location: { lat: -33.867386, lng: 151.195767 } })
    .then(({ data }: google.maps.StreetViewResponse) => {
      outsideGoogle = data;
      initPanorama();
    });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
