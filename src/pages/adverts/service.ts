import { client } from "../../api/client"
import { AdvertContent, AdvertType } from "./types"

const advertsUrl = import.meta.env.ADVERTS_URL ?? "/api/v1/adverts"

export const getLastestAdverts = async () =>{
    const url = `${advertsUrl}`

    const response = await client.get<AdvertType[]>(url)
    return response.data
    }

export const createAdvert = async (advert:AdvertContent) => {
    const response = await client.post<AdvertType>(advertsUrl,advert)
    return response.data
}

export const getTags = async ()=>{
    const response = await client.get<string[]>(`${advertsUrl}/tags`)
    return response.data
}
