/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
   * Returns a random lat lng position within the map bounds.
   * @param {!google.maps.Map} map
   * @return {!google.maps.LatLngLiteral}
   */
 function getRandomPosition(map) {
    const bounds = map.getBounds();
    const minLat = bounds.getSouthWest().lat();
    const minLng = bounds.getSouthWest().lng();
    const maxLat = bounds.getNorthEast().lat();
    const maxLng = bounds.getNorthEast().lng();
  
    const latRange = maxLat - minLat;
  
    // Note: longitude can span from a positive longitude in the west to a
    // negative one in the east. e.g. 150lng (150E) <-> -30lng (30W) is a large
    // span that covers the whole USA.
    let lngRange = maxLng - minLng;
    if (maxLng < minLng) {
      lngRange += 360;
    }
  
    return {
      lat: minLat + Math.random() * latRange,
      lng: minLng + Math.random() * lngRange,
    };
  }

  const total = 100;
  const intersectionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('drop');
        intersectionObserver.unobserve(entry.target);
      }
    }
  });
  
  async function initMap(): Promise<void> {
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    const position = {lat: 37.4242011827985, lng: -122.09242296450893};

    const map = new Map(document.getElementById("map") as HTMLElement, {
      zoom: 14,
      center: position,
      mapId: '4504f8b37365c3d0',
    });

    // Create 100 markers to animate.
    google.maps.event.addListenerOnce(map, 'idle', () => {
      for (let i = 0; i < 100; i++) {
        createMarker(map, AdvancedMarkerElement);
      }
    });
  
    // Add a button to reset the example.
    const controlDiv = document.createElement("div");
    const controlUI = document.createElement("button");
  
    controlUI.classList.add("ui-button");
    controlUI.innerText = "Reset the example";
    controlUI.addEventListener("click", () => {
      // Reset the example by reloading the map iframe.
      refreshMap();
    });
    controlDiv.appendChild(controlUI);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(controlDiv);
  }
 
  function createMarker(map, AdvancedMarkerElement) {    
    const advancedMarker = new AdvancedMarkerElement({
      position: getRandomPosition(map),
      map: map,
    });
    const content = advancedMarker.content as HTMLElement;
    content.style.opacity = '0'; 
    content.addEventListener('animationend', (event) => { 
      content.classList.remove('drop');
      content.style.opacity = '1';
    });
    const time = 2 + Math.random(); // 2s delay for easy to see the animation
    content.style.setProperty('--delay-time', time +'s');
    intersectionObserver.observe(content);
  }

  function refreshMap() {
      // Refresh the map.
      const mapContainer = document.getElementById('mapContainer');
      const map = document.getElementById('map');
      map!.remove();
      const mapDiv = document.createElement('div');
      mapDiv.id = 'map';
      mapContainer!.appendChild(mapDiv);
      initMap();
  }

initMap();
export { };