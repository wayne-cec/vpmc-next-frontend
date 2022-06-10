import React, { useState } from 'react'
import style from './index.module.scss'
import Image from 'next/image'
import NavButton from '../../components/NavButton'
import MenuDrawer from './MenuDrawer'
import Router from 'next/router'
// import classNames from 'classnames'
import HeaderDrawer from './HeaderDrawer'

export const newBuildingLink = [
  { name: '所有新建案', route: '/new-case/all' },
  { name: '預售屋', route: '/new-case/pre-sale' },
  { name: '最新公開銷售', route: '/new-case/newest' },
  { name: '新成屋', route: '/new-case/new' },
  { name: '捷運宅', route: '/new-case/mrt' }
]

export const preOwnedLink = [
  { name: '所有房源', route: '/pre-owned/all' },
  { name: '地圖找房', route: '/pre-owned/map' },
  { name: '屋主房源', route: '/pre-owned/owner' },
  { name: '降價房源', route: '/pre-owned/price-cut' },
  { name: '急售房源', route: '/pre-owned/urgent' },
  { name: '法拍屋', route: '/pre-owned/foreclosure' }
]

export const rentLink = [
  { name: '所有房源', route: '/rent/all' },
  { name: '房東出租', route: '/rent/landlord' },
  { name: '整層住家', route: '/rent/whole-layer' },
  { name: '地圖找房', route: '/rent/map' },
  { name: '獨立套房', route: '/rent/suit' },
  { name: '捷運找房', route: '/rent/mrt' },
  { name: '分租套房', route: '/rent/split-suit' },
  { name: '學校找房', route: '/rent/campus' },
  { name: '雅房', route: '/rent/merge-suit' }
]

export const aprV2Link = [
  { name: '實價登陸2.0', route: '/aprV2' },
  { name: '地區總體', route: '/aprV2/region' },
  { name: '社區個別', route: '/aprV2/commitee' }
]

const Header = () => {
  const [menuDrawerOpen, setmenuDrawerOpen] = useState<boolean>(false)
  const [newBuilding, setnewBuilding] = useState<boolean>(false)
  const [preOwned, setpreOwned] = useState<boolean>(false)
  const [rent, setrent] = useState<boolean>(false)
  const [aprV2, setaprV2] = useState<boolean>(false)

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
          >估價分析</NavButton>
          <NavButton
          >線上支援</NavButton>
          <NavButton
          >統計及行情</NavButton>
          <NavButton
            onMouseOver={() => { setaprV2(true) }}
            onMouseLeave={() => { setaprV2(false) }}
          >實價登陸2.0</NavButton>
        </div>
        <div className={style.contact}>
          <NavButton
            onClick={() => { Router.push('/introduction/contact') }}
            outlined={true}
          >聯絡我們</NavButton>
        </div>

        <div className={style.burger}>
          <NavButton onClick={() => { setmenuDrawerOpen(true) }}>≡</NavButton>
        </div>
        <MenuDrawer
          open={menuDrawerOpen}
          onClose={() => { setmenuDrawerOpen(false) }}
        ></MenuDrawer>

      </header>

      {/* <HeaderDrawer
        open={newBuilding}
        onMouseOver={() => { setnewBuilding(true) }}
        onMouseLeave={() => { setnewBuilding(false) }}
      >
        {
          newBuildingLink.map((link, index) => {
            return <NavButton
              key={index}
              onClick={() => { Router.push(link.route) }}
            >{link.name}</NavButton>
          })
        }
      </HeaderDrawer>

      <HeaderDrawer
        open={preOwned}
        onMouseOver={() => { setpreOwned(true) }}
        onMouseLeave={() => { setpreOwned(false) }}
      >
        {
          preOwnedLink.map((link, index) => {
            return <NavButton
              key={index}
              onClick={() => { Router.push(link.route) }}
            >{link.name}</NavButton>
          })
        }
      </HeaderDrawer>

      <HeaderDrawer
        open={rent}
        onMouseOver={() => { setrent(true) }}
        onMouseLeave={() => { setrent(false) }}
      >
        {
          aprV2Link.map((link, index) => {
            return <NavButton
              key={index}
              onClick={() => { Router.push(link.route) }}
            >{link.name}</NavButton>
          })
        }
      </HeaderDrawer> */}

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