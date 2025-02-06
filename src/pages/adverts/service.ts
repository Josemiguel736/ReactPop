import { client } from "../../api/client"
import { AdvertType } from "./types"

const advertsUrl = import.meta.env.ADVERTS_URL ?? "/api/v1/adverts"

export const getLastestAdverts = async () =>{
    const url = `${advertsUrl}`

    const response = await client.get<AdvertType[]>(url)
    return response.data
    }
