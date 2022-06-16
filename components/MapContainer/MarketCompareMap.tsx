import React, { useEffect, useState, useRef } from 'react'
import style from './index.module.scss'
import useMap from '../../hooks/useMap'
import classNames from 'classnames'
import Graphic from '@arcgis/core/Graphic'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import TextSymbol from '@arcgis/core/symbols/TextSymbol'
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol'
import Circle from '@arcgis/core/geometry/Circle'
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol'
import { IMarketCompareResult } from '../../api/prod'
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

export interface IMarketCompareMap {
  active: boolean
  bufferRadius: number
  filteredResults: IMarketCompareResult[]
  onCoordinateSelect: (longitude: number, latitude: number) => void
}

const MarketCompareMap = (props: IMarketCompareMap) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [removeHandle, setremoveHandle] = useState<any | null>(null)
  const [pointLayer, setpointLayer] = useState<GraphicsLayer | undefined>(undefined)
  const [bufferLayer, setbufferLayer] = useState<GraphicsLayer | undefined>(undefined)
  const [aprLayer, setaprLayer] = useState<GraphicsLayer | undefined>(undefined)
  const [longitude, setlongitude] = useState<number | undefined>(undefined)
  const [latitude, setlatitude] = useState<number | undefined>(undefined)
  const { asyncMap, asyncMapView, map, mapView } = useMap(mapRef, mapOptions)

  const updateBufferCircle = (ilongitude: number, ilatitude: number) => {
    if (map && bufferLayer) {
      map.remove(bufferLayer)
    }
    const circle = new Graphic({
      geometry: new Circle({
        center: [ilongitude, ilatitude] as any,
        geodesic: true,
        numberOfPoints: 100,
        radius: props.bufferRadius,
        radiusUnit: 'meters'
      }),
      symbol: new SimpleFillSymbol({
        style: "solid",
        outline: { width: 1.5, color: [255, 97, 13, 1] },
        color: [255, 116, 0, 0.11]
      })
    })
    if (map && bufferLayer) {
      bufferLayer.graphics = [circle] as any
      map.add(bufferLayer)
    }
  }

  useEffect(() => {
    const pLayer = new GraphicsLayer()
    const bLayer = new GraphicsLayer()
    setpointLayer(pLayer)
    setbufferLayer(bLayer)
  }, [])

  useEffect(() => {
    if (props.filteredResults) {

    }
  }, [props.filteredResults])

  useEffect(() => {
    if (longitude && latitude) {
      updateBufferCircle(longitude, latitude)
    }
  }, [props.bufferRadius])

  // https://img.icons8.com/color/48/undefined/marker--v1.png
  useEffect(() => {
    if (props.active && mapView && pointLayer) {
      const remove = mapView.on("click", (event) => {
        props.onCoordinateSelect(event.mapPoint.longitude, event.mapPoint.latitude)
        setlongitude(event.mapPoint.longitude)
        setlatitude(event.mapPoint.latitude)
        updateBufferCircle(event.mapPoint.longitude, event.mapPoint.latitude)
        const pointGraphic = new Graphic({
          geometry: event.mapPoint,
          symbol: new PictureMarkerSymbol({
            url: 'https://img.icons8.com/color/48/undefined/marker--v1.png',
            width: '30px',
            height: '30px'
          })
          // symbol: new TextSymbol({
          //   color: "#ff0800",
          //   text: "\ue61d", // esri-icon-map-pin
          //   font: {
          //     // autocasts as new Font()
          //     size: 24,
          //     family: "CalciteWebCoreIcons" // Esri Icon Font
          //   }
          // })
        })
        pointLayer.graphics = [pointGraphic] as any
        map?.add(pointLayer)
        remove.remove()
      })
      setremoveHandle(remove)
    }
    if (!props.active && mapView) {
      removeHandle.remove()
    }
  }, [props.active])

  return (
    <>
      <div className={classNames({
        [style.esriMapMarketCompare]: true,
        [style.active]: props.active
      })} ref={mapRef}>
      </div>
    </>
  )
}

export default MarketCompareMap
