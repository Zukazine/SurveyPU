import React from "react";

type judul = {
	textNormal: string;
	textEmergency?: string;
}

const JudulEpic : React.FC<judul> = ({textNormal, textEmergency}) => {
	return ( 
		<>
			<div className='min-[450px]:text-4xl text-2xl font-mono font-black text-black sm:mb-6 mb-4 ml-1'>
				<span className='selection:text-indigo-500'>{textNormal} </span><span className='selection:text-orange-400'>{textEmergency}</span>
			</div>
		</>
	);
}
 
export default JudulEpic;