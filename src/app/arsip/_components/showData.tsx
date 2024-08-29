'use client'

import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import JSZip from 'jszip';
// @ts-ignore
import { saveAs } from 'file-saver';
import { FaDownload } from 'react-icons/fa';

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

  const downloadGeoJSON = async (survey: Survey) => {
    const zip = new JSZip();

    // Add non-empty GeoJSON objects to the zip
    if (Object.keys(survey.geotagPoint).length > 0) {
      zip.file(`geotagPoint_${survey.objInfra}.geojson`, JSON.stringify(survey.geotagPoint, null, 2));
    }
    if (Object.keys(survey.geotagLine).length > 0) {
      zip.file(`geotagLine_${survey.objInfra}.geojson`, JSON.stringify(survey.geotagLine, null, 2));
    }
    if (Object.keys(survey.geotagAreaInfra).length > 0) {
      zip.file(`geotagAreaInfra_${survey.objInfra}.geojson`, JSON.stringify(survey.geotagAreaInfra, null, 2));
    }
    if (Object.keys(survey.geotagAreaManf).length > 0) {
      zip.file(`geotagAreaManf_${survey.objInfra}.geojson`, JSON.stringify(survey.geotagAreaManf, null, 2));
    }

    // Generate the zip file and trigger the download
    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, `survey_${survey.objInfra}.zip`);
    });
  };

  const downloadAllGeoJSON = async () => {
    const zip = new JSZip();
    const zipPromises = surveys.map(async (survey) => {
      const surveyZip = new JSZip();
      const geojsonPromises = [];

      if (Object.keys(survey.geotagPoint).length) {
        geojsonPromises.push(
          surveyZip.file(`geotagPoint_${survey.objInfra}.geojson`, JSON.stringify(survey.geotagPoint))
        );
      }
      if (Object.keys(survey.geotagLine).length) {
        geojsonPromises.push(
          surveyZip.file(`geotagLine_${survey.objInfra}.geojson`, JSON.stringify(survey.geotagLine))
        );
      }
      if (Object.keys(survey.geotagAreaInfra).length) {
        geojsonPromises.push(
          surveyZip.file(`geotagAreaInfra_${survey.objInfra}.geojson`, JSON.stringify(survey.geotagAreaInfra))
        );
      }
      if (Object.keys(survey.geotagAreaManf).length) {
        geojsonPromises.push(
          surveyZip.file(`geotagAreaManf_${survey.objInfra}.geojson`, JSON.stringify(survey.geotagAreaManf))
        );
      }

      await Promise.all(geojsonPromises);

      if (Object.keys(survey.geotagPoint).length || Object.keys(survey.geotagLine).length ||
          Object.keys(survey.geotagAreaInfra).length || Object.keys(survey.geotagAreaManf).length) {
        zip.file(`survey_${survey.objInfra}.zip`, await surveyZip.generateAsync({ type: 'blob' }));
      }
    });

    await Promise.all(zipPromises);

    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'all_surveys_geojson.zip');
    });
  };


  return (
    <div className="container h-screen mx-auto p-4 overflow-hidden">
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
        <button
          className="bg-blue-500 text-white p-2 rounded text-xs shadow-[2px_2px_0px_black] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
          onClick={downloadAllGeoJSON}
        >
          Download All GeoJSON
        </button>
      </div>
      <div className='flex flex-col w-full h-[90%] overflow-scroll myscrollbar-child'>
        <table className="bg-white border">
          <thead className='text-xs bg-indigo-500 text-white'>
            <tr className='w-40'>
              <th className="py-2 px-4 border-b border-indigo-600">ID</th>
              <th className="py-2 px-4 border-b border-indigo-600">Tanggal</th>
              <th className="py-2 px-4 border-b border-indigo-600">PIC</th>
              <th className="py-2 px-4 border-b border-indigo-600">Provinsi</th>
              <th className="py-2 px-4 border-b border-indigo-600">Kapri</th>
              <th className="py-2 px-4 border-b border-indigo-600">Ditjen</th>
              <th className="py-2 px-4 border-b border-indigo-600">Area Manfaat</th>
              <th className="py-2 px-4 border-b border-indigo-600">Obj Infra</th>
              <th className="py-2 px-4 border-b border-indigo-600">Download GeoJSON</th>
            </tr>
          </thead>
          <tbody className='text-xs selection:bg-indigo-500 selection:text-white'>
            {surveys.map((survey) => (
              <tr key={survey.id} className="bg-gray-100 hover:bg-gray-200">
                <td className="py-2 px-4 border-b break-words">{survey.id}</td>
                <td className="py-2 px-4 border-b">{new Date(survey.tanggalSurvey).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{survey.pic}</td>
                <td className="py-2 px-4 border-b">{survey.provinsi}</td>
                <td className="py-2 px-4 border-b break-words">{survey.kapri.join(', ')}</td>
                <td className="py-2 px-4 border-b">{survey.ditjen}</td>
                <td className="py-2 px-4 border-b">{survey.areaManfaat.join(', ')}</td>
                <td className="py-2 px-4 border-b break-words">{survey.objInfra}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button onClick={() => downloadGeoJSON(survey)} className="text-indigo-500 hover:text-indigo-700">
                    <FaDownload />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShowData;
