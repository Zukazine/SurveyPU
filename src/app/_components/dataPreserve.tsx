// components/Surveys.tsx

import React from 'react';

interface Survey {
  tanggalSurvey: string;
  namaSurveyor: string;
  provinsi: string;
  ditjen: string;
  objInfra: string;
}

interface SurveysProps {
  surveys: Survey[];
}

const DataPreserve: React.FC<SurveysProps> = ({ surveys }) => {
  return (
    <div>
      <h1>Surveys</h1>
      <ul>
        {surveys.map((survey, index) => (
          <li key={index}>
            <p>Tanggal Survey: {new Date(survey.tanggalSurvey).toLocaleDateString()}</p>
            <p>Nama Surveyor: {survey.namaSurveyor}</p>
            <p>Provinsi: {survey.provinsi}</p>
            <p>Ditjen: {survey.ditjen}</p>
            <p>Obj Infra: {survey.objInfra}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataPreserve;