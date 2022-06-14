import React, { useEffect, useState, useRef } from 'react'
import style from './index.module.scss'
import useMap from '../../hooks/useMap'
import classNames from 'classnames'
import '@arcgis/core/assets/esri/themes/light/main.css'

const mapOptions = {
  mapOption: { basemap: 'gray' },
  mapViewOption: {
    center: [121.4640139307843, 25.013838580240503],
    zoom: 13,
    ui: undefined,
    constraints: { minZoom: 12, maxZoom: 20 }
  }
}

export interface IMarketCompareMap {
  active: boolean
  onCoordinateSelect: (longitude: number, latitude: number) => void
}

const MarketCompareMap = (props: IMarketCompareMap) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const { asyncMap, asyncMapView, map, mapView } = useMap(mapRef, mapOptions)

  useEffect(() => {
    if (props.active && mapView) {
      mapView.on("click", (event) => {
        props.onCoordinateSelect(event.mapPoint.longitude, event.mapPoint.latitude)
      })
    }
  }, [props.active])

  return (
    <>
      <div className={classNames({
        [style.esriMapMarketCompare]: true,
        [style.active]: props.active
      })} ref={mapRef}>
      </div>
    </>
  )
}

export default MarketCompareMap
