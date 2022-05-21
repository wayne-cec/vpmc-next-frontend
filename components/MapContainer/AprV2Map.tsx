import React, { Children } from 'react'
import style from './index.module.scss'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import { useState, useEffect } from 'react'
import * as watchUtils from '@arcgis/core/core/watchUtils'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import Graphic from '@arcgis/core/Graphic'
import Renderer from "@arcgis/core/renderers/Renderer"

export interface IEsriMap {
  basemap: string
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

const AprV2Map = (props: IEsriMap) => {
  // const [townDataFetched, settownDataFetched] = useState<boolean>(false)

  const fetchTownData = async (map: Map) => {
    const promises: any[] = []
    for (let [key, value] of Object.entries(towns)) {
      promises.push(
        fetch(`http://140.122.82.98:9085/api/Commitee/listTownAvg?county=新北市&town=${key}&startDate=2021-01-01&endDate=2022-01-01`, {
          method: 'GET',
          redirect: 'follow'
        })
      )
    }
    Promise.allSettled([promises]).then(async ([result]: any[]) => {
      const features: any[] = []
      for (let i = 0; i < result.value.length; i++) {
        const response = await result.value[i]
        const responseContent = await response.json()

        features.push({
          geometry: {
            type: "point",
            x: towns[responseContent.town][0],
            y: towns[responseContent.town][1]
          },
          attributes: {
            ObjectID: i,
            avg: Number(responseContent.avg),
            county: responseContent.county,
            town: responseContent.town
          }
        })
      }

      const layer = new FeatureLayer({
        source: features,
        objectIdField: "ObjectID",
        renderer: {
          //@ts-ignore
          type: "simple",
          symbol: {
            type: "simple-marker",
            size: 15,
            color: "black",
            outline: {
              width: 0.5,
              color: "white"
            }
          }
        }
      })

      // const layer = new GraphicsLayer({
      //   graphics: features
      // })

      map.add(layer)
    })
  }

  useEffect(() => {

    const map = new Map({
      basemap: props.basemap
    })
    const mapView = new MapView({
      map: map,
      center: [121.4640139307843, 25.013838580240503],
      zoom: 13,
      container: 'mapBox',
      ui: undefined
    })


    fetchTownData(map)

    watchUtils.whenTrue(mapView, 'stationary', async () => {
      // console.log(mapView.zoom)
      if (mapView.zoom <= 14 && mapView.zoom > 11) {
      }
    })
  }, [])

  return (
    <>
      <div className={style.esriMap} id='mapBox'>
      </div>
    </>
  )
}

export default AprV2Map
