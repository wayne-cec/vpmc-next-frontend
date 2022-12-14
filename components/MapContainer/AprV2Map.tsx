import React, { useEffect, useRef, useState } from 'react'
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
import '@arcgis/core/assets/esri/themes/light/main.css'
import useMap from '../../hooks/useMap'
import DefaultUI from '@arcgis/core/views/ui/DefaultUI'
import { createGeoJSONURL } from '../../lib/calculateAge'
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer'
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol'
import { useCountyGraphPendingStatus } from '../../pages/aprV2/commitee'
import MapPopup from '../MapPopup'
import CommiteePopupTemplate from '../MapPopup/CommiteePopupTemplate'
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol'
import { ICommiteePopupTemplate } from '../MapPopup/CommiteePopupTemplate'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/slice/user'

export const square = 3.305785

export interface IEsriMap {
  townGeojson: any | null
  basemap: string
  onExtentChange: (value: ICommitee[]) => void
}

const towns: { [key: string]: number[] } = {
  "中和區": [121.4941849, 24.99095741],
  "新店區": [121.5316664, 24.93049341],
  "瑞芳區": [121.8236205, 25.09850986],
  "坪林區": [121.7242475, 24.91106629],
  "烏來區": [121.5415314, 24.78834834],
  "淡水區": [121.4634116, 25.18952335],
  "金山區": [121.6056053, 25.21759872],
  "貢寮區": [121.9190867, 25.02564497],
  "樹林區": [121.4010939, 24.97988745],
  "萬里區": [121.6444173, 25.17599823],
  "土城區": [121.4457366, 24.96436839],
  "板橋區": [121.4577018, 25.01168661],
  "林口區": [121.3524426, 25.10046813],
  "雙溪區": [121.8328234, 24.99692669],
  "永和區": [121.5167632, 25.00821147],
  "鶯歌區": [121.3465582, 24.95669678],
  "汐止區": [121.6546929, 25.07340019],
  "三重區": [121.4871802, 25.06310166],
  "石碇區": [121.6472579, 24.94727821],
  "平溪區": [121.7579081, 25.02616174],
  "蘆洲區": [121.471267, 25.08935817],
  "深坑區": [121.6200047, 24.99770398],
  "五股區": [121.4332107, 25.09624321],
  "石門區": [121.5692749, 25.26557455],
  "三峽區": [121.4162957, 24.88223568],
  "新莊區": [121.4367532, 25.03592653],
  "泰山區": [121.416278, 25.05558928],
  "三芝區": [121.5148255, 25.23209229],
  "八里區": [121.412884, 25.1382297]
}

export interface IExtent {
  xmin: number
  ymin: number
  xmax: number
  ymax: number
}

export interface ICommitee {
  address: string
  id: string
  latitude: number
  longitude: number
  organization: string
  value: ISimpleCommiteeData | undefined
}

export interface ISimpleCommiteeData {
  avg_unit_price: string
  apr_count: string
  completion_date: string
  building_type: string
  calculatedUnitPrice: number | undefined
}

const mapOptions = {
  mapOption: { basemap: 'topo-vector' },
  mapViewOption: {
    center: [121.4640139307843, 25.013838580240503],
    zoom: 13,
    ui: new DefaultUI(),
    constraints: { minZoom: 12, maxZoom: 20 }
  }
}

let townGeoJsonLayer = new GeoJSONLayer()

