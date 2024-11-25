/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example creates a custom overlay called USGSOverlay, containing
// a U.S. Geological Survey (USGS) image of the relevant area on the map.

// Set the custom overlay object's prototype to a new instance
// of OverlayView. In effect, this will subclass the overlay class therefore
// it's simpler to load the API synchronously, using
// google.maps.event.addDomListener().
// Note that we set the prototype to an instance, rather than the
// parent class itself, because we do not wish to modify the parent class.

// Initialize the map and the custom overlay.
function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 11,
      center: { lat: 62.323907, lng: -150.109291 },
      mapTypeId: "satellite",
    }
  );

  const bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(62.281819, -150.287132),
    new google.maps.LatLng(62.400471, -150.005608)
  );

  // The photograph is courtesy of the U.S. Geological Survey.
  const srcImage =
    "https://developers.google.com/maps/documentation/" +
    "javascript/examples/full/images/talkeetna.png";

  // The custom USGSOverlay object contains the USGS image,
  // the bounds of the image, and a reference to the map.
  class USGSOverlay extends google.maps.OverlayView {
    private bounds_: google.maps.LatLngBounds;
    private image_: string;
    private div_: HTMLElement | null;

    constructor(bounds: google.maps.LatLngBounds, image: string) {
      super();

      // Initialize all properties.
      this.bounds_ = bounds;
      this.image_ = image;

      // Define a property to hold the image's div. We'll
      // actually create this div upon receipt of the onAdd()
      // method so we'll leave it null for now.
      this.div_ = null;
    }

    /**
     * onAdd is called when the map's panes are ready and the overlay has been
     * added to the map.
     */
    onAdd() {
      this.div_ = document.createElement("div");
      this.div_.style.borderStyle = "none";
      this.div_.style.borderWidth = "0px";
      this.div_.style.position = "absolute";

      // Create the img element and attach it to the div.
      const img = document.createElement("img");

      img.src = this.image_;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.position = "absolute";
      this.div_.appendChild(img);

      // Add the element to the "overlayLayer" pane.
      const panes = this.getPanes()!;

      panes.overlayLayer.appendChild(this.div_);
    }

    draw() {
      // We use the south-west and north-east
      // coordinates of the overlay to peg it to the correct position and size.
      // To do this, we need to retrieve the projection from the overlay.
      const overlayProjection = this.getProjection();

      // Retrieve the south-west and north-east coordinates of this overlay
      // in LatLngs and convert them to pixel coordinates.
      // We'll use these coordinates to resize the div.
      const sw = overlayProjection.fromLatLngToDivPixel(
        this.bounds_.getSouthWest()
      )!;
      const ne = overlayProjection.fromLatLngToDivPixel(
        this.bounds_.getNorthEast()
      )!;

      // Resize the image's div to fit the indicated dimensions.
      if (this.div_) {
        this.div_.style.left = sw.x + "px";
        this.div_.style.top = ne.y + "px";
        this.div_.style.width = ne.x - sw.x + "px";
        this.div_.style.height = sw.y - ne.y + "px";
      }
    }

    /**
     * The onRemove() method will be called automatically from the API if
     * we ever set the overlay's map property to 'null'.
     */
    onRemove() {
      if (this.div_) {
        (this.div_.parentNode as HTMLElement).removeChild(this.div_);
        this.div_ = null;
      }
    }
  }

  const overlay = new USGSOverlay(bounds, srcImage);

  overlay.setMap(map);
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
