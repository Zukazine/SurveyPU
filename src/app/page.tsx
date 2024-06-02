'use client'

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import MapDraw from './_components/mapdraw';
import FormWithPersistence from './_components/persistanceForm';

export default function Home() {
  return (
    <>
      <FormWithPersistence /> 
      {/* <MapDraw /> */}
    </>
  );
}
