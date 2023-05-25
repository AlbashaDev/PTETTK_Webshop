import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    // Higher order component
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
