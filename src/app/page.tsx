'use client'

import React, { useState } from 'react';
import MainSurvey from './_components/mainSurvey';
import ShowData from './_components/showData';
import ShowMapData from './_components/showMapData';

export default function Home() {
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);

  return (
    <>
      {/* <MainSurvey /> */}
      <ShowData />
      {/* {selectedSurveyId && <SurveyMap surveyId={selectedSurveyId} />} */}
      <ShowMapData />
    </>
  );
}
