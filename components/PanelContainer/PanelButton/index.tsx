import React from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import Image from 'next/image'
import { Tooltip } from '@mui/material'

export interface IPanelButton {
  content: string
  icon: string
  focused: boolean
  onClick: () => void
  onHover: (value: boolean) => void
}

const PanelButton = (props: IPanelButton) => {
  return (
    <Tooltip title={props.content} placement='right-start'>
      <div className={classNames({
        [style.panelButton]: true,
        [style.focused]: props.focused
      })}
        onClick={props.onClick}
        onMouseOver={() => { props.onHover(true) }}
        onMouseLeave={() => { props.onHover(false) }}
      >
        <Image src={props.icon} width='36px' height='36px' />
      </div>
    </Tooltip>
  )
}

export default PanelButton