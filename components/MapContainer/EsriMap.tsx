import React, { Children } from 'react'
import style from './index.module.scss'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import { useEffect } from 'react'

export interface IEsriMap {
  basemap: string
}

const EsriMap = (props: IEsriMap) => {
  useEffect(() => {
    const map = new Map({
      basemap: props.basemap
    })
    const mapView = new MapView({
      map: map,
      center: [-118.805, 34.027],
      zoom: 13,
      container: 'mapBox'
    })
  }, [])

  return (
    <>
      <div className={style.esriMap} id='mapBox'>
      </div>
    </>
  )
}

export default EsriMap
