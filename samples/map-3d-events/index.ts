/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// [START maps_map_3d_event]
async function initMap() {
    // Request needed libraries.
    //@ts-ignore
    await google.maps.importLibrary("maps3d") as google.maps.Maps3DLibrary;
    //@ts-ignore
    const mapElement = document.querySelector('gmp-map-3d') as google.maps.maps3d.Map3DElement;

    const events =
        [...document.querySelectorAll('aside > p')].map(i => i.textContent);
    
    customElements.whenDefined(mapElement.localName).then(() => {
      for (const event of events) {
        mapElement.addEventListener(event, () => {
          const eventElement = document.querySelector(`#${event}`);
          eventElement?.classList.add('active');
          setTimeout(() => {
            eventElement?.classList.remove('active');
          }, 1000);
        });
      }
    });
}

initMap();
// [END maps_map_3d_event]
export { };