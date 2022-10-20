import { createContext, useEffect, useState } from 'react'
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { recoverUserInformation, signInRequest } from '../services/auth'
import { api } from '../services/api'

interface SignInData {
  email: string
  password: string
}

interface User {
  name: string
  email: string
  avatar_url: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  signIn: (data: SignInData) => Promise<{ message: string }>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user

  useEffect(() => {
    const { 'auth_next-token': token } = parseCookies()

    if (token) {
      recoverUserInformation(token).then(res => setUser(res.user))
    }
  }, [])

  async function signIn({ email, password }: SignInData) {
    try {
      const { token, user } = await signInRequest({
        email,
        password
      })

      // runing on web, so first params is undefined
      setCookie(undefined, 'auth_next-token', token, {
        maxAge: 60 * 60 * 1 // 1 hour
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      setUser(user)
      Router.push('/dashboard')
      return { message: 'Logged!' }
    } catch (error) {
      Router.push('/')
      return { message: `Error: ${error}` }
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
