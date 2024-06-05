'use client'

import React, { useState, useEffect } from 'react';
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

interface formData {
	tanggalSurvey: string; 
	namaSurveyor: string;
	anakPelaksana: string;
	provinsi: string;
	kawasanPrioritas: string;
	biaya: string;
	dokumentasi: File[] | null;
	geotagging1: GeoJSON.GeoJsonObject | null;
	geotagging2: GeoJSON.GeoJsonObject | null;
	geotagging3: GeoJSON.GeoJsonObject | null;
	geotagging4: GeoJSON.GeoJsonObject | null;
}

const p = 'Rekomendasi paket pekerjaan yang diperlukan untuk mengoptimalkan kinerja infrastruktur yang terbangun, dapat berupa OPOR dan atau pengembangan baru kinerja infrastruktur yang terbangun, dapat berupa OPOR dan atau pengembangan baru'
const s = 'Desa/Kelurahan, Kecamatan, Kab/Kota'

const FormWithPersistence:React.FC = () => {
	// GLOBAL DATA
	const [formData, setFormData] = useState<formData>(() => {
		const savedData = localStorage.getItem('formData');
		return savedData ? JSON.parse(savedData) : {
			tanggalSurvey: '',
			namaSurveyor: '',
			anakPelaksana: '',
			provinsi: '',
			kawasanPrioritas: '',
			biaya: '',
			dokumentasi: null,
			geotagging1: null,
			geotagging2: null,
			geotagging3: null,
			geotagging4: null,
		};
	});

	useEffect(() => {
		localStorage.setItem('formData', JSON.stringify(formData));
	}, [formData]);

	const [files, setFiles] = useState<File[]>([]);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles);
		setFormData({...formData, dokumentasi: selectedFiles})
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

	const handleImageClick = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const closePreview = () => {
    setSelectedImage(null);
  };	

	const handleGeoJsonChange = (id : string, geoJson: GeoJSON.GeoJsonObject | null) => {
		setFormData(prevData => ({
			...prevData, [id] : geoJson
		}))
	}

  return (
    <div className='flex p-2 sm:py-10 justify-center h-fit w-full bg-gradient-to-r from-violet-600 to-sky-400'>
			<form onSubmit={handleSubmit} className='bg-[#FDFDFD] flex flex-col px-2 py-5 sm:p-8 rounded-2xl h-fit w-[600px] max-w-[600px] overflow-hidden'>
				<JudulEpic textNormal='Form Survey' textEmergency='Darurat'/>
				<div className='flex flex-col gap-2'>
					<DatePicker onChange={(date : string) => setFormData({ ...formData, tanggalSurvey: date })}/>
					<ShortField title='Nama Surveyor' desc={s} isDetail={true} onChange={(input : string) => {setFormData({...formData, namaSurveyor: input})}}/>
					<ShortField title= 'Anak Pelaksana' desc={s} isDetail={true} onChange={(input : string) => {setFormData({...formData, anakPelaksana: input})}}/>
					<DropSelect title='Provinsi' processedArray={provinces} onChange={(input : string) => setFormData({ ...formData, provinsi: input})}/>
					<DropSelect title='Kawasan Prioritas' processedArray={kawasanPrior} onChange={(input : string) => setFormData({ ...formData, kawasanPrioritas: input})}/>
					<LongField title='Biaya' desc={p} isDetail={true} onChange={(input : string) => {setFormData({...formData, biaya :input})}}>
						<p className='text-xs text-gray-500'>Modelan <span>{`(soto ayam mbah githo)`}</span> e lho rek, uwenak tenan cik</p>
					</LongField>
					<div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-2 py-3 sm:px-4 sm:py-4 w-full'>
						<p className='font-semibold sm:text-lg mb-1'>Dokumentasi <span className='text-red-600'>*</span></p>
						
						<div>
							{/* @ts-ignore */}
							<button type='button' className='w-32 h-[30px] border text-sm bg-indigo-500 text-white transition-all shadow-[1.5px_1.5px_0px_black] hover:shadow-none hover:translate-x-[1.5px] hover:translate-y-[1.5px]' onClick={() => {document.getElementById('getFile').click()}}>Upload Foto</button>
							<input 
								id='getFile' 
								type="file" 
								multiple 
								onChange={handleFileChange} 
								className='hidden'
							/>
						</div>
						<div className='flex flex-col mt-2 border-t-2 border-indigo-500/50'>
							<h3 className='py-2 text-[13px] sm:text-[15px] font-semibold'>Uploaded Files :</h3>
							{files.length ? 
								<ul className='flex gap-2'>
								{files.map((file, index) => (
									<li 
										key={index} 
										className='bg-indigo-500 text-white p-1 rounded-sm text-xs'
										onClick={() => handleImageClick(file)}
									>
										{file.name}
									</li>
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
						<p className='font-semibold w-full text-wrap text-xl mb-3'>Geotagging yuks</p>
						<MapDraw 
							id='geotagging1' 
							initialGeoJsonData={{
								type: 'FeatureCollection',
								features: [],
          		}}
							onChange={handleGeoJsonChange}
							type='point'
						/>
					</div>
					<div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-4 py-4 w-full max-w-[600px] overflow-hidden'>
						<p className='font-semibold w-full text-wrap text-xl mb-3'>Geotagging yuks</p>
						<MapDraw 
							id='geotagging2' 
							initialGeoJsonData={{
								type: 'FeatureCollection',
								features: [],
          		}}
							onChange={handleGeoJsonChange}
							type='line'
						/>
					</div>
					<div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-4 py-4 w-full max-w-[600px] overflow-hidden'>
						<p className='font-semibold w-full text-wrap text-xl mb-3'>Geotagging yuks</p>
						<MapDraw 
							id='geotagging3' 
							initialGeoJsonData={{
								type: 'FeatureCollection',
								features: [],
          		}}
							onChange={handleGeoJsonChange}
							type='polygon'
						/>
					</div>
					<div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-4 py-4 w-full max-w-[600px] overflow-hidden'>
						<p className='font-semibold w-full text-wrap text-xl mb-3'>Geotagging yuks</p>
						<MapDraw 
							id='geotagging4' 
							initialGeoJsonData={{
								type: 'FeatureCollection',
								features: [],
          		}}
							onChange={handleGeoJsonChange}
						/>
					</div>
					<div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-2 py-3 sm:px-4 sm:py-4 w-full'>
						<p className='font-semibold sm:text-lg mb-1'>Preview All Data</p>
						<div className='flex overflow-y-scroll myscrollbar-child max-h-[500px]'>
							{/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
							<p className='text-wrap p-3'>{JSON.stringify(formData, null, 2)}</p>
						</div>
					</div>
					<button type="submit" className='px-6 py-2 mr-3 mt-7 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] self-end'>Submit</button>
				</div>
			</form>
			{selectedImage && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-[1000]' onClick={closePreview}>
          <div className='relative'>
            <button className='absolute top-0 right-3 text-white text-3xl flex' onClick={closePreview}>&times;</button>
            <img src={selectedImage} alt="Selected" className='max-w-screen max-h-screen p-6 object-contain'/>
          </div>
        </div>
      )}
			<ToastContainer />
    </div>
		
  );
};

export default FormWithPersistence;