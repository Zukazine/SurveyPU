'use client'

import React, { useState, useEffect } from "react";
import { FaChevronDown } from 'react-icons/fa';

type LongFieldProps = {
	title : string;
	desc? : string;
	isDetail? : boolean
	children? : React.ReactNode
	onChange : (input : string) => void
}

const LongField:React.FC<LongFieldProps> = ({title, desc, isDetail, children, onChange}) => {
	const [drop, setDrop] = useState<boolean>(false);
	const [textInput, setTextInput] = useState<string>('');

	useEffect(() => {
    const storedTextInput = localStorage.getItem(`textInput-${title}`);
    if (storedTextInput) setTextInput(storedTextInput);
  }, [title]);

	useEffect(() => {
    localStorage.setItem(`textInput-${title}`, textInput);
  }, [textInput, title]);

	const handleInputChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
		const newInput = e.target.value
		setTextInput(newInput)
		onChange(newInput)
	}

	return ( 
		<>
			<div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-2 py-3 sm:px-4 sm:py-4 w-full max-w-[600px] overflow-hidden'>
				<div className='flex justify-between items-center w-full max-w-[600px] overflow-hidden'>
					<p className='font-semibold sm:text-lg mb-1'>{title} <span className='text-red-600'>*</span></p>
					{isDetail &&
						<button type='button' className='flex items-center justify-center gap-2 group' onClick={() => {setDrop(!drop)}}>
							{drop ?
								<>
									<span className='text-xs text-indigo-500 '>detailed description</span>
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
				<textarea
					value={textInput}
					onChange={handleInputChange}
					className='border border-indigo-500/30 rounded-md outline-indigo-500 p-2 text-sm hover:border-indigo-500/80 h-[150px] myscrollbar-child text-balance'
					placeholder='Contoh : 10.000.000.000'
					maxLength={2000}
				/>
			</div>
		</>
	);
}
 
export default LongField;