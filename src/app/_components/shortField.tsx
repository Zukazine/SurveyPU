'use client'

import React, { useState, useEffect } from "react";

type ShortFieldProps = {
  title: string;
};

const ShortField:React.FC<ShortFieldProps> = ({title}) => {
	const [shortInput, setShortInput] = useState<string>('');

	useEffect(() => {
		const storedShortInput = localStorage.getItem('shortInput');
		if (storedShortInput) setShortInput(storedShortInput);
	}, [])

	useEffect(() => {
		localStorage.setItem('shortInput', shortInput);
	}, [shortInput])

	return ( 
		<>
			<div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-4 py-4 w-full max-w-[450px] overflow-hidden'>
				<p className='font-semibold w-full text-wrap'>{title} <span className='text-red-600'>*</span></p>
				<input
					required={true}
					type="text"
					value={shortInput}
					onChange={(e) => setShortInput(e.target.value)}
					placeholder='e.g. Ilham Maulana'
					className='border border-indigo-500/30 rounded-md outline-indigo-500 px-2 py-2 text-sm'
				/>
			</div>
		</>
	);
}
 
export default ShortField;