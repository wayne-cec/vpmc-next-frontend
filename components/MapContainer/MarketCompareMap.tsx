import React, { useEffect, useState, useRef, useContext } from 'react'
import style from './index.module.scss'
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol'
import SketchViewModel from '@arcgis/core/widgets/Sketch/SketchViewModel'
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import DefaultUI from "@arcgis/core/views/ui/DefaultUI"
import Collection from '@arcgis/core/core/Collection'
import Circle from '@arcgis/core/geometry/Circle'
import Point from '@arcgis/core/geometry/Point'
import Graphic from '@arcgis/core/Graphic'
import useMap from '../../hooks/useMap'
import classNames from 'classnames'
import { SpatialQueryType } from '../../containers/MarketCompareContainer'
import '@arcgis/core/assets/esri/themes/light/main.css'
import { PolygonSketchMode } from '../PolygonSketch'
import * as projection from '@arcgis/core/geometry/projection'
import SpatialReference from '@arcgis/core/geometry/SpatialReference'
import MarketCompareContext from '../../containers/MarketCompareContainer/MarketCompareContext'
import MapPopup from '../MapPopup'
import AprPopupTemplate, { IAprPopupTemplate } from '../MapPopup/AprPopupTemplate'

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
  onCoordinateSelect: (longitude: number | undefined, latitude: number | undefined) => void
  onSketchModeChange: (value: PolygonSketchMode) => void
  onGeojsonChange: (value: string | null) => void
  onSpatialQueryTypeChange: (value: SpatialQueryType) => void
}

