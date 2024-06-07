'use client'

import { useState } from 'react';
import axios from 'axios';
import { 
	objekInfra
} from '../../../public/data'

const ShowData = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [objInfra, setObjInfra] = useState('');
  const [surveys, setSurveys] = useState([]);

  const fetchSurveys = async () => {
    const { data } = await axios.get('/api/filterData', {
      params: { startDate, endDate, objInfra },
    });
    setSurveys(data);
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
        <select
          className="border rounded p-2"
          value={objInfra}
          onChange={(e) => setObjInfra(e.target.value)}
        >
          <option value="">Select Object Infrastruktur</option>
          {objekInfra.map((obj) => (
            <option key={obj.id} value={obj.nama}>
              {obj.nama}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={fetchSurveys}
        >
          Search
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Tanggal Survey</th>
            <th className="py-2 px-4 border-b">Nama Surveyor</th>
            <th className="py-2 px-4 border-b">Provinsi</th>
            <th className="py-2 px-4 border-b">Ditjen</th>
            <th className="py-2 px-4 border-b">Obj Infra</th>
            <th className="py-2 px-4 border-b">Geotag Point</th>
            <th className="py-2 px-4 border-b">Geotag Line</th>
            <th className="py-2 px-4 border-b">Geotag Area Infra</th>
            <th className="py-2 px-4 border-b">Geotag Area Manf</th>
          </tr>
        </thead>
        <tbody>
          {surveys.map((survey) => (
            <tr key={survey.id}>
              <td className="py-2 px-4 border-b">{survey.id}</td>
              <td className="py-2 px-4 border-b">{new Date(survey.tanggalSurvey).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{survey.namaSurveyor}</td>
              <td className="py-2 px-4 border-b">{survey.provinsi}</td>
              <td className="py-2 px-4 border-b">{survey.ditjen}</td>
              <td className="py-2 px-4 border-b">{survey.objInfra}</td>
              <td className="py-2 px-4 border-b">{JSON.stringify(survey.geotagPoint)}</td>
              <td className="py-2 px-4 border-b">{JSON.stringify(survey.geotagLine)}</td>
              <td className="py-2 px-4 border-b">{JSON.stringify(survey.geotagAreaInfra)}</td>
              <td className="py-2 px-4 border-b">{JSON.stringify(survey.geotagAreaManf)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowData;