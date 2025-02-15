import { useEffect, useState } from 'react';
import FilterAdverts from '../../components/filter/FilterAdverts';
import Adverts from './Adverts';
import { AdvertType } from './types';
import { getLastestAdverts } from './service';
import { ApiClientError } from '../../api/error';
import { isApiClientError } from '../../api/client';
import Page500 from '../ErrorPages/500';
import LoadingPage from '../../components/shared/loadingPage/LoadingPage';
import { FilterProvider } from '../../components/filter/filterComponents/FilterProvider';

export default function AdvertsPage() {
	const [adverts, setAdverts] = useState<AdvertType[]>([]);
	const [error, setError] = useState<ApiClientError | null>(null);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getLastestAdverts()
			.then((response) => {
				setAdverts(response); // Se guarda el array de anuncios en el estado
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				if (isApiClientError(error)) {
					setError(error);
					console.warn('ERROR IN API CALL TO ADVERTS FROM ADVERTS', error);
				} else if (error instanceof Error) {
					console.warn('GENERIC ERROR IN ADVERTS', error);
					return <Page500 error={error} />;
				}
			});
	}, []);
	// Se pasa el array de anuncios filtrados o el array de anuncios completo
	return isLoading ? (
		<LoadingPage />
	) : error ? (
		<Page500 error={error} />
	) : (
		<FilterProvider>
			<div className="flex flex-col lg:flex-row w-screen ">
				<div className="flex justify-center w-full lg:w-1/5 mt-4 sm:mt-0 lg:ml-6  h-max  rounded-2xl p-4">
					<FilterAdverts adverts={adverts} />
				</div>

				<div className="flex justify-center items-center w-2/3 sm:m-auto flex-col ">
					<Adverts adverts={adverts} />
				</div>
			</div>
		</FilterProvider>
	);
}
