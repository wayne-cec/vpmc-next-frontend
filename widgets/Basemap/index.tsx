import React, { useContext, useEffect, useState } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import {
  Tooltip, Dialog, DialogTitle,
  DialogContent, Button, DialogActions,
  Accordion, AccordionSummary, AccordionDetails,
  Typography, Link
} from '@mui/material'
import { widgetContext } from '../WidgetExpand'
import BasemapOption from './BasemapOption'
import WebTileLayer from '@arcgis/core/layers/WebTileLayer'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const defaultBaseMap = 'DEFAULT'

type BasemapCategory = 'basemap' | 'geographic'

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
    id: 'PHOTO_MIX',
    title: '正射影像',
    icon: '/basemaps/default.png',
    tileLayer: new WebTileLayer({
      id: 'PHOTO_MIX',
      urlTemplate: 'https://wmts.nlsc.gov.tw/wmts/PHOTO_MIX/default/GoogleMapsCompatible/{level}/{row}/{col}'
    })
  }
]

const geographicDataList: IBasemapData[] = [
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
  const [basemapTypeExpanded, setbasemapTypeExpanded] = useState<BasemapCategory | false>(false)

  const handleChangeBasemap = (basemap: IBasemapData) => {
    if (map) {
      setactiveBasemap(basemap.id)
      handleRemoveAllBasemaps()
      onShowChange('none')
      if (basemap.id === 'DEFAULT') return
      map.add(basemap.tileLayer)
      map.reorder(basemap.tileLayer, 0)
    }
  }

  const handleRemoveAllBasemaps = () => {
    let baseLayers = basemapDataList.map(a => a.tileLayer)
    map?.removeMany(baseLayers)

    let geographicLayers = geographicDataList.map(a => a.tileLayer)
    map?.removeMany(geographicLayers)
  }

  const handleAccordionClick =
    (panel: BasemapCategory) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setbasemapTypeExpanded(isExpanded ? panel : false);
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
      <Accordion expanded={basemapTypeExpanded === 'basemap'} onChange={handleAccordionClick('basemap')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>底圖</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {
            basemapDataList.map((basemap, index) => {
              return <BasemapOption key={index}
                id={basemap.id}
                icon={basemap.icon}
                title={basemap.title}
                layer={basemap.tileLayer}
                active={basemap.id === activeBasemap}
                onClick={() => {
                  handleChangeBasemap(basemap)
                }}
              />
            })
          }
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={basemapTypeExpanded === 'geographic'} onChange={handleAccordionClick('geographic')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography>地理圖層</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {
            geographicDataList.map((basemap, index) => {
              return <BasemapOption key={index}
                id={basemap.id}
                icon={basemap.icon}
                title={basemap.title}
                layer={basemap.tileLayer}
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
        </AccordionDetails>
      </Accordion>

    </div>
  )
}

export default Basemap
