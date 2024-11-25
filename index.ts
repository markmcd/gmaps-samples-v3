/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

function initMap(): void {
  new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      mapId: "8e0a97af9386fef",
      center: { lat: 48.85, lng: 2.35 },
      zoom: 12,
    } as google.maps.MapOptions
  );
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
