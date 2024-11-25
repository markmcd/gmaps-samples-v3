/**
* @license
* Copyright 2022 Google LLC. All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

/**
* This is the simplest possible example. It calls the styling function with a Place ID.
*/

let map: google.maps.Map;
//@ts-ignore
let featureLayer;

async function initMap() {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

  map = new Map(document.getElementById('map') as HTMLElement, {
    center: { lat: 20.773, lng: -156.01 }, // Hana, HI
    zoom: 12,
    // In the cloud console, configure this Map ID with a style that enables the
    // "Locality" feature layer.
    mapId: 'a3efe1c035bad51b', // <YOUR_MAP_ID_HERE>,
  });

  //@ts-ignore
  featureLayer = map.getFeatureLayer('LOCALITY');
  
  // Define a style with purple fill and border.
  //@ts-ignore
  const featureStyleOptions: google.maps.FeatureStyleOptions = {
    strokeColor: '#810FCB',
    strokeOpacity: 1.0,
    strokeWeight: 3.0,
    fillColor: '#810FCB',
    fillOpacity: 0.5
  };

  // Apply the style to a single boundary.
  //@ts-ignore
  featureLayer.style = (options: { feature: { placeId: string; }; }) => {
    if (options.feature.placeId == 'ChIJ0zQtYiWsVHkRk8lRoB1RNPo') { // Hana, HI
      return featureStyleOptions;
    }
  };

}

initMap();
export {};
