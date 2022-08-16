import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import store, { persistor } from '../store'
import type { AppProps } from 'next/app'
import { GoogleOAuthProvider } from '@react-oauth/google'

import '../styles/globals.css'
import 'animate.css'

function MyApp ({ Component, pageProps }: AppProps) {
  console.log(process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID)
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID || ''}>
        <Component {...pageProps} />
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
}


export default MyApp
