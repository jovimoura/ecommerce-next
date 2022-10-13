import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { AuthProvider } from '../contexts/AuthContext'

interface CustomPageProps {
  session: any
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps<CustomPageProps>) {
  return (
    <AuthProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </AuthProvider>
  )
}

export default MyApp
