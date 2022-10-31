import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { AuthProvider } from '../contexts/AuthContext'
import { Navbar } from '../components/Navbar'
import store from '../redux/store'

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
        <Provider store={store}>
          {router.asPath !== '/' ? <Navbar /> : null}
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    </AuthProvider>
  )
}

export default MyApp
