'use client'

import { useState, useRef } from 'react';
import MapComponent from './mapComponent';

const ShowMapData = () => {
  const [surveyId, setSurveyId] = useState('');
  const [surveyData, setSurveyData] = useState(null);
  const [style, setStyle] = useState('');
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const fetchSurveyData = async () => {
    const response = await fetch(`/api/surveys/${surveyId}`);
    const data = await response.json();
    setSurveyData(data);
  };

  return (
    <div className="container mx-auto p-4 h-screen overflow-y-scroll myscrollbar-child">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Survey ID"
          value={surveyId}
          onChange={(e) => setSurveyId(e.target.value)}
          className="border p-2 mr-2 border-indigo-500/30 outline-indigo-500 rounded text-sm "
        />
        <button onClick={fetchSurveyData} className="bg-indigo-500 text-white p-2 text-xs shadow-[2px_2px_0px_black] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
          Show Map
        </button>
      </div>
      
      {surveyData ? (
        <div className='flex flex-col '>
          <h2 className="text-xl mb-4">Geotagging Point</h2>
          {/* @ts-ignore */}
          <MapComponent geotagData={surveyData.geotagPoint} type="Point"/>
          <h2 className="text-xl mt-8 mb-4">Geotagging Line</h2>
          {/* @ts-ignore */}
          <MapComponent geotagData={surveyData.geotagLine} type="LineString"/>
          <h2 className="text-xl mt-8 mb-4">Geotagging Area Infrastruktur</h2>
          {/* @ts-ignore */}
          <MapComponent geotagData={surveyData.geotagAreaInfra} type="Polygon"/>
          <h2 className="text-xl mt-8 mb-4">Geotagging Area Manfaat</h2>
          {/* @ts-ignore */}
          <MapComponent geotagData={surveyData.geotagAreaManf} type="Polygon"/>
        </div>
      ) : (
        <p className='text-[13px] font-mono'>No survey data available. Please enter a valid survey ID.</p>
      )}
    </div>
  );
}

export default ShowMapData;