import React, { useEffect } from 'react'
import style from './index.module.scss'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import SpatialReference from "@arcgis/core/geometry/SpatialReference"
import '@arcgis/core/assets/esri/themes/light/main.css'

export const square = 3.305785

export interface IEsriMap {
  basemap: string
}

const AprRegionMap = (props: IEsriMap) => {

  useEffect(() => {

    const WGS84 = new SpatialReference({
      wkid: 4326
    })
    const map = new Map({
      basemap: props.basemap
    })
    const mapView = new MapView({
      map: map,
      center: [121.4640139307843, 25.013838580240503],
      zoom: 13,
      container: 'mapBox-aprRegion',
      ui: undefined,
      constraints: {
        minZoom: 12,
        maxZoom: 20
      }
    })
  }, [])

  return (
    <>
      <div className={style.esriMapRegion} id='mapBox-aprRegion'>
      </div>
    </>
  )
}

export default AprRegionMap
