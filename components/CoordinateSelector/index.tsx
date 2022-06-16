import React from 'react'
import style from './index.module.scss'
import Image from 'next/image'
import classNames from 'classnames'

export interface ICoordinateSelector {
  longitude: number | null
  latitude: number | null
  locatedCounty: string | null
  locatedTown: string | null
  active: boolean
  onClick: () => void
}

const CoordinateSelector = (props: ICoordinateSelector) => {

  return (
    <div className={classNames({
      [style.coordinateSelector]: true,
      [style.active]: props.active
    })}
      onClick={props.onClick}
    >
      <div className={style.titleContainer}>
        <Image src={'/aprRegion/gps.png'} width='25px' height='25px' />
        <p>
          {
            props.longitude === null || props.latitude === null
              ? '請定位座標'
              : `經度: ${Math.round(props.longitude * 1000) / 1000},\xa0 緯度: ${Math.round(props.latitude * 1000) / 1000}`
          }
        </p>
      </div>
      <p className={style.regionTitle}>
        {
          props.locatedCounty === null || props.locatedTown === null
            ? '無區域資料'
            : `${props.locatedCounty},\xa0 ${props.locatedTown}`
        }
      </p>
      {/* <Image src={'/aprRegion/expand.png'} width='25px' height='25px' /> */}
    </div>
  )
}

export default CoordinateSelector