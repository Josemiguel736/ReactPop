import { AdvertType } from "./types";

interface Props {
  advert: AdvertType;
}

const Advert = ({ advert }: Props) => {
  const { createdAt, name, sale, price, tags } = advert;
  const date = new Date(createdAt)

  return (
    <div className="bg-sky-700 text-amber-50 p-3 flex flex-col text-center rounded-xl">
      {advert.photo ? <span>{advert.photo}</span> : null}
      <h3 className="text-2xl font-bold">Producto: {name}</h3>
      <span>{sale}</span>
      <span>Precio: {price}</span>
      <div className="flex flex-col text-center justify-center bg-sky-400">
      <span>Tags</span>
      <span className="text-[10px]">{tags}</span>
      </div>
      <span>publicado el {date.toLocaleDateString("es-ES")}</span>
    </div>
  );
};

export default Advert;
