# srcs generated with:
# bazel query "kind(fileinputs, //samples/...)" | awk '{ print "\"" $1 "\"," }' | awk '{a[i++]=$0} END {for (j=i-1; j>=0;) print a[j--] }'

SAMPLES = [
    "add-map",
    "aerial-rotation",
    "aerial-simple",
    "circle-simple",
    "combining-data",
    "conserve-map-on-scroll",
    "control-bounds-restriction",
    "control-custom",
    "control-custom-state",
    "control-default",
    "control-disableUI",
    "control-options",
    "control-positioning",
    "control-positioning-labels",
    "control-replacement",
    "control-simple",
    "controls-basic-map",
    "custom-markers",
    "deckgl-points",
    "delete-vertex-menu",
    "directions-complex",
    "directions-draggable",
    "directions-panel",
    "directions-simple",
    "directions-travel-modes",
    "directions-waypoints",
    "disable-zoom-and-pan",
    "distance-matrix",
    "drawing-tools",
    "earthquake-circles",
    "earthquake-heatmap",
    "earthquake-heatmap-weighted",
    "earthquake-markers",
    "elevation-paths",
    "elevation-simple",
    "event-arguments",
    "event-click-latlng",
    "event-closure",
    "event-domListener",
    "event-poi",
    "event-properties",
    "event-simple",
    "geocoding-component-restriction",
    "geocoding-place-id",
    "geocoding-region-es",
    "geocoding-region-us",
    "geocoding-reverse",
    "geocoding-simple",
    "geometry-encodings",
    "geometry-headings",
    "groundoverlay-simple",
    "hiding-features",
    "icon-complex",
    "icon-simple",
    "infowindow-simple",
    "infowindow-simple-max",
    "inset-map",
    "interaction-cooperative",
    "interaction-default",
    "interaction-disable-pan-zoom",
    "interaction-greedy",
    "interaction-none",
    "interaction-restricted",
    "kml-map",
    "landing-page-add-map",
    "landing-page-marker-clustering",
    "landing-page-visualize-data",
    "layer-bicycling",
    "layer-data-dragndrop",
    "layer-data-dynamic",
    "layer-data-event",
    "layer-data-polygon",
    "layer-data-quakes",
    "layer-data-quakes-red",
    "layer-data-quakes-simple",
    "layer-data-simple",
    "layer-data-style",
    # "layer-georss",
    "layer-heatmap",
    "layer-kml",
    "layer-kml-features",
    "layer-traffic",
    "layer-transit",
    "legend",
    "local-context-basic",
    "local-context-events",
    "local-context-home",
    "local-context-restrictions",
    "local-context-styles",
    "map-coordinates",
    "map-events",
    "map-geolocation",
    "map-id-style",
    "map-language",
    "map-latlng-literal",
    "map-projection-simple",
    "map-puzzle",
    "map-rtl",
    "map-simple",
    "map-sync",
    "maptype-base",
    "maptype-image",
    "maptype-image-overlay",
    "maptype-overlay",
    "maptype-styled-simple",
    "marker-animations",
    "marker-animations-iteration",
    "marker-clustering",
    "marker-collision-management",
    "marker-labels",
    "marker-remove",
    "marker-simple",
    "marker-symbol-custom",
    "marker-symbol-predefined",
    "maxzoom-simple",
    "mysql-to-maps",
    "overlay-hideshow",
    "overlay-popup",
    "overlay-remove",
    "overlay-simple",
    "overlay-symbol-animate",
    "overlay-symbol-arrow",
    "overlay-symbol-custom",
    "overlay-symbol-dashed",
    "place-details",
    "place-id",
    "place-search",
    "place-search-pagination",
    "places-autocomplete",
    "places-autocomplete-addressform",
    "places-autocomplete-directions",
    "places-autocomplete-hotelsearch",
    "places-autocomplete-multiple-countries",
    "places-autocomplete-service",
    "places-placeid-finder",
    "places-placeid-geocoder",
    "places-queryprediction",
    "places-searchbox",
    "poly-containsLocation",
    "polygon-arrays",
    "polygon-autoclose",
    "polygon-draggable",
    "polygon-hole",
    "polygon-simple",
    "polyline-complex",
    "polyline-remove",
    "polyline-simple",
    "programmatic-load",
    "programmatic-load-button",
    "rectangle-event",
    "rectangle-simple",
    "rectangle-zoom",
    "split-map-panes",
    "store-locator",
    "streetview-controls",
    "streetview-custom-simple",
    "streetview-custom-tiles",
    "streetview-embed",
    "streetview-events",
    "streetview-overlays",
    "streetview-service",
    "streetview-simple",
    "style-array",
    "style-selector",
    "user-editable-shapes",
    "vector-use-static-map",
]
