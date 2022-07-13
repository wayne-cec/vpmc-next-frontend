import React from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import Image from 'next/image'

export interface IBasemapOption {
  icon: string
  title: string
  active: boolean
  onClick: () => void
}

const BasemapOption = (props: IBasemapOption) => {
  return (
    <div className={classNames({
      [style.basemapOption]: true,
      [style.active]: props.active
    })}
      onClick={props.onClick}
    >
      <div className={style.mapImg}>
        <Image
          src={props.icon}
          className={style.img}
          width='60px' height='60px'
        />
      </div>
      <span>{props.title}</span>
    </div>
  )
}

export default BasemapOption
