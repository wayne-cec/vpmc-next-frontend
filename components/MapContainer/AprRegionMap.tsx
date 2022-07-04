import React, { useEffect, useState, useRef } from 'react'
import style from './index.module.scss'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import SpatialReference from "@arcgis/core/geometry/SpatialReference"
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
import { createGeoJSONURL } from '../../lib/calculateAge'
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol"
import '@arcgis/core/assets/esri/themes/light/main.css'
import useMap from '../../hooks/useMap'
import DefaultUI from '@arcgis/core/views/ui/DefaultUI'

export const square = 3.305785

const mapOptions = {
  mapOption: { basemap: 'arcgis-community' }, // arcgis-community
  mapViewOption: {
    center: [121.4640139307843, 25.013838580240503],
    zoom: 13,
    ui: new DefaultUI(),
    constraints: { minZoom: 12, maxZoom: 20 }
  }
}

export interface IEsriMap {
  townGeojson: any | null
  basemap: string
}

const AprRegionMap = (props: IEsriMap) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const { asyncMap, asyncMapView } = useMap(mapRef, mapOptions)

  const renderTownGeojsonToMap = async () => {
    if (props.townGeojson) {
      (await asyncMap).removeAll();
      const geojsonlayer = new GeoJSONLayer({
        url: createGeoJSONURL(props.townGeojson),
        renderer: new SimpleRenderer({
          symbol: new SimpleFillSymbol({
            outline: { color: [0, 0, 0, 0.33] },
            color: [255, 145, 28, 0.19]
          })
        })
      });
      (await asyncMap).add(geojsonlayer);
      geojsonlayer.when(async () => {
        (await asyncMapView).goTo(geojsonlayer.fullExtent)
      })
    }
  }

  useEffect(() => {
    renderTownGeojsonToMap()
  }, [props.townGeojson])

  return (
    <>
      <div className={style.esriMapRegion} ref={mapRef}>
      </div>
    </>
  )
}

export default AprRegionMap
