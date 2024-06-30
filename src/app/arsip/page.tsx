import FormButton from "./_components/formButton";
import ShowData from "./_components/showData";
import ShowMapData from "./_components/showMapData";

const ArchivePage = () => {
	return ( 
		<>
			<FormButton />
			<div className='grid lg:grid-cols-3 grid-cols-1 lg:divide-x-2 lg:divide-indigo-500 h-screen'>
				<div className='col-span-2'>
					<ShowData />
				</div>
				<ShowMapData />
			</div>
		</>
	);
}
 
export default ArchivePage;