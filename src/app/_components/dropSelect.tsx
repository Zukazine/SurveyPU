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
			<div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-4 py-4'>
				<p className='font-semibold'>{title} <span className='text-red-600'>*</span></p>
				<select 
					id='provinsi-selection'
					value={dropdown} 
					onChange={(e) => setDropdown(e.target.value)} 
					required={true}
					className='border border-indigo-500/30 rounded-md outline-indigo-500 px-3 py-2 text-sm hover:border-indigo-500/80 '
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