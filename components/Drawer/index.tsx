import React, { Children } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import Router from 'next/router'

export interface IMenuDrawer {
  open: boolean
  children: React.ReactNode
  onClose: () => void
}

const MenuDrawer = (props: IMenuDrawer) => {
  return (
    <>
      <div className={classNames({
        [style.drawer]: true,
        [style.show]: props.open
      })}>
        {props.children}
      </div>
    </>

  )
}

export default MenuDrawer