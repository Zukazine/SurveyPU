'use client'

import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

interface Survey {
  id: number;
  tanggalSurvey: string;
  pic: string;
  provinsi: string;
  kapri: string[];
  ditjen: string;
  objInfra: string;
  areaManfaat: string[];
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
          className="border rounded px-2 text-xs border-indigo-500/30 outline-indigo-500 cursor-pointer"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border rounded px-2 text-xs border-indigo-500/30 outline-indigo-500 cursor-pointer"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          className="bg-indigo-500 text-white p-2 rounded text-sm shadow-[2px_2px_0px_black] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
          onClick={fetchSurveys}
        >
          Search
        </button>
        <button
          className="bg-green-500 text-white p-2 rounded text-xs shadow-[2px_2px_0px_black] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
          onClick={fetchTodaySurveys}
        >
          {`Today's Data`}
        </button>
        <button
          className="bg-gray-500 text-white p-2 rounded text-xs shadow-[2px_2px_0px_black] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
          onClick={fetchAllSurveys}
        >
          All Data
        </button>
        <button
          className="bg-yellow-500 text-white p-2 rounded text-xs shadow-[2px_2px_0px_black] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
          onClick={downloadCSV}
        >
          Download CSV
        </button>
      </div>
      {/* <div className='flex flex-col border-2 border-black'> */}
        <div className='flex flex-col border-4 border-red-800 w-full'>
          <table className="relative max-w-full bg-white border">
            <thead className='text-xs bg-indigo-500 text-white'>
              <tr>
                <th className="py-2 px-4 border-b border-indigo-600 max-w-40">ID</th>
                <th className="py-2 px-4 border-b border-indigo-600">Tanggal</th>
                <th className="py-2 px-4 border-b border-indigo-600">PIC</th>
                <th className="py-2 px-4 border-b border-indigo-600">Provinsi</th>
                <th className="py-2 px-4 border-b border-indigo-600">Kapri</th>
                <th className="py-2 px-4 border-b border-indigo-600">Ditjen</th>
                <th className="py-2 px-4 border-b border-indigo-600">Area Manfaat</th>
                <th className="py-2 px-4 border-b border-indigo-600">Obj Infra</th>
              </tr>
            </thead>
            <tbody className='text-xs selection:bg-indigo-500 selection:text-white'>
              {surveys.map((survey) => (
                <tr key={survey.id} className="bg-gray-100 hover:bg-gray-200">
                  <td className="py-2 px-4 border-b break-words max-w-40">{survey.id}</td>
                  <td className="py-2 px-4 border-b">{new Date(survey.tanggalSurvey).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{survey.pic}</td>
                  <td className="py-2 px-4 border-b">{survey.provinsi}</td>
                  <td className="py-2 px-4 border-b break-words">{survey.kapri.join(', ')}</td>
                  <td className="py-2 px-4 border-b">{survey.ditjen}</td>
                  <td className="py-2 px-4 border-b">{survey.areaManfaat.join(', ')}</td>
                  <td className="py-2 px-4 border-b break-words">{survey.objInfra}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      {/* </div> */}
    </div>
  );
}

export default ShowData;