const MarketCompareMap = (props: IMarketCompareMap) => {
  const marketCompareContext = useContext(MarketCompareContext)
  const mapRef = useRef<HTMLDivElement>(null)
  const { asyncMap, asyncMapView, map, mapView } = useMap(mapRef, mapOptions)
  const { zoomId } = useContext(MarketCompareContext)
  const [removeHandle, setremoveHandle] = useState<any | null>(null)
  const [pointLayer, setpointLayer] = useState<GraphicsLayer | undefined>(undefined)
  const [bufferLayer, setbufferLayer] = useState<GraphicsLayer | undefined>(undefined)
  const [sketchLayer, setsketchLayer] = useState<GraphicsLayer | undefined>(undefined)
  const [aprLayer, setaprLayer] = useState<GraphicsLayer | undefined>(undefined)
  const [selectedAprLayer] = useState<GraphicsLayer>(new GraphicsLayer())
  const [longitude, setlongitude] = useState<number | undefined>(undefined)
  const [latitude, setlatitude] = useState<number | undefined>(undefined)
  const [popupPoint, setPopupPoint] = useState<Point>()
  const [openPopup, setOpenPopup] = useState(false)
  const [popupData, setpopupData] = useState<IAprPopupTemplate>({
    count: 0
  })
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
        radius: marketCompareContext.bufferRadius,
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

  const handleZoomToId = async (zoomId: { id: string } | null) => {
    if (!aprLayer || !map) return
    let ind = 0;
    for (let i = 0; i < aprLayer.graphics.length; i++) {
      if (marketCompareContext.highlightIds.includes(aprLayer.graphics.at(i).attributes.id)) {
        aprLayer.graphics.at(i).symbol = new PictureMarkerSymbol({
          url: '/aprRegion/home-highlight.png',
          width: '80px',
          height: '80px'
        })
        aprLayer.graphics.reorder(aprLayer.graphics.at(i), aprLayer.graphics.length - 1)
        continue
      }
      if (aprLayer.graphics.at(i).attributes.id === zoomId?.id) {
        aprLayer.graphics.at(i).symbol = new PictureMarkerSymbol({
          url: '/aprRegion/home-selected.png',
          width: '80px',
          height: '80px'
        })
        ind = i;
      } else {
        aprLayer.graphics.at(i).symbol = new PictureMarkerSymbol({
          url: '/aprRegion/home.png',
          width: '30px',
          height: '30px'
        })
      }
    }
    aprLayer.graphics.reorder(aprLayer.graphics.at(ind), aprLayer.graphics.length - 1)
  }

  const handleHighlightResult = async (ids: string[]) => {
    if (!aprLayer || !map) return
    for (let i = 0; i < aprLayer.graphics.length; i++) {
      if (ids.includes(aprLayer.graphics.at(i).attributes.id)) {
        aprLayer.graphics.at(i).symbol = new PictureMarkerSymbol({
          url: '/aprRegion/home-highlight.png',
          width: '80px',
          height: '80px'
        })
        aprLayer.graphics.reorder(aprLayer.graphics.at(i), aprLayer.graphics.length - 1)
      } else {
        aprLayer.graphics.at(i).symbol = new PictureMarkerSymbol({
          url: '/aprRegion/home.png',
          width: '30px',
          height: '30px'
        })
      }
    }
  }

  const handleAprClick = async (event: any) => {
    const opts = {
      include: aprLayer
    }
    const view = await asyncMapView
    view.hitTest(event, opts).then((response) => {
      if (response.results.length === 0) {
        setPopupPoint(undefined)
        setOpenPopup(false)
        return
      }
      setpopupData({
        count: response.results.length
      })
      if (!openPopup) {
        const graphic = response.results[0].graphic
        setPopupPoint(new Point(graphic.geometry))
        setOpenPopup(true)
      }
    })
  }

  useEffect(() => {
    const pLayer = new GraphicsLayer({ id: 'pointLayer' })
    const bLayer = new GraphicsLayer({ id: 'bufferLayer' })
    const aLayer = new GraphicsLayer({ id: 'aprLayer' })
    const sLayer = new GraphicsLayer({ id: 'sketchLayer' })
    setpointLayer(pLayer)
    setbufferLayer(bLayer)
    setaprLayer(aLayer)
    setsketchLayer(sLayer);

    (async () => {
      const map = await asyncMap
      const view = await asyncMapView
      view.on('click', handleAprClick)
      map.add(selectedAprLayer)
    })()

  }, [])

  useEffect(() => {
    if (map && aprLayer) {
      aprLayer.graphics = new Collection()
      map.remove(aprLayer)
    }
    if (marketCompareContext.filteredResults) {
      const aprResultGraphics = new Collection<Graphic>()
      marketCompareContext.filteredResults.forEach((aprResult) => {
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
  }, [marketCompareContext.filteredResults])

  useEffect(() => {
    if (!marketCompareContext.longitude || !marketCompareContext.latitude) return
    updateBufferCircle(
      marketCompareContext.longitude,
      marketCompareContext.latitude
    )
  }, [marketCompareContext.bufferRadius])

  useEffect(() => {
    if (marketCompareContext.isSelectorActive && mapView && pointLayer && aprLayer) {
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
    if (!marketCompareContext.isSelectorActive && mapView) {
      try { removeHandle.remove() } catch { }
    }
  }, [marketCompareContext.isSelectorActive])

  useEffect(() => {
    if (!pointLayer || !marketCompareContext.longitude || !marketCompareContext.latitude || !map || !aprLayer || !mapView) return
    const pointGraphic = new Graphic({
      geometry: new Point({ longitude: marketCompareContext.longitude, latitude: marketCompareContext.latitude }),
      symbol: new PictureMarkerSymbol({
        url: '/aprRegion/mappin.png',
        width: '30px',
        height: '30px'
      })
    })
    const collection = new Collection<Graphic>()
    collection.add(pointGraphic)
    pointLayer.graphics = collection
    map.add(pointLayer)
    updateBufferCircle(marketCompareContext.longitude, marketCompareContext.latitude)
    aprLayer.graphics = new Collection()
    mapView.goTo(pointGraphic)
  }, [marketCompareContext.longitude, marketCompareContext.latitude])


  useEffect(() => {
    if (map && mapView && pointLayer && bufferLayer && aprLayer && sketchLayer) {
      if (marketCompareContext.spatialQueryType === 'polygon' && marketCompareContext.sketchMode !== 'inactive') {
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
      } else if (marketCompareContext.spatialQueryType === 'circle' && marketCompareContext.sketchMode !== 'inactive') {
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
      } else if (marketCompareContext.spatialQueryType === 'rectangle' && marketCompareContext.sketchMode !== 'inactive') {
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
      } else if (marketCompareContext.spatialQueryType === 'clear' && marketCompareContext.sketchMode !== 'inactive') {
        map.remove(sketchLayer)
        sketchLayer.graphics = new Collection<Graphic>()
        map.add(sketchLayer)
      }

      if (marketCompareContext.sketchMode === 'draw') {
        map.removeMany([pointLayer, bufferLayer, aprLayer])
        aprLayer.graphics = new Collection<Graphic>()
        map.add(sketchLayer)
      }
      if (marketCompareContext.sketchMode === 'inactive') {
        // props.onGeojsonChange(null)
        map.removeMany([sketchLayer, aprLayer])
        map.addMany([pointLayer, bufferLayer])
        aprLayer.graphics = new Collection<Graphic>()
      }
    }
  }, [marketCompareContext.spatialQueryType, marketCompareContext.sketchMode])

  useEffect(() => {
    handleZoomToId(zoomId)
  }, [zoomId])

  useEffect(() => {
    handleHighlightResult(marketCompareContext.highlightIds)
  }, [marketCompareContext.highlightIds])


  return (
    <>
      <div className={classNames({
        [style.esriMapMarketCompare]: true,
        [style.active]: marketCompareContext.isSelectorActive || (marketCompareContext.spatialQueryType !== 'none' && marketCompareContext.spatialQueryType !== 'buffer' && marketCompareContext.spatialQueryType !== 'clear')
      })} ref={mapRef}>
      </div>
      <MapPopup point={popupPoint} open={openPopup} view={asyncMapView}>
        <AprPopupTemplate {...popupData} />
      </MapPopup>
    </>
  )
}

export default MarketCompareMap
