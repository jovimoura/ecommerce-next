import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { AuthProvider } from "../contexts/AuthContext";
import { Navbar } from "../components/Navbar";
import store from "../redux/store";

interface CustomPageProps {
  session: any;
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<CustomPageProps>) {
  const router = useRouter();

  return (
    <AuthProvider>
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  );
}

export default MyApp;
