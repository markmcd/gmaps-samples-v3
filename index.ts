/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { faBus } from "@fortawesome/free-solid-svg-icons";

function initMap(): void {
  const center = { lat: 36.6163, lng: -100.605 };

  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 15,
      center,
    }
  );

  // use a FontAwesome svg
  new google.maps.Marker({
    position: { lat: 36.6163, lng: -100.61 },
    map,
    icon: {
      path: faBus.icon[4] as string,
      fillColor: "#0000ff",
      fillOpacity: 1,
      anchor: new google.maps.Point(
        faBus.icon[0] / 2, // width
        faBus.icon[1] // height
      ),
      strokeWeight: 1,
      strokeColor: "#ffffff",
      scale: 0.075,
    },
    title: "FontAwesome SVG Marker",
  });

  // use a Material Icon as font
  new google.maps.Marker({
    position: { lat: 36.6163, lng: -100.6 },
    map,
    label: {
      text: "\ue530", // codepoint from https://fonts.google.com/icons
      fontFamily: "Material Icons",
      color: "#ffffff",
      fontSize: "18px",
    },
    title: "Material Icon Font Marker",
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
