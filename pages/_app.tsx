import '../styles/globals.css'
import 'animate.css'
import type { AppProps } from 'next/app'
import BaseLayout from '../layout/BaseLayout'
import { Provider } from 'react-redux'
// import store from '../store'
import { useRouter } from 'next/router'
import React from 'react'
import store, { persistor } from '../store'
import { PersistGate } from 'redux-persist/integration/react'

function MyApp ({ Component, pageProps }: AppProps) {
  const route = useRouter()
  // const { store, props } = wrapper.useWrappedStore(rest)


  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {
        route.route === '/login'
          ? <Component {...pageProps} />
          : <BaseLayout><Component {...pageProps} /></BaseLayout>
      }
    </PersistGate>
  </Provider>

  // if (route.route === '/login') {
  //   <Provider store={store}>

  //   </Provider>
  //   return <PersistGate loading={null} persistor={persistor}><Component {...pageProps} /></PersistGate>
  // } else {

  //   return <PersistGate loading={null} persistor={persistor}><BaseLayout><Component {...pageProps} /></BaseLayout></PersistGate>
  // }
}


export default MyApp
