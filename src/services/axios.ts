import axios from 'axios'
import { parseCookies } from 'nookies'

export function getAPIClient(ctx?: any) {
  const { 'auth_next-token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000'
  })

  api.interceptors.request.use(config => {
    // console.log(config)

    return config
  })

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
  }

  return api
}
