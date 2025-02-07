import { createContext, useContext } from "react"
import { AdvertType } from "./types"

interface FilterContextProps {
  filteredAdverts: AdvertType[] | null
  setFilteredAdverts: (adverts: AdvertType[]) => void
}

export const FilterContext = createContext<FilterContextProps>({ 
    filteredAdverts: [],
    setFilteredAdverts: () => undefined
});

export function useFilter() {
  const filtertContext = useContext(FilterContext);
  return filtertContext
}
