import { AdvertType  } from "./types";

interface Props{
    advert: AdvertType
}

const Advert = ({advert}:Props) =>{
    const {createdAt, name, sale,price,tags} = advert

    return (
        <article>
            <div>
                <h3>{name}</h3>
                <span>{sale}</span>
                <span>{price}</span>
                <span>{tags}</span>
                {advert.photo ? 
                <span>{advert.photo}</span>
                 : null}
                <span>{createdAt}</span>
                
            </div>
        </article>
    )
}

export default Advert