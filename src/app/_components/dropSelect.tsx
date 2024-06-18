'use client'

import React, { useState, useEffect } from "react";

type ArrayObj = {
	id: number;
	nama: string
}

type SelectorProps = {
	title : string;
	processedArray : ArrayObj[];
	onChange : (input: string) => void;
	complex?: boolean;
}

const DropSelect : React.FC<SelectorProps> = ({title, processedArray, onChange, complex}) => {
	const [dropdown, setDropdown] = useState<string>('');

	const [searchTerm, setSearchTerm] = useState<string>('');
	const [filteredOptions, setFilteredOptions] = useState<ArrayObj[]>(processedArray);

	useEffect(() => {
		setFilteredOptions(
			processedArray.filter(item =>
				item.nama.toLowerCase().includes(searchTerm.toLowerCase())
			)
		);
	}, [searchTerm, processedArray]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newSelection = e.target.value;
		setDropdown(newSelection);
		localStorage.setItem(`dropdown-${title}`, newSelection);
		onChange(newSelection);
	}

	return ( 
		<>
			<div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-2 py-3 sm:px-4 sm:py-4 w-full max-w-[600px] overflow-hidden '>
				<p className='font-semibold w-full text-wrap sm:text-lg mb-1'>{title} <span className='text-red-600'>*</span></p>
				{complex && <input
          type='text'
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={`Masukan Keyword. Contoh : Jalan Tol`}
          className='border border-yellow-500/30 rounded-md outline-yellow-400 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm hover:border-yellow-500/80 w-full text-wrap'
        />}
				<select 
					id='provinsi-selection'
					value={dropdown} 
					onChange={handleInputChange} 
					required={true}
					className='border border-indigo-500/30 rounded-md outline-indigo-500 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm hover:border-indigo-500/80 w-full text-wrap max-w-full'
				>
					<option key="DEFAULT" value='DEFAULT'>Pilih {title}</option>
					{ complex ?
						filteredOptions.map((item) => {
							let nama = ''
							if (item.nama.length > 62) {
								nama = item.nama.slice(0,63) + '...'
							} else {
								nama = item.nama
							}

              return (
                <option key={item.id} value={item.nama} className='w-[100px]'>{nama}</option>
              );
            })
						:
						processedArray.map((item) => {
							let nama = ''
							if (item.nama.length > 62) {
								nama = item.nama.slice(0,63) + '...'
							} else {
								nama = item.nama
							}
							// const uuid = crypto.randomUUID();
							return (
								<>
									<option key={item.id} value={item.nama} className='w-[100px]'>{nama}</option>
								</>
							)
						})
					}
				</select>
			</div>
		</>
	);
}

export default DropSelect;