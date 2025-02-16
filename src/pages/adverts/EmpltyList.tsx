import {  useNavigate } from 'react-router-dom';
import Button from '../../components/shared/Button';


const EmptyList = () =>{ 
	
	const navigate = useNavigate();
	return(
	<div className="bg-sky-600 h-full flex  justify-center text-amber-50">
		<div className="flex flex-col justify-center gap-3 content-center items-center ">
			<h1 className="text-3xl">Vaya parece que no hay anuncios!</h1>
			<h2 className="text-2xl">Quieres ser el primero?</h2>
			<Button onClick={() => navigate("/adverts/new")} className="mb-2" $variant="primary">
				Publica un anuncio
			</Button>
		</div>
	</div>
)};

export default EmptyList;
