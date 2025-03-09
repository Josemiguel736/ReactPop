import { Link } from 'react-router-dom';
import Button from '../../components/shared/Button';

export default function Page500({ error }: { error: Error }) {
	return (
		<div className="flex items-center justify-center text-center text-amber-50 bg-sky-500 h-screen">
			<div className="mt-20 bg-sky-700 p-11 ">
				<h1 className="text-3xl">Ups! Parece que hemos tenido un problema!</h1>
				<h3 className="text-1xl ">{error.message}</h3>
				<h2 className="text-2xl mt-3.5">Intentamos volver al inicio?</h2>
				<div className="mt-2.5 mb-2.5">
					<Link to="/">
						<Button $variant="primary">Si llevame al inicio</Button>
					</Link>
				</div>
				<span>
					Si este error continua por favor informe al servicio de ReactPop{' '}
					<strong>customers@reactpop.com</strong>{' '}
				</span>
			</div>
		</div>
	);
}
