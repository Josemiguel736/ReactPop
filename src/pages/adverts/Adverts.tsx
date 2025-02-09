import { Link } from "react-router-dom";
import Advert from "./Advert";
import { AdvertType } from "./types";
import EmptyList from "./EmpltyList";
import { useState } from "react";

interface Props {
  adverts: AdvertType[];
}
function Adverts({ adverts }: Props) {
  const skip = 6;

  const [position, setPosition] = useState<number>(1);

  const [paginatedFilter, setPaginate] = useState<number[]>([0, skip]);

  const limit = Math.ceil(adverts.length / skip);

  const handlePaginate = (isNext: boolean) => {
    let newPosition = isNext ? position + 1 : position - 1;
    newPosition = Math.max(1, Math.min(newPosition, limit));
    setPosition(newPosition);
    setPaginate([skip * (newPosition - 1), skip * newPosition]);
  };

  const paginatedAdds =
    adverts.slice(paginatedFilter[0], paginatedFilter[1]) ?? [];

  return (
    <div className="container mx-auto p-6">
      {paginatedAdds.length ? (
        <article className="flex justify-center items-center">
          <ul className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
            {paginatedAdds.map((advert) => (
              <li key={advert.id} className="mt-3.5">
                <Link to={`/adverts/${advert.id}`}>
                  <Advert advert={advert} />
                </Link>
              </li>
            ))}
          </ul>
        </article>
      ) : (
        <EmptyList />
      )}
      <div className="flex justify-center items-center gap-4 mt-1.5 lg:80">
        <button
          onClick={() => handlePaginate(false)}
          className="bg-blue-600 text-white px-6 py-3  shadow-md hover:bg-blue-700 transition-all disabled:bg-gray-400 "
          disabled={position <= 1}
        >
          Atrás
        </button>

        <button
          onClick={() => handlePaginate(true)}
          className="bg-green-500 text-white px-6 py-3  shadow-md hover:bg-green-600 transition-all disabled:bg-gray-400 "
          disabled={position >= limit}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Adverts;
