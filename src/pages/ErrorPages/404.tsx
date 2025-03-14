import { Link } from 'react-router-dom';
import Button from '../../components/shared/Button';

export default function Page404() {
	return (
		<div className="flex items-center justify-center text-center">
			<div className="mt-20 ">
				<h1 className="text-3xl">Ups! Parece que te has perdido!</h1>
				<h2 className="text-2xl ">Te llevo al inicio?</h2>
				<Link to="/">
						<Button $variant="primary">Si llevame al inicio</Button>
					</Link>
			</div>
		</div>
	);
}
