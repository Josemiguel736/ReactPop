
import { useEffect, useState } from "react";
import FilterAdverts from "../../components/filter/FilterAdverts";
import Adverts from "./Adverts";
import { AdvertType } from "./types";
import { getLastestAdverts } from "./service";



export default function AdvertsPage(){

    const [adverts, setAdverts] = useState<AdvertType[]>([])

    useEffect(()=>{
        getLastestAdverts().then((response)=>{
            setAdverts(response)
        }).catch((error)=>{
            console.log(error)
        })
    },[])

    
    return( <div className="flex flex-row w-screen bg-amber-300  ">
        <div className="flex justify-center w1/3 bg-amber-600 w-1/3 ">
        <FilterAdverts adverts={adverts}/>
        </div>
        <div className="flex justify-center items-center w-2/3   ">

        <Adverts adverts={adverts}/></div>
        </div>
    )
}