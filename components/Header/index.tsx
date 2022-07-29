import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import Image from 'next/image'
import NavButton from '../../components/NavButton'
import MenuDrawer from './MenuDrawer'
import Router from 'next/router'
import HeaderDrawer from './HeaderDrawer'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUserToken } from '../../store/slice/user'
import { useAuth } from '../../layout/BaseLayout'
import UserGreet from '../../components/UserGreet'
import CustomMarquee from '../../components/CustomMarquee'

export const appraisalAnalysis = [
  { name: '現勘資料表', route: '/appraisalAnalysis/surveySheet', protected: true },
  { name: '市場比較法', route: '/appraisalAnalysis/marketCompare', protected: true },
  { name: '市場比較法(批次) ', route: '/appraisalAnalysis/marketCompareBatch', protected: true },
  { name: '土開分析法', route: '/appraisalAnalysis/landSurvey', protected: true }
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
  const { isAuthenticated } = useAuth()
  const [menuDrawerOpen, setmenuDrawerOpen] = useState<boolean>(false)
  const [appAnalysis, setappAnalysis] = useState<boolean>(false)
  const [onlineSup, setonlineSup] = useState<boolean>(false)

  const handleLogout = () => {
    dispatch(
      setUserToken('')
    )
    Router.push('/')
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
          isAuthenticated
            ? <>
              <div className={style.marqueeContainer}>
                <CustomMarquee />
              </div>
              <div className={style.buttonGroup}>
                <NavButton
                  onMouseOver={() => { setappAnalysis(true) }}
                  onMouseLeave={() => { setappAnalysis(false) }}
                >估價分析</NavButton>
                <NavButton
                  onMouseOver={() => { }}
                  onMouseLeave={() => { }}
                  onClick={() => { Router.push('/aprV2/commitee') }}
                >實價地圖</NavButton>
              </div>
            </> : null
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
              ? isAuthenticated
                ? renderContent(index, link)
                : null
              : renderContent(index, link)
          })
        }
      </HeaderDrawer>

      <HeaderDrawer
        open={onlineSup}
        onMouseOver={() => { setonlineSup(true) }}
        onMouseLeave={() => { setonlineSup(false) }}
      >
        {
          onlineSupport.map((link, index) => {
            return link.protected
              ? isAuthenticated
                ? renderContent(index, link)
                : null
              : renderContent(index, link)
          })
        }
      </HeaderDrawer>
    </div>
  )
}

export default Header