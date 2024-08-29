import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = 'pk.eyJ1IjoienVrYXppbmUiLCJhIjoiY2x3ZzZhZnBlMDFqczJqbzc4cWRoa3huMCJ9.NMAXOL6N04GuU6zcwz77Hw';

type MapFieldProps = {
  id: string;
  initialGeoJsonData: GeoJSON.FeatureCollection<GeoJSON.Geometry>;
  onChange: (id: string, input: GeoJSON.GeoJsonObject | null) => void;
  type?: string;
  complex?: boolean;
}

const MapDraw: React.FC<MapFieldProps> = ({ id, initialGeoJsonData, onChange, type, complex }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const drawRef = useRef<MapboxDraw | null>(null);
  const [geoJsonData, setGeoJsonData] = useState<GeoJSON.FeatureCollection<GeoJSON.Geometry>>(initialGeoJsonData);
  const [coordinates, setCoordinates] = useState<string>('');
  const [is500px, setIs500px] = useState(false);
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/navigation-night-v1');
  const defaultCenter = [113.9213, 0.7893];
  const defaultZoom = 5;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia("(max-width: 500px)");
      setIs500px(mediaQuery.matches);

      const handleResize = () => setIs500px(mediaQuery.matches);
      mediaQuery.addEventListener('change', handleResize);

      return () => {
        mediaQuery.removeEventListener('change', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    const initializeMap = () => {
      if (!mapRef.current) {
        const map = new mapboxgl.Map({
          container: mapContainerRef.current!,
          style: mapStyle,
          center: defaultCenter,
          zoom: defaultZoom,
        });

        mapRef.current = map;

        const draw = new MapboxDraw({
          displayControlsDefault: false,
          controls: {
            point: type === 'point' || !type,
            line_string: type === 'line' || !type,
            polygon: type === 'polygon' || !type,
            trash: true,
          },
          styles: drawStyles
        });

        drawRef.current = draw;
        map.addControl(draw);

        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
          marker: true,
          placeholder: 'Search for places',
        });

        map.addControl(geocoder, 'top-left');

        const fullscreenControl = new mapboxgl.FullscreenControl();
        map.addControl(fullscreenControl, 'top-left');

        const geolocateControl = new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
          fitBoundsOptions: {
            maxZoom: 5
          }
        });

        map.addControl(geolocateControl, 'top-left');

        map.on('draw.create', updateArea);
        map.on('draw.delete', updateArea);
        map.on('draw.update', updateArea);

        map.on('load', () => {
          geolocateControl.trigger();
        });

        return () => {
          map.off('draw.create', updateArea);
          map.off('draw.delete', updateArea);
          map.off('draw.update', updateArea);
          map.remove();
        };
      }
    };

    const updateArea = () => {
      const data = drawRef.current?.getAll();
      if (data) {
        setGeoJsonData(data);
        onChange(id, data);
      }
    };

    initializeMap();

  }, [id, onChange, defaultCenter, type, mapStyle]);

  const handleStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStyle = event.target.value;
    if (selectedStyle === 'google-hybrid') {
      const map = mapRef.current;
      map?.setStyle({
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

  const handleCoordinateSearch = () => {
    const [lat, lng] = coordinates.split(',').map(coord => parseFloat(coord.trim()));

    if (mapRef.current && !isNaN(lat) && !isNaN(lng)) {
      mapRef.current.flyTo({
        center: [lng, lat],
        essential: true,
        zoom: 15,
      });
    } else {
      alert('Invalid coordinates. Please enter valid latitude and longitude.');
    }
  };

  return (
    <>
      <div ref={mapContainerRef} style={{ width: '100%', height: '500px' }} />
      <div>
        <p className='font-semibold w-full text-wrap text-md mb-3 mt-3'>Ganti Style Peta</p>
        <select id="mapStyle" onChange={handleStyleChange} className='border border-indigo-500/30 rounded-md outline-indigo-500 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm hover:border-indigo-500/80 w-full text-wrap'>
          <option value="navigation-night-v1">Navigation</option>
          <option value="streets-v12">Streets</option>
          <option value="satellite-streets-v12">Satellite</option>
          <option value="outdoors-v12">Outdoors</option>
          <option value="google-hybrid">Google Hybrid</option>
        </select>
      </div>
      <div>
        <p className='font-semibold w-full text-wrap text-md mb-3 mt-3'>Cari via koordinat</p>
        <input
          type="text"
          value={coordinates}
          onChange={(e) => setCoordinates(e.target.value)}
          placeholder="-6.246219380289081, 106.78173827163099"
          className='border border-indigo-500/30 rounded-md outline-indigo-500 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm hover:border-indigo-500/80 w-full text-wrap mb-3'
        />
        <button
          onClick={handleCoordinateSearch}
          type='button'
          className='bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600'
        >
          Zoom to Coordinate
        </button>
      </div>
      <p className='font-semibold w-full text-wrap text-md mb-3 mt-4'>Preview Data Spasial</p>
      <div className='flex border border-indigo-500/50 rounded-lg max-h-[500px] overflow-y-scroll myscrollbar-child'>
        {is500px ? (
          <div>
            <p className='m-5 pb-5 text-sm text-wrap'>{JSON.stringify(geoJsonData, null, 2)}</p>
          </div>
        ) : (
          <div>
            <pre className='m-5 pb-5 text-sm'>{JSON.stringify(geoJsonData, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
};

export default MapDraw;

export const drawStyles = [
  {
    'id': 'gl-draw-point-inactive',
    'type': 'circle',
    'filter': ['all', ['==', '$type', 'Point'], ['==', 'meta', 'feature']],
    'paint': {
      'circle-radius': 5,
      'circle-color': '#ff0000'
    }
  },
  {
    'id': 'gl-draw-point-active',
    'type': 'circle',
    'filter': ['all', ['==', '$type', 'Point'], ['==', 'meta', 'feature'], ['==', 'active', 'true']],
    'paint': {
      'circle-radius': 7,
      'circle-color': '#ff0000'
    }
  },
  {
    'id': 'gl-draw-line-inactive',
    'type': 'line',
    'filter': ['all', ['==', '$type', 'LineString'], ['==', 'meta', 'feature']],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#ff0000',
      'line-width': 2
    }
  },
  {
    'id': 'gl-draw-line-active',
    'type': 'line',
    'filter': ['all', ['==', '$type', 'LineString'], ['==', 'meta', 'feature'], ['==', 'active', 'true']],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#ff0000',
      'line-width': 4
    }
  },
  {
    'id': 'gl-draw-polygon-fill-inactive',
    'type': 'fill',
    'filter': ['all', ['==', '$type', 'Polygon'], ['==', 'meta', 'feature']],
    'paint': {
      'fill-color': '#ff0000',
      'fill-opacity': 0.5
    }
  },
  {
    'id': 'gl-draw-polygon-fill-active',
    'type': 'fill',
    'filter': ['all', ['==', '$type', 'Polygon'], ['==', 'meta', 'feature'], ['==', 'active', 'true']],
    'paint': {
      'fill-color': '#ff0000',
      'fill-opacity': 0.7
    }
  },
  {
    'id': 'gl-draw-polygon-stroke-inactive',
    'type': 'line',
    'filter': ['all', ['==', '$type', 'Polygon'], ['==', 'meta', 'feature']],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#ff0000',
      'line-width': 2
    }
  },
  {
    'id': 'gl-draw-polygon-stroke-active',
    'type': 'line',
    'filter': ['all', ['==', '$type', 'Polygon'], ['==', 'meta', 'feature'], ['==', 'active', 'true']],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#ff0000',
      'line-width': 4
    }
  }
];
