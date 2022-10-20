import { v4 as uuid } from 'uuid'
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

export async function signInRequest(data: SignInRequestData) {
  const { email, password } = data
  console.log(`email: ${email}, password: ${password}`)

  const res = await api.post('/api/login', {
    email,
    password
  })
  console.log('RES', res)

  await delay()

  return res.data
}

/**
 * RecoverUser, if browser have a token, this function will be return the user
 * @returns { user: { name: String, email: String, avatar_url: String } }
 */
export async function recoverUserInformation(token?: string) {
  await delay()

  return {
    user: {
      name: 'João Moura',
      email: 'joaovictors.mouraa@gmail.com',
      avatar_url: 'https://github.com/jovimoura.png'
    }
  }
}
