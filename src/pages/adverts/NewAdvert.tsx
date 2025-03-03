import { useEffect, useState } from 'react';
import FormField from '../../components/shared/FormField';
import Button from '../../components/shared/Button';
import { ApiClientError } from '../../api/error';
import { isApiClientError } from '../../api/client';
import Page500 from '../ErrorPages/500';
import ErrorSpan from '../../components/errors/ErrorSpan';
import ProgresIndicator from '../../assets/ProgressIndicator.gif';
import { advertCreated, tagsLoaded, uiResetError } from '../../store/actions';
import { useAppDispatch, useAppSelector } from '../../store';
import {  getTags, getUi } from '../../store/selectors';

function NewAdvertPage() {

	

	const {pending:isLoading, error, tagsError:tagError} = useAppSelector(getUi)


	const [hasSubmit, setHasSubmit] = useState(false);
	const dispatch = useAppDispatch()

	 const tags = useAppSelector(getTags)

	useEffect(() => {
		dispatch(tagsLoaded())
	}, [dispatch]);

	const [name, setName] = useState('');
	const minText = name.length < 3 && name.length>0

	const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const [price, setPrice] = useState('');
	
	const numIsInvalid = parseFloat(price)< 0

	const handlePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
		
		setPrice(event.target.value);
	};

	const [trading, setTrading] = useState('venta');

	const [checkedTags, setCheckedTags] = useState<string[]>([]);

	const handleCheckboxChange = (tag: string) => {
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
		setHasSubmit(true);
		try {
			if (checkedTags.length > 0 && !numIsInvalid && !minText) {
				// validación de que los tags estén seleccionados, el precio no sea negativo y el nombre del producto tenga al menos 3 letras
				const onSale = trading === 'venta' ? 'true' : 'false';
				const formData = new FormData();
				formData.append('name', name);
				formData.append('price', price);
				formData.append('sale', onSale);
				checkedTags.forEach((tag) => formData.append('tags', tag));
				if (selectedFile) {
					formData.append('photo', selectedFile);
				}
				dispatch(advertCreated(formData))
			}
		} catch (error) {
			if (isApiClientError(error)) {				
				console.warn(
					'ERROR IN API CALL TO POST ADVERT FROM NEW ADVERT PAGE',
					error,
				);
			} else if (error instanceof Error) {
				console.warn('GENERIC ERROR IN NEW ADVERT PAGE', error);
				return <Page500 error={error} />;
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

				{tagError ? (
					<ErrorSpan>
						Ha surgido un error al cargar los tags por favor intentelo más tarde
					</ErrorSpan>
				) : (
					<div className="flex flex-col gap-2 ">
						{tags.map((tag) => (
							<label
								key={tag}
								className="flex items-center gap-2 cursor-pointer"
							>
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
				)}
				<div className="mt-4 p-3 rounded-lg ">
					<strong>Seleccionados:</strong>{' '}
					{checkedTags.length > 0 ? checkedTags.join(', ') : 'Ninguno'}
				</div>
				{checkedTags.length === 0 && hasSubmit && (
					<ErrorSpan>Por favor selecciona al menos un tag</ErrorSpan>
				)}
				<label htmlFor='file-upload' children={"Sube una foto"} />
				<input
					id = "file-upload"
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
						onClick={() =>dispatch(uiResetError()) }
						children="Ha ocurrido un problema al crear el producto porfavor intentalo más tarde"
					/>
				) : null}
			</form>
		</div>
	);
}

export default NewAdvertPage;
