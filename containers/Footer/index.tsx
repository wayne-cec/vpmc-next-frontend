import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import Router from 'next/router'
import { appraisalAnalysis, onlineSupport, statistic, aprV2Link } from '../Header'
import { useAuth } from '../../layout/BaseLayout'

const renderContent = (index: number, link: {
  name: string
  route: string
  protected: boolean
}) => {
  return (
    <p key={index}
      className={style.content}
      onClick={() => { Router.push(link.route) }}
    >{link.name}</p>
  )
}

const Footer = () => {
  const { isAuthenticated } = useAuth()

  return (
    <footer className={style.footer}>

      <div className={style.footerMap}>
        <div className={style.tree}>
          <p className={style.title}>估價分析</p>
          {
            appraisalAnalysis.map((link, index) => {
              return link.protected
                ? isAuthenticated
                  ? renderContent(index, link)
                  : null
                : renderContent(index, link)
            })
          }
        </div>
        {/* <div className={style.tree}>
          <p className={style.title}>線上支援</p>
          {
            onlineSupport.map((link, index) => {
              return link.protected
                ? isAuthenticated
                  ? renderContent(index, link)
                  : null
                : renderContent(index, link)
            })
          }
        </div> */}
        <div className={style.tree}>
          <p className={style.title}>統計及行情</p>
          {
            statistic.map((link, index) => {
              return link.protected
                ? isAuthenticated
                  ? renderContent(index, link)
                  : null
                : renderContent(index, link)
            })
          }
        </div>
        <div className={style.tree}>
          <p className={style.title} onClick={() => { Router.push('/aprV2/commitee') }}>實價登陸2.0</p>
          {/* {
            aprV2Link.map((link, index) => {
              return link.protected
                ? isAuthenticated
                  ? renderContent(index, link)
                  : null
                : renderContent(index, link)
            })
          } */}
        </div>
      </div>

      <div className={style.copyRightContainer}>
        <p>Copyright © 2022 VPMC 版權所有</p>
      </div>

    </footer>
  )
}

export default Footer