import React from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import Router from 'next/router'
import { newBuildingLink, preOwnedLink, rentLink } from '..'

export interface IMenuDrawer {
  open: boolean
  onClose: () => void
}

const MenuDrawer = (props: IMenuDrawer) => {
  return (
    <>
      <div className={classNames({
        [style.menuDrawer]: true,
        [style.hide]: !props.open
      })}>
        <div className={style.header}>
          <p onClick={() => { props.onClose() }}>✕</p>
        </div>

        <div className={style.content}>
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
      </div>
      <div className={classNames({
        [style.backgroundGray]: true,
        [style.hide]: !props.open
      })}
        onClick={() => { props.onClose() }}
      ></div>
    </>

  )
}

export default MenuDrawer