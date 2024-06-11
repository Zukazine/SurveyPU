// components/GeotagAreasMap.js
import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import the Mapbox GL CSS

const GeotagAreasMap = ({ geotagArea, map }) => {
  useEffect(() => {
    if (!geotagArea || !geotagArea.features || geotagArea.features.length === 0 || !map) {
      return;
    }

    geotagArea.features.forEach((feature) => {
      const coordinates = feature.geometry.coordinates[0];
      const polygon = new mapboxgl.LngLatBounds();

      coordinates.forEach((point) => {
        polygon.extend(point);
      });

      new mapboxgl.Popup()
        .setLngLat(polygon.getCenter())
        .setHTML('<p>Custom HTML for polygon</p>')
        .addTo(map);

      new mapboxgl.Popup()
        .setLngLat(polygon.getCenter())
        .setHTML('<p>Custom HTML for polygon</p>')
        .addTo(map);

      map.addLayer({
        id: 'polygon',
        type: 'fill',
        source: {
          type: 'geojson',
          data: feature,
        },
        layout: {},
        paint: {
          'fill-color': '#0080ff',
          'fill-opacity': 0.5,
        },
      });
    });

    const bounds = new mapboxgl.LngLatBounds();
    geotagArea.features.forEach((feature) => {
      feature.geometry.coordinates[0].forEach((point) => {
        bounds.extend(point);
      });
    });
    map.fitBounds(bounds, { padding: 20 });
  }, [geotagArea, map]);

  return null;
};

export default GeotagAreasMap;
