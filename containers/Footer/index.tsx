import React from 'react'
import style from './index.module.scss'
import Router from 'next/router'
import { newBuildingLink, preOwnedLink, rentLink } from '../Header'

const Footer = () => {
  return (
    <footer className={style.footer}>

      <div className={style.footerMap}>
        <div className={style.tree}>
          <p className={style.title} onClick={() => { Router.push('/') }}>新建案</p>
          {
            newBuildingLink.map((link, index) => {
              return <p
                key={index}
                className={style.content}
                onClick={() => { Router.push(link.route) }}
              >{link.name}</p>
            })
          }
        </div>
        <div className={style.tree}>
          <p className={style.title}>中古屋</p>
          {
            preOwnedLink.map((link, index) => {
              return <p
                key={index}
                className={style.content}
                onClick={() => { Router.push(link.route) }}
              >{link.name}</p>
            })
          }
        </div>
        <div className={style.tree}>
          <p className={style.title} onClick={() => { Router.push('/news') }}>租屋</p>
          {
            rentLink.map((link, index) => {
              return <p
                key={index}
                className={style.content}
                onClick={() => { Router.push(link.route) }}
              >{link.name}</p>
            })
          }
        </div>
        <div className={style.tree}>
          <p className={style.title}>店面</p>
          <p className={style.title}>辦公</p>
          <p className={style.title}>廠房土地</p>
        </div>

        <div className={style.tree}>
          <p className={style.title}>新聞</p>
          <p className={style.title}>實價登陸2.0</p>
        </div>
      </div>

      <div className={style.copyRightContainer}>
        <p>Copyright © 2022 VPMC 版權所有</p>
      </div>

    </footer>
  )
}

export default Footer