'use client'

import React, { useState, useEffect } from 'react';

const FormWithPersistence: React.FC = () => {
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
    <div className='flex py-10 justify-center h-screen w-full bg-gradient-to-br from-violet-600 to-sky-400'>
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
									className='max-w-40 bg-indigo-500 px-2 text-white py-[1px] rounded-[5px] transition-all shadow-[1.5px_1.5px_0px_black] hover:shadow-none hover:translate-x-[1.5px] hover:translate-y-[1.5px]'
							/>
					</div>
					<div>

							<input
									type="text"
									value={shortInput}
									onChange={(e) => setShortInput(e.target.value)}
							/>
					</div>
					<div>
							<label>
							Dropdown:
							<select value={dropdown} onChange={(e) => setDropdown(e.target.value)}>
									<option value="">Select an option</option>
									<option value="A">A</option>
									<option value="B">B</option>
									<option value="C">C</option>
									<option value="D">D</option>
							</select>
							</label>
					</div>
					<div>
							<label>
							Text Input:
							<textarea
									value={textInput}
									onChange={(e) => setTextInput(e.target.value)}
							/>
							</label>
					</div>
					<div>
							<label>
							File Upload:
							<input type="file" accept="image/jpeg, image/png" onChange={handleFileChange} />
							</label>
					</div>
						<button type="submit" className='px-6 py-2 mr-3 mt-7 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] self-end'>Submit</button>
				</div>
			</form>
    </div>
		
  );
};

export default FormWithPersistence;
