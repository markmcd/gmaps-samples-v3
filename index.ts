/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Loader } from "@googlemaps/js-api-loader";

let map: google.maps.Map;
//@ts-ignore
let apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY!;

const center = { lat: 41.90476224706472, lng: 12.49822074385094 };
const zoom = 14;
const url = "https://maps.googleapis.com/maps/api/staticmap";

// @ts-ignore google.maps.plugins
const loader = new Loader({
  apiKey: apiKey,
  version: "weekly",
});

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("wrapper") as HTMLButtonElement;

  wrapper.style.backgroundImage = `url(${url}?center=${center.lat},${center.lng}&zoom=${zoom}&scale=2&size=${wrapper.clientWidth}x${wrapper.clientHeight}&key=${apiKey})`;

  wrapper.addEventListener("click", () => {
    wrapper.remove();

    loader.load().then(() => {
      map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center,
        zoom,
      });
    });
  });
});

export {};
