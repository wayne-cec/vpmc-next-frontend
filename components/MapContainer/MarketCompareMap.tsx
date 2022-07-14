import React, { useEffect, useState, useRef, useContext } from 'react'
import style from './index.module.scss'
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol'
import SketchViewModel from '@arcgis/core/widgets/Sketch/SketchViewModel'
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol'
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import TextSymbol from '@arcgis/core/symbols/TextSymbol'
import DefaultUI from "@arcgis/core/views/ui/DefaultUI"
import Collection from '@arcgis/core/core/Collection'
import Circle from '@arcgis/core/geometry/Circle'
import Expand from '@arcgis/core/widgets/Expand'
import Point from '@arcgis/core/geometry/Point'
import Graphic from '@arcgis/core/Graphic'
import useMap from '../../hooks/useMap'
import classNames from 'classnames'
import { SpatialQueryType, ZoomContext } from '../../pages/appraisalAnalysis/marketCompare'
import { IMarketCompareResult } from '../../api/prod'
import '@arcgis/core/assets/esri/themes/light/main.css'
import { PolygonSketchMode } from '../PolygonSketch'
import * as projection from '@arcgis/core/geometry/projection'
import SpatialReference from '@arcgis/core/geometry/SpatialReference'

const mapOptions = {
  mapOption: { basemap: 'topo-vector' },
  mapViewOption: {
    center: [121.4640139307843, 25.013838580240503],
    zoom: 14,
    ui: new DefaultUI(),
    constraints: { minZoom: 12, maxZoom: 20 }
  }
}

export interface IMarketCompareMap {
  active: boolean
  bufferRadius: number
  filteredResults: IMarketCompareResult[]
  spatialQueryType: SpatialQueryType
  sketchMode: PolygonSketchMode
  zoomId: { id: string } | null
  onCoordinateSelect: (longitude: number | null, latitude: number | null) => void
  onSketchModeChange: (value: PolygonSketchMode) => void
  onGeojsonChange: (value: string | null) => void
  onSpatialQueryTypeChange: (value: SpatialQueryType) => void
}

