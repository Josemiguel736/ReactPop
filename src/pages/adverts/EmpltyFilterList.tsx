import { Link } from 'react-router-dom';
import Button from '../../components/shared/Button';

const EmptyFilterList = () => {
	return (
		<div className="bg-sky-600 h-full flex  justify-center text-amber-50">
			<div className="flex flex-col justify-center gap-3 content-center items-center ">
				<h1 className="text-3xl">
					Vaya parece que no hay nada como lo que buscas!
				</h1>
				<h2 className="text-2xl">Quieres crear tu el primero?</h2>
				<Link to="/adverts/new">
					<Button className="mb-2" $variant="primary">
						Publica un anuncio
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default EmptyFilterList;
