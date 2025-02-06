import { client, setAuthorizationHeader } from "../../api/client";
import storage from "../../utils/storage";
import { Credentials, Login } from "./types";



export const login = async (credentials: Credentials) =>{
    const response = await client.post<Login>("/api/auth/login",credentials)
    const {accessToken} = response.data
    storage.set("auth",accessToken)
    setAuthorizationHeader(accessToken)
}