const MarketCompareMap = (props: IMarketCompareMap) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [removeHandle, setremoveHandle] = useState<any | null>(null)
  const [pointLayer, setpointLayer] = useState<GraphicsLayer | undefined>(undefined)
  const [bufferLayer, setbufferLayer] = useState<GraphicsLayer | undefined>(undefined)
  const [sketchLayer, setsketchLayer] = useState<GraphicsLayer | undefined>(undefined)
  const [aprLayer, setaprLayer] = useState<GraphicsLayer | undefined>(undefined)
  const [longitude, setlongitude] = useState<number | undefined>(undefined)
  const [latitude, setlatitude] = useState<number | undefined>(undefined)
  const { asyncMap, asyncMapView, map, mapView } = useMap(mapRef, mapOptions)
  const { zoomId } = useContext(ZoomContext)
  // const [basemapGallery, setbasemapGallery] = useState<BasemapGallery | undefined>(undefined)
  // const [basemapGalleryExpand, setbasemapGalleryExpand] = useState<Expand | undefined>(undefined)

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

  const handleZoomToId = async (id: string) => {
    (await asyncMapView).zoom = 20;

    if (aprLayer) {
      for (let i = 0; i < aprLayer.graphics.length; i++) {
        if (aprLayer.graphics.at(i).attributes.id === id) {
          (await asyncMapView).goTo(aprLayer.graphics.at(i))
          aprLayer.graphics.at(i).symbol = new PictureMarkerSymbol({
            url: '/aprRegion/home.png',
            width: '100px',
            height: '100px'
          })
        } else {
          aprLayer.graphics.at(i).symbol = new PictureMarkerSymbol({
            url: '/aprRegion/home.png',
            width: '30px',
            height: '30px'
          })
        }
      }
    }

  }

  useEffect(() => {
    const pLayer = new GraphicsLayer({ id: 'pointLayer' })
    const bLayer = new GraphicsLayer({ id: 'bufferLayer' })
    const aLayer = new GraphicsLayer({ id: 'aprLayer' })
    const sLayer = new GraphicsLayer({ id: 'sketchLayer' })
    setpointLayer(pLayer)
    setbufferLayer(bLayer)
    setaprLayer(aLayer)
    setsketchLayer(sLayer)
  }, [])

  useEffect(() => {
    if (map && aprLayer) {
      aprLayer.graphics = new Collection()
      map.remove(aprLayer)
    }
    if (props.filteredResults) {
      const aprResultGraphics = new Collection<Graphic>()
      props.filteredResults.forEach((aprResult) => {
        const pointGraphic = new Graphic({
          attributes: {
            id: aprResult.id
          },
          geometry: new Point({
            longitude: aprResult.longitude,
            latitude: aprResult.latitude
          }),
          symbol: new PictureMarkerSymbol({
            url: '/aprRegion/home.png',
            width: '30px',
            height: '30px'
          })
        })
        aprResultGraphics.add(pointGraphic)
        // console.log(pointGraphic)
      })
      if (map && aprLayer) {
        aprLayer.graphics = aprResultGraphics
        map.add(aprLayer)
      }
    }
  }, [props.filteredResults])

  useEffect(() => {
    if (longitude && latitude) {
      updateBufferCircle(longitude, latitude)
    }
  }, [props.bufferRadius])

  useEffect(() => {
    if (props.active && mapView && pointLayer && aprLayer) {
      const remove = mapView.on("click", (event) => {
        props.onCoordinateSelect(event.mapPoint.longitude, event.mapPoint.latitude)
        setlongitude(event.mapPoint.longitude)
        setlatitude(event.mapPoint.latitude)
        updateBufferCircle(event.mapPoint.longitude, event.mapPoint.latitude)
        const collection = new Collection<Graphic>()
        const pointGraphic = new Graphic({
          geometry: event.mapPoint,
          symbol: new PictureMarkerSymbol({
            url: '/aprRegion/mappin.png',
            width: '30px',
            height: '30px'
          })
        })
        aprLayer.graphics = new Collection()
        collection.add(pointGraphic)
        pointLayer.graphics = collection
        map?.add(pointLayer)
        remove.remove()
      })
      setremoveHandle(remove)
    }
    if (!props.active && mapView) {
      removeHandle.remove()
    }
  }, [props.active])

  useEffect(() => {
    if (map && mapView && pointLayer && bufferLayer && aprLayer && sketchLayer) {
      if (props.spatialQueryType === 'polygon' && props.sketchMode !== 'inactive') {
        map.remove(sketchLayer)
        sketchLayer.graphics = new Collection<Graphic>()
        aprLayer.graphics = new Collection<Graphic>()
        map.add(sketchLayer)
        const sketchViewModel = new SketchViewModel({
          layer: sketchLayer,
          view: mapView,
          polygonSymbol: new SimpleFillSymbol({
            style: "solid",
            outline: { width: 1.5, color: [255, 97, 13, 1] },
            color: [255, 116, 0, 0.11]
          }),
          defaultCreateOptions: { hasZ: false }
        })
        sketchViewModel.on('create', (event) => {
          if (event.state === "complete") {
            // props.onSketchModeChange('inactive')
            props.onSpatialQueryTypeChange('none')
            props
            const projectedGeometry = projection.project(event.graphic.geometry, new SpatialReference({ wkid: 4326 }))
            // @ts-ignore
            const geometry: number[][][] = projectedGeometry.rings
            let geojson = ` {"type": "Polygon","coordinates": ${JSON.stringify(geometry)}}`
            props.onGeojsonChange(geojson)
          }
        })
        sketchViewModel.create('polygon')
      } else if (props.spatialQueryType === 'circle' && props.sketchMode !== 'inactive') {
        map.remove(sketchLayer)
        sketchLayer.graphics = new Collection<Graphic>()
        aprLayer.graphics = new Collection<Graphic>()
        map.add(sketchLayer)
        const sketchViewModel = new SketchViewModel({
          layer: sketchLayer,
          view: mapView,
          polygonSymbol: new SimpleFillSymbol({
            style: "solid",
            outline: { width: 1.5, color: [255, 97, 13, 1] },
            color: [255, 116, 0, 0.11]
          }),
          defaultCreateOptions: { hasZ: false }
        })
        sketchViewModel.on('create', (event) => {
          if (event.state === "complete") {
            // props.onSketchModeChange('inactive')
            props.onSpatialQueryTypeChange('none')
            const projectedGeometry = projection.project(event.graphic.geometry, new SpatialReference({ wkid: 4326 }))
            // @ts-ignore
            const geometry: number[][][] = projectedGeometry.rings
            let geojson = ` {"type": "Polygon","coordinates": ${JSON.stringify(geometry)}}`
            props.onGeojsonChange(geojson)
          }
        })
        sketchViewModel.create('circle')
      } else if (props.spatialQueryType === 'rectangle' && props.sketchMode !== 'inactive') {
        map.remove(sketchLayer)
        sketchLayer.graphics = new Collection<Graphic>()
        aprLayer.graphics = new Collection<Graphic>()
        map.add(sketchLayer)
        const sketchViewModel = new SketchViewModel({
          layer: sketchLayer,
          view: mapView,
          polygonSymbol: new SimpleFillSymbol({
            style: "solid",
            outline: { width: 1.5, color: [255, 97, 13, 1] },
            color: [255, 116, 0, 0.11]
          }),
          defaultCreateOptions: { hasZ: false }
        })
        sketchViewModel.on('create', (event) => {
          if (event.state === "complete") {
            // props.onSketchModeChange('inactive')
            props.onSpatialQueryTypeChange('none')
            const projectedGeometry = projection.project(event.graphic.geometry, new SpatialReference({ wkid: 4326 }))
            // @ts-ignore
            const geometry: number[][][] = projectedGeometry.rings
            let geojson = ` {"type": "Polygon","coordinates": ${JSON.stringify(geometry)}}`
            props.onGeojsonChange(geojson)
          }
        })
        sketchViewModel.create('rectangle')
      } else if (props.spatialQueryType === 'clear' && props.sketchMode !== 'inactive') {
        map.remove(sketchLayer)
        sketchLayer.graphics = new Collection<Graphic>()
        map.add(sketchLayer)
      }

      if (props.sketchMode === 'draw') {
        map.removeMany([pointLayer, bufferLayer, aprLayer])
        aprLayer.graphics = new Collection<Graphic>()
        map.add(sketchLayer)
      }
      if (props.sketchMode === 'inactive') {
        // props.onGeojsonChange(null)
        map.removeMany([sketchLayer, aprLayer])
        map.addMany([pointLayer, bufferLayer])
        aprLayer.graphics = new Collection<Graphic>()
      }
    }
  }, [props.spatialQueryType, props.sketchMode])

  useEffect(() => {
    if (zoomId !== null) {
      handleZoomToId(zoomId.id)
    }
  }, [zoomId])

  return (
    <>
      <div className={classNames({
        [style.esriMapMarketCompare]: true,
        [style.active]: props.active || (props.spatialQueryType !== 'none' && props.spatialQueryType !== 'buffer' && props.spatialQueryType !== 'clear')
      })} ref={mapRef}>
      </div>
    </>
  )
}

export default MarketCompareMap
