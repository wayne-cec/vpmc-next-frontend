import { useEffect, useRef, createContext, useState } from 'react'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import * as ReactDOM from 'react-dom'
import MeasurementWidget from '@arcgis/core/widgets/Measurement'
import esriConfig from '@arcgis/core/config'
import DefaultUI from '@arcgis/core/views/ui/DefaultUI'
import toggleFullScreen from '../lib/toggleFullScreen'

import Measurement from '../widgets/Measurement'
import WidgetExpand from '../widgets/WidgetExpand'
import Basemap from '../widgets/Basemap'
import Location from '../widgets/Location'

import { WidgetWrapper } from '../widgets/WidgetExpand'

// if (esriConfig.request.trustedServers) {
//   alert('aaa')
//   esriConfig.request.trustedServers.push('https://wmts.nlsc.gov.tw/')
// }
// esriConfig.apiKey = 'AAPK7a564af3e78b413c89adcae13354e42bJ-ZHdv19-sspveCwprkRppRmExhV6qAdgOiUBh9ztWvrxfNfG-0w_1VKW7IthPGZ'

export type UseMapParams = {
  mapOption?: __esri.MapProperties
  mapViewOption?: Omit<__esri.MapViewProperties, 'map' | 'container'>
}

const defaultMapViewOption: UseMapParams['mapViewOption'] = {
  center: [121.464, 25.0138],
  zoom: 13,
  constraints: {
    minZoom: 12,
    maxZoom: 20
  }
}

class TaskStack<T> {
  stack: Array<(obg: T) => void>
  obj?: T
  constructor() {
    this.stack = []
  }

  addStack (callback: (obj: T) => void) {
    if (this.obj) return callback(this.obj)
    this.stack.push(callback)
  }

  setObject (obj: T) {
    if (this.obj) return
    this.obj = obj
    this.stack.forEach(task => task(obj))
    this.stack = []
  }
}



const useMap = (
  elemRef: React.RefObject<HTMLDivElement>,
  { mapOption, mapViewOption }: UseMapParams,
  withoutWidget?: boolean
) => {
  const mapRef = useRef<Map>()
  const mapViewRef = useRef<MapView>()
  const mapStack = useRef(new TaskStack<Map>())
  const mapViewStack = useRef(new TaskStack<MapView>())
  // const [openWidget, setopenWidget] = useState<WidgetType>('none')

  const asyncMap = new Promise<Map>(resolve => {
    mapStack.current.addStack(map => resolve(map))
  })

  const asyncMapView = new Promise<MapView>(resolve => {
    mapViewStack.current.addStack(mapView => resolve(mapView))
  })

  useEffect(() => {
    if (!elemRef.current) return
    if (!mapStack.current.obj || !mapRef.current) {
      const map = new Map(mapOption)
      mapRef.current = map
      mapStack.current.setObject(map)
    }
    if ((!mapViewStack.current.obj || !mapViewRef.current) && mapStack.current.obj) {
      const mapView = new MapView({
        map: mapStack.current.obj,
        ...defaultMapViewOption,
        ...mapViewOption,
        container: elemRef.current
      })
      mapView.ui = new DefaultUI()

      if (!withoutWidget) {
        const measurementWidget = new MeasurementWidget()
        mapView.ui.add(measurementWidget, "bottom-right")
        // 定位widget
        const locateNode = document.createElement("div")
        mapView.ui.add(locateNode, "top-right")
        ReactDOM.render(
          <WidgetWrapper>
            <WidgetExpand
              widgetType='Location'
              icon='/widgets/locate.png'
              tooltip='定位'
              disabled={false}
              map={mapStack.current.obj}
              mapView={mapView}
            >
              <Location />
            </WidgetExpand>
            <WidgetExpand
              widgetType='Basemap'
              icon='/widgets/layer.png'
              tooltip='圖層'
              disabled={false}
              map={mapStack.current.obj}
              mapView={mapView}
            >
              <Basemap />
            </WidgetExpand>
            <WidgetExpand
              widgetType='Measurement'
              icon='/widgets/measurement.png'
              tooltip='測量'
              disabled={false}
              map={mapStack.current.obj}
              mapView={mapView}
              measurement={measurementWidget}
            >
              <Measurement />
            </WidgetExpand>
            <WidgetExpand
              widgetType='Info'
              icon='/widgets/info.png'
              tooltip='資訊'
              disabled={true}
              map={mapStack.current.obj}
              mapView={mapView}
            >
            </WidgetExpand>
            <WidgetExpand
              widgetType='Print'
              icon='/widgets/print.png'
              tooltip='列印'
              disabled={false}
              map={mapStack.current.obj}
              mapView={mapView}
              onPrint={() => { print() }}
            >
            </WidgetExpand>
            <WidgetExpand
              widgetType='Expand'
              icon='/widgets/full.png'
              tooltip='全畫面'
              disabled={false}
              map={mapStack.current.obj}
              mapView={mapView}
              onFullScreenChange={() => { toggleFullScreen() }}
            >
            </WidgetExpand>
          </WidgetWrapper>,
          locateNode
        )
      }

      mapViewRef.current = mapView
      mapViewStack.current.setObject(mapView)
    }
  }, [elemRef.current])

  return {
    map: mapRef.current,
    mapView: mapViewRef.current,
    asyncMap,
    asyncMapView
  }
}

export default useMap
