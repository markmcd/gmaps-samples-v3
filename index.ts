/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let map: google.maps.Map;

const chicago = { lat: 41.85, lng: -87.65 };

/**
 * Creates a control that recenters the map on Chicago.
 */
 function createCenterControl(map) {
  const controlButton = document.createElement('button');

  // Set CSS for the control.
  controlButton.style.backgroundColor = '#fff';
  controlButton.style.border = '2px solid #fff';
  controlButton.style.borderRadius = '3px';
  controlButton.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlButton.style.color = 'rgb(25,25,25)';
  controlButton.style.cursor = 'pointer';
  controlButton.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlButton.style.fontSize = '16px';
  controlButton.style.lineHeight = '38px';
  controlButton.style.margin = '8px 0 22px';
  controlButton.style.padding = '0 5px';
  controlButton.style.textAlign = 'center';
  
  controlButton.textContent = 'Center Map';
  controlButton.title = 'Click to recenter the map';
  controlButton.type = 'button';

  // Setup the click event listeners: simply set the map to Chicago.
  controlButton.addEventListener('click', () => {
    map.setCenter(chicago);
  });
  
  return controlButton;
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    zoom: 12,
    center: chicago,
  });

  // Create the DIV to hold the control.
  const centerControlDiv = document.createElement('div');
  // Create the control.
  const centerControl = createCenterControl(map);
  // Append the control to the DIV.
  centerControlDiv.appendChild(centerControl);
  
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
