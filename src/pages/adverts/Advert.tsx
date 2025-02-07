import { AdvertType } from "./types";
import imageNotFound from "../../assets/imageNotFound.jpg"

interface Props {
  advert: AdvertType;
}

const Advert = ({ advert }: Props) => {
  const { createdAt, name, sale, price, tags } = advert;
  const date = new Date(createdAt)

  return (
    <div className="bg-sky-700 text-amber-50 p-4 flex flex-col items-center text-center rounded-xl shadow-md">
  <h3 className="text-3xl font-bold mb-3">{name}</h3>

  <div className="w-full h-48 bg-gray-200 overflow-hidden rounded-lg">
    <img
      className="w-full h-full object-cover"
      src={advert.photo ? advert.photo : imageNotFound}
      alt={`Imagen del producto ${name}`}
    />
  </div>

  <span className="mt-3">{sale}</span>

  <div className="mb-3">
    <span className="text-[20px] mr-2.5">Precio: <strong>{price}</strong></span>
    <span>{advert.sale ? "Compra" : "Venta"}</span>
  </div>

  <div className="flex flex-col text-center justify-center bg-sky-400 pl-5 pr-5 rounded-lg">
    <span>Tags</span>
    <span className="text-[10px]">{tags}</span>
  </div>

  <span className="mt-2">Publicado el {date.toLocaleDateString("es-ES")}</span>
</div>

  );
};

export default Advert;
