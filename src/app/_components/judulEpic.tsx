import React from "react";

type judul = {
	textNormal: string;
	textEmergency?: string;
}

const JudulEpic : React.FC<judul> = ({textNormal, textEmergency}) => {
	return ( 
		<>
			<div className='text-4xl font-mono font-black text-black mb-6'>
				<span className='selection:text-indigo-500'>{textNormal} </span><span className='selection:text-red-400'>{textEmergency}</span>
			</div>
		</>
	);
}
 
export default JudulEpic;