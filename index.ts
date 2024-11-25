/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
let mapLeft: google.maps.Map, mapRight: google.maps.Map;

function initMap(): void {
  const mapOptions = {
    center: { lat: 44.5250489, lng: -110.83819 },
    zoom: 18,
    scaleControl: false,
    streetViewControl: false,
  };

  // instantiate the map on the left with control positioning
  mapLeft = new google.maps.Map(
    document.getElementById("map-left") as HTMLElement,
    {
      ...mapOptions,
      mapTypeId: "satellite",
      tilt: 0, // at high zoom levels we need to maintain the same projection
      fullscreenControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM,
      },
      mapTypeControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP,
      },
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM,
      },
    }
  );

  // instantiate the map on the right with control positioning
  mapRight = new google.maps.Map(
    document.getElementById("map-right") as HTMLElement,
    {
      ...mapOptions,
      fullscreenControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM,
      },
      mapTypeControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP,
      },
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM,
      },
    }
  );

  // helper function to keep maps in sync
  function sync(...maps: google.maps.Map[]) {
    let center: google.maps.LatLng, zoom: number;

    function update(changedMap) {
      maps.forEach((m) => {
        if (m === changedMap) {
          return;
        }

        m.setCenter(center);
        m.setZoom(zoom);
      });
    }

    maps.forEach((m) => {
      m.addListener("bounds_changed", () => {
        const changedCenter = m.getCenter()!;
        const changedZoom = m.getZoom()!;

        if (changedCenter !== center || changedZoom !== zoom) {
          center = changedCenter;
          zoom = changedZoom;
          update(m);
        }
      });
    });
  }

  sync(mapLeft, mapRight);

  function handleContainerResize() {
    const width = (document.getElementById("container") as HTMLElement)
      .offsetWidth;

    (
      document.getElementById("map-left") as HTMLElement
    ).style.width = `${width}px`;
    (
      document.getElementById("map-right") as HTMLElement
    ).style.width = `${width}px`;
  }

  // trigger to set map container size since using absolute
  handleContainerResize();
  // add event listener
  window.addEventListener("resize", handleContainerResize);

  //@ts-ignore
  Split(["#left", "#right"], {
    sizes: [50, 50],
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
