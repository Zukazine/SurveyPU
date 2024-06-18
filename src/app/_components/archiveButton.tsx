import Link from "next/link";

const ArchiveButton = () => {
	return ( 
		<Link 
			href={'/arsip'}	
			className='fixed z-[9999] bg-transparent bottom-[65px] left-10'
		>
			<div className='flex items-center justify-center rounded-full w-12 h-12 bg-indigo-500 cursor-pointer overflow-hidden shadow-[2px_2px_0px_black] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]'>
				<svg
					className='p-2'
					width="72"
					height="72"
					viewBox="0 0 72 72" 
					fill="none" 
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M36 54L48 42L43.8 37.8L39 42.6V30H33V42.6L28.2 37.8L24 42L36 54ZM15 24V57H57V24H15ZM15 63C13.35 63 11.938 62.413 10.764 61.239C9.59 60.065 9.002 58.652 9 57V19.575C9 18.875 9.113 18.2 9.339 17.55C9.565 16.9 9.902 16.3 10.35 15.75L14.1 11.175C14.65 10.475 15.337 9.93702 16.161 9.56102C16.985 9.18502 17.848 8.99802 18.75 9.00002H53.25C54.15 9.00002 55.013 9.18802 55.839 9.56402C56.665 9.94002 57.352 10.477 57.9 11.175L61.65 15.75C62.1 16.3 62.438 16.9 62.664 17.55C62.89 18.2 63.002 18.875 63 19.575V57C63 58.65 62.413 60.063 61.239 61.239C60.065 62.415 58.652 63.002 57 63H15ZM16.2 18H55.8L53.25 15H18.75L16.2 18Z" fill="#ffffff"/>
				</svg>
			</div>
		</Link>
	);
}
 
export default ArchiveButton;