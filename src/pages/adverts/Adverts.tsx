import { Link } from "react-router-dom";
import Advert from "./Advert";
import { AdvertType } from "./types";
import EmptyList from "./EmpltyList";
import { useState } from "react";
import Button from "../../components/shared/Button";



interface Props {
  adverts: AdvertType[];
}
function Adverts({ adverts }: Props) {
  const skip = 5
  const [position, setPosition] = useState<number>(1);
  const [paginatedFilter, setPaginate] = useState<number[]>([0, skip]);
  const [disabledButton, setDisabledButton] = useState<boolean>(false);
  
  const limit = adverts.length / skip; // Redondeamos hacia arriba
  console.log(adverts.length)
  
  // Paginación segura para evitar valores negativos
  const handlePaginate = (isNext: boolean) => {
    let newPosition = isNext ? position + 1 : position - 1;
    if(newPosition>=limit){
      newPosition = limit
      setDisabledButton(true)
    }else if(newPosition<1){
      newPosition = 1
    }
    else if (disabledButton){
      setDisabledButton(false)  }
      setPosition(newPosition)
      setPaginate([skip * (newPosition - 1), skip * newPosition]);   
      
    ;
  };
  
  
const paginatedAdds = adverts.slice(paginatedFilter[0], paginatedFilter[1]) ?? [];
console.log(position)
console.log(paginatedFilter)

  return (
    <div className="container mx-auto p-6">
      <button onClick={ ()=>handlePaginate(true)}>siguiente</button>
      <button onClick={ ()=>handlePaginate(false)}>Atras</button>
    {paginatedAdds.length ? (
      <article className="flex justify-center items-center">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
  </div>
  )
}

export default Adverts;
