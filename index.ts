/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * This example creates a map with an info window that shows whether
 * the map render type is raster or vector.
 */

 function initMap() {
    const center = {lat: 0, lng: 0};
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center,
      zoom: 10,
      heading: 0.0,
      tilt: 0.0,
      // Map ID for a vector map.
      mapId: '6ff586e93e18149f',
    });
    const canvas = document.createElement("canvas");
    const infoWindow = new google.maps.InfoWindow({
      content: '',
      ariaLabel: 'Raster/Vector',
      position: center,
    });
    infoWindow.open({
      map,
    });
  
    map.addListener('renderingtype_changed', () => {
      infoWindow.setContent(`${map.getRenderingType()}`);
    });
  }

  declare global {
    interface Window {
      initMap: () => void;
    }
  }
  window.initMap = initMap;
  export {};