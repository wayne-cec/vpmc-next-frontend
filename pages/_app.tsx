import '../styles/globals.css'
import 'animate.css'
import { Provider } from 'react-redux'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import store, { persistor } from '../store'
import { PersistGate } from 'redux-persist/integration/react'
import React from 'react'
// import BaseLayout from '../layout/BaseLayout'

function MyApp ({ Component, pageProps }: AppProps) {
  const route = useRouter()

  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Component {...pageProps} />
    </PersistGate>
  </Provider>
}


export default MyApp
