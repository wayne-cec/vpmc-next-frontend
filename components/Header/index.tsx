import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import Image from 'next/image'
import NavButton from '../../components/NavButton'
import MenuDrawer from './MenuDrawer'
import Router from 'next/router'
import HeaderDrawer from './HeaderDrawer'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, selectUserApps, setUserToken, isAppPermitted, AppCode } from '../../store/slice/user'
import { useAuth } from '../../layout/AuthContext'
import UserGreet from '../../components/UserGreet'
import CustomMarquee from '../../components/CustomMarquee'

export const appraisalAnalysis: {
  name: string
  route: string
  protected: boolean
  appCode: AppCode
}[] = [
    { name: '現勘資料表', route: '/appraisalAnalysis/surveySheet', protected: true, appCode: 'function:surveySheet' },
    { name: '市場比較法', route: '/appraisalAnalysis/marketCompare', protected: true, appCode: 'function:marketCompare' },
    { name: '市場比較法(批次) ', route: '/appraisalAnalysis/marketCompareBatch', protected: true, appCode: 'function:batchMarketCompare' },
    { name: '土開分析法', route: '/appraisalAnalysis/landSurvey', protected: true, appCode: 'function:landDevelop' }
  ]

export const onlineSupport = [
  { name: '網站使用手冊', route: '/onlineSupport/manual', protected: false },
  { name: '估價相關法令', route: '/onlineSupport/law', protected: false },
  { name: '技術公報/範本', route: '/onlineSupport/report', protected: true }
]

const renderContent = (index: number, link: {
  name: string
  route: string
  protected: boolean
}) => {
  return (
    <NavButton
      key={index}
      onClick={() => { Router.push(link.route) }}
    >{link.name}</NavButton>
  )
}

const Header = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector(selectUser)
  const appInfo = useSelector(selectUserApps)
  const { isAuthenticated } = useAuth()
  const [menuDrawerOpen, setmenuDrawerOpen] = useState<boolean>(false)
  const [appAnalysis, setappAnalysis] = useState<boolean>(false)

  const handleLogout = () => {
    dispatch(
      setUserToken('')
    )
    Router.push('/')
  }

  const renderMarqueeUI = () => {
    return (
      <div className={style.marqueeContainer}>
        <CustomMarquee />
      </div>
    )
  }

  const renderAprMapUI = () => {
    return (
      <NavButton
        onMouseOver={() => { }}
        onMouseLeave={() => { }}
        onClick={() => { Router.push('/aprV2/commitee') }}
      >實價地圖</NavButton>
    )
  }

  return (
    <div className={style.headerContainer}>
      <header className={style.header}>
        <div className={style.contentGroup}>
          <div className={style.iconContainer}>
            <Image src={'/logo.jpg'} width="64.8px" height="39.6px"
              onClick={() => { Router.push('/') }}
            ></Image>
          </div>
        </div>
        {
          isAuthenticated && <>
            {
              isAppPermitted('news:marquee', appInfo) && renderMarqueeUI()
            }
            <div className={style.buttonGroup}>
              <NavButton
                onMouseOver={() => { setappAnalysis(true) }}
                onMouseLeave={() => { setappAnalysis(false) }}
              >估價分析</NavButton>
              {
                isAppPermitted('function:aprMap', appInfo) && renderAprMapUI()
              }
            </div>
          </>
        }

        <div className={style.contact}>
          <UserGreet
            username={userInfo.userProfile?.username!}
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
            onLogin={() => { Router.push('/login') }}
          />
        </div>

        <div className={style.burger}>
          <NavButton onClick={() => { setmenuDrawerOpen(true) }}>≡</NavButton>
        </div>
        <MenuDrawer
          open={menuDrawerOpen}
          onClose={() => { setmenuDrawerOpen(false) }}
        ></MenuDrawer>

      </header>

      <HeaderDrawer
        open={appAnalysis}
        onMouseOver={() => { setappAnalysis(true) }}
        onMouseLeave={() => { setappAnalysis(false) }}
      >
        {
          appraisalAnalysis.map((link, index) => {
            return link.protected
              ? isAuthenticated && isAppPermitted(link.appCode, appInfo) && renderContent(index, link) //  
              : renderContent(index, link)
          })
        }
      </HeaderDrawer>
    </div>
  )
}

export default Header