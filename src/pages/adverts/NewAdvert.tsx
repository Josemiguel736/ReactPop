import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../../components/shared/FormField';
import Button from '../../components/shared/Button';
import { createAdvert, getTags } from './service';
import { ApiClientError } from '../../api/error';
import { isApiClientError } from '../../api/client';
import Page501 from '../ErrorPages/501';
import ErrorSpan from '../../components/errors/ErrorSpan';
import ProgresIndicator from '../../assets/ProgressIndicator.gif';

function NewAdvertPage() {
	const navigate = useNavigate();

	const [error, setError] = useState<ApiClientError | null>(null);

	const [isLoading, setIsLoading] = useState(false);

	const [tags, setTags] = useState<string[]>([]);

	useEffect(() => {
		const searchTags = async () => {
			try {
				const tagsData = await getTags(); // petición a la API para obtener los tags
				setTags(tagsData);
			} catch (error) {
				if (isApiClientError(error)) {
					setError(error);
					console.warn(
						'ERROR IN API CALL TO GET ADVERT TAGS FROM NEW ADVERT PAGE',
						error,
					);
				} else if (error instanceof Error) {
					console.warn(
						'GENERIC ERROR ON ADVERT TAGS FROM NEW ADVERT PAGE',
						error,
					);
					return <Page501 error={error} />;
				}
			}
		};
		searchTags();
	}, []);

	const [name, setName] = useState('');
	const [minText, setMinText] = useState(false);

	const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value.length < 3) {
			// validación de que el nombre del producto tenga al menos 3 letras
			setMinText(true);
		} else {
			setMinText(false);
		}
		setName(event.target.value);
	};

	const [price, setPrice] = useState('');
	const [numIsInvalid, setNumInvalid] = useState(false);
	const handlePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
		const num = parseFloat(event.target.value);

		if (num < 0) {
			setNumInvalid(true); // validación de que el precio no sea negativo
		} else {
			setNumInvalid(false);
		}
		setPrice(event.target.value);
	};

	const [trading, setTrading] = useState('venta');

	const [checkedTags, setCheckedTags] = useState<string[]>([]);
	const [tagsAreChecked, setTagsAreChecked] = useState<boolean | null>(null);

	const handleCheckboxChange = (tag: string) => {
		// función para manejar los tags seleccionados
		if (checkedTags.length < 1) {
			setTagsAreChecked(true);
		} else {
			setTagsAreChecked(false);
		}

		setCheckedTags((prevChecked) => {
			const isChecked = prevChecked.includes(tag);
			if (isChecked) {
				return prevChecked.filter((t) => t !== tag);
			} else {
				return [...prevChecked, tag];
			}
		});
	};

	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedFile(e.target.files?.[0] || null);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			if (tagsAreChecked && !numIsInvalid && !minText) {
				// validación de que los tags estén seleccionados, el precio no sea negativo y el nombre del producto tenga al menos 3 letras
				setIsLoading(true);
				const onSale = trading === 'venta' ? 'true' : 'false';
				const formData = new FormData();
				formData.append('name', name);
				formData.append('price', price);
				formData.append('sale', onSale);
				checkedTags.forEach((tag) => formData.append('tags', tag));
				if (selectedFile) {
					formData.append('photo', selectedFile);
				}
				const response = await createAdvert(formData);
				navigate(`/adverts/${response.id}`);
			} else if (checkedTags.length < 1) {
				setTagsAreChecked(false);
			}
		} catch (error) {
			if (isApiClientError(error)) {
				setError(error);
				console.warn(
					'ERROR IN API CALL TO POST ADVERT FROM NEW ADVERT PAGE',
					error,
				);
			} else if (error instanceof Error) {
				console.warn('GENERIC ERROR IN NEW ADVERT PAGE', error);
				return <Page501 error={error} />;
			}
		}
	};

	return (
		<div className="h-1/3 mt-10 flex items-center justify-center">
			<form
				onSubmit={handleSubmit}
				className="text-white p-6 rounded-lg shadow-lg w-1/2 bg-sky-700 flex flex-col justify-center items-center text-center"
			>
				<h1 className="text-2xl mt-2.5 mb-1">Crear anuncio</h1>

				<FormField
					type="text"
					name="name"
					value={name}
					onChange={handleName}
					className="mt-4 border-2 rounded-lg "
					placeholder="Producto"
					required
				/>
				{minText ? (
					<ErrorSpan>El producto debe de tener al menos 3 letras</ErrorSpan>
				) : null}
				<FormField
					type="number"
					name="price"
					value={price}
					onChange={handlePrice}
					placeholder="Precio"
					className="mt-4 border-2 rounded-lg "
					required
				/>

				{numIsInvalid ? (
					<ErrorSpan>El precio no puede ser negativo</ErrorSpan>
				) : null}
				<select
					value={trading}
					required
					onChange={(select) => setTrading(select.target.value)}
					className="cursor-pointer"
				>
					<option className="cursor-pointer bg-gray-500" value="compra">
						Compra
					</option>
					<option className="cursor-pointer bg-gray-500" value="venta">
						Venta
					</option>
				</select>

				<h3 className="text-xl mb-4">Selecciona tus categorías:</h3>

				<div className="flex flex-col gap-2 ">
					{tags.map((tag) => (
						<label key={tag} className="flex items-center gap-2 cursor-pointer">
							<input
								type="checkbox"
								value={tag}
								checked={checkedTags.includes(tag)}
								onChange={() => handleCheckboxChange(tag)}
								className="cursor-pointer"
							/>
							{tag}
						</label>
					))}
				</div>
				<div className="mt-4 p-3 rounded-lg ">
					<strong>Seleccionados:</strong>{' '}
					{checkedTags.length > 0 ? checkedTags.join(', ') : 'Ninguno'}
				</div>
				{tagsAreChecked === false && (
					<ErrorSpan onClick={() => setTagsAreChecked(null)}>
						Por favor selecciona al menos un tag
					</ErrorSpan>
				)}
				<input
					type="file"
					className="bg-sky-900 p-2.5 w-full sm:w-100 cursor-pointer "
					onChange={handleFileChange}
				/>

				<Button $variant="primary" type="submit" className="mt-4 mb-2.5">
					Publicar
				</Button>
				{isLoading ? (
					<img className="max-h-30 mt-2.5 rounded-2xl" src={ProgresIndicator} />
				) : null}

				{error instanceof ApiClientError ? (
					<ErrorSpan
						onClick={() => setError(null)}
						children="Ha ocurrido un problema al crear el producto porfavor intentalo más tarde"
					/>
				) : null}
			</form>
		</div>
	);
}

export default NewAdvertPage;
