import type { NextPage } from 'next'
import Head from 'next/head'
import style from '../styles/Unavailable.module.scss'
import { WithNavFooter } from '../layout/BaseLayout'

const Custom404: NextPage = () => {
  return (
    <>
      <main className={style.main}>
        <div
          className={style.bgContainer}
        >
          <span>頁面建設中</span>
        </div>
      </main>
    </>
  )
}

export default WithNavFooter(Custom404)
