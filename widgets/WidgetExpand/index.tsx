import React, { createContext, useEffect, useState } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import MapView from '@arcgis/core/views/MapView'
import { Tooltip } from '@mui/material'
import MeasurementWidget from '@arcgis/core/widgets/Measurement'
import Image from 'next/image'
import Map from "@arcgis/core/Map"

export const widgetContext = createContext<{
  map?: Map
  mapView?: MapView
  show: boolean
  measurement?: MeasurementWidget
  onShowChange: (value: boolean) => void
}>({
  map: undefined,
  mapView: undefined,
  show: false,
  measurement: undefined,
  onShowChange: (value) => { }
})

export interface IWidgetExpand {
  icon: string
  tooltip: string
  map: Map
  mapView: MapView
  disabled: boolean
  children?: React.ReactNode
  measurement?: MeasurementWidget
  onPrint?: () => void
  onFullScreenChange?: () => void
}

const WidgetExpand = (props: IWidgetExpand) => {
  const [widgetShow, setwidgetShow] = useState<boolean>(false)

  return (
    <>
      <div className={style.widgetContainer}>
        <Tooltip title={props.tooltip} placement='left'>
          <div className={classNames({
            [style.widgetExpand]: true,
            [style.focused]: widgetShow,
            [style.disabled]: props.disabled
          })}
            onClick={() => {
              if (!props.disabled)
                setwidgetShow(prev => !prev)

              if (props.onFullScreenChange)
                props.onFullScreenChange()

              if (props.onPrint)
                props.onPrint()
            }}
          >
            <Image src={props.icon} width='32px' height='32px' />
          </div>
        </Tooltip>
        <widgetContext.Provider value={{
          map: props.map,
          mapView: props.mapView,
          show: widgetShow,
          measurement: props.measurement,
          onShowChange: (value) => { setwidgetShow(value) }
        }}>
          {
            props.children
          }
        </widgetContext.Provider>
      </div>
    </>
  )
}

export default WidgetExpand
