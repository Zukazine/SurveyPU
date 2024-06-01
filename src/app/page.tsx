'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

export default function Home() {
  const [formData, setFormData] = useState({
    date: new Date(),
    shortString: '',
    dropdown: 'A',
    longString: '',
    file: null as File | null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date: Date) => {
    setFormData({
      ...formData,
      date,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setFormData({
        ...formData,
        file,
      });
    } else {
      alert('Please upload a JPG or PNG file.');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted: ', formData);
    // Process the form data, e.g., send it to a server
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date:</label>
        <DatePicker
          selected={formData.date}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy"
        />
      </div>
      <div>
        <label>Short Input Field:</label>
        <input
          type="text"
          name="shortString"
          value={formData.shortString}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Dropdown Selection:</label>
        <select
          name="dropdown"
          value={formData.dropdown}
          onChange={handleChange}
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </div>
      <div>
        <label>Text Input Field:</label>
        <textarea
          name="longString"
          value={formData.longString}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>File Upload (JPG/PNG only):</label>
        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );

}
