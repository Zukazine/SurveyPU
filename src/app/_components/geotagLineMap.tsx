// components/GeotagLinesMap.js
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import the Mapbox GL CSS

mapboxgl.accessToken = 'pk.eyJ1IjoienVrYXppbmUiLCJhIjoiY2x3ZzZhZnBlMDFqczJqbzc4cWRoa3huMCJ9.NMAXOL6N04GuU6zcwz77Hw'; // Replace with your Mapbox access token

const GeotagLineMap = ({ geotagLine }) => {
  const mapContainer = useRef(null);
  const [hasGeotagLines, setHasGeotagLines] = useState(true);

  useEffect(() => {
    if (
      !geotagLine ||
      !geotagLine.features ||
      geotagLine.features.length === 0
    ) {
      setHasGeotagLines(false);
      return;
    }

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [106.8272, -6.1751], // Default center (Jakarta, Indonesia)
      zoom: 5,
    });

    const lines = geotagLine.features.map(
      (feature) => feature.geometry.coordinates
    );

    map.on('load', () => {
      lines.forEach((line, index) => {
        map.addSource(`line${index}`, {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: line,
            },
          },
        });

        map.addLayer({
          id: `line${index}`,
          type: 'line',
          source: `line${index}`,
          layout: {},
          paint: {
            'line-color': '#FF0000',
            'line-width': 3,
          },
        });
      });

      if (lines.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        lines.forEach((line) => line.forEach((point) => bounds.extend(point)));
        map.fitBounds(bounds, { padding: 20 });
      }
    });

    return () => map.remove();
  }, [geotagLine]);

  return (
    <div className="w-full h-96">
      {hasGeotagLines ? (
        <div ref={mapContainer} className="w-full h-full"></div>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <p>No geotag line information available</p>
        </div>
      )}
    </div>
  );
};

export default GeotagLineMap;
