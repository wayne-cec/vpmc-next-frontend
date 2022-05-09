import React from 'react'
import style from './index.module.scss'
import classNames from 'classnames'

export interface INavButton {
  children: React.ReactNode
  outlined?: boolean
  onClick?: () => void
  onMouseOver?: () => void
  onMouseLeave?: () => void
}

const NavButton = (props: INavButton) => {
  return (
    <button
      className={classNames({
        [style.navButton]: true,
        [style.outlined]: props.outlined
      })}
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      onMouseLeave={props.onMouseLeave}
    >
      {props.children}
    </button>
  )
}

export default NavButton