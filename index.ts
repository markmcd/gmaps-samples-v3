/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */


declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitFullscreenElement?: Element;
    onwebkitfullscreenchange?: any;
    onmsfullscreenchange?: any;
    onmozfullscreenchange?: any;
  }

  interface HTMLElement {
    msRequestFullScreen?: () => Promise<void>;
    mozRequestFullScreen?: () => Promise<void>;
    webkitRequestFullScreen?: () => Promise<void>;
  }
}

let map: google.maps.Map;

function initMap(): void {
  map = new google.maps.Map(document.querySelector("#map") as HTMLElement, {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
    disableDefaultUI: true,
  });

  initZoomControl(map);
  initMapTypeControl(map);
  initFullscreenControl(map);
}

function initZoomControl(map: google.maps.Map) {
  (document.querySelector(".zoom-control-in") as HTMLElement).onclick =
    function () {
      map.setZoom(map.getZoom()! + 1);
    };

  (document.querySelector(".zoom-control-out") as HTMLElement).onclick =
    function () {
      map.setZoom(map.getZoom()! - 1);
    };

  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
    document.querySelector(".zoom-control") as HTMLElement
  );
}

function initMapTypeControl(map: google.maps.Map) {
  const mapTypeControlDiv = document.querySelector(
    ".maptype-control"
  ) as HTMLElement;

  (document.querySelector(".maptype-control-map") as HTMLElement).onclick =
    function () {
      mapTypeControlDiv.classList.add("maptype-control-is-map");
      mapTypeControlDiv.classList.remove("maptype-control-is-satellite");
      map.setMapTypeId("roadmap");
    };

  (
    document.querySelector(".maptype-control-satellite") as HTMLElement
  ).onclick = function () {
    mapTypeControlDiv.classList.remove("maptype-control-is-map");
    mapTypeControlDiv.classList.add("maptype-control-is-satellite");
    map.setMapTypeId("hybrid");
  };

  map.controls[google.maps.ControlPosition.LEFT_TOP].push(mapTypeControlDiv);
}

function initFullscreenControl(map: google.maps.Map) {
  const elementToSendFullscreen = map.getDiv().firstChild as HTMLElement;
  const fullscreenControl = document.querySelector(
    ".fullscreen-control"
  ) as HTMLElement;

  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(fullscreenControl);

  fullscreenControl.onclick = function () {
    if (isFullscreen(elementToSendFullscreen)) {
      exitFullscreen();
    } else {
      requestFullscreen(elementToSendFullscreen);
    }
  };

  document.onwebkitfullscreenchange =
    document.onmsfullscreenchange =
    document.onmozfullscreenchange =
    document.onfullscreenchange =
      function () {
        if (isFullscreen(elementToSendFullscreen)) {
          fullscreenControl.classList.add("is-fullscreen");
        } else {
          fullscreenControl.classList.remove("is-fullscreen");
        }
      };
}

function isFullscreen(element: HTMLElement) {
  return (
    (document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement) == element
  );
}

function requestFullscreen(element: HTMLElement) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullScreen) {
    element.msRequestFullScreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
