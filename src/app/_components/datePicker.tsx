'use client'

import { useState, useEffect } from "react";

interface DatePickerProps {
	onChange: (date: string) => void;
  }

const DatePicker: React.FC<DatePickerProps> = ({ onChange }) => {
	const [date, setDate] = useState<string>('');
	
	useEffect(() => {
    const storedDate = localStorage.getItem('date');
		if (storedDate) setDate(storedDate);
	}, []);

	// Save values to local storage
	useEffect(() => {
    localStorage.setItem('date', date);
  }, [date]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setDate(newDate);
    onChange(newDate);
  };

	return ( 
		<>
			<div className='flex flex-col gap-2 bg-white border border-violet-500/50 rounded-lg px-2 py-3 sm:px-4 sm:py-4 w-full max-w-[600px] overflow-hidden'>
				<p className='font-semibold w-full text-wrap sm:text-lg mb-1'><span className='selection:text-indigo-500'>Tanggal Survey </span><span className='text-red-600 selection:text-red-600'>* </span><span className='pl-1 bg-white text-xs font-normal selection:text-orange-500/90'>{`(klik icon kalender)`}</span></p>
				<input
					required={true}
					type="date"
					value={date}
					// onChange={(e) => setDate(e.target.value)}
					onChange={handleDateChange}
					className='max-w-32 bg-indigo-500 px-2 py-1 text-white text-sm transition-all shadow-[1.5px_1.5px_0px_black] hover:shadow-none hover:translate-x-[1.5px] hover:translate-y-[1.5px] outline-white focus:bg-white focus:outline-indigo-500 focus:text-black cursor-pointer focus:cursor-text'
				/>
			</div>
		</>
	);
}
 
export default DatePicker;