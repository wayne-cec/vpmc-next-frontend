import React, { CSSProperties } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'

export interface INavButton {
  children: React.ReactNode
  outlined?: boolean
  style?: CSSProperties
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
      style={props.style}
    >
      {props.children}
    </button>
  )
}

export default NavButton