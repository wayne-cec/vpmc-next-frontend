import React, { useContext, useEffect, useState } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import MapView from '@arcgis/core/views/MapView'
import { Tooltip } from '@mui/material'
import MeasurementWidget from '@arcgis/core/widgets/Measurement'
import { widgetContext } from '../WidgetExpand'

// export interface IMeasurement {
//   mapView: MapView
//   measurement: MeasurementWidget
// }

const Measurement = () => {
  // const [widgetShow, setwidgetShow] = useState<boolean>(false)
  const { mapView, measurement, show } = useContext(widgetContext)

  const distanceMeasurement = () => {
    if (measurement)
      measurement.activeTool = 'distance'
  }

  const areaMeasurement = () => {
    if (measurement)
      measurement.activeTool = 'area'
  }

  const clearMeasurements = () => {
    if (measurement)
      measurement.clear()
  }

  useEffect(() => {
    if (measurement && mapView)
      measurement.view = mapView
  }, [])

  return (
    <div className={classNames({
      [style.measurementWidget]: true,
      [style.show]: show,
      [style.hide]: !show
    })}>
      <Tooltip title='測量距離'>
        <button className='esri-widget--button esri-interactive esri-icon-measure-line'
          onClick={distanceMeasurement}
        >
        </button>
      </Tooltip>

      <Tooltip title='測量面積'>
        <button className='esri-widget--button esri-interactive esri-icon-measure-area'
          onClick={areaMeasurement}
        >
        </button>
      </Tooltip>

      <Tooltip title='移除測量'>
        <button className='esri-widget--button esri-interactive esri-icon-trash'
          onClick={clearMeasurements}
        >
        </button>
      </Tooltip>

    </div>
  )
}

export default Measurement
