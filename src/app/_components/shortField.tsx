'use client'

import React, { useState, useEffect } from "react";
import { FaChevronDown } from 'react-icons/fa';

type ShortFieldProps = {
  title: string;
  desc? : string;
	isDetail? : boolean;
	children? : React.ReactNode;
	onChange: (input : string) => void;
};

const ShortField:React.FC<ShortFieldProps> = ({title, desc, isDetail, children, onChange}) => {
	const [drop, setDrop] = useState<boolean>(false);
	const [shortInput, setShortInput] = useState<string>('');

	useEffect(() => {
		const storedShortInput = localStorage.getItem(`shortInput-${title}`);
		if (storedShortInput) setShortInput(storedShortInput);
	}, [])

	useEffect(() => {
		localStorage.setItem(`shortInput-${title}`, shortInput);
	}, [shortInput])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newInput = e.target.value
		setShortInput(newInput);
    onChange(newInput);
	}

	return ( 
		<>
			<div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-2 py-3 sm:px-4 sm:py-4 w-full max-w-[600px] overflow-hidden'>
				<div className='flex justify-between items-center w-full max-w-[600px] overflow-hidden'>
					<p className='font-semibold sm:text-lg mb-1'>{title} <span className='text-red-600'>*</span></p>
					{isDetail && 
						<button type='button' className='flex items-start gap-2 group' onClick={() => {setDrop(!drop)}}>
							{drop ? 
								<>
									<span className='text-xs text-indigo-500 max-[320px]:hidden block'>description</span>
									<div className='flex items-center justify-center border p-1 rounded-full border-indigo-500'>
										<FaChevronDown className='max-h-2 max-w-2 text-indigo-700 rotate-180 transition-all duration-150'/>
									</div>
								</>
								:
								<>
									<span className='text-xs group-hover:text-indigo-500 transition-all duration-150 max-[320px]:hidden block'>description</span>
									<div className='flex items-center justify-center border border-black/30 p-1 rounded-full group-hover:border-indigo-500 transition-all duration-150'>
										<FaChevronDown className='max-h-2 max-w-2 group-hover:text-indigo-700 transition-all duration-150'/>
									</div>
								</>
							}
						</button>
					}
					</div>
					{drop &&
						<div
							className='flex w-full max-w-[450px] overflow-hidden mb-2'
						>
							<div className="flex flex-col gap-1">
								<p className='text-xs text-gray-500'>{desc}</p>
								{children}
							</div>
						</div>
					}
				<input
					name={title}
					required={true}
					type="text"
					value={shortInput}
					onChange={handleInputChange}
					placeholder='e.g. Ilham Maulana'
					className='border border-indigo-500/30 rounded-md outline-indigo-500 px-2 py-2 text-sm'
				/>
			</div>
		</>
	);
}
 
export default ShortField;