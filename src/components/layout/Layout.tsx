import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface Props {
	children: ReactNode;
}

export default function Layout({ children }: Props) {
	return (
		<div className="h-screen  bg-sky-100">
			<Header />
			<main className=" bg-sky-100">{children}</main>
			<Footer />
		</div>
	);
}
