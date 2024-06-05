// GLOBAL
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

// CSS
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = 'pk.eyJ1IjoienVrYXppbmUiLCJhIjoiY2x3ZzZhZnBlMDFqczJqbzc4cWRoa3huMCJ9.NMAXOL6N04GuU6zcwz77Hw'

type MapFieldProps = {
  id: string;
  initialGeoJsonData: GeoJSON.FeatureCollection<GeoJSON.Geometry>;
  onChange: (id : string, input: GeoJSON.GeoJsonObject | null) => void;
  type?: string;
}

const MapDraw: React.FC<MapFieldProps> = ({ id, initialGeoJsonData, onChange, type }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const drawRef = useRef<MapboxDraw | null>(null);
  const [is500px, setIs500px] = useState(window.matchMedia("(max-width: 500px)").matches);
  const [geoJsonData, setGeoJsonData] = useState<GeoJSON.FeatureCollection<GeoJSON.Geometry>>(initialGeoJsonData);

  const defaultCenter = [113.9213, 0.7893];
  const defaultZoom = 5;

  useEffect(() => {
    const initializeMap = () => {
      if (!mapRef.current) {
        const map = new mapboxgl.Map({
          container: mapContainerRef.current!,
          style: 'mapbox://styles/mapbox/streets-v11',
          // @ts-ignore
          center: defaultCenter,
          zoom: defaultZoom,
        });

        mapRef.current = map;

        // DRAW
        if (type === 'point') {
          const draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
              point: true,
              trash: true,
            },
          });
          
          drawRef.current = draw;
          map.addControl(draw);
        } else if (type === 'line') {
          const draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
              line_string: true,
              trash: true,
            },
          });
          
          drawRef.current = draw;
          map.addControl(draw);
        } else if (type === 'polygon'){
          const draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
              polygon: true,
              trash: true,
            },
          });
          
          drawRef.current = draw;
          map.addControl(draw);
        } else {
          const draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
              polygon: true,
              point: true,
              line_string: true,
              trash: true,
            },
          });
          
          drawRef.current = draw;
          map.addControl(draw);
        }

        // GEOCODER
        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
          marker: true,
          placeholder: 'Search for places',
        });

        map.addControl(geocoder, 'top-left');

        // FULLSCREEN
        const fullscreenControl = new mapboxgl.FullscreenControl();
        map.addControl(fullscreenControl, 'top-left');

        // GEOLOCATE
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
      // @ts-ignore
      const data = drawRef.current?.getAll();
      if (data) {
        setGeoJsonData(data);
        onChange(id, data);
      }
    };

    initializeMap();

  }, [id, onChange]);

  
	const handleStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newStyle = event.target.value;
		if (mapRef.current) { 
			mapRef.current.setStyle(`mapbox://styles/mapbox/${newStyle}`);
		}
		};

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");

    // @ts-ignore
    const handleMediaQueryChange = (e) => {
      setIs500px(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

	return (
		<>
			<div ref={mapContainerRef} style={{ width: '100%', height: '500px' }} />
      <div>
        <p className='font-semibold w-full text-wrap text-md mb-3 mt-3'>Ganti Style Peta</p>
        <select id="mapStyle" onChange={handleStyleChange} className='border border-indigo-500/30 rounded-md outline-indigo-500 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm hover:border-indigo-500/80 w-full text-wrap'>
          <option value="streets-v11">Streets</option>
          <option value="satellite-v9">Satellite</option>
          <option value="light-v10">Light</option>
        </select>
      </div>
      <p className='font-semibold w-full text-wrap text-md mb-3 mt-4'>Preview Data Spasial </p>
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
  