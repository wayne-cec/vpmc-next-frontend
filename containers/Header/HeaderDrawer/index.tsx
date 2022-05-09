import React from 'react'
import style from './index.module.scss'
import classNames from 'classnames'

export interface IHeaderDrawer {
  open: boolean
  children: React.ReactNode
  onMouseOver: () => void
  onMouseLeave: () => void
}

const HeaderDrawer = (props: IHeaderDrawer) => {
  return (
    <div className={classNames({
      [style.headerDrawer]: true,
      [style.show]: props.open,
      [style.hide]: !props.open
    })}
      onMouseOver={() => { props.onMouseOver() }}
      onMouseLeave={() => { props.onMouseLeave() }}
    >
      <div className={classNames({
        [style.linkContainer]: true,
        [style.show]: props.open
      })}>
        {props.children}
      </div>
    </div>
  )
}

export default HeaderDrawer
