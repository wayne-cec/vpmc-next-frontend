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

export const appraisalAnalysis = [
  { name: '現勘資料表', route: '/appraisalAnalysis/surveySheet' },
  { name: '市場比較法', route: '/appraisalAnalysis/marketCompare' },
  { name: '土開分析法', route: '/appraisalAnalysis/landSurvey' }
]

export const onlineSupport = [
  { name: '網站使用手冊', route: '/onlineSupport/manual' },
  { name: '估價相關法令', route: '/onlineSupport/law' },
  { name: '技術公報/範本', route: '/onlineSupport/report' }
]

export const statistic = [
  { name: '使照建照', route: '/statistic/license' },
  { name: '臺灣總經概覽', route: '/statistic/economic' }
]

export const aprV2Link = [
  { name: '社區個別', route: '/aprV2/commitee' },
  { name: '地區總體', route: '/aprV2/region' }
]

const Header = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector(selectUser)
  const [menuDrawerOpen, setmenuDrawerOpen] = useState<boolean>(false)
  const [appAnalysis, setappAnalysis] = useState<boolean>(false)
  const [onlineSup, setonlineSup] = useState<boolean>(false)
  const [staticsOpen, setstaticsOpen] = useState<boolean>(false)
  const [aprV2, setaprV2] = useState<boolean>(false)
  const [isAuthenticated, setisAuthenticated] = useState<boolean>(false)

  const handleLogout = () => {
    dispatch(
      setUserToken('')
    )
  }

  useEffect(() => {
    const validateToken = async () => {
      if (userInfo.token === '') {
        setisAuthenticated(false)
        return
      }
      const { statusCode, responseContent } = await api.prod.validateToken(userInfo.token)
      if (statusCode === 200) {
        dispatch(
          setUserProfile(responseContent)
        )
        setisAuthenticated(true)
      } else {
        setisAuthenticated(false)
      }
    }
    validateToken()
  }, [userInfo.token])

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
        <div className={style.buttonGroup}>
          <NavButton
            onMouseOver={() => { setappAnalysis(true) }}
            onMouseLeave={() => { setappAnalysis(false) }}
          >估價分析</NavButton>
          <NavButton
            onMouseOver={() => { setonlineSup(true) }}
            onMouseLeave={() => { setonlineSup(false) }}
          >線上支援</NavButton>
          <NavButton
            onMouseOver={() => { setstaticsOpen(true) }}
            onMouseLeave={() => { setstaticsOpen(false) }}
          >統計及行情</NavButton>
          <NavButton
            onMouseOver={() => { setaprV2(true) }}
            onMouseLeave={() => { setaprV2(false) }}
          >實價登陸2.0</NavButton>
        </div>
        <div className={style.contact}>
          {
            isAuthenticated
              ? <><span>您好! {userInfo.userProfile?.username}</span>
                <NavButton
                  onClick={handleLogout}
                  // outlined={true}
                  style={{
                    paddingTop: '1px',
                    paddingBottom: '1px'
                  }}
                >登出</NavButton></>

              : <NavButton
                onClick={() => { Router.push('/login') }}
                // outlined={true}
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
            return <NavButton
              key={index}
              onClick={() => { Router.push(link.route) }}
            >{link.name}</NavButton>
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
            return <NavButton
              key={index}
              onClick={() => { Router.push(link.route) }}
            >{link.name}</NavButton>
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
            return <NavButton
              key={index}
              onClick={() => { Router.push(link.route) }}
            >{link.name}</NavButton>
          })
        }
      </HeaderDrawer>

      <HeaderDrawer
        open={aprV2}
        onMouseOver={() => { setaprV2(true) }}
        onMouseLeave={() => { setaprV2(false) }}
      >
        {
          aprV2Link.map((link, index) => {
            return <NavButton
              key={index}
              onClick={() => { Router.push(link.route) }}
            >{link.name}</NavButton>
          })
        }
      </HeaderDrawer>

    </div>
  )
}

export default Header