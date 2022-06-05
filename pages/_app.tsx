import '../styles/globals.css'
import type { AppProps } from 'next/app'
import BaseLayout from '../layout/BaseLayout'
import { Provider } from 'react-redux'
import store from '../store'

function MyApp ({ Component, pageProps }: AppProps) {
  return <Provider store={store}><BaseLayout><Component {...pageProps} /></BaseLayout></Provider>
}

export default MyApp
