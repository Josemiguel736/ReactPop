import { RootState } from ".";
import { AdvertType } from "../pages/adverts/types";

const defaultData: AdvertType[] = []
export const getIsLogged = (state:RootState) => state.auth

export const getUi = (state:RootState)=>state.ui

export const getAdverts = (state:RootState) => state.adverts.data || defaultData