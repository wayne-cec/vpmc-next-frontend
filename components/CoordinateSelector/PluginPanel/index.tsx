import React, { useRef } from 'react'
import style from './index.module.scss'
import useMap from '../../../hooks/useMap'
import DefaultUI from "@arcgis/core/views/ui/DefaultUI"

const mapOptions = {
  mapOption: { basemap: 'topo-vector' },
  mapViewOption: {
    center: [121.4640139307843, 25.013838580240503],
    zoom: 14,
    ui: new DefaultUI(),
    constraints: { minZoom: 12, maxZoom: 20 }
  }
}

const PluginPanel = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const { asyncMap, asyncMapView, map, mapView } = useMap(mapRef, mapOptions, true)

  return (
    <div className={style.PluginPanel}>
      <div className={style.Manipulate}>

      </div>
      <div className={style.MapContainer}>
        <div className={style.Map} ref={mapRef}></div>
      </div>
    </div>
  )
}

export default PluginPanel