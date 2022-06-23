import type { NextPage } from 'next'
import Head from 'next/head'
import style from '../styles/Home.module.scss'
import PageHeader from '../containers/PageHeader'
import classNames from 'classnames'
import 'animate.css'
import { useSelector } from 'react-redux'
import { selectUser } from '../store/slice/user'
import { WithNavFooter } from '../layout/BaseLayout'

const Home: NextPage = () => {
  const userInfo = useSelector(selectUser)

  return (
    <>
      <Head>
        <title>VPMC | 實價登錄資訊平台</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/b.ico" />
      </Head>
      <main className={classNames({
        [style.main]: true,
        'animate__animated': true
        // ,
        // 'animate__backInDown': true,
      })}>
        <PageHeader
          title={'VPMC | 實價登錄資訊平台'}
        // title={userInfo.token}
        />
      </main>
    </>
  )
}

export default WithNavFooter(Home)
