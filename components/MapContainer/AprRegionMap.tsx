import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import SpatialReference from "@arcgis/core/geometry/SpatialReference"
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
import { createGeoJSONURL } from '../../lib/calculateAge'
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol"
import '@arcgis/core/assets/esri/themes/light/main.css'

export const square = 3.305785

export interface IEsriMap {
  townGeojson: any | null
  basemap: string
}

const AprRegionMap = (props: IEsriMap) => {
  const [map, setmap] = useState<Map | null>(null)
  const [view, setview] = useState<MapView | null>(null)

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
    setmap(map)
    setview(mapView)
  }, [])

  useEffect(() => {
    if (props.townGeojson && map && view) {
      map.removeAll()
      const geojsonlayer = new GeoJSONLayer({
        url: createGeoJSONURL(props.townGeojson),
        renderer: new SimpleRenderer({
          symbol: new SimpleFillSymbol({
            outline: { color: [0, 0, 0, 0.33] },
            color: [255, 145, 28, 0.19]
          })
        })
      })
      map.add(geojsonlayer)
      geojsonlayer.when(() => {
        view.goTo(geojsonlayer.fullExtent)
      })
    }
    // GeoJSONLayer
  }, [props.townGeojson])

  return (
    <>
      <div className={style.esriMapRegion} id='mapBox-aprRegion'>
      </div>
    </>
  )
}

export default AprRegionMap
