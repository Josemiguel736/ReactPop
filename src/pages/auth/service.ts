import {
  client,
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from "../../api/client";
import storage from "../../utils/storage";
import { Credentials, Login } from "./types";

export const login = async (credentials: Credentials, remember: boolean) => {
  const response = await client.post<Login>("/api/auth/login", credentials);
  const { accessToken } = response.data;
  if (remember) {
    storage.set("auth", accessToken);
  }
  setAuthorizationHeader(accessToken);
};

export const logout = () => {
  storage.remove("auth");
  removeAuthorizationHeader();
};

export const authTokenValid = async () => {
  const response = await client.get("/api/auth/me");
  return response;
};

