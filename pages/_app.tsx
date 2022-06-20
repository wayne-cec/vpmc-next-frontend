import '../styles/globals.css'
import 'animate.css'
import type { AppProps } from 'next/app'
import BaseLayout from '../layout/BaseLayout'
import { Provider } from 'react-redux'
import store from '../store'
import { useRouter } from 'next/router'

function MyApp ({ Component, pageProps }: AppProps) {
  const route = useRouter()

  if (route.route === '/login') {
    return <Provider store={store}><Component {...pageProps} /></Provider>
  } else {
    return <Provider store={store}><BaseLayout><Component {...pageProps} /></BaseLayout></Provider>
  }
}

export default MyApp
