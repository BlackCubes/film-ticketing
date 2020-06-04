/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiYmxhY2tjdWJlcyIsImEiOiJjazc4MHQxeXAwZG5rM2ltOWc1NTV4dXY3In0.1HJOv2jH1Vg_GsXhiIWOkw';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/blackcubes/ck8f2ekqy0rzk1iljn5bg3fn6'
  // interactive: false,
  // zoom: 10,
  // scrollZoom: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(loc.geo.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30,
    closeOnClick: false
  })
    .setLngLat(loc.geo.coordinates)
    .setHTML(`<p class="map-paragraph">${loc.name}</p>`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(loc.geo.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 50,
    right: 50
  }
});
