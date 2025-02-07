import Button from "../../components/shared/Button";
import { Link } from "react-router-dom";
import Advert from "./Advert";
import { AdvertType } from "./types";

const EmptyList = () => (
  <div className="tweetsPage-empty">
    <p>Se el primero!</p>
    <Button $variant="primary">Publica un anuncio</Button>
  </div>
);

interface Props {
  adverts: AdvertType[];
}
function Adverts({ adverts }: Props) {
  return (
    <div className="container mx-auto p-6">
    {adverts.length ? (
      <article className="flex justify-center items-center">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {adverts.map((advert) => (
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
  </div>
  )
}

export default Adverts;
