'use client'

import React, { useState, useEffect } from "react";

const LongField = () => {
	const [textInput, setTextInput] = useState<string>('');

	useEffect(() => {
    const storedTextInput = localStorage.getItem('textInput');
    if (storedTextInput) setTextInput(storedTextInput);
  }, []);

	useEffect(() => {
    localStorage.setItem('textInput', textInput);
  }, [textInput]);


	return ( 
		<>
		</>
	);
}
 
export default LongField;