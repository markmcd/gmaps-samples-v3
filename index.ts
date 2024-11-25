/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Load the Visualization API and the columnchart package.
// @ts-ignore TODO update to newest visualization library
google.load("visualization", "1", { packages: ["columnchart"] });

function initMap(): void {
  // The following path marks a path from Mt. Whitney, the highest point in the
  // continental United States to Badwater, Death Valley, the lowest point.
  const path = [
    { lat: 36.579, lng: -118.292 }, // Mt. Whitney
    { lat: 36.606, lng: -118.0638 }, // Lone Pine
    { lat: 36.433, lng: -117.951 }, // Owens Lake
    { lat: 36.588, lng: -116.943 }, // Beatty Junction
    { lat: 36.34, lng: -117.468 }, // Panama Mint Springs
    { lat: 36.24, lng: -116.832 },
  ]; // Badwater, Death Valley

  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 8,
      center: path[1],
      mapTypeId: "terrain",
    }
  );

  // Create an ElevationService.
  const elevator = new google.maps.ElevationService();

  // Draw the path, using the Visualization API and the Elevation service.
  displayPathElevation(path, elevator, map);
}

function displayPathElevation(
  path: google.maps.LatLngLiteral[],
  elevator: google.maps.ElevationService,
  map: google.maps.Map
) {
  // Display a polyline of the elevation path.
  new google.maps.Polyline({
    path: path,
    strokeColor: "#0000CC",
    strokeOpacity: 0.4,
    map: map,
  });

  // Create a PathElevationRequest object using this array.
  // Ask for 256 samples along that path.
  // Initiate the path request.
  elevator
    .getElevationAlongPath({
      path: path,
      samples: 256,
    })
    .then(plotElevation)
    .catch((e) => {
      const chartDiv = document.getElementById(
        "elevation_chart"
      ) as HTMLElement;

      // Show the error code inside the chartDiv.
      chartDiv.innerHTML = "Cannot show elevation: request failed because " + e;
    });
}

// Takes an array of ElevationResult objects, draws the path on the map
// and plots the elevation profile on a Visualization API ColumnChart.
function plotElevation({ results }: google.maps.PathElevationResponse) {
  const chartDiv = document.getElementById("elevation_chart") as HTMLElement;

  // Create a new chart in the elevation_chart DIV.
  const chart = new google.visualization.ColumnChart(chartDiv);

  // Extract the data from which to populate the chart.
  // Because the samples are equidistant, the 'Sample'
  // column here does double duty as distance along the
  // X axis.
  const data = new google.visualization.DataTable();

  data.addColumn("string", "Sample");
  data.addColumn("number", "Elevation");

  for (let i = 0; i < results.length; i++) {
    data.addRow(["", results[i].elevation]);
  }

  // Draw the chart using the data within its DIV.
  chart.draw(data, {
    height: 150,
    legend: "none",
    // @ts-ignore TODO update to newest visualization library
    titleY: "Elevation (m)",
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
