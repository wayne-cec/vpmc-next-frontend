import React from 'react'
import style from './index.module.scss'
import Image from 'next/image'

export interface ICoordinateSelector {
}

const CoordinateSelector = (props: ICoordinateSelector) => {

  return (
    <div className={style.coordinateSelector}>
      <div className={style.titleContainer}>
        <Image src={'/aprRegion/locate.png'} width='25px' height='25px' />
        <p>
        </p>
      </div>
      <Image src={'/aprRegion/expand.png'} width='25px' height='25px' />
    </div>
  )
}

export default CoordinateSelector