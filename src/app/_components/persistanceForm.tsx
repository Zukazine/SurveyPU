'use client'

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useCallback } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const FormWithPersistence: React.FC = () => {
	const [drop, setDrop] = useState<boolean>(false);

  const [date, setDate] = useState<string>('');
  const [shortInput, setShortInput] = useState<string>('');
  const [dropdown, setDropdown] = useState<string>('');
  const [textInput, setTextInput] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const storedDate = localStorage.getItem('date');
    const storedShortInput = localStorage.getItem('shortInput');
    const storedDropdown = localStorage.getItem('dropdown');
    const storedTextInput = localStorage.getItem('textInput');

    if (storedDate) setDate(storedDate);
    if (storedShortInput) setShortInput(storedShortInput);
    if (storedDropdown) setDropdown(storedDropdown);
    if (storedTextInput) setTextInput(storedTextInput);
  }, []);

  // Save values to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('date', date);
    localStorage.setItem('shortInput', shortInput);
    localStorage.setItem('dropdown', dropdown);
    localStorage.setItem('textInput', textInput);
  }, [date, shortInput, dropdown, textInput]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({ date, shortInput, dropdown, textInput, file });
    alert('Form submitted successfully');
  };

  return (
    <div className='flex py-10 justify-center h-fit w-full bg-gradient-to-br from-violet-600 to-sky-400'>
			<form onSubmit={handleSubmit} className='bg-[#FDFDFD] flex flex-col px-8 py-8 rounded-2xl h-fit'>
				<div className='text-4xl font-mono font-black text-black mb-5'>Form Survey Darurat</div>
				<div className='flex flex-col gap-2'>
					<div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-4 py-4'>
							<p className='font-semibold'>Tanggal Survey <span className='text-red-600'>*</span> <span className='pl-1 bg-white text-xs font-normal'>{`(klik icon kalender)`}</span></p>
							<input
									required={true}
									type="date"
									value={date}
									onChange={(e) => setDate(e.target.value)}
									className='max-w-40 bg-indigo-500 px-2 text-white text-sm py-[1px] rounded-[5px] transition-all shadow-[1.5px_1.5px_0px_black] hover:shadow-none hover:translate-x-[1.5px] hover:translate-y-[1.5px] outline-white focus:bg-white focus:outline-indigo-500 focus:text-black'
							/>
					</div>
					<div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-4 py-4'>
						<p className='font-semibold'>Nama Surveyor <span className='text-red-600'>*</span></p>
						<input
							required={true}
							type="text"
							value={shortInput}
							onChange={(e) => setShortInput(e.target.value)}
							placeholder='e.g. Ilham Maulana'
							className='border border-indigo-500/30 rounded-md outline-indigo-500 px-2 py-2 text-sm'
						/>
					</div>
					<div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-4 py-4'>
						<p className='font-semibold'>Provinsi <span className='text-red-600'>*</span></p>
						<select 
							id='provinsi-selection'
							value={dropdown} 
							onChange={(e) => setDropdown(e.target.value)} 
							required={true}
							className='border border-indigo-500/30 rounded-md outline-indigo-500 px-3 py-2 text-sm hover:border-indigo-500/80 '
						>
							<option value="" disabled selected>Pilih Provinsi</option>
							{
							provinces.map((prov) => { return (
								<>
									<option value={prov.nama}>{prov.nama}</option>
								</>)
								})
							}
						</select>
					</div>
					<div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-4 py-4'>
						<p className='font-semibold'>Kawasan Prioritas <span className='text-red-600'>*</span></p>
						<select 
							id='provinsi-selection'
							value={dropdown} 
							onChange={(e) => setDropdown(e.target.value)} 
							required={true}
							className='border border-indigo-500/30 rounded-md outline-indigo-500 px-3 py-2 text-sm hover:border-indigo-500/80 '
						>
							<option value="" disabled selected>Pilih Kawasan</option>
							{
							kawasanPrior.map((item) => { return (
								<>
									<option value={item.nama}>{item.nama}</option>
								</>)
								})
							}
						</select>
					</div>
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
					<div>
							<label>
							File Upload:
							<input type="file" multiple accept="image/jpeg, image/png" onChange={handleFileChange} />
							</label>
					</div>
						<button type="submit" className='px-6 py-2 mr-3 mt-7 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] self-end'>Submit</button>
				</div>
			</form>
    </div>
		
  );
};

export default FormWithPersistence;

const provinces = [
  { id: 1, nama: 'Aceh' },
  { id: 2, nama: 'Bali' },
  { id: 3, nama: 'Banten' },
  { id: 4, nama: 'Bengkulu' },
  { id: 5, nama: 'DI Yogyakarta' },
  { id: 6, nama: 'DKI Jakarta' },
  { id: 7, nama: 'Gorontalo' },
  { id: 8, nama: 'Jambi' },
  { id: 9, nama: 'Jawa Barat' },
  { id: 10, nama: 'Jawa Tengah' },
  { id: 11, nama: 'Jawa Timur' },
  { id: 12, nama: 'Kalimantan Barat' },
  { id: 13, nama: 'Kalimantan Selatan' },
  { id: 14, nama: 'Kalimantan Tengah' },
  { id: 15, nama: 'Kalimantan Timur' },
  { id: 16, nama: 'Kalimantan Utara' },
  { id: 17, nama: 'Kepulauan Bangka Belitung' },
  { id: 18, nama: 'Kepulauan Riau' },
  { id: 19, nama: 'Lampung' },
  { id: 20, nama: 'Maluku' },
  { id: 21, nama: 'Maluku Utara' },
  { id: 22, nama: 'Nusa Tenggara Barat' },
  { id: 23, nama: 'Nusa Tenggara Timur' },
  { id: 24, nama: 'Papua' },
  { id: 25, nama: 'Papua Barat' },
  { id: 26, nama: 'Papua Barat Daya' },
  { id: 27, nama: 'Papua Pegunungan' },
  { id: 28, nama: 'Papua Selatan' },
  { id: 29, nama: 'Papua Tengah' },
  { id: 30, nama: 'Riau' },
  { id: 31, nama: 'Sulawesi Barat' },
  { id: 32, nama: 'Sulawesi Selatan' },
  { id: 33, nama: 'Sulawesi Tengah' },
  { id: 34, nama: 'Sulawesi Tenggara' },
  { id: 35, nama: 'Sulawesi Utara' },
  { id: 36, nama: 'Sumatera Barat' },
  { id: 37, nama: 'Sumatera Selatan' },
  { id: 38, nama: 'Sumatera Utara' }
];

const kawasanPrior = [
  { id: 1, nama: 'Kawasan A' },
  { id: 2, nama: 'Kawasan B' },
  { id: 3, nama: 'Kawasan C' },
  { id: 4, nama: 'Kawasan D' },
]