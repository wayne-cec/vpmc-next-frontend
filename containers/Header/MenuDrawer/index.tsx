import React from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import Router from 'next/router'
// import { newBuildingLink, preOwnedLink, rentLink } from '../index'
import { appraisalAnalysis, onlineSupport, statistic, aprV2Link } from '../index'
import { useAuth } from '../../../layout/BaseLayout'

export interface IMenuDrawer {
  open: boolean
  onClose: () => void
}

const renderContent = (index: number, link: {
  name: string
  route: string
  protected: boolean
}, onClose: () => void) => {
  return (
    <p
      key={index}
      className={style.content}
      onClick={() => {
        Router.push(link.route)
        onClose()
      }}
    >{link.name}
    </p>
  )
}

const MenuDrawer = (props: IMenuDrawer) => {
  const { isAuthenticated } = useAuth()
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
            <p className={style.title}>估價分析</p>
            {
              appraisalAnalysis.map((link, index) => {
                return link.protected
                  ? isAuthenticated
                    ? renderContent(index, link, props.onClose)
                    : null
                  : renderContent(index, link, props.onClose)
              })
            }
          </div>
          <div className={style.tree}>
            <p className={style.title}>線上支援</p>
            {
              onlineSupport.map((link, index) => {
                return link.protected
                  ? isAuthenticated
                    ? renderContent(index, link, props.onClose)
                    : null
                  : renderContent(index, link, props.onClose)
              })
            }
          </div>
          <div className={style.tree}>
            <p className={style.title}>統計及行情</p>
            {
              statistic.map((link, index) => {
                return link.protected
                  ? isAuthenticated
                    ? renderContent(index, link, props.onClose)
                    : null
                  : renderContent(index, link, props.onClose)
              })
            }
          </div>
          <div className={style.tree}>
            <p className={style.title}>實價登陸2.0</p>
            {
              aprV2Link.map((link, index) => {
                return link.protected
                  ? isAuthenticated
                    ? renderContent(index, link, props.onClose)
                    : null
                  : renderContent(index, link, props.onClose)
              })
            }
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