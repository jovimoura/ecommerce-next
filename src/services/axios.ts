import axios, { AxiosRequestConfig } from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {
  const { "auth_jmShop-token": token } = parseCookies(ctx);

  // console.log("ambient", process.env.NODE_ENV as string);

  const api = axios.create({
    baseURL:
      process.env.NODE_ENV === "production"
        ? (process.env.PROD_URL_API as string)
        : (process.env.DEV_URL_API as string),
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    // console.log(config)

    return config;
  });

  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  return api;
}
