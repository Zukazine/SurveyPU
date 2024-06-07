'use client'

import React, { useState } from 'react';
import DatePicker from './datePicker';
import ShortField from './shortField';
import DropSelect from './dropSelect';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MapDraw from './mapdraw';
import JudulEpic from './judulEpic';
import { 
	provinces,
	objekInfra,
	ditjen,
} from '../../../public/data'

interface formData {
	tanggalSurvey: string; 
	namaSurveyor: string;
	provinsi: string;
	ditjen: string;
	objInfra: string;
	geotagPoint: GeoJSON.GeoJsonObject | null;
	geotagLine: GeoJSON.GeoJsonObject | null;
	geotagAreaInfra: GeoJSON.GeoJsonObject | null;
	geotagAreaManf: GeoJSON.GeoJsonObject | null;
}

const MainSurvey = () => {
	const [formData, setFormData] = useState<formData>(
		{
			tanggalSurvey: '',
			namaSurveyor: '',
			provinsi: '',
			ditjen: '',
			objInfra: '',
			geotagPoint: null,
			geotagLine: null,
			geotagAreaInfra: null,
			geotagAreaManf: null,
		}
	)

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (formData.tanggalSurvey === '') {
			toast.warn('tangga diisi yuk')
		} else if (formData.namaSurveyor === '') {
			toast.warn('nama diisi ya')
		} else if (formData.provinsi === '') {
			toast.warn('Provinsi diisi ya')
		} else if (formData.ditjen === '') {
			toast.warn('Ditjen diisi ya')
		}  else if (formData.objInfra === '') {
			toast.warn('Objek Infrastruktur diisi ya')
		} else {
			const toastId = toast.loading('Submitting form...');

			try {
				const response = await fetch('/api/submitSurvey', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(formData)
				});

				if (response.ok) {
					toast.update(toastId, {
						render: 'Form submitted successfully!',
						type: 'success',
						isLoading: false,
						autoClose: 3000
					});
				} else {
					throw new Error('Failed to submit form');
				}
			} catch (error) {
				toast.update(toastId, {
					render: 'Failed to submit form',
					type: 'error',
					isLoading: false,
					autoClose: 3000
				});
			}
		}
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
					<DatePicker 
						onChange={(date : string) => setFormData({ ...formData, tanggalSurvey: date })}
					/>
					<ShortField 
						title='Nama Surveyor'
						onChange={(input : string) => setFormData({...formData, namaSurveyor: input})}
					/>
					<DropSelect 
						title='Provinsi' 
						processedArray={provinces} 
						onChange={(input : string) => setFormData({ ...formData, provinsi: input})}
					/>
					<DropSelect 
						title='Ditjen' 
						processedArray={ditjen} 
						onChange={(input : string) => setFormData({ ...formData, ditjen: input})}
					/>
					<DropSelect 
						title='Object Infrastruktur' 
						processedArray={objekInfra} 
						onChange={(input : string) => setFormData({ ...formData, objInfra: input})}
					/>
					<div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-4 py-4 w-full max-w-[600px] overflow-hidden'>
						<p className='font-semibold w-full text-wrap text-xl mb-3'>Geotagging Point</p>
						<MapDraw 
							id='geotagPoint' 
							initialGeoJsonData={{
								type: 'FeatureCollection',
								features: [],
          		}}
							onChange={handleGeoJsonChange}
							type='point'
						/>
					</div>

					<div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-4 py-4 w-full max-w-[600px] overflow-hidden'>
						<p className='font-semibold w-full text-wrap text-xl mb-3'>Geotagging Line</p>
						<MapDraw 
							id='geotagLine' 
							initialGeoJsonData={{
								type: 'FeatureCollection',
								features: [],
          		}}
							onChange={handleGeoJsonChange}
							type='line'
						/>
					</div>

					<div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-4 py-4 w-full max-w-[600px] overflow-hidden'>
						<p className='font-semibold w-full text-wrap text-xl mb-3'>Geotagging Area Infrastruktur</p>
						<MapDraw 
							id='geotagAreaInfra' 
							initialGeoJsonData={{
								type: 'FeatureCollection',
								features: [],
          		}}
							onChange={handleGeoJsonChange}
							type='polygon'
						/>
					</div>

					<div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-4 py-4 w-full max-w-[600px] overflow-hidden'>
						<p className='font-semibold w-full text-wrap text-xl mb-3'>Geotagging Area Manfaat</p>
						<MapDraw 
							id='geotagAreaManf' 
							initialGeoJsonData={{
								type: 'FeatureCollection',
								features: [],
          		}}
							onChange={handleGeoJsonChange}
							type='polygon'
						/>
					</div>
					<button type="submit" className='px-6 py-2 mr-3 mt-7 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] self-end'>Submit</button>
				</div>
			</form>
			<ToastContainer />
    </div>
	);
}
 
export default MainSurvey;