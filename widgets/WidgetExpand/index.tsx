import React, { createContext, useContext, useEffect, useState } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import MapView from '@arcgis/core/views/MapView'
import { Tooltip } from '@mui/material'
import MeasurementWidget from '@arcgis/core/widgets/Measurement'
import Image from 'next/image'
import Map from "@arcgis/core/Map"

export type WidgetType = 'Location' | 'Basemap' | 'Measurement' | 'Info' | 'Print' | 'Expand' | 'none'

export const widgetContext = createContext<{
  map?: Map
  mapView?: MapView
  show: boolean
  measurement?: MeasurementWidget
  onShowChange: (value: WidgetType) => void
}>({
  map: undefined,
  mapView: undefined,
  show: false,
  measurement: undefined,
  onShowChange: (value) => { }
})

export const WidgetOpenContext = createContext<{
  openWidget: WidgetType
  setopenWidget: (value: WidgetType) => void
}>({
  openWidget: 'none',
  setopenWidget: (value: WidgetType) => { }
})

export interface IWidgetWrapper {
  children: React.ReactNode
}

export const WidgetWrapper = (props: IWidgetWrapper) => {
  const [openWidget, setopenWidget] = useState<WidgetType>('none')
  return (
    <WidgetOpenContext.Provider
      value={{
        openWidget: openWidget,
        setopenWidget: (value) => { setopenWidget(value) }
      }}
    >
      <div>
        {props.children}
      </div>
    </WidgetOpenContext.Provider>
  )
}

export interface IWidgetExpand {
  widgetType: WidgetType
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
  const { openWidget, setopenWidget } = useContext(WidgetOpenContext)
  // const [widgetShow, setwidgetShow] = useState<boolean>(false)

  return (
    <>
      <div className={style.widgetContainer}>
        <Tooltip title={props.tooltip} placement='left'>
          <div className={classNames({
            [style.widgetExpand]: true,
            [style.focused]: openWidget === props.widgetType,
            [style.disabled]: props.disabled
          })}
            onClick={() => {
              if (!props.disabled) {
                // alert(openWidget)
                if (openWidget === 'none') {

                  setopenWidget(props.widgetType)
                } else {
                  if (openWidget === props.widgetType) {

                    setopenWidget('none')
                  } else {

                    setopenWidget(props.widgetType)
                  }
                }
                // setwidgetShow(prev => !prev)
              }

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
          show: openWidget === props.widgetType,
          measurement: props.measurement,
          onShowChange: (value) => { setopenWidget(value) }
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
