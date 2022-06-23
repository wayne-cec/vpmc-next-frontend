import React, { useEffect, useRef } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import MapView from '@arcgis/core/views/MapView'
import { Tooltip } from '@mui/material'
import MeasurementWidget from '@arcgis/core/widgets/Measurement'

export interface IMeasurement {
  mapView: MapView
  measurement: MeasurementWidget
}

const Measurement = (props: IMeasurement) => {
  // const measurement = useRef(new MeasurementWidget())

  const distanceMeasurement = () => {
    props.measurement.activeTool = 'distance'
  }

  const areaMeasurement = () => {
    props.measurement.activeTool = 'area'
  }

  const clearMeasurements = () => {
    props.measurement.clear()
  }

  useEffect(() => {
    props.measurement.view = props.mapView

  }, [])

  return (
    <div className={style.measurementWidget}>
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
