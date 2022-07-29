import type { NextPage } from 'next'
import { WithNothingLayout } from '../../layout/BaseLayout'
import AdminContainer from '../../containers/AdminContainer'
import Head from 'next/head'

const Admin: NextPage = () => {
  return (
    <>
      <Head>
        <title>VPMC | 實價登錄資訊平台 | 後台</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/yuantai.ico" />
      </Head>
      <AdminContainer />
    </>
  )
}

export default WithNothingLayout(Admin)
