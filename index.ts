/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let map;
function setStyle(/* FeatureStyleFunctionOptions */ params) {
    // Get the dataset feature, so we can work with all of its attributes.
    const datasetFeature = params.feature;
    // Get all of the needed dataset attributes.
    const furColors = datasetFeature.datasetAttributes['CombinationofPrimaryandHighlightColor'];

    // Apply styles. Fill is primary fur color, stroke is secondary fur color.
    switch (furColors) {
        case 'Black+':
            return /* FeatureStyleOptions */ { fillColor: 'black', pointRadius: 8 };
            break;
        case 'Cinnamon+':
            return /* FeatureStyleOptions */ { fillColor: '#8b0000', pointRadius: 8 };
            break;
        case 'Cinnamon+Gray':
            return /* FeatureStyleOptions */ { fillColor: '#8b0000', strokeColor: 'gray', pointRadius: 6 };
            break;
        case 'Cinnamon+White':
            return /* FeatureStyleOptions */ { fillColor: '#8b0000', strokeColor: 'white', pointRadius: 6 };
            break;
        case 'Gray+':
            return /* FeatureStyleOptions */ { fillColor: 'gray', pointRadius: 8 };
            break;
        case 'Gray+Cinnamon':
            return /* FeatureStyleOptions */ { fillColor: 'gray', strokeColor: '#8b0000', pointRadius: 6 };
            break;
        case 'Gray+Cinnamon, White':
            return /* FeatureStyleOptions */ { fillColor: 'silver', strokeColor: '#8b0000', pointRadius: 6 };
            break;
        case 'Gray+White':
            return /* FeatureStyleOptions */ { fillColor: 'gray', strokeColor: 'white', pointRadius: 6 };
            break;
        default: // Color not defined.
            return /* FeatureStyleOptions */ { fillColor: 'yellow', pointRadius: 8 };
            break; 
    }
}

async function initMap() {
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary;

    const position = {lat: 40.780101, lng: -73.967780};
    const map = new Map(document.getElementById('map') as HTMLElement, {
        zoom: 17,
        center: position,
        mapId: 'b98e588c46685dd7',
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
    });

    // Add the data legend.
    makeLegend(map);

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
    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(attributionDiv);
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

function makeLegend(map) {
    let colors = {
        'black': ['black'],
        'cinnamon': ['#8b0000'],
        'cinnamon + gray': ['#8b0000','gray'],
        'cinnamon + white': ['#8b0000', 'white'],
        'gray': ['gray'],
        'gray + cinnamon': ['gray', '#8b0000'],
        'gray + cinnamon + white': ['silver', '#8b0000'],
        'gray + white': ['gray', 'white'],
        'no color data': ['yellow'],
    };
    let legend = document.createElement('div');
    legend.id = 'legend';
    let title = document.createElement('div');
    title.innerText = 'Fur Colors';
    title.classList.add('title');
    legend.appendChild(title);
    let k;
    for (k in colors) {
        let wrapper = document.createElement('div');
        wrapper.id = 'container';
        let box = document.createElement('div');
        box.style.backgroundColor = colors[k][0];
        if (colors[k][1]) {
            box.style.borderColor = colors[k][1];
        } else {
            box.style.borderColor = colors[k][0];
        }
        box.classList.add('box');
        let txt = document.createElement('div');
        txt.classList.add('legend');
        txt.innerText = k;
        wrapper.appendChild(box);
        wrapper.appendChild(txt);
        legend.appendChild(wrapper);
    }
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(legend);
}

initMap();
export { };
