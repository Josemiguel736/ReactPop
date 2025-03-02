import { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import imageNotFound from '../../assets/imageNotFound.jpg';
import Button from '../../components/shared/Button';
import Confirm from '../../components/shared/ConfirmButton';
import { ApiClientError } from '../../api/error';
import ErrorSpan from '../../components/errors/ErrorSpan';
import LoadingPage from '../../components/shared/loadingPage/LoadingPage';
import Page500 from '../ErrorPages/500';
import { useAppDispatch, useAppSelector } from '../../store';
import { getUi,getAdvert } from '../../store/selectors';
import { advertDeleted, advertLoaded } from '../../store/actions';

function AdvertDetail() {
	const params = useParams();
	const dispatch = useAppDispatch()

	const { pending: isLoading, error } = useAppSelector(getUi)
	
	const advert = useAppSelector(getAdvert(params.advertId))

	useEffect(() => {
			
				if (params.advertId) {
					dispatch(advertLoaded(params.advertId))
				}
			
		
	}, [params.advertId, dispatch]);

	const [isClicked, setIsClicked] = useState(false);

	const handleSubmit = async () => {
		if (advert) {
			dispatch(advertDeleted(advert.id))
		}
	};

	return isLoading ? (
		<LoadingPage />
	) : advert ? (
		<div className="mt-3 flex flex-col items-center justify-center  ">
			<div className="bg-sky-700 text-amber-50 p-6 flex flex-col items-center text-center rounded-xl shadow-lg ">
				<img
					className="w-full max-h-72 object-cover rounded-lg mb-4"
					src={advert.photo || imageNotFound}
					alt={`Imagen de ${advert.name}`}
				/>

				<h3 className="text-2xl font-bold mb-2">Producto: {advert.name}</h3>
				<span className="mb-1">{advert.sale ? 'En venta' : 'Se busca'}</span>
				<span className="mb-3">Precio: {advert.price}€</span>

				<div className="flex flex-col items-center justify-center bg-sky-400 p-2 rounded-md mb-3 w-full">
					<span className="font-semibold">Tags</span>
					<div className="flex flex-row">
						{advert.tags.map((tag) => (
							<span key={tag} className="mr-1.5">
								{tag}
							</span>
						))}
					</div>
				</div>

				<span className="text-sm mb-4">
					Publicado el {new Date(advert.createdAt).toLocaleDateString('es-ES')}
				</span>

				{isClicked ? (
					<div className="flex flex-col items-center gap-2 ">
						<p className="mb-2">
							¿Estás seguro de que quieres borrar el producto?
						</p>
						<Confirm
							titlePrimary="Cancelar"
							titleSecondary="Borrar Producto"
							setIsClicked={setIsClicked}
							handleSubmit={handleSubmit}
						/>
					</div>
				) : (
					<Button
						onClick={() => setIsClicked(true)}
						$variant="primary"
						className="mt-4"
					>
						Borrar Producto
					</Button>
				)}

				{error instanceof ApiClientError && (
					<ErrorSpan>
						Ha sucedido un error al borrar el producto, por favor inténtalo de
						nuevo más tarde
					</ErrorSpan>
				)}
			</div>
		</div>
	) : (
		<Page500 error={new Error('Hemos tenido un problema')} />
	);
}

export default AdvertDetail;
