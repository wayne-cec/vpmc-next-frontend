import React, { useContext, useEffect, useState } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import { Tooltip } from '@mui/material'
import { widgetContext } from '../WidgetExpand'
import BasemapOption from './BasemapOption'
import WebTileLayer from '@arcgis/core/layers/WebTileLayer'

const defaultBaseMap = 'DEFAULT'

export interface IBasemapData {
  id: string
  title: string
  icon: string
  tileLayer: WebTileLayer
}

const basemapDataList: IBasemapData[] = [
  {
    id: 'DEFAULT',
    title: '預設底圖',
    icon: '/basemaps/default.png',
    tileLayer: new WebTileLayer()
  },
  {
    id: 'EMAP5',
    title: '臺灣通用電子地圖',
    icon: '/basemaps/default.png',
    tileLayer: new WebTileLayer({
      id: 'EMAP5',
      urlTemplate: 'https://wmts.nlsc.gov.tw/wmts/EMAP5/default/GoogleMapsCompatible/{level}/{row}/{col}'
    })
  },
  {
    id: 'LANDSECT',
    title: '段籍圖',
    icon: '/basemaps/default.png',
    tileLayer: new WebTileLayer({
      id: 'LANDSECT',
      urlTemplate: 'https://wmts.nlsc.gov.tw/wmts/LANDSECT/default/GoogleMapsCompatible/{level}/{row}/{col}'
    })
  },
  {
    id: 'LUIMAP110',
    title: '國土利用現況調查',
    icon: '/basemaps/default.png',
    tileLayer: new WebTileLayer({
      id: 'LUIMAP110',
      urlTemplate: 'https://wmts.nlsc.gov.tw/wmts/LUIMAP110/default/GoogleMapsCompatible/{level}/{row}/{col}'
    })
  },
  {
    id: 'PHOTO_MIX',
    title: '正射影像',
    icon: '/basemaps/default.png',
    tileLayer: new WebTileLayer({
      id: 'PHOTO_MIX',
      urlTemplate: 'https://wmts.nlsc.gov.tw/wmts/PHOTO_MIX/default/GoogleMapsCompatible/{level}/{row}/{col}'
    })
  },
  {
    id: 'SCHOOL',
    title: '各級學校範圍圖',
    icon: '/basemaps/default.png',
    tileLayer: new WebTileLayer({
      id: 'SCHOOL',
      urlTemplate: 'https://wmts.nlsc.gov.tw/wmts/SCHOOL/default/GoogleMapsCompatible/{level}/{row}/{col}'
    })
  }
]

const Basemap = () => {
  const { map, show, onShowChange } = useContext(widgetContext)
  const [activeBasemap, setactiveBasemap] = useState<string>('DEFAULT')

  const handleRemoveAllBasemaps = () => {
    let tileLayers = basemapDataList.map(a => a.tileLayer)
    map?.removeMany(tileLayers)
  }

  useEffect(() => {
    let tileLayers = basemapDataList.filter(a => a.id === activeBasemap).map(a => a.tileLayer)
    map?.addMany(tileLayers)
    map?.reorder(tileLayers[0], 0)
  }, [])

  return (
    <div className={classNames({
      [style.basemapWidget]: true,
      [style.show]: show,
      [style.hide]: !show
    })}>
      {
        basemapDataList.map((basemap, index) => {
          return <BasemapOption key={index}
            icon={basemap.icon}
            title={basemap.title}
            active={basemap.id === activeBasemap}
            onClick={() => {
              if (map) {
                setactiveBasemap(basemap.id)
                handleRemoveAllBasemaps()
                onShowChange('none')
                if (basemap.id === 'DEFAULT') return
                map.add(basemap.tileLayer)
                map.reorder(basemap.tileLayer, 0)
              }
            }}
          />
        })
      }
    </div>
  )
}

export default Basemap
