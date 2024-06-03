'use client'

import React, { useState, useEffect } from "react";

type ArrayObj = {
	id: number;
	nama: string
}

type SelectorProps = {
	title : string;
	processedArray : ArrayObj[];
}

const DropSelect : React.FC<SelectorProps> = ({title, processedArray}) => {
	const [dropdown, setDropdown] = useState<string>('');

	useEffect(() => {
    const storedDropdown = localStorage.getItem('dropdown');
    if (storedDropdown) setDropdown(storedDropdown);
  }, []);

	useEffect(() => {
    localStorage.setItem('dropdown', dropdown);
  }, [dropdown]);

	return ( 
		<>
			<div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-2 py-3 sm:px-4 sm:py-4 w-full max-w-[600px] overflow-hidden '>
				<p className='font-semibold w-full text-wrap sm:text-lg mb-1'>{title} <span className='text-red-600'>*</span></p>
				<select 
					id='provinsi-selection'
					value={dropdown} 
					onChange={(e) => setDropdown(e.target.value)} 
					required={true}
					className='border border-indigo-500/30 rounded-md outline-indigo-500 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm hover:border-indigo-500/80 w-full text-wrap'
				>
					<option key="DEFAULT" value='DEFAULT' disabled>Pilih {title}</option>
					{
					processedArray.map((item) => { return (
							<>
								<option key={item.id} value={item.nama}>{item.nama}</option>
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