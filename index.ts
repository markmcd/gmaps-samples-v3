/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

function initMap(): void {
  const origin = { lat: -33.871, lng: 151.197 };

  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 18,
      center: origin,
    }
  );

  new ClickEventHandler(map, origin);
}

function isIconMouseEvent(
  e: google.maps.MapMouseEvent | google.maps.IconMouseEvent
): e is google.maps.IconMouseEvent {
  return "placeId" in e;
}

class ClickEventHandler {
  origin: google.maps.LatLngLiteral;
  map: google.maps.Map;
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;
  placesService: google.maps.places.PlacesService;
  infowindow: google.maps.InfoWindow;
  infowindowContent: HTMLElement;
  constructor(map: google.maps.Map, origin: google.maps.LatLngLiteral) {
    this.origin = origin;
    this.map = map;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(map);
    this.placesService = new google.maps.places.PlacesService(map);
    this.infowindow = new google.maps.InfoWindow();
    this.infowindowContent = document.getElementById(
      "infowindow-content"
    ) as HTMLElement;
    this.infowindow.setContent(this.infowindowContent);

    // Listen for clicks on the map.
    this.map.addListener("click", this.handleClick.bind(this));
  }

  handleClick(event: google.maps.MapMouseEvent | google.maps.IconMouseEvent) {
    console.log("You clicked on: " + event.latLng);

    // If the event has a placeId, use it.
    if (isIconMouseEvent(event)) {
      console.log("You clicked on place:" + event.placeId);

      // Calling e.stop() on the event prevents the default info window from
      // showing.
      // If you call stop here when there is no placeId you will prevent some
      // other map click event handlers from receiving the event.
      event.stop();

      if (event.placeId) {
        this.calculateAndDisplayRoute(event.placeId);
        this.getPlaceInformation(event.placeId);
      }
    }
  }

  calculateAndDisplayRoute(placeId: string) {
    const me = this;

    this.directionsService
      .route({
        origin: this.origin,
        destination: { placeId: placeId },
        travelMode: google.maps.TravelMode.WALKING,
      })
      .then((response) => {
        me.directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to " + status));
  }

  getPlaceInformation(placeId: string) {
    const me = this;

    this.placesService.getDetails(
      { placeId: placeId },
      (
        place: google.maps.places.PlaceResult | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (
          status === "OK" &&
          place &&
          place.geometry &&
          place.geometry.location
        ) {
          me.infowindow.close();
          me.infowindow.setPosition(place.geometry.location);
          (
            me.infowindowContent.children["place-icon"] as HTMLImageElement
          ).src = place.icon as string;
          (
            me.infowindowContent.children["place-name"] as HTMLElement
          ).textContent = place.name!;
          (
            me.infowindowContent.children["place-id"] as HTMLElement
          ).textContent = place.place_id as string;
          (
            me.infowindowContent.children["place-address"] as HTMLElement
          ).textContent = place.formatted_address as string;
          me.infowindow.open(me.map);
        }
      }
    );
  }
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
