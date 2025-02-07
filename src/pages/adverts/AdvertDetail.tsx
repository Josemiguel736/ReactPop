import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdvertType } from "./types";
import { getAdvert } from "./service";
import { AxiosError } from "axios";
import imageNotFound from "../../assets/imageNotFound.jpg"


function AdvertDetail () {
  const params = useParams()
  const navigate = useNavigate()

  const [advert,setAdvert] = useState<AdvertType | null>(null)

  useEffect(() => {
    const advertParams = async () => {
      try {
        if (params.advertId) {
          const advertInfo = await getAdvert(params.advertId);
          setAdvert(advertInfo);
        }
      } catch (error) {
        console.log(error)
        if (error instanceof AxiosError) {
          if (error.code == "ERR_BAD_REQUEST") {
            navigate("/404");
          }
        }
      }
    };
    advertParams();
  }, []);
  
  if (advert){
  const {name,  sale, price, tags, createdAt } = advert;
  const date = new Date(createdAt)

  return (<div className="w-full flex flex-col items-center mt-4">
    <div className="bg-sky-700 text-amber-50 p-6 flex flex-col items-center text-center rounded-xl shadow-lg h-150  max-w-2/3  ">
      <img
      className=" w-1/2 max-h-180 rounded-lg mb-4"
      src={advert.photo ? advert.photo : imageNotFound}
      alt="Imagen del producto"
    />
  
  <h3 className="text-2xl font-bold mb-2">Producto: {name}</h3>
  <span className="mb-1">{sale}</span>
  <span className="mb-3">Precio: {price}</span>
  <div className="flex flex-col items-center justify-center bg-sky-400 p-2 rounded-md mb-3 w-full">
    <span className="font-semibold">Tags</span>
    <span className="text-xs">{tags}</span>
  </div>
  <span className="text-sm">Publicado el {date.toLocaleDateString("es-ES")}</span>
</div></div>
  );
} }

export default AdvertDetail;
