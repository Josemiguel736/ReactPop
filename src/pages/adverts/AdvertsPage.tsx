import { useEffect, useState } from "react";
import FilterAdverts from "../../components/filter/FilterAdverts";
import Adverts from "./Adverts";
import { AdvertType } from "./types";
import { getLastestAdverts } from "./service";
import { FilterContext } from "./context";

export default function AdvertsPage() {
  const [adverts, setAdverts] = useState<AdvertType[]>([]);
  const [filteredAdverts, setFilteredAdverts] = useState<AdvertType[] | null>(
    null
  );

  useEffect(() => {
    getLastestAdverts()
      .then((response) => {
        setAdverts(response);
        console.log("GET");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <FilterContext.Provider value={{ filteredAdverts, setFilteredAdverts }}>
      <div className="flex flex-row w-screen  ">
        <div className="flex justify-center w-1/5 mt-4 ml-4 bg-sky-700 h-max  border-5 rounded-2xl  border-sky-800">
          <FilterAdverts adverts={adverts} />
        </div>
        <div className="flex justify-center items-center w-2/3   ">
          <Adverts adverts={filteredAdverts ?? adverts} />
        </div>
      </div>
    </FilterContext.Provider>
  );
}
