/**
 * @license
 * Copyright 2021 Google LLC.
 * SPDX-License-Identifier: Apache-2.0
 */

// [START maps_webgl_tilt_rotation]
async function initMap() {
  const { LatLng } = await google.maps.importLibrary("core") as google.maps.CoreLibrary;
  const { Map, RenderingType } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

  const center = new LatLng(37.790211, -122.389607); // Downtown San Francisco, CA

  const map = new Map(
    document.getElementById("map") as HTMLElement,
    {
      center,
      zoom: 17,
      heading: 280,
      tilt: 67.5,
      renderingType: RenderingType.VECTOR,
    }
  );

  const buttons: [string, string, number, google.maps.ControlPosition][] = [
    ["Rotate Left", "rotate", 20, google.maps.ControlPosition.LEFT_CENTER],
    ["Rotate Right", "rotate", -20, google.maps.ControlPosition.RIGHT_CENTER],
    ["Tilt Down", "tilt", 20, google.maps.ControlPosition.TOP_CENTER],
    ["Tilt Up", "tilt", -20, google.maps.ControlPosition.BOTTOM_CENTER],
  ];

  buttons.forEach(([text, mode, amount, position]) => {
    const controlDiv = document.createElement("div");
    const controlUI = document.createElement("button");

    controlUI.classList.add("ui-button");
    controlUI.innerText = `${text}`;
    controlUI.addEventListener("click", () => {
      adjustMap(mode, amount);
    });
    controlDiv.appendChild(controlUI);
    map.controls[position].push(controlDiv);
  });

  const adjustMap = function (mode: string, amount: number) {
    switch (mode) {
      case "tilt":
        map.setTilt(map.getTilt()! + amount);
        break;
      case "rotate":
        map.setHeading(map.getHeading()! + amount);
        break;
      default:
        break;
    }
  };
  
}

initMap();
// [END maps_webgl_tilt_rotation]
export {};