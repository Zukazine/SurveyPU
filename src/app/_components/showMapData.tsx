// pages/index.js
import { useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import GeotagLineMap from './geotagLineMap';
import GeotagPointMap from './geotagPointMap';

const ShowMapData = () => {
  const [surveyId, setSurveyId] = useState('');
  const [surveyData, setSurveyData] = useState(null);

  const fetchSurveyData = async () => {
    const response = await fetch(`/api/surveys/${surveyId}`);
    const data = await response.json();
    setSurveyData(data);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Survey ID"
          value={surveyId}
          onChange={(e) => setSurveyId(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={fetchSurveyData} className="bg-blue-500 text-white p-2">
          Fetch Survey Data
        </button>
      </div>
      {surveyData ? (
        <div>
          <h2 className="text-xl mb-4">Geotag Points</h2>
          {/* @ts-ignore */}
          <GeotagPointMap geotagPoint={surveyData.geotagPoint} />
          <h2 className="text-xl mt-8 mb-4">Geotag Lines</h2>
          {/* @ts-ignore */}
          <GeotagLineMap geotagLine={surveyData.geotagLine} />
        </div>
      ) : (
        <p>No survey data available. Please enter a valid survey ID.</p>
      )}
    </div>
  );
}

export default ShowMapData;