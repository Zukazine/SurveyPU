'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import DatePicker from './datePicker';
import ShortField from './shortField';
import JudulEpic from './judulEpic';
import DropSelect from './dropSelect';
import { provinces, kawasanPrior } from '../../../public/data'

const FormWithPersistence: React.FC = () => {
	const [drop, setDrop] = useState<boolean>(false);

  const [dropdown, setDropdown] = useState<string>('');
  const [textInput, setTextInput] = useState<string>('');
	const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const storedDropdown = localStorage.getItem('dropdown');
    const storedTextInput = localStorage.getItem('textInput');

    if (storedDropdown) setDropdown(storedDropdown);
    if (storedTextInput) setTextInput(storedTextInput);
  }, []);

  // Save values to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dropdown', dropdown);
    localStorage.setItem('textInput', textInput);
  }, [dropdown, textInput]);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles);
  };

  const handleSubmit = (event: React.FormEvent) => {

		if (files.length === 0) {
			console.log('Kurang File OI');
		} else {
			event.preventDefault();
			// Handle form submission logic here
			console.log({ dropdown, textInput, files });
			alert('Form submitted successfully');
		}
  };

  return (
    <div className='flex py-10 justify-center h-fit w-full bg-gradient-to-br from-violet-600 to-sky-400'>
			<form onSubmit={handleSubmit} className='bg-[#FDFDFD] flex flex-col px-8 py-8 rounded-2xl h-fit w-[500px] max-w-[550px] overflow-hidden'>
				<JudulEpic textNormal='Form Survey' textEmergency='Darurat'/>
				<div className='flex flex-col gap-2'>
					<DatePicker />
					<ShortField title='Nama Surveyor'/>
					<DropSelect title='Provinsi' processedArray={provinces}/>
					<DropSelect title='Kawasan Prioritas' processedArray={kawasanPrior}/>
					
					<div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-4 py-4 w-full'>
						<div className='flex justify-between items-center'>
							<p className='font-semibold'>Biaya <span className='text-red-600'>*</span></p>
							<button type='button' className='flex items-center justify-center gap-2 group' onClick={() => {setDrop(!drop)}}>
								{drop ? 
								<>
									<span className='text-xs text-indigo-500'>detailed description</span>
									<div className='flex items-center justify-center border p-1 rounded-full border-indigo-500'>
										<FaChevronDown className='max-h-2 max-w-2 text-indigo-700 rotate-180 transition-all duration-150'/>
									</div>
								</>
								:
								<>
									<span className='text-xs group-hover:text-indigo-500 transition-all duration-150'>detailed description</span>
									<div className='flex items-center justify-center border border-black/30 p-1 rounded-full group-hover:border-indigo-500 transition-all duration-150'>
										<FaChevronDown className='max-h-2 max-w-2 group-hover:text-indigo-700 transition-all duration-150'/>
									</div>
								</>
								}
							</button>
						</div>
						{drop &&
							<div
								className='flex overflow-hidden max-w-[395px] mb-2'
							>
								<p className='text-xs text-gray-500'>Rekomendasi paket pekerjaan yang diperlukan untuk mengoptimalkan kinerja infrastruktur yang terbangun, dapat berupa OPOR dan atau pengembangan baru</p>
							</div>
						}
						<textarea
							value={textInput}
							onChange={(e) => setTextInput(e.target.value)}
							className='border border-indigo-500/30 rounded-md outline-indigo-500 p-2 text-sm hover:border-indigo-500/80'
							placeholder='Contoh : 10.000.000.000'
						/>
					</div>
					<div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-4 py-4 w-full'>
						<p className='font-semibold'>Dokumentasi <span className='text-red-600'>*</span></p>
						
						<div>
							{/* @ts-ignore */}
							<button type='button' className='w-32 h-[30px] border text-sm bg-indigo-500 text-white transition-all shadow-[1.5px_1.5px_0px_black] hover:shadow-none hover:translate-x-[1.5px] hover:translate-y-[1.5px]' onClick={() => {document.getElementById('getFile').click()}}>Upload Foto</button>
							<input id='getFile' type="file" multiple onChange={handleFileChange} className='hidden'/>
						</div>
						<div className='flex flex-col mt-2 border-t-2 border-indigo-500/50'>
							<h3 className='py-2 text-[15px] font-semibold'>Uploaded Files :</h3>
							{files.length ? 
								<ul className='flex gap-2'>
								{files.map((file, index) => (
									<li key={index} className='bg-indigo-500 text-white p-1 rounded-sm text-xs'>{file.name}</li>
								))}
								</ul> 
							: 
								<div className='flex'>
									<p className='border border-gray-300 text-black p-1 rounded-sm text-xs'>Belum ada file yang diupload</p>
								</div>
							}
						</div>
					</div>
					<button type="submit" className='px-6 py-2 mr-3 mt-7 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] self-end'>Submit</button>
				</div>
			</form>
    </div>
		
  );
};

export default FormWithPersistence;
