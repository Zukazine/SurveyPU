import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Map, NavigationControl, FullscreenControl } from 'react-map-gl';

const TOKEN = 'pk.eyJ1IjoienVrYXppbmUiLCJhIjoiY2x3ZzZhZnBlMDFqczJqbzc4cWRoa3huMCJ9.NMAXOL6N04GuU6zcwz77Hw';

// @ts-ignore
const MapComponent = ({ geotagData, type }) => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/navigation-night-v1');

  useEffect(() => {
    // @ts-ignore
    const map = mapRef.current?.getMap();

    if (mapLoaded && map) {
      // Clear previous layers 
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
      geotagData.features.forEach((feature) => {
        if (feature.geometry.type === 'Point') {
          bounds.extend(feature.geometry.coordinates);
        } else if (feature.geometry.type === 'LineString' || feature.geometry.type === 'Polygon') {
          feature.geometry.coordinates.forEach((coord) => bounds.extend(coord));
        }
      });
      map.fitBounds(bounds, { padding: 20 });
    }
  }, [geotagData, type, mapLoaded]);

  const onMapLoad = useCallback(() => {
    setMapLoaded(true);
  }, []);

  const handleStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStyle = event.target.value;
    if (selectedStyle === 'google-hybrid') {
      const map = mapRef.current?.getMap();
      map.setStyle({
        version: 8,
        sources: {
          'google-hybrid': {
            type: 'raster',
            tiles: [
              'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
            ],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: 'google-hybrid',
            type: 'raster',
            source: 'google-hybrid',
            minzoom: 0,
            maxzoom: 22,
          },
        ],
      });
    } else {
      setMapStyle(`mapbox://styles/mapbox/${selectedStyle}`);
    }
  };

  return (
    <>
      <div className='my-5'>
        <p className='font-semibold w-full text-wrap text-md mb-3 mt-3'>Ganti Style Peta</p>
        <select
          id="mapStyle"
          onChange={handleStyleChange}
          className='border border-indigo-500/30 rounded-md outline-indigo-500 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm hover:border-indigo-500/80 w-full text-wrap'
        >
          <option value="navigation-night-v1">Navigation</option>
          <option value="streets-v12">Streets</option>
          <option value="satellite-streets-v12">Satellite</option>
          <option value="outdoors-v12">Outdoors</option>
          <option value="google-hybrid">Google Hybrid</option>
        </select>
      </div>

      <div className="w-full h-96">
        {geotagData && geotagData.features && geotagData.features.length > 0 ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={TOKEN}
            mapStyle={mapStyle}
            initialViewState={{
              longitude: 106.8272,
              latitude: -6.1751,
              zoom: 5,
            }}
            onLoad={onMapLoad}
            style={{ width: '100%', height: '100%' }}
          >
            <NavigationControl position="top-right" />
            <FullscreenControl position="top-left" />
          </Map>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <p>No geotag {type.toLowerCase()} information available</p>
          </div>
        )}
      </div>
    </>
  );
};

export default MapComponent;