/* eslint-disable */
export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYmxhY2tjdWJlcyIsImEiOiJjazc4MHQxeXAwZG5rM2ltOWc1NTV4dXY3In0.1HJOv2jH1Vg_GsXhiIWOkw';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/blackcubes/ck8f2ekqy0rzk1iljn5bg3fn6',
    minZoom: 10,
    maxZoom: 19
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
};

export const displayHomeMap = () => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYmxhY2tjdWJlcyIsImEiOiJjazc4MHQxeXAwZG5rM2ltOWc1NTV4dXY3In0.1HJOv2jH1Vg_GsXhiIWOkw';

  const geoJson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-118.449444, 34.062678]
        },
        properties: {
          description: 'Regency Village Theater'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-118.2505173, 34.050838]
        },
        properties: {
          description: 'Million Dollar Theater'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-118.3911507, 33.903495]
        },
        properties: {
          description: 'ArcLight Cinemas - Beach Cities'
        }
      }
    ]
  };

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/blackcubes/ck8f2ekqy0rzk1iljn5bg3fn6',
    scrollZoom: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  geoJson.features.forEach(function(marker) {
    var el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: bottom
    })
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30,
      closeOnClick: false
    })
      .setLngLat(marker.geometry.coordinates)
      .setHTML(
        '<p class="map-paragraph">' + marker.properties.description + '</p>'
      )
      .addTo(map);

    bounds.extend(marker.geometry.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 50,
      right: 50
    }
  });

  map.on('load', function() {
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geoJson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [
              [-118.449444, 34.062678],
              [-118.2505173, 34.050838],
              [-118.3911507, 33.903495]
            ]
          }
        }
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#FF0000',
        'line-opacity': 0.6,
        'line-width': 3
      }
    });
  });
};
