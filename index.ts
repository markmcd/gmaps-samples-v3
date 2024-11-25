/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

const mapStyle: google.maps.MapTypeStyle[] = [
  {
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ visibility: "on" }, { color: "#fcfcfc" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ visibility: "on" }, { color: "#bfd4ff" }],
  },
];
let map: google.maps.Map;

let censusMin = Number.MAX_VALUE,
  censusMax = -Number.MAX_VALUE;

function initMap(): void {
  // load the map
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: { lat: 40, lng: -100 },
    zoom: 4,
    styles: mapStyle,
  });

  // set up the style rules and events for google.maps.Data
  map.data.setStyle(styleFeature);
  map.data.addListener("mouseover", mouseInToRegion);
  map.data.addListener("mouseout", mouseOutOfRegion);

  // wire up the button
  const selectBox = document.getElementById(
    "census-variable"
  ) as HTMLSelectElement;

  google.maps.event.addDomListener(selectBox, "change", () => {
    clearCensusData();
    loadCensusData(selectBox.options[selectBox.selectedIndex].value);
  });

  // state polygons only need to be loaded once, do them now
  loadMapShapes();
}

/** Loads the state boundary polygons from a GeoJSON source. */
function loadMapShapes() {
  // load US state outline polygons from a GeoJson file
  map.data.loadGeoJson(
    "https://storage.googleapis.com/mapsdevsite/json/states.js",
    { idPropertyName: "STATE" }
  );

  // wait for the request to complete by listening for the first feature to be
  // added
  google.maps.event.addListenerOnce(map.data, "addfeature", () => {
    google.maps.event.trigger(
      document.getElementById("census-variable") as HTMLElement,
      "change"
    );
  });
}

/**
 * Loads the census data from a simulated API call to the US Census API.
 *
 * @param {string} variable
 */
function loadCensusData(variable: string) {
  // load the requested variable from the census API (using local copies)
  const xhr = new XMLHttpRequest();

  xhr.open("GET", variable + ".json");

  xhr.onload = function () {
    const censusData = JSON.parse(xhr.responseText) as any;

    censusData.shift(); // the first row contains column names
    censusData.forEach((row: string) => {
      const censusVariable = parseFloat(row[0]);
      const stateId = row[1];

      // keep track of min and max values
      if (censusVariable < censusMin) {
        censusMin = censusVariable;
      }

      if (censusVariable > censusMax) {
        censusMax = censusVariable;
      }

      const state = map.data.getFeatureById(stateId);

      // update the existing row with the new data
      if (state) {
        state.setProperty("census_variable", censusVariable);
      }
    });

    // update and display the legend
    (document.getElementById("census-min") as HTMLElement).textContent =
      censusMin.toLocaleString();
    (document.getElementById("census-max") as HTMLElement).textContent =
      censusMax.toLocaleString();
  };

  xhr.send();
}

/** Removes census data from each shape on the map and resets the UI. */
function clearCensusData() {
  censusMin = Number.MAX_VALUE;
  censusMax = -Number.MAX_VALUE;
  map.data.forEach((row) => {
    row.setProperty("census_variable", undefined);
  });
  (document.getElementById("data-box") as HTMLElement).style.display = "none";
  (document.getElementById("data-caret") as HTMLElement).style.display = "none";
}

/**
 * Applies a gradient style based on the 'census_variable' column.
 * This is the callback passed to data.setStyle() and is called for each row in
 * the data set.  Check out the docs for Data.StylingFunction.
 *
 * @param {google.maps.Data.Feature} feature
 */
function styleFeature(feature: google.maps.Data.Feature) {
  const low = [5, 69, 54]; // color of smallest datum
  const high = [151, 83, 34]; // color of largest datum

  let censusVariable = feature.getProperty("census_variable") as number;

  // delta represents where the value sits between the min and max
  const delta =
    (censusVariable - censusMin) /
    (censusMax - censusMin);

  const color: number[] = [];

  for (let i = 0; i < 3; i++) {
    // calculate an integer color based on the delta
    color.push((high[i] - low[i]) * delta + low[i]);
  }

  // determine whether to show this shape or not
  let showRow = true;

  if (
    censusVariable == null ||
    isNaN(censusVariable)
  ) {
    showRow = false;
  }

  let outlineWeight = 0.5,
    zIndex = 1;

  if (feature.getProperty("state") === "hover") {
    outlineWeight = zIndex = 2;
  }

  return {
    strokeWeight: outlineWeight,
    strokeColor: "#fff",
    zIndex: zIndex,
    fillColor: "hsl(" + color[0] + "," + color[1] + "%," + color[2] + "%)",
    fillOpacity: 0.75,
    visible: showRow,
  };
}

/**
 * Responds to the mouse-in event on a map shape (state).
 *
 * @param {?google.maps.MapMouseEvent} e
 */
function mouseInToRegion(e: any) {
  // set the hover state so the setStyle function can change the border
  e.feature.setProperty("state", "hover");

  const percent =
    ((e.feature.getProperty("census_variable") - censusMin) /
      (censusMax - censusMin)) *
    100;

  // update the label
  (document.getElementById("data-label") as HTMLElement).textContent =
    e.feature.getProperty("NAME");
  (document.getElementById("data-value") as HTMLElement).textContent = e.feature
    .getProperty("census_variable")
    .toLocaleString();
  (document.getElementById("data-box") as HTMLElement).style.display = "block";
  (document.getElementById("data-caret") as HTMLElement).style.display =
    "block";
  (document.getElementById("data-caret") as HTMLElement).style.paddingLeft =
    percent + "%";
}

/**
 * Responds to the mouse-out event on a map shape (state).
 *
 */
function mouseOutOfRegion(e: any) {
  // reset the hover state, returning the border to normal
  e.feature.setProperty("state", "normal");
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
