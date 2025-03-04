import { useEffect, useState } from 'react';
import { AdvertType } from '../../pages/adverts/types';
import Button from '../shared/Button';
import FormField from '../shared/FormField';
import RangeSlider from './filterComponents/RangeSlider';
import { getTags, getUi } from '../../store/selectors';
import { useFilter } from '../../pages/adverts/context';
import { ApiClientError } from '../../api/error';
import ErrorSpan from '../errors/ErrorSpan';
import { useAppDispatch, useAppSelector } from '../../store';
import { tagsLoaded } from '../../store/actions';

interface Props {
	adverts: AdvertType[];
}

interface FilterSettings {
	name: string;
	priceMin: number;
	priceMax: number;
}

function filter(
	filterSettings: FilterSettings,
	tagsToFilter: string[],
	adverts: AdvertType[],
) {
	const includesName = (advert: AdvertType, name: string) =>
		advert.name.includes(name);

	const filterPrice = (
		advert: AdvertType,
		priceMin: number,
		priceMax: number,
	) => {
		if (priceMin > priceMax) return advert.price >= priceMin;

		return advert.price >= priceMin && advert.price <= priceMax;
	};

	const filterTags = (advert: AdvertType, tagsToFilter: string[]) => {
		const searchTags = advert.tags.filter((tag) => tagsToFilter.includes(tag));
		return searchTags.length === tagsToFilter.length;
	};

	let filteredAdverts = adverts;
	if (filterSettings.name) {
		filteredAdverts = filteredAdverts.filter((add) =>
			includesName(add, filterSettings.name),
		);
	}

	if (filterSettings.priceMax != 0 || filterSettings.priceMin != 0) {
		filteredAdverts = filteredAdverts.filter((add) =>
			filterPrice(add, filterSettings.priceMin, filterSettings.priceMax),
		);
	}

	if (tagsToFilter.length != 0) {
		filteredAdverts = filteredAdverts.filter((add) =>
			filterTags(add, tagsToFilter),
		);
	}

	return filteredAdverts;
}

export default function FilterAdverts({ adverts }: Props) {
	const dispatch = useAppDispatch();
	const ui = useAppSelector(getUi);
	const error = ui.tagsError;

	const [filterContent, setFilter] = useState({
		name: '',
		priceMin: 0,
		priceMax: 0,
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFilter((filterContent) => ({
			...filterContent,
			[name]:
				name === 'priceMin' || name === 'priceMax' ? Number(value) : value,
		}));
	};

	const priceMax =
		filterContent.priceMax < filterContent.priceMin
			? filterContent.priceMin
			: filterContent.priceMax;

	const tags = useAppSelector(getTags);

	useEffect(() => {
		dispatch(tagsLoaded());
	}, [dispatch]);

	const [tagsToFilter, setCheckedTags] = useState<string[]>([]);

	const handleCheckboxChange = (tag: string) => {
		setCheckedTags((tagsToFilter) => {
			const isChecked = tagsToFilter.includes(tag);
			if (isChecked) {
				return tagsToFilter.filter((t) => t !== tag);
			} else {
				return [...tagsToFilter, tag];
			}
		});
	};
	const { setFilteredAdverts } = useFilter();

	const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const filteredAdds = filter(filterContent, tagsToFilter, adverts);
		setFilteredAdverts(filteredAdds);
	};

	let maxPrice: number | null = null;

	if (adverts && adverts.length > 0) {
		const calculateMaxPrice = adverts.reduce((prev, curr) =>
			curr.price > prev.price ? curr : prev,
		);
		maxPrice = calculateMaxPrice.price;
	}

	return error instanceof ApiClientError ? (
		<ErrorSpan children="No se ha podido cargar el filtro" />
	) : (
		<form
			onSubmit={handleOnSubmit}
			className="text-white p-6 rounded flex flex-col text-center bg-sky-800 w-full sm:w-200 lg:w-80 "
		>
			<h1 className="text-2xl mt-2.5 mb-4 font-semibold">Filtrar Productos</h1>
			<span className="mt-4">
				{' '}
				Nombre
				<FormField
					type="text"
					name="name"
					value={filterContent.name}
					onChange={handleChange}
					className=" border-2 rounded-lg p-2 text-amber-50 "
					placeholder="Texto"
				/>
			</span>

			<RangeSlider
				showValue={filterContent.priceMin}
				spanName="Precio Mínimo"
				name="priceMin"
				min={0}
				max={maxPrice ?? 1000}
				step={1}
				onChange={handleChange}
				value={filterContent.priceMin}
				className="mt-4"
			/>

			<RangeSlider
				showValue={priceMax}
				spanName="Precio Máximo"
				name="priceMax"
				min={0}
				max={maxPrice ?? 1000}
				step={1}
				onChange={handleChange}
				value={priceMax}
				className="mt-4"
			/>

			<h3 className="text-xl mb-4 font-semibold">Selecciona tus categorías:</h3>
			<div className="flex items-center justify-center">
				<div className="grid grid-cols-2 gap-2">
					{tags.map((tag) => (
						<label key={tag} className="flex items-center gap-2">
							<input
								type="checkbox"
								value={tag}
								checked={tagsToFilter.includes(tag)}
								onChange={() => handleCheckboxChange(tag)}
							/>
							{tag}
						</label>
					))}
				</div>
			</div>

			<div className="mt-4 p-3 rounded-lg bg-sky-600">
				<strong>Seleccionados:</strong>{' '}
				{tagsToFilter.length > 0 ? tagsToFilter.join(', ') : 'Ninguno'}
			</div>

			<Button $variant="primary" type="submit" className="mt-4 ">
				Filtrar
			</Button>
		</form>
	);
}
