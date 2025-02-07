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
    <div className="container">
      {adverts.length ? (
        <article className="flex justify-center items-center">
          <ul>
            {adverts.map((advert) => (
              <li className="mt-3.5" key={advert.id}>
                <Link to={`/adverts/${advert.id}`}>
                  <Advert advert={advert}></Advert>
                </Link>
              </li>
            ))}
          </ul>
        </article>
      ) : (
        <EmptyList />
      )}
    </div>
  );
}

export default Adverts;
