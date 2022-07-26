import React, { useContext, useRef, useEffect } from 'react'
import style from './index.module.scss'
import '@arcgis/core/assets/esri/themes/light/main.css'
import useMap from '../../hooks/useMap'
import DefaultUI from '@arcgis/core/views/ui/DefaultUI'
import { PluginContext } from '../CoordinateSelector/PluginPanel'
import Point from '@arcgis/core/geometry/Point'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import Collection from '@arcgis/core/core/Collection'
import Graphic from '@arcgis/core/Graphic'
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol'
import MarketCompareContext from '../../pages/appraisalAnalysis/marketCompare/MarketCompareContext'

export const pluginPointLayer = new GraphicsLayer({ id: 'PluginPoint' })

const mapOptions = {
  mapOption: { basemap: 'topo-vector' },
  mapViewOption: {
    center: [121.4640139307843, 25.013838580240503],
    zoom: 13,
    ui: new DefaultUI(),
    constraints: { minZoom: 12, maxZoom: 20 }
  }
}

const PluginMap = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const { asyncMap, asyncMapView } = useMap(mapRef, mapOptions, true)
  const { longitude, latitude } = useContext(PluginContext)

  useEffect(() => {
    (async () => {
      if (!longitude || !latitude) return
      const map = await asyncMap
      const mapView = await asyncMapView
      map.remove(pluginPointLayer)
      const location = new Graphic({
        geometry: new Point({ longitude: longitude, latitude: latitude }),
        symbol: new PictureMarkerSymbol({
          url: '/aprRegion/mappin.png',
          width: '30px',
          height: '30px'
        })
      })
      mapView.zoom = 16
      mapView.goTo(location)
      pluginPointLayer.graphics = new Collection([location])
      map.add(pluginPointLayer)
    })()
  }, [longitude, latitude])

  return (
    <div className={style.esriMap} ref={mapRef}></div>
  )
}

export default PluginMap
