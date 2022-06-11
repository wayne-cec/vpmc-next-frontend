import React, { Children } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import Router from 'next/router'

export type FlexDirection = 'col' | 'row'

export interface IMenuDrawer {
  open: boolean
  children: React.ReactNode
  direction: FlexDirection
  onClose: () => void
}

const MenuDrawer = (props: IMenuDrawer) => {
  return (
    <>
      <div className={classNames({
        [style.drawer]: true,
        [style.show]: props.open && props.direction === 'row',
        [style.showCol]: props.open && props.direction === 'col'
      })}>
        {props.children}
      </div>
    </>

  )
}

export default MenuDrawer