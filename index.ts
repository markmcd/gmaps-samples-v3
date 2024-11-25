/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

async function initMap() {
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

    const map = new Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 40.76, lng: -101.64 },
        zoom: 5,
        // In the cloud console, configure this Map ID with a style that enables the
        // "Administrative Area Level 1" feature layer.
        mapId: '7ba16be0c9375fa7',
    });

    const featureLayer = map.getFeatureLayer(google.maps.FeatureType.ADMINISTRATIVE_AREA_LEVEL_1);

    featureLayer.style = featureStyleFunctionOptions => {
        const placeFeature = featureStyleFunctionOptions.feature as google.maps.PlaceFeature;
        const population = states[placeFeature.placeId];

        let fillColor;
        // Specify colors using any of the following:
        // * Named ('green')
        // * Hexadecimal ('#FF0000')
        // * RGB ('rgb(0, 0, 255)')
        // * HSL ('hsl(60, 100%, 50%)')

        if (population < 2000000) {
            fillColor = 'green'
        } else if (population < 5000000) {
            fillColor = 'red'
        } else if (population < 10000000) {
            fillColor = 'blue'
        } else if (population < 40000000) {
            fillColor = 'yellow'
        }
        return {
            fillColor,
            fillOpacity: 0.5
        }
    }
    // Population data by state.
    const states = {
        "ChIJdf5LHzR_hogR6czIUzU0VV4": 5039877, // Alabama
        "ChIJG8CuwJzfAFQRNduKqSde27w": 732673, // Alaska
        "ChIJaxhMy-sIK4cRcc3Bf7EnOUI": 7276316, // Arizona
        "ChIJYSc_dD-e0ocR0NLf_z5pBaQ": 3025891, // Arkansas
        "ChIJPV4oX_65j4ARVW8IJ6IJUYs": 39237836, // California
        "ChIJt1YYm3QUQIcR_6eQSTGDVMc": 5812069, // Colorado
        "ChIJpVER8hFT5okR5XBhBVttmq4": 3605597, // Connecticut
        "ChIJO9YMTXYFx4kReOgEjBItHZQ": 1003384, // Delaware
        "ChIJvypWkWV2wYgR0E7HW9MTLvc": 21781128, // Florida
        "ChIJV4FfHcU28YgR5xBP7BC8hGY": 10799566, // Georgia
        "ChIJBeB5Twbb_3sRKIbMdNKCd0s": 1441553, // Hawaii
        "ChIJ6Znkhaj_WFMRWIf3FQUwa9A": 1900923, // Idaho
        "ChIJGSZubzgtC4gRVlkRZFCCFX8": 12671469, // Illinois
        "ChIJHRv42bxQa4gRcuwyy84vEH4": 6805985, // Indiana
        "ChIJGWD48W9e7ocR2VnHV0pj78Y": 3193079, // Iowa
        "ChIJawF8cXEXo4cRXwk-S6m0wmg": 2934582, // Kansas
        "ChIJyVMZi0xzQogR_N_MxU5vH3c": 4509394, // Kentucky
        "ChIJZYIRslSkIIYRA0flgTL3Vck": 4624047, // Louisiana
        "ChIJ1YpTHd4dsEwR0KggZ2_MedY": 1372247, // Maine
        "ChIJ35Dx6etNtokRsfZVdmU3r_I": 6165129, // Maryland
        "ChIJ_b9z6W1l44kRHA2DVTbQxkU": 6984723, // Massachussetts
        "ChIJEQTKxz2qTE0Rs8liellI3Zc": 10050811, // Michigan
        "ChIJmwt4YJpbWE0RD6L-EJvJogI": 5707390, // Minnesota
        "ChIJGdRK5OQyKIYR2qbc6X8XDWI": 2949965, // Mississippi
        "ChIJfeMiSNXmwIcRcr1mBFnEW7U": 6168187, // Misssouri
        "ChIJ04p7LZwrQVMRGGwqz1jWcfU": 1104271, // Montana
        "ChIJ7fwMtciNk4cRxArzDwyQJ6E": 1963692, // Nebraska
        "ChIJcbTe-KEKmYARs5X8qooDR88": 3143991, // Nevada
        "ChIJ66bAnUtEs0wR64CmJa8CyNc": 1388992, // New Hampshire
        "ChIJn0AAnpX7wIkRjW0_-Ad70iw": 9267130, // New Jersey
        "ChIJqVKY50NQGIcRup41Yxpuv0Y": 2115877, // New Mexico
        "ChIJqaUj8fBLzEwRZ5UY3sHGz90": 19835913, // New York
        "ChIJgRo4_MQfVIgRGa4i6fUwP60": 10551162, // North Carolina
        "ChIJY-nYVxKD11IRyc9egzmahA0": 774948, // North Dakota
        "ChIJwY5NtXrpNogRFtmfnDlkzeU": 11780017, // Ohio
        "ChIJnU-ssRE5rIcRSOoKQDPPHF0": 3986639, // Oklahoma
        "ChIJVWqfm3xuk1QRdrgLettlTH0": 4246155, // Oregon
        "ChIJieUyHiaALYgRPbQiUEchRsI": 12964056, // Pennsylvania
        "ChIJD9cOYhQ15IkR5wbB57wYTh4": 1095610, // Rhode Island
        "ChIJ49ExeWml-IgRnhcF9TKh_7k": 5190705, // South Carolina
        "ChIJpTjphS1DfYcRt6SGMSnW8Ac": 895376, // South Dakota
        "ChIJA8-XniNLYYgRVpGBpcEgPgM": 6975218, // Tennessee
        "ChIJSTKCCzZwQIYRPN4IGI8c6xY": 29527941, // Texas
        "ChIJzfkTj8drTIcRP0bXbKVK370": 3337975, // Utah
        "ChIJ_87aSGzctEwRtGtUNnSJTSY": 645570, // Vermont
        "ChIJzbK8vXDWTIgRlaZGt0lBTsA": 8642274, // Virginia
        "ChIJ-bDD5__lhVQRuvNfbGh4QpQ": 7738692, // Washington
        "ChIJRQnL1KVUSogRQzrN3mjHALs": 1782959, // West Virginia
        "ChIJr-OEkw_0qFIR1kmG-LjV1fI": 5895908, // Wisconsin
        "ChIJaS7hSDTiXocRLzh90nkisCY": 578803, // Wyoming
    };
}

initMap();
export { };