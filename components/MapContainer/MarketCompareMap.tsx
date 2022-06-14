import React, { useEffect, useState, useRef } from 'react'
import style from './index.module.scss'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import SpatialReference from "@arcgis/core/geometry/SpatialReference"
import useMap from '../../hooks/useMap'
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

const MarketCompareMap = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const { asyncMap, asyncMapView, map, mapView } = useMap(mapRef, mapOptions)

  return (
    <>
      <div className={style.esriMapRegion} ref={mapRef}>
      </div>
    </>
  )
}

export default MarketCompareMap
