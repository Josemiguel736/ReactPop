import { useEffect, useState } from "react";
import FilterAdverts from "../../components/filter/FilterAdverts";
import Adverts from "./Adverts";
import { AdvertType } from "./types";
import { getLastestAdverts } from "./service";
import { FilterContext } from "./context";
import { ApiClientError } from "../../api/error";
import { isApiClientError } from "../../api/client";
import Page501 from "../ErrorPages/501";

export default function AdvertsPage() {
  const [adverts, setAdverts] = useState<AdvertType[]>([]);
  const [error, setError] = useState<ApiClientError | null>(null);
  const [filteredAdverts, setFilteredAdverts] = useState<AdvertType[] | null>(
    null
  );

  useEffect(() => {
    getLastestAdverts()
      .then((response) => {
        setAdverts(response);
      })
      .catch((error) => {
        if (isApiClientError(error)) {
          setError(error);
          console.warn("ERROR IN API CALL TO ADVERTS FROM ADVERTS", error);
        } else if (error instanceof Error) {
          console.warn("GENERIC ERROR IN ADVERTS", error);
          return <Page501 error={error} />;
        }
      });
  }, []);

  return error ? (
    <Page501 error={error} />
  ) : (
    <FilterContext.Provider value={{ filteredAdverts, setFilteredAdverts }}>
      <div className="flex flex-row w-screen  ">
        <div className="flex justify-center w-1/5 mt-4 ml-4 bg-sky-700 h-max  border-5 rounded-2xl  border-sky-800">
          <FilterAdverts adverts={adverts} />
        </div>
        <div className="flex justify-center items-center w-full flex-row   ">
          <Adverts adverts={filteredAdverts ?? adverts} />
        </div>
      </div>
    </FilterContext.Provider>
  );
}
