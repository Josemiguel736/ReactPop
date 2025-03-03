import { useEffect } from 'react';
import FilterAdverts from '../../components/filter/FilterAdverts';
import Adverts from './Adverts';
import Page500 from '../ErrorPages/500';
import LoadingPage from '../../components/shared/loadingPage/LoadingPage';
import { FilterProvider } from '../../components/filter/filterComponents/FilterProvider';
import { useAppDispatch, useAppSelector } from '../../store';
import { getAdverts, getUi } from '../../store/selectors';
import { advertsLoaded } from '../../store/actions';

export default function AdvertsPage() {
	const adverts = useAppSelector(getAdverts);
	const { pending: isLoading, error } = useAppSelector(getUi);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(advertsLoaded());
	}, [dispatch]);

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

				<div className="flex justify-center items-center w-2/3 m-auto flex-col ">
					<Adverts adverts={adverts} />
				</div>
			</div>
		</FilterProvider>
	);
}
