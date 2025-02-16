import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdvertType } from './types';
import { deleteAdvert, getAdvert } from './service';
import imageNotFound from '../../assets/imageNotFound.jpg';
import Button from '../../components/shared/Button';
import ConfirmLogout from '../../components/shared/ConfirmButton';
import { ApiClientError } from '../../api/error';
import { isApiClientError } from '../../api/client';
import ErrorSpan from '../../components/errors/ErrorSpan';
import LoadingPage from '../../components/shared/loadingPage/LoadingPage';
import Page500 from '../ErrorPages/500';

function AdvertDetail() {
	const params = useParams();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);
	const [advert, setAdvert] = useState<AdvertType | null>(null);
	const [error, setError] = useState<ApiClientError | null>(null);

	useEffect(() => {
		const advertParams = async () => {
			try {
				if (params.advertId) {
					const advertInfo = await getAdvert(params.advertId); // petición a la API para obtener el anuncio individual
					setAdvert(advertInfo);
				}
			} catch (error) {
				if (isApiClientError(error)) {
					if (error.code === 'NOT_FOUND') {
						console.log('ERROR 404');
						// Si hay un error en la petición a la API  o un error genérico redirigimos a la página de Not Found
						navigate('/404');
					} else {
						console.warn(
							'ERROR IN API CALL TO ADVERT DETAIL FROM ADVERT DETAIL',
							error,
						);
					}
				} else if (error instanceof Error) {
					console.warn('GENERIC ERROR IN ADVERT DETAILS', error);
					navigate('/404');
				}
			} finally {
				setIsLoading(false); // Manejo del estado de carga
			}
		};
		advertParams();
	}, [params.advertId, navigate]);

	const [isClicked, setIsClicked] = useState(false);

	const handleSubmit = async () => {
		if (advert) {
			try {
				setIsLoading(true);
				await deleteAdvert(advert.id);
				navigate('/');
			} catch (error) {
				if (isApiClientError(error)) {
					setError(error);
					console.warn(
						'ERROR IN API CALL TO DELETE ADVERT FROM ADVERT DETAIL',
						error,
					);
				} else if (error instanceof Error) {
					console.warn('GENERIC ERROR IN ADVERT DETAILS', error);
					navigate('/404');
				}
			} finally {
				setIsLoading(false);
			}
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
						<ConfirmLogout
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
