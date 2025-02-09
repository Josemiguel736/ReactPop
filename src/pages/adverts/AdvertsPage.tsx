import { useEffect, useState } from "react";
import FilterAdverts from "../../components/filter/FilterAdverts";
import Adverts from "./Adverts";
import { AdvertType } from "./types";
import { getLastestAdverts } from "./service";
import { FilterContext } from "./context";
import { ApiClientError } from "../../api/error";
import { isApiClientError } from "../../api/client";
import Page501 from "../ErrorPages/501";
import LoadingPage from "../loadingPage/LoadingPage";


export default function AdvertsPage() {
  const [adverts, setAdverts] = useState<AdvertType[]>([]);
  const [error, setError] = useState<ApiClientError | null>(null);
  const [filteredAdverts, setFilteredAdverts] = useState<AdvertType[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    getLastestAdverts()
      .then((response) => {
        setAdverts(response);
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        if (isApiClientError(error)) {
          setError(error);
          console.warn("ERROR IN API CALL TO ADVERTS FROM ADVERTS", error);
        } else if (error instanceof Error) {
          console.warn("GENERIC ERROR IN ADVERTS", error);
          return <Page501 error={error} />;
        }
      }
    );
  }, []);

  return isLoading ?  <LoadingPage/> :  error ? (
    <Page501 error={error} />
  ) : (
    <FilterContext.Provider value={{ filteredAdverts, setFilteredAdverts }}>
  <div className="flex flex-col lg:flex-row w-screen "> 
    <div className="flex justify-center w-full lg:w-1/5 mt-4 sm:mt-0 lg:ml-6  h-max  rounded-2xl p-4">
      <FilterAdverts adverts={adverts} />
    </div>
    
    <div className="flex justify-center items-center w-full flex-col ">
      <Adverts adverts={filteredAdverts ?? adverts} />
    </div>
  </div>
</FilterContext.Provider>
  );
}
