import React, { useContext, useRef, useEffect } from 'react'
import { PluginContext } from '../CoordinateSelector/PluginPanel'
import style from './index.module.scss'
import '@arcgis/core/assets/esri/themes/light/main.css'
import useMap from '../../hooks/useMap'
import DefaultUI from '@arcgis/core/views/ui/DefaultUI'
import Point from '@arcgis/core/geometry/Point'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import Collection from '@arcgis/core/core/Collection'
import Graphic from '@arcgis/core/Graphic'
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol'
import { Data } from '../../containers/MarketCompareContainer/ResultPanel/ResultTable'

export const documentPointLayer = new GraphicsLayer({ id: 'DocumentPoint' })

const mapOptions = {
  mapOption: { basemap: 'topo-vector' },
  mapViewOption: {
    center: [121.4640139307843, 25.013838580240503],
    zoom: 13,
    ui: new DefaultUI(),
    constraints: { minZoom: 12, maxZoom: 20 }
  }
}

interface IDocumentMap {
  aprData: Data[]
  screenshotFlag: { value: boolean }
  onScreenShotTaken: (dataUrl: string) => void
}

const DocumentMap = ({
  aprData,
  screenshotFlag,
  onScreenShotTaken
}: IDocumentMap) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const { asyncMap, asyncMapView } = useMap(mapRef, mapOptions, true)

  useEffect(() => {
    (async () => {
      const map = await asyncMap
      const mapView = await asyncMapView
      map.remove(documentPointLayer)
      const graphics = aprData.map((row) => {
        return new Graphic({
          geometry: new Point({ longitude: row.longitude, latitude: row.latitude }),
          symbol: new PictureMarkerSymbol({
            url: '/aprRegion/mappin.png',
            width: '30px',
            height: '30px'
          })
        })
      })
      mapView.goTo({
        target: graphics,
        zoom: 16
      })
      documentPointLayer.graphics = new Collection(graphics)
      map.add(documentPointLayer)
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const mapView = await asyncMapView
      try {
        const screenshot = await mapView.takeScreenshot()
        onScreenShotTaken(screenshot.dataUrl)
      } catch { }
    })()
  }, [screenshotFlag])

  return (
    <>
      <div className={style.esriMap} ref={mapRef}></div>
      {/* <span
        onClick={async () => {
          const screenshot = await (await asyncMapView).takeScreenshot()
          onScreenShotTaken(screenshot.dataUrl)
        }}
      >asdasd</span> */}
    </>
  )
}

export default DocumentMap
