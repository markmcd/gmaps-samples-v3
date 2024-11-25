/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let map: google.maps.Map;

function initMap(): void {
  // set up the map
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: new google.maps.LatLng(0, 0),
    zoom: 4,
  });
}

function loadGeoJsonString(geoString: string) {
  try {
    const geojson = JSON.parse(geoString) as any;

    map.data.addGeoJson(geojson);
  } catch (e) {
    alert("Not a GeoJSON file!");
  }

  zoom(map);
}

/**
 * Update a map's viewport to fit each geometry in a dataset
 */
function zoom(map: google.maps.Map) {
  const bounds = new google.maps.LatLngBounds();

  map.data.forEach((feature) => {
    const geometry = feature.getGeometry();

    if (geometry) {
      processPoints(geometry, bounds.extend, bounds);
    }
  });
  map.fitBounds(bounds);
}

/**
 * Process each point in a Geometry, regardless of how deep the points may lie.
 */
function processPoints(
  geometry: google.maps.LatLng | google.maps.Data.Geometry,
  callback: any,
  thisArg: google.maps.LatLngBounds
) {
  if (geometry instanceof google.maps.LatLng) {
    callback.call(thisArg, geometry);
  } else if (geometry instanceof google.maps.Data.Point) {
    callback.call(thisArg, geometry.get());
  } else {
    // @ts-ignore
    geometry.getArray().forEach((g) => {
      processPoints(g, callback, thisArg);
    });
  }
}

/* DOM (drag/drop) functions */
function initEvents() {
  [...document.getElementsByClassName("file")].forEach((fileElement) => {
    fileElement.addEventListener(
      "dragstart",
      (e: Event) => {
        // @ts-ignore
        e.dataTransfer.setData(
          "text/plain",
          JSON.stringify(files[Number((e.target as HTMLElement).dataset.value)])
        );
        console.log(e);
      },
      false
    );
  });

  // set up the drag & drop events
  const mapContainer = document.getElementById("map") as HTMLElement;

  mapContainer.addEventListener("dragenter", addClassToDropTarget, false);
  mapContainer.addEventListener("dragover", addClassToDropTarget, false);
  mapContainer.addEventListener("drop", handleDrop, false);
  mapContainer.addEventListener("dragleave", removeClassFromDropTarget, false);
}

function addClassToDropTarget(e: Event) {
  e.stopPropagation();
  e.preventDefault();
  document.getElementById("map")!.classList.add("over");
  return false;
}

function removeClassFromDropTarget(e: Event) {
  document.getElementById("map")!.classList.remove("over");
}

function handleDrop(e: DragEvent) {
  e.preventDefault();
  e.stopPropagation();
  removeClassFromDropTarget(e);

  const files = (e.dataTransfer as DataTransfer).files;

  if (files.length) {
    // process file(s) being dropped
    // grab the file data from each file
    for (let i = 0, file; (file = files[i]); i++) {
      const reader = new FileReader();

      reader.onload = function (e) {
        loadGeoJsonString(reader.result as string);
      };

      reader.onerror = function (e) {
        console.error("reading failed");
      };

      reader.readAsText(file);
    }
  } else {
    // process non-file (e.g. text or html) content being dropped
    // grab the plain text version of the data
    const plainText = (e.dataTransfer as DataTransfer).getData("text/plain");

    console.log(plainText);

    if (plainText) {
      loadGeoJsonString(plainText);
    }
  }

  // prevent drag event from bubbling further
  return false;
}

function initialize() {
  initMap();
  initEvents();
}

const files = [
  {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-99.49218749999999, -11.867350911459294],
              [24.960937499999996, -11.867350911459294],
              [24.960937499999996, 47.517200697839414],
              [-99.49218749999999, 47.517200697839414],
              [-99.49218749999999, -11.867350911459294],
            ],
          ],
        },
      },
    ],
  },
  {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [81.2109375, 50.064191736659104],
        },
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [103.35937499999999, -47.98992166741417],
        },
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [-46.05468749999999, 64.01449619484472],
        },
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [-113.203125, 37.996162679728116],
        },
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [-73.828125, -32.249974455863295],
        },
      },
    ],
  },
  {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
            [147.65625, -5.266007882805485],
            [118.47656249999999, 43.83452678223682],
            [80.85937499999999, -30.145127183376115],
            [35.15625, 51.83577752045248],
            [-15.468749999999998, -23.563987128451217],
            [-29.53125, 44.33956524809713],
            [-73.47656249999999, -32.842673631954305],
            [-104.765625, 35.460669951495305],
          ],
        },
      },
    ],
  },
];

declare global {
  interface Window {
    initialize: () => void;
  }
}
window.initialize = initialize;
export {};
