'use client'

import React, { useState } from 'react';
import DatePicker from './datePicker';
import ShortField from './shortField';
import JudulEpic from './judulEpic';
import DropSelect from './dropSelect';
import { provinces, kawasanPrior } from '../../../public/data'
import SubmitButton from './submitButton';
import LongField from './longfield';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MapDraw from './mapdraw';

const p = 'Rekomendasi paket pekerjaan yang diperlukan untuk mengoptimalkan kinerja infrastruktur yang terbangun, dapat berupa OPOR dan atau pengembangan baru'
const s = 'Desa/Kelurahan, Kecamatan, Kab/Kota'

const FormWithPersistence:React.FC = () => {
	const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles);
  };

  const handleSubmit = (event: React.FormEvent) => {
		if (files.length == 0) {
			event.preventDefault();
			toast.warn('Are you sure file already uploaded ?',{
				position: 'top-right',
				autoClose: 3000,
			});
		} else {
			event.preventDefault();
			toast.success('Form submitted successfully!', {
				position: 'top-right',
				autoClose: 3000,
			});
		}
  };

  return (
    <div className='flex p-2 sm:py-10 justify-center h-fit w-full bg-gradient-to-br from-violet-600 to-sky-400'>
			<form onSubmit={handleSubmit} className='bg-[#FDFDFD] flex flex-col px-2 py-5 sm:p-8 rounded-2xl h-fit w-[600px] max-w-[600px] overflow-hidden'>
				<JudulEpic textNormal='Form Survey' textEmergency='Darurat'/>
				<div className='flex flex-col gap-2'>
					<DatePicker />
					<ShortField title='Nama Surveyor' desc={s} isDetail={true}/>
					<ShortField title= 'Anak Pelaksana' desc={s} isDetail={true}/>
					<DropSelect title='Provinsi' processedArray={provinces}/>
					<DropSelect title='Kawasan Prioritas' processedArray={kawasanPrior}/>
					<LongField title='Biaya' desc={p} isDetail={true}/>
					{/* <UploadFile /> */}
					<div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-2 py-3 sm:px-4 sm:py-4 w-full'>
						<p className='font-semibold sm:text-lg mb-1'>Dokumentasi <span className='text-red-600'>*</span></p>
						
						<div>
							{/* @ts-ignore */}
							<button type='button' className='w-32 h-[30px] border text-sm bg-indigo-500 text-white transition-all shadow-[1.5px_1.5px_0px_black] hover:shadow-none hover:translate-x-[1.5px] hover:translate-y-[1.5px]' onClick={() => {document.getElementById('getFile').click()}}>Upload Foto</button>
							<input id='getFile' type="file" multiple onChange={handleFileChange} className='hidden'/>
						</div>
						<div className='flex flex-col mt-2 border-t-2 border-indigo-500/50'>
							<h3 className='py-2 text-[13px] sm:text-[15px] font-semibold'>Uploaded Files :</h3>
							{files.length ? 
								<ul className='flex gap-2'>
								{files.map((file, index) => (
									<li key={index} className='bg-indigo-500 text-white p-1 rounded-sm text-xs'>{file.name}</li>
								))}
								</ul> 
							: 
								<div className='flex'>
									<p className='border border-gray-300 text-black p-1 rounded-sm sm:text-xs text-[10px]'>Belum ada file yang diupload</p>
								</div>
							}
						</div>
					</div>
					{/* <SubmitButton /> */}
					<div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-4 py-4 w-full max-w-[600px] overflow-hidden'>
						<p className='font-semibold w-full text-wrap text-xl mb-3'>Geotagging yuks <span className='text-red-600'>*</span></p>
						<MapDraw />
					</div>
					<button type="submit" className='px-6 py-2 mr-3 mt-7 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] self-end'>Submit</button>
				</div>
			</form>
			<ToastContainer />
    </div>
		
  );
};

export default FormWithPersistence;

const UploadFile = () => {
	const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles);
  };
	
	return ( 
		<>
			<div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-2 py-3 sm:px-4 sm:py-4 w-full'>
				<p className='font-semibold sm:text-lg mb-1'>Dokumentasi <span className='text-red-600'>*</span></p>
				
				<div>
					{/* @ts-ignore */}
					<button type='button' className='w-[600px] h-[30px] border text-sm bg-indigo-500 text-white transition-all shadow-[1.5px_1.5px_0px_black] hover:shadow-none hover:translate-x-[1.5px] hover:translate-y-[1.5px]' onClick={() => {document.getElementById('getFile').click()}}>Upload Foto</button>
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
		</>
	);
}