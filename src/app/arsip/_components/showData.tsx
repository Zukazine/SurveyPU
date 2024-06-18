'use client'

import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

interface Survey {
  id: number;
  tanggalSurvey: string;
  pic: string;
  provinsi: string;
  kapri: string;
  ditjen: string;
  objInfra: string;
	geotagPoint: GeoJSON.GeoJsonObject | {};
	geotagLine: GeoJSON.GeoJsonObject | {};
	geotagAreaInfra: GeoJSON.GeoJsonObject | {};
	geotagAreaManf: GeoJSON.GeoJsonObject | {};
}

const ShowData: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [surveys, setSurveys] = useState<Survey[]>([]);

  const fetchSurveys = async () => {
    const { data } = await axios.get('/api/filterData', {
      params: { startDate, endDate },
    });
    setSurveys(data);
  };

  const fetchTodaySurveys = async () => {
    const today = new Date().toISOString().split('T')[0];
    const { data } = await axios.get('/api/filterData', {
      params: { startDate: today, endDate: today },
    });
    setSurveys(data);
  };

  const fetchAllSurveys = async () => {
    const { data } = await axios.get('/api/filterData', {
      params: { startDate: '', endDate: '' },
    });
    setSurveys(data);
  };

  const downloadCSV = () => {
    const transformedSurveys = surveys.map(survey => ({
      ...survey,
      geotagPoint: JSON.stringify(survey.geotagPoint),
      geotagLine: JSON.stringify(survey.geotagLine),
      geotagAreaInfra: JSON.stringify(survey.geotagAreaInfra),
      geotagAreaManf: JSON.stringify(survey.geotagAreaManf),
    }));
    const csv = Papa.unparse(transformedSurveys);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'surveys.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
        <input
          type="date"
          className="border rounded p-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border rounded p-2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={fetchSurveys}
        >
          Search
        </button>
        <button
          className="bg-green-500 text-white p-2 rounded"
          onClick={fetchTodaySurveys}
        >
          {`Show Today's Data`}
        </button>
        <button
          className="bg-gray-500 text-white p-2 rounded"
          onClick={fetchAllSurveys}
        >
          Show All Data
        </button>
        <button
          className="bg-yellow-500 text-white p-2 rounded"
          onClick={downloadCSV}
        >
          Download CSV
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Tanggal Survey</th>
            <th className="py-2 px-4 border-b">PIC</th>
            <th className="py-2 px-4 border-b">Provinsi</th>
            <th className="py-2 px-4 border-b">Kapri</th>
            <th className="py-2 px-4 border-b">Ditjen</th>
            <th className="py-2 px-4 border-b">Obj Infra</th>
            {/* <th className="py-2 px-4 border-b">Point</th> */}
          </tr>
        </thead>
        <tbody>
          {surveys.map((survey) => (
            <tr key={survey.id}>
              <td className="py-2 px-4 border-b">{survey.id}</td>
              <td className="py-2 px-4 border-b">{new Date(survey.tanggalSurvey).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{survey.pic}</td>
              <td className="py-2 px-4 border-b">{survey.provinsi}</td>
              <td className="py-2 px-4 border-b">{survey.kapri}</td>
              <td className="py-2 px-4 border-b">{survey.ditjen}</td>
              <td className="py-2 px-4 border-b">{survey.objInfra}</td>
              {/* <td className="py-2 px-4 border-b">{JSON.stringify(survey.geotagPoint)}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowData;
