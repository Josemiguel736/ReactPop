import { RootState } from ".";
import { AdvertType } from "../pages/adverts/types";

const defaultAdvertData: AdvertType[] = []
const defaultTagsData : string[] =[]

export const getIsLogged = (state:RootState) => state.auth

export const getUi = (state:RootState)=>state.ui

export const getAdverts = (state:RootState) => state.adverts.data || defaultAdvertData

export const getTags = (state:RootState) => state.tags.data ?? defaultTagsData

export const getTagsError = (state:RootState) => state.tags.error?? null

export const getAdvert = (advertId?:string) => (state:RootState) =>
    state.adverts.data?.find((advert) => advert.id === advertId)