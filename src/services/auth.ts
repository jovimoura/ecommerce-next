import { v4 as uuid } from 'uuid'

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
  console.log('DATA', data)

  /**
   * Change delay function to a function to do a authentication of user on database
   */
  await delay()

  return {
    token: uuid(),
    user: {
      name: 'João Moura',
      email: 'joaovictors.mouraa@gmail.com',
      avatar_url: 'https://github.com/jovimoura.png'
    }
  }
}

/**
 * RecoverUser, if browser have a token, this function will be return the user
 * @returns { user: { name: String, email: String, avatar_url: String } } 
 */
export async function recoverUserInformation() {
  await delay()

  return {
    user: {
      name: 'João Moura',
      email: 'joaovictors.mouraa@gmail.com',
      avatar_url: 'https://github.com/jovimoura.png'
    }
  }
}
