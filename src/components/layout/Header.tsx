import { Link, NavLink } from 'react-router-dom';
import ReactLogo from '../../assets/reactLogo';
import AuthButton from '../shared/AuthButton';
import { useState } from 'react';
import { useAppSelector } from '../../store';
import { getIsLogged } from '../../store/selectors';

export default function Header() {
	const  isLogged  = useAppSelector(getIsLogged)
	const [isOpen, setIsOpen] = useState(false);

	const NavLinks = () => {
		return (
			<>
				<NavLink to="/adverts/new">Nuevo producto</NavLink>
				<NavLink end to="/adverts">
					Productos
				</NavLink>
				<AuthButton />
			</>
		);
	};

	const handleNavbar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<header className="relative bg-sky-900 h-1/10 max-h-[60px] text-amber-50 flex items-center   px-4">
			<Link to="/adverts">
				<ReactLogo />
			</Link>
			{isLogged ? (
				<>
					<nav className="bg-sky-900 w-full text-amber-50 justify-end flex items-center  px-4 ">
						<div className="hidden justify-between flex-row gap-20 items-center md:flex">
							<NavLinks />
						</div>
						<div className="md:hidden   ">
							<button onClick={handleNavbar}>
								{isOpen ? 'Cerrar' : 'Menu'}
							</button>
						</div>
					</nav>
					{isOpen && (
						<div className="absolute md:hidden top-full left-0 w-full flex flex-col items-center basis-full bg-sky-900 gap-1.5 p-3.5">
							<NavLinks />
						</div>
					)}
				</>
			) : null}
		</header>
	);
}
