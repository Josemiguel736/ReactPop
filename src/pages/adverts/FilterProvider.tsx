import { ReactNode, useState } from "react";
import { AdvertType } from "./types";
import { FilterContext } from "./context";

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [filteredAdverts, setFilteredAdverts] = useState<AdvertType[] | null>(
    null
  );

  return (
    <FilterContext.Provider value={{ filteredAdverts, setFilteredAdverts }}>
      {children}
    </FilterContext.Provider>
  );
}
