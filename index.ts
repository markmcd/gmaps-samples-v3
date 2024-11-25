/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Creates a series of custom controls to demonstrate positioning
 * of controls within a map.
 */

/**
 * MakeControl adds a control to the map.
 * This constructor takes the controlDIV name and label text as arguments.
 */
function MakeControl(controlDiv: HTMLElement, label: string) {
  // Set up the control border.
  const controlUI = document.createElement("div");

  controlUI.title = label;
  controlUI.className = "controlUI";
  controlDiv.appendChild(controlUI);

  // Set up the inner control.
  const controlText = document.createElement("div");

  controlText.innerHTML = label;
  controlText.className = "controlText";
  controlUI.appendChild(controlText);
}

function initialize() {
  const mapDiv = document.getElementById("map") as HTMLElement;
  const mapOptions = {
    zoom: 11,
    center: { lat: 47.46, lng: -122.52 },
    disableDefaultUI: true,
  };
  const map = new google.maps.Map(mapDiv, mapOptions);

  const controlText = [
    ["TOP_LEFT", google.maps.ControlPosition.TOP_LEFT],
    ["LEFT_TOP", google.maps.ControlPosition.LEFT_TOP],
    ["TOP_CENTER", google.maps.ControlPosition.TOP_CENTER],
    ["TOP_RIGHT", google.maps.ControlPosition.TOP_RIGHT],
    ["RIGHT_TOP", google.maps.ControlPosition.RIGHT_TOP],
    ["LEFT_CENTER", google.maps.ControlPosition.LEFT_CENTER],
    ["RIGHT_CENTER", google.maps.ControlPosition.RIGHT_CENTER],
    ["BOTTOM_LEFT", google.maps.ControlPosition.BOTTOM_LEFT],
    ["LEFT_BOTTOM", google.maps.ControlPosition.LEFT_BOTTOM],
    ["BOTTOM_CENTER", google.maps.ControlPosition.BOTTOM_CENTER],
    ["BOTTOM_RIGHT", google.maps.ControlPosition.BOTTOM_RIGHT],
    ["RIGHT_BOTTOM", google.maps.ControlPosition.RIGHT_BOTTOM],
  ];

  for (let i = 0; i < controlText.length; i++) {
    const divLabel = controlText[i][0] as string;
    const divName = document.createElement("div");

    MakeControl(divName, divLabel);
    // @ts-ignore
    map.controls[controlText[i][1]].push(divName);
  }
}

declare global {
  interface Window {
    initialize: () => void;
  }
}
window.initialize = initialize;
export {};
