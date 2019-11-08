{% extends '../../../shared/layout.tpl'%} {% block html %}
<!-- [START html-body] -->
<div id="map"></div>
<!-- Hide controls until they are moved into the map. -->
<div style="display:none">
  <div class="controls zoom-control">
    <button class="zoom-control-in" title="Zoom In">+</button>
    <button class="zoom-control-out" title="Zoom Out">−</button>
  </div>
  <div class="controls maptype-control maptype-control-is-map">
    <button class="maptype-control-map" title="Show road map">Map</button>
    <button class="maptype-control-satellite" title="Show satellite imagery">
      Satellite
    </button>
  </div>
  <div class="controls fullscreen-control">
    <button title="Toggle Fullscreen">
      <div class="fullscreen-control-icon fullscreen-control-top-left"></div>
      <div class="fullscreen-control-icon fullscreen-control-top-right"></div>
      <div class="fullscreen-control-icon fullscreen-control-bottom-left"></div>
      <div
        class="fullscreen-control-icon fullscreen-control-bottom-right"
      ></div>
    </button>
  </div>
</div>
<!-- [END html-body] -->

{% endblock %}
