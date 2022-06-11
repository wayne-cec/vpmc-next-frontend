import React, { useEffect } from 'react'
import style from './index.module.scss'
import Map from '@arcgis/core/Map'
import Graphic from '@arcgis/core/Graphic'
import Point from "@arcgis/core/geometry/Point"
import MapView from '@arcgis/core/views/MapView'
import Extent from "@arcgis/core/geometry/Extent"
import TextSymbol from "@arcgis/core/symbols/TextSymbol"
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol"
import SpatialReference from "@arcgis/core/geometry/SpatialReference"
import * as watchUtils from '@arcgis/core/core/watchUtils'
import * as projection from "@arcgis/core/geometry/projection"
import { parseCommitee } from '../../lib/parseCommitee'
import { useDispatch } from 'react-redux'
import { initCommiteeInExtent } from '../../store/slice/commitee'

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
