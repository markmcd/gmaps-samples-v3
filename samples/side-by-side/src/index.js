/*
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let mapLeft, mapRight;

// [START maps_side_by_side]
function initMap() {
  const mapOptions = {
    center: { lat: 35, lng: -110 },
    zoom: 8,
    scaleControl: false,
    streetViewControl: false
  };

  // instantiate the map on the left with control positioning
  mapLeft = new google.maps.Map(document.getElementById("map-left"), {
    ...mapOptions,
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    },
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
    },
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    }
  });

  // instantiate the map on the right with control positioning
  mapRight = new google.maps.Map(document.getElementById("map-right"), {
    ...mapOptions,
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    }
  });

  // helper function to keep maps in sync
  function sync(...maps) {
    let center, zoom;

    function update(ignore) {
      maps.forEach(m => {
        if (m === ignore) {
          return;
        }
        m.setCenter(center);
        m.setZoom(zoom);
      });
    }

    maps.forEach(m => {
      m.addListener("bounds_changed", () => {
        const changedCenter = m.getCenter();
        const changedZoom = m.getZoom();

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
    const width = document.getElementById("container").offsetWidth;
    console.log(width);
    document.getElementById("map-left").style.width = `${width}px`;
    document.getElementById("map-right").style.width = `${width}px`;
  }

  // trigger to set map container size since using absolute
  handleContainerResize();
  // add event listener
  window.addEventListener("resize", handleContainerResize);

  Split(["#left", "#right"], {
    sizes: [25, 75]
  });
}
// [END maps_side_by_side]
export { initMap, mapLeft, mapRight };
