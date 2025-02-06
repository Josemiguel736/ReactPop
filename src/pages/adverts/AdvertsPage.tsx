import { useAuth } from "../auth/context";
import Adverts from "./Adverts";
import PleaseLogin from "./PleaseLogin";


export default function AdvertsPage(){
    const {isLogged} = useAuth()
    return( isLogged ? 
        <div><Adverts></Adverts></div> : <PleaseLogin/>
    )
}