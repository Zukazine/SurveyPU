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
import MultiSelect from './multiCheck';
import ArchiveButton from './archiveButton';

interface formData {
	tanggalSurvey: string; 
	pic: string;
	provinsi: string;
	ditjen: string;
	kapri: string[];
	objInfra: string;
	areaManfaat : string[];
	geotagPoint: GeoJSON.GeoJsonObject | {};
	geotagLine: GeoJSON.GeoJsonObject | {};
	geotagAreaInfra: GeoJSON.GeoJsonObject | {};
	geotagAreaManf: GeoJSON.GeoJsonObject | {};
}

const MainSurvey = () => {
	const [formData, setFormData] = useState<formData>(
		{
			tanggalSurvey: '',
			pic: '',
			provinsi: '',
			ditjen: '',
			kapri: [],
			objInfra: '',
			areaManfaat: [],
			geotagPoint: {},
			geotagLine: {},
			geotagAreaInfra: {},
			geotagAreaManf: {},
		}
	)

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log(formData)

		if (formData.tanggalSurvey === '') {
			toast.warn('tangga diisi yuk')
		} else if (formData.pic === '') {
			toast.warn('nama diisi ya')
		} else if (formData.provinsi === '') {
			toast.warn('Provinsi diisi ya')
		} else if (formData.ditjen === '') {
			toast.warn('Ditjen diisi ya')
		}  else if (formData.objInfra === '') {
			toast.warn('Objek Infrastruktur diisi ya')
		} else if (formData.kapri.length == 0) {
			toast.warn('Kawasan Prioritas diisi ya')
		} else if (formData.areaManfaat.length == 0) {
			toast.warn('Area Manfaat diisi ya')
		} else if (
			!(
				Object.keys(formData.geotagPoint).length |
				Object.keys(formData.geotagLine).length |
				Object.keys(formData.geotagAreaInfra).length |
				Object.keys(formData.geotagPoint).length)){
			toast.warn('Lupa Tagging yaa ')
		} else {
			// toast.success('Good Job !')
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

	const handleKapriChange = (selectedOptions: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      kapri: selectedOptions,
    }));
  };
	
	return ( 
		<>
			<ArchiveButton />
			<div className='flex p-2 sm:py-10 justify-center h-fit w-full bg-gradient-to-r from-violet-600 to-sky-400'>
				<form onSubmit={handleSubmit} className='bg-[#FDFDFD] flex flex-col px-2 py-5 sm:p-8 rounded-2xl h-fit w-[600px] max-w-[600px] overflow-hidden'>
					<JudulEpic textNormal='Form' textEmergency='Geotagging'/>
					<div className='flex flex-col gap-2'>
						<DatePicker 
							onChange={(date : string) => setFormData({ ...formData, tanggalSurvey: date })}
						/>
						<ShortField 
							title='PIC'
							placeholder='e.g. Ilham Maulana'
							required={true}
							onChange={(input : string) => setFormData({...formData, pic: input})}
						/>
						<DropSelect 
							title='Provinsi' 
							processedArray={provinces} 
							onChange={(input : string) => setFormData({ ...formData, provinsi: input})}
						/>
						{formData.provinsi && (
							<MultiSelect
								onChange={handleKapriChange}
								provinsi={formData.provinsi}
								isDetail={false}
							/>
						)}
						<DropSelect
							title='Ditjen'
							processedArray={ditjen}
							onChange={(input : string) => setFormData({ ...formData, ditjen: input})}
						/>
						<DropSelect
							title='Object Infrastruktur'
							processedArray={objekInfra}
							onChange={(input : string) => setFormData({ ...formData, objInfra: input})}
							complex={true}
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

						<div className='flex flex-col items-center justify-center py-4 gap-[30px]'>
							{/* <div className='rounded-full bg-indigo-500 h-6 w-6 shadow-inner [box-shadow:inset_3px_2px_1px_rgba(255,255,255,1)] border-2 border-indigo-500 rotate-180'/> */}
							{/* <div className='rounded-full bg-indigo-500 h-6 w-6 shadow-inner [box-shadow:inset_3px_2px_1px_rgba(255,255,255,1)] border-2 border-indigo-500 rotate-180'/>
							<div className='rounded-full bg-indigo-500 h-6 w-6 shadow-inner [box-shadow:inset_3px_2px_1px_rgba(255,255,255,1)] border-2 border-indigo-500 rotate-180'/>
							<div className='rounded-full bg-indigo-500 h-6 w-6 shadow-inner [box-shadow:inset_3px_2px_1px_rgba(255,255,255,1)] border-2 border-indigo-500 rotate-180'/> */}
						</div>

						<ShortField
							title='Nama Kawasan Manfaat'
							placeholder='e.g. Kawasan A, Kawasan B, ... , C. '
							required={true}
							onChange={(input : string) => {
								const areaManfaat = input.split(',').map(item => item.trim());
								setFormData({...formData, areaManfaat});
							}}
						/>

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
								complex={true}
							/>
						</div>
						<button type="submit" className='px-6 py-2 mr-3 mt-7 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] self-end'>Submit</button>
					</div>
				</form>
				<ToastContainer />
			</div>
		</>
	);
}
 
export default MainSurvey;