import type { NextPage } from 'next'
import Head from 'next/head'
import style from '../../styles/Unavailable.module.scss'
import WithNavFooter from '../../layout/front-layout/WithNavFooter'

const Unauthorized: NextPage = () => {
  return (
    <>
      <main className={style.main}>
        <div
          className={style.bgContainer}
        >
          <span>未經授權</span>
        </div>
      </main>
    </>
  )
}

export default WithNavFooter(Unauthorized)
