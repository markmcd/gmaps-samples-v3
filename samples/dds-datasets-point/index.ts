/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// [START maps_dds_datasets_point]
let map;
// [START maps_dds_datasets_point_style_function]
function setStyle(/* FeatureStyleFunctionOptions */ params) {
    // [START maps_dds_datasets_point_style_get_features]
    // Get the dataset feature, so we can work with all of its attributes.
    const datasetFeature = params.feature;
    // Get the needed dataset attributes.
    const furColors = datasetFeature.datasetAttributes['CombinationofPrimaryandHighlightColor'];

    // Apply styles. Fill is primary fur color, stroke is secondary fur color.
    switch (furColors) {
        case 'Black+':
            return /* FeatureStyleOptions */ { fillColor: 'black', };
            break;
        case 'Cinnamon+':
            return /* FeatureStyleOptions */ { fillColor: '#8b0000' };
            break;
        case 'Cinnamon+Gray':
            return /* FeatureStyleOptions */ { fillColor: '#8b0000', strokeColor: 'gray' };
            break;
        case 'Cinnamon+White':
            return /* FeatureStyleOptions */ { fillColor: '#8b0000', strokeColor: 'white' };
            break;
        case 'Gray+':
            return /* FeatureStyleOptions */ { fillColor: 'gray', };
            break;
        case 'Gray+Cinnamon':
            return /* FeatureStyleOptions */ { fillColor: 'gray', strokeColor: '#8b0000' };
            break;
        case 'Gray+Cinnamon, White':
            return /* FeatureStyleOptions */ { fillColor: 'silver', strokeColor: '#8b0000' };
            break;
        case 'Gray+White':
            return /* FeatureStyleOptions */ { fillColor: 'gray', strokeColor: 'white' };
            break;
        default: // Color not defined.
            return /* FeatureStyleOptions */ { fillColor: 'yellow', };
            break; 
    }
}
// [END maps_dds_datasets_point_style_function]

function initMap() {
    const position = new google.maps.LatLng(40.780101, -73.967780);
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        zoom: 17,
        center: position,
        mapId: 'b98e588c46685dd7',
    });

    // Dataset ID for squirrel dataset.
    const datasetId = '02fa1552-37dd-4a95-844f-f99e1c22541f';
    //@ts-ignore
    const datasetLayer = map.getDatasetFeatureLayer(datasetId);
    //@ts-ignore
    datasetLayer.style = setStyle;

    // Create an attribution DIV and add the attribution to the map.
    const attributionDiv = document.createElement('div');
    const attributionControl = createAttribution(map);
    attributionDiv.appendChild(attributionControl);
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(attributionDiv);
}

// Create a custom control to hold attribution text.
function createAttribution(map) {
    const attributionLabel = document.createElement('div');
    // Define CSS styles.
    attributionLabel.style.backgroundColor = '#fff';
    attributionLabel.style.opacity = '0.7';
    attributionLabel.style.fontFamily = 'Roboto,Arial,sans-serif';
    attributionLabel.style.fontSize = '10px';
    attributionLabel.style.padding = '2px';
    attributionLabel.style.margin = '2px';
    attributionLabel.textContent = 'Data source: NYC Open Data';
    return attributionLabel;
}

declare global {
    interface Window {
        initMap: () => void;
    }
}
window.initMap = initMap;
// [END maps_dds_datasets_point]
export { };