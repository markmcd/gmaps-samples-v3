// [START maps_control_custom_state]
let map;
const chicago = { lat: 41.85, lng: -87.65 };

/**
 * The CenterControl adds a control to the map that recenters the map on
 * Chicago.
 */
class CenterControl {
  map_;
  center_;
  constructor(controlDiv, map, center) {
    this.map_ = map;
    // Set the center property upon construction
    this.center_ = new google.maps.LatLng(center);
    controlDiv.style.clear = "both";

    // Set CSS for the control border
    const goCenterUI = document.createElement("div");

    goCenterUI.id = "goCenterUI";
    goCenterUI.title = "Click to recenter the map";
    controlDiv.appendChild(goCenterUI);

    // Set CSS for the control interior
    const goCenterText = document.createElement("div");

    goCenterText.id = "goCenterText";
    goCenterText.innerHTML = "Center Map";
    goCenterUI.appendChild(goCenterText);

    // Set CSS for the setCenter control border
    const setCenterUI = document.createElement("div");

    setCenterUI.id = "setCenterUI";
    setCenterUI.title = "Click to change the center of the map";
    controlDiv.appendChild(setCenterUI);

    // Set CSS for the control interior
    const setCenterText = document.createElement("div");

    setCenterText.id = "setCenterText";
    setCenterText.innerHTML = "Set Center";
    setCenterUI.appendChild(setCenterText);
    // Set up the click event listener for 'Center Map': Set the center of
    // the map
    // to the current center of the control.
    goCenterUI.addEventListener("click", () => {
      const currentCenter = this.center_;

      this.map_.setCenter(currentCenter);
    });
    // Set up the click event listener for 'Set Center': Set the center of
    // the control to the current center of the map.
    setCenterUI.addEventListener("click", () => {
      const newCenter = this.map_.getCenter();

      if (newCenter) {
        this.center_ = newCenter;
      }
    });
  }
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: chicago,
  });

  // Create the DIV to hold the control and call the CenterControl()
  // constructor passing in this DIV.
  const centerControlDiv = document.createElement("div");
  const control = new CenterControl(centerControlDiv, map, chicago);

  centerControlDiv.index = 1;
  centerControlDiv.style.paddingTop = "10px";
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
}
// [END maps_control_custom_state]