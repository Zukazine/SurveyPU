import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Map, NavigationControl, Source, Layer } from 'react-map-gl';

const TOKEN = 'pk.eyJ1IjoienVrYXppbmUiLCJhIjoiY2x3ZzZhZnBlMDFqczJqbzc4cWRoa3huMCJ9.NMAXOL6N04GuU6zcwz77Hw';

// @ts-ignore
const MapComponent = ({ geotagData, type }) => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    // @ts-ignore
    const map = mapRef.current?.getMap();

    if (mapLoaded && map) {
      // Clear previous layers
      // @ts-ignore
      markers.forEach(marker => marker.remove());
      setMarkers([]);

      if (map.getLayer('line')) {
        map.removeLayer('line');
      }
      if (map.getSource('line')) {
        map.removeSource('line');
      }
      if (map.getLayer('polygon')) {
        map.removeLayer('polygon');
      }
      if (map.getSource('polygon')) {
        map.removeSource('polygon');
      }

      // Remove all point layers
      const layers = map.getStyle().layers;
      // @ts-ignore
      layers.forEach(layer => {
        if (layer.id.startsWith('point')) {
          if (map.getLayer(layer.id)) {
            map.removeLayer(layer.id);
          }
          if (map.getSource(layer.id)) {
            map.removeSource(layer.id);
          }
        }
      });

      if (!geotagData || !geotagData.features || geotagData.features.length === 0) {
        setMapLoaded(false);
        return;
      }

      if (type === 'Point') {
        // @ts-ignore
        const newMarkers = geotagData.features.map((feature, index) => {
          const marker = new mapboxgl.Marker()
            .setLngLat(feature.geometry.coordinates)
            .addTo(map);
          return marker;
        });
        setMarkers(newMarkers);

      } else if (type === 'LineString') {
        map.addSource('line', {
          type: 'geojson',
          data: geotagData,
        });
        map.addLayer({
          id: 'line',
          type: 'line',
          source: 'line',
          layout: {},
          paint: {
            'line-color': '#FF0000',
            'line-width': 3,
          },
        });
      } else if (type === 'Polygon') {
        map.addSource('polygon', {
          type: 'geojson',
          data: geotagData,
        });
        map.addLayer({
          id: 'polygon',
          type: 'fill',
          source: 'polygon',
          layout: {},
          paint: {
            'fill-color': '#0080ff',
            'fill-opacity': 0.5,
          },
        });
      }

      const bounds = new mapboxgl.LngLatBounds();
      // @ts-ignore
      geotagData.features.forEach((feature) => {
        if (feature.geometry.type === 'Point') {
          bounds.extend(feature.geometry.coordinates);
        } else if (feature.geometry.type === 'LineString' || feature.geometry.type === 'Polygon') {
          // @ts-ignore
          feature.geometry.coordinates.forEach((coord) => bounds.extend(coord));
        }
      });
      map.fitBounds(bounds, { padding: 20 });
    }
  }, [geotagData, type, mapLoaded]);

  const onMapLoad = useCallback(() => {
    setMapLoaded(true);
  }, []);

  return (
    <div className="w-full h-96">
      {geotagData && geotagData.features && geotagData.features.length > 0 ? (
        <Map
          ref={mapRef}
          mapboxAccessToken={TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          initialViewState={{
            longitude: 106.8272,
            latitude: -6.1751,
            zoom: 5,
          }}
          onLoad={onMapLoad}
          style={{ width: '100%', height: '100%' }}
        >
          <NavigationControl position="top-right" />
        </Map>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <p>No geotag {type.toLowerCase()} information available</p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
