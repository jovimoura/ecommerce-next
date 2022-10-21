import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { AuthProvider } from '../contexts/AuthContext'
import { Navbar } from '../components/Navbar'
import { useRouter } from 'next/router'

interface CustomPageProps {
  session: any
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps<CustomPageProps>) {
  const router = useRouter()

  return (
    <AuthProvider>
      <SessionProvider session={session}>
        {router.asPath !== '/' ? <Navbar /> : null}
        <Component {...pageProps} />
      </SessionProvider>
    </AuthProvider>
  )
}

export default MyApp
