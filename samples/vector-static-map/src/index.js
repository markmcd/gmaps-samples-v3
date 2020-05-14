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

// [START maps_vector_static_map]
// Initialize and add the side by side maps
function initMap() {
  const sharedOptions = {
    mapId: "ed1309c122a3dfcb",
    center: { lat: 47.609414458375674, lng: -122.33897030353548 },
    zoom: 17,
    disableDefaultUI: true,
    gestureHandling: "none"
  };

  new google.maps.Map(document.getElementById("dynamic"), {
    ...sharedOptions,
    useStaticMap: false
  });

  new google.maps.Map(document.getElementById("static"), {
    ...sharedOptions,
    useStaticMap: true
  });
}
// [END maps_vector_static_map]
export { initMap };
