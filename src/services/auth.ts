import { api } from './api'

type SignInRequestData = {
  email: string
  password: string
}

const delay = (amount = 750) =>
  new Promise(resolve => setTimeout(resolve, amount))

/**
 * SignIn function
 * @params data: { email: String, password: String }
 * @return { token: String, user: { name: String, email: String, avatar_url: String } }
 */

export async function signInRequest(data: SignInRequestData): Promise<any> {
  const { email, password } = data

  const res = await api.post('/api/login', {
    email,
    password
  })

  await delay()

  return res.data
}

/**
 * RecoverUser, if browser have a token, this function will be return the user
 * @returns { user: { name: String, email: String, avatar_url: String } }
 */
export async function recoverUserInformation(token?: string): Promise<any> {
  const res = await api.get(`/api/login/${token}`)

  await delay()

  return res
}