const AprV2Map = (props: IEsriMap) => {
  const userInfo = useSelector(selectUser)
  const { setpending } = useCountyGraphPendingStatus()
  const mapRef = useRef<HTMLDivElement>(null)
  const { asyncMap, asyncMapView } = useMap(mapRef, mapOptions)
  const [popupPoint, setPopupPoint] = useState<Point>()
  const [openPopup, setOpenPopup] = useState(false)
  const [commiteeInfoLayer] = useState(new GraphicsLayer({
    id: 'commiteeInfoLayer',
    graphics: [],
    visible: false
  }))
  const [commiteeIconLayer] = useState(new GraphicsLayer({
    id: 'commiteeIconLayer',
    graphics: [],
    visible: false
  }))
  const [popupData, setpopupData] = useState<ICommiteePopupTemplate>({
    unitPrice: 0,
    commiteeName: ''
  })

  const renderTownGeojsonToMap = async () => {
    if (props.townGeojson) {
      (await asyncMap).remove(townGeoJsonLayer)
      townGeoJsonLayer = new GeoJSONLayer({
        url: createGeoJSONURL(props.townGeojson),
        renderer: new SimpleRenderer({
          symbol: new SimpleFillSymbol({
            outline: { color: [0, 0, 0, 0.33] },
            color: [255, 145, 28, 0.19]
          })
        })
      });
      (await asyncMap).add(townGeoJsonLayer);
      townGeoJsonLayer.when(async () => {
        (await asyncMapView).goTo(townGeoJsonLayer.fullExtent);
        (await asyncMap).reorder(townGeoJsonLayer, (await asyncMap).layers.length - 1);
        setpending(false)
      })
    }
  }

  const fetchTownData = async (map: Map) => {
    const promises: any[] = []
    const headers = new Headers()
    headers.append('authorization', userInfo.token)
    for (let [key, value] of Object.entries(towns)) {
      promises.push(
        fetch(process.env.API_DOMAIN_PROD + `/api/Commitee/listTownAvg?county=新北市&town=${key}&startDate=2021-01-01&endDate=2022-01-01`, {
          method: 'GET',
          headers: headers,
          redirect: 'follow'
        })
      )
    }
    Promise.allSettled([promises]).then(async ([result]: any[]) => {
      const infoGraphics: Graphic[] = []
      const graphics: Graphic[] = []
      for (let i = 0; i < result.value.length; i++) {
        const response = await result.value[i]
        const responseContent = await response.json()
        const unitPrice = Math.round(responseContent.avg * square / 1000) / 10
        const unitPriceGraphic = new Graphic({
          geometry: new Point({
            x: towns[responseContent.town][0],
            y: towns[responseContent.town][1]
          }),
          attributes: {
            avg: Number(responseContent.avg),
            county: responseContent.county,
            town: responseContent.town
          },
          symbol: new TextSymbol({
            color: "white",
            haloColor: "black",
            haloSize: "1px",
            text: `${unitPrice}萬`,
            xoffset: 0,
            yoffset: -10,
            font: {
              size: 16
            }
          })
        })
        const townGraphic = new Graphic({
          geometry: new Point({
            x: towns[responseContent.town][0],
            y: towns[responseContent.town][1]
          }),
          attributes: {
            avg: Number(responseContent.avg),
            county: responseContent.county,
            town: responseContent.town
          },
          symbol: new TextSymbol({
            color: "white",
            haloColor: "black",
            haloSize: "1px",
            text: `${responseContent.town}`,
            xoffset: 0,
            yoffset: 5,
            font: {
              size: 12
            }
          })
        })
        const bgGraphic = new Graphic({
          geometry: new Point({
            x: towns[responseContent.town][0],
            y: towns[responseContent.town][1]
          }),
          attributes: {
            ObjectID: i,
            avg: Number(responseContent.avg),
            county: responseContent.county,
            town: responseContent.town
          }
        })
        graphics.push(bgGraphic)
        infoGraphics.push(unitPriceGraphic)
        infoGraphics.push(townGraphic)
      }
      const infoLayer = new GraphicsLayer({
        id: 'townInfoLayer',
        graphics: infoGraphics,
        visible: false
      })
      const layer = new FeatureLayer({
        id: 'townBgLayer',
        source: graphics,
        objectIdField: "ObjectID",
        renderer: new SimpleRenderer({
          symbol: new SimpleMarkerSymbol({
            size: 80,
            color: [255, 56, 0, 1]
          })
        }),
        visible: false
      })
      map.add(layer)
      map.add(infoLayer)
    })
  }

  const fetchCommiteeByExtent = async (map: Map, extent: Extent, WGS84: SpatialReference) => {
    const convertedExtent = projection.project(extent, WGS84) as Extent
    const headers = new Headers()
    headers.append('authorization', userInfo.token)
    const response = await fetch(
      process.env.API_DOMAIN_PROD + `/api/Commitee/listCommiteeByExtent?xmin=${convertedExtent.xmin}&ymin=${convertedExtent.ymin}&xmax=${convertedExtent.xmax}&ymax=${convertedExtent.ymax}`,
      {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
      }
    )
    const commiteeData: ICommitee[] = await response.json()
    const infoGraphics: Graphic[] = []
    const iconGraphics: Graphic[] = []
    const promises: any[] = []
    for (let i = 0; i < commiteeData.length; i++) {
      promises.push(
        fetch(process.env.API_DOMAIN_PROD + `/api/Commitee/getSimpleInfo?commiteeId=${commiteeData[i].id}&bufferRadius=35`, {
          method: 'GET',
          headers: headers,
          redirect: 'follow'
        })
      )
    }
    Promise.allSettled([promises]).then(async ([result]: any[]) => {
      for (let i = 0; i < result.value.length; i++) {
        const response = await result.value[i]
        if (response.status === 200) {
          const commiteeValue: ISimpleCommiteeData = await response.json()
          let unitPrice
          try {
            unitPrice = Math.round(Number(commiteeValue.avg_unit_price) * square / 1000) / 10
            commiteeValue.calculatedUnitPrice = unitPrice
            commiteeData[i].value = commiteeValue
          } catch {
            commiteeValue.calculatedUnitPrice = undefined
            commiteeData[i].value = commiteeValue
          }
          if (unitPrice !== 0 && commiteeData[i].value) {

            const iconGraphic = new Graphic({
              geometry: new Point({
                x: commiteeData[i].longitude,
                y: commiteeData[i].latitude
              }),
              attributes: {
                unitPrice: unitPrice,
                commiteeName: parseCommitee(commiteeData[i].organization)
              },
              symbol: new PictureMarkerSymbol({
                url: '/commitee/commitee.png',
                width: '60px',
                height: '60px'
              })
            })
            iconGraphics.push(iconGraphic)
            const unitPriceGraphic = new Graphic({
              geometry: new Point({
                x: commiteeData[i].longitude,
                y: commiteeData[i].latitude
              }),
              symbol: new TextSymbol({
                color: "white",
                haloColor: "black",
                haloSize: "1px",
                text: `${unitPrice}萬`,
                xoffset: 0,
                yoffset: -30,
                font: {
                  size: 18,
                  weight: 'lighter'
                }
              })
            })
            const commiteeTitleGraphic = new Graphic({
              geometry: new Point({
                x: commiteeData[i].longitude,
                y: commiteeData[i].latitude
              }),
              symbol: new TextSymbol({
                color: "white",
                haloColor: "black",
                haloSize: "1px",
                text: `${parseCommitee(commiteeData[i].organization)}`,
                xoffset: 0,
                yoffset: -45,
                font: {
                  size: 14,
                  weight: 'lighter'
                }
              })
            })
            infoGraphics.push(unitPriceGraphic)
            infoGraphics.push(commiteeTitleGraphic)
          }
        }
      }
      const layer = map.findLayerById('commiteeInfoLayer') as GraphicsLayer | undefined
      const iconLayer = map.findLayerById('commiteeIconLayer') as GraphicsLayer | undefined
      if (layer && iconLayer) {
        // @ts-ignore
        layer.graphics = infoGraphics
        // @ts-ignore
        iconLayer.graphics = iconGraphics
        props.onExtentChange(commiteeData)
      }
    })
  }

  const loadCommiteeLayer = (map: Map) => {
    map.add(commiteeIconLayer)
    map.add(commiteeInfoLayer)
  }

  const addWatchUtilToMapView = async () => {
    fetchTownData((await asyncMap))
    loadCommiteeLayer((await asyncMap))
    watchUtils.whenTrue((await asyncMapView), 'stationary', async () => {
      if ((await asyncMapView).zoom <= 16) {
        if ((await asyncMap).findLayerById('townBgLayer') && (await asyncMap).findLayerById('townInfoLayer')) {
          (await asyncMap).findLayerById('townBgLayer').visible = true;
          (await asyncMap).findLayerById('townInfoLayer').visible = true;
          (await asyncMap).findLayerById('commiteeInfoLayer').visible = false;
          (await asyncMap).findLayerById('commiteeIconLayer').visible = false;
          props.onExtentChange([])
        }
      } else {
        (await asyncMap).findLayerById('townBgLayer').visible = false;
        (await asyncMap).findLayerById('townInfoLayer').visible = false;
        (await asyncMap).findLayerById('commiteeInfoLayer').visible = true;
        (await asyncMap).findLayerById('commiteeIconLayer').visible = true;
        fetchCommiteeByExtent((await asyncMap), (await asyncMapView).extent, new SpatialReference({ wkid: 4326 }))
      }
    })
  }

  const handleCommiteeHover = async (event: any) => {
    const opts = {
      include: commiteeIconLayer
    }
    const view = await asyncMapView
    view.hitTest(event, opts).then(async (response) => {
      if (response.results.length === 0) {
        ((await asyncMap).findLayerById('commiteeIconLayer') as GraphicsLayer).graphics.forEach((graphic) => {
          graphic.symbol = new PictureMarkerSymbol({
            url: '/commitee/commitee.png',
            width: '60px',
            height: '60px'
          })
        })
        document.body.style.cursor = 'default';
        return
      }
      document.body.style.cursor = 'pointer';

      response.results[0].graphic.symbol = new PictureMarkerSymbol({
        url: '/commitee/commitee.png',
        width: '80px',
        height: '80px'
      })
    })
  }

  const handleViewClick = async (event: any) => {
    const opts = {
      include: commiteeIconLayer
    }
    const view = await asyncMapView
    view.hitTest(event, opts).then((response) => {
      if (response.results.length === 0) {
        setPopupPoint(undefined)
        setOpenPopup(false)
        return
      }
      if (!openPopup) {
        const graphic = response.results[0].graphic
        // graphic.attributes.unitPrice
        setpopupData(graphic.attributes)
        // unitPrice: unitPrice,
        //         commiteeName: parseCommitee(commiteeData[i].organization)
        setPopupPoint(new Point(graphic.geometry))
        setOpenPopup(true)
      }
    })
  }

  useEffect(() => {
    (async () => {
      const map = await asyncMap
      const view = await asyncMapView
      view.on('click', handleViewClick) // 
      view.on('pointer-move', handleCommiteeHover) // 
    })()
    addWatchUtilToMapView()
  }, [])

  useEffect(() => {
    renderTownGeojsonToMap()
  }, [props.townGeojson])

  return (
    <>
      <div className={style.esriMap} ref={mapRef}></div>
      <MapPopup point={popupPoint} open={openPopup} view={asyncMapView}>
        <CommiteePopupTemplate {...popupData} />
      </MapPopup>
    </>
  )
}

export default AprV2Map
