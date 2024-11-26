/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// [START maps_3d_map_simple]
async function initMap(): Promise<void> {
    console.log('Maps JavaScript API loaded.');
}

declare global {
    interface Window {
        initMap: () => void;
    }
}
window.initMap = initMap;
// [END maps_3d_map_simple]
export { };
