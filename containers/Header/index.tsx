import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import Image from 'next/image'
import NavButton from '../../components/NavButton'
import MenuDrawer from './MenuDrawer'
import Router from 'next/router'
// import classNames from 'classnames'
import HeaderDrawer from './HeaderDrawer'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUserProfile, setUserToken } from '../../store/slice/user'
import api from '../../api'
import { AuthContext } from '../../layout/BaseLayout'
import { useAuth } from '../../layout/BaseLayout'
import UserGreet from '../../components/UserGreet'
import Marquee from 'react-fast-marquee'
import MarqueeNews from '../../components/MarqueeNews'

export const appraisalAnalysis = [
  { name: '現勘資料表', route: '/appraisalAnalysis/surveySheet', protected: true },
  { name: '市場比較法', route: '/appraisalAnalysis/marketCompare', protected: true },
  { name: '土開分析法', route: '/appraisalAnalysis/landSurvey', protected: true }
]

export const onlineSupport = [
  { name: '網站使用手冊', route: '/onlineSupport/manual', protected: false },
  { name: '估價相關法令', route: '/onlineSupport/law', protected: false },
  { name: '技術公報/範本', route: '/onlineSupport/report', protected: true }
]

export const statistic = [
  { name: '使照建照', route: '/statistic/license', protected: true },
  { name: '臺灣總經概覽', route: '/statistic/economic', protected: true }
]

export const aprV2Link = [
  // { name: '社區個別', route: '/aprV2/commitee', protected: true },
  // { name: '地區總體', route: '/aprV2/region', protected: true }
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
  const [staticsOpen, setstaticsOpen] = useState<boolean>(false)
  const [aprV2, setaprV2] = useState<boolean>(false)

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
                <Marquee
                  gradientWidth={10}
                  speed={30}
                >
                  <MarqueeNews type={'快訊'} title={'沒有啦，這是假新聞'} />

                  <MarqueeNews type={'快訊'} title={'沒有啦，這是假新聞'} />

                  <MarqueeNews type={'快訊'} title={'沒有啦，這是假新聞'} />

                  <MarqueeNews type={'快訊'} title={'沒有啦，這是假新聞'} />

                  <MarqueeNews type={'快訊'} title={'沒有啦，這是假新聞'} />
                </Marquee>
              </div>

              <div className={style.buttonGroup}>
                <NavButton
                  onMouseOver={() => { setappAnalysis(true) }}
                  onMouseLeave={() => { setappAnalysis(false) }}
                >估價分析</NavButton>
                {/* <NavButton
               onMouseOver={() => { setonlineSup(true) }}
               onMouseLeave={() => { setonlineSup(false) }}
             >線上支援</NavButton> */}
                <NavButton
                  onMouseOver={() => { setstaticsOpen(true) }}
                  onMouseLeave={() => { setstaticsOpen(false) }}
                >統計及行情</NavButton>
                <NavButton
                  onMouseOver={() => { setaprV2(true) }}
                  onMouseLeave={() => { setaprV2(false) }}
                  onClick={() => { Router.push('/aprV2/commitee') }}
                >實價登陸2.0</NavButton>
              </div>
            </> : null
        }

        <div className={style.contact}>
          {
            isAuthenticated
              ? <>
                <UserGreet
                  username={userInfo.userProfile?.username!}
                />

                <NavButton
                  onClick={handleLogout}
                  style={{
                    paddingTop: '1px',
                    paddingBottom: '1px'
                  }}
                >登出</NavButton></>
              : <NavButton
                onClick={() => { Router.push('/login') }}
                style={{
                  paddingTop: '1px',
                  paddingBottom: '1px'
                }}
              >登入</NavButton>
          }
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

      <HeaderDrawer
        open={staticsOpen}
        onMouseOver={() => { setstaticsOpen(true) }}
        onMouseLeave={() => { setstaticsOpen(false) }}
      >
        {
          statistic.map((link, index) => {
            return link.protected
              ? isAuthenticated
                ? renderContent(index, link)
                : null
              : renderContent(index, link)
          })
        }
      </HeaderDrawer>

      {/* <HeaderDrawer
        open={aprV2}
        onMouseOver={() => { setaprV2(true) }}
        onMouseLeave={() => { setaprV2(false) }}
      >
        {
          aprV2Link.map((link, index) => {
            return link.protected
              ? isAuthenticated
                ? renderContent(index, link)
                : null
              : renderContent(index, link)
          })
        }
      </HeaderDrawer> */}

    </div>
  )
}

export default Header