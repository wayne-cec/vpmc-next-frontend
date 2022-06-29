import React from 'react'
import style from './index.module.scss'

export interface IPanelContainer {
  children: React.ReactNode
}

const PanelContainer = (props: IPanelContainer) => {
  return (
    <div className={style.panelContainer}>
      {props.children}
    </div>
  )
}

export default PanelContainer