import { ReactNode, useState } from 'react';
import { AdvertType } from '../../../pages/adverts/types';
import { FilterContext } from '../../../pages/adverts/context';

interface Props {
	children: ReactNode;
}

export function FilterProvider({ children }: Props) {
	const [filteredAdverts, setFilteredAdverts] = useState<AdvertType[] | null>(
		null,
	);

	return (
		<FilterContext.Provider value={{ filteredAdverts, setFilteredAdverts }}>
			{children}
		</FilterContext.Provider>
	);
}
