// components/Map.js
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; 

mapboxgl.accessToken = 'pk.eyJ1IjoienVrYXppbmUiLCJhIjoiY2x3ZzZhZnBlMDFqczJqbzc4cWRoa3huMCJ9.NMAXOL6N04GuU6zcwz77Hw';  // Replace with your Mapbox access token

const GeotagPointMap = ({ geotagPoint }) => {
  const mapContainer = useRef(null);
  const [hasGeotagPoints, setHasGeotagPoints] = useState(true);

  useEffect(() => {
    if (
      !geotagPoint ||
      !geotagPoint.features ||
      geotagPoint.features.length === 0
    ) {
      setHasGeotagPoints(false);
      return;
    }

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [106.8272, -6.1751], // Default center (Jakarta, Indonesia)
      zoom: 5,
    });

    const points = geotagPoint.features.map(
      (feature) => feature.geometry.coordinates
    );

    map.on('load', () => {
      points.forEach((point) => {
        new mapboxgl.Marker().setLngLat([point[0], point[1]]).addTo(map);
      });

      if (points.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        points.forEach((point) => bounds.extend([point[0], point[1]]));
        map.fitBounds(bounds, { padding: 20 });
      }
    });

    return () => map.remove();
  }, [geotagPoint]);

  return (
    <div className="w-full h-96">
      {hasGeotagPoints ? (
        <div ref={mapContainer} className="w-full h-full"></div>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <p>No geotag point information available</p>
        </div>
      )}
    </div>
  );
};

export default GeotagPointMap;
