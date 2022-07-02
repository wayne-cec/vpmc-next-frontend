import React, { useContext, useEffect, useState } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import { Tooltip } from '@mui/material'
import { widgetContext } from '../WidgetExpand'
import BasemapOption from './BasemapOption'
import WMTSLayer from '@arcgis/core/layers/WMTSLayer'

const defaultBaseMap = 'DEFAULT'

const Basemap = () => {
  const { map, show } = useContext(widgetContext)

  return (
    <div className={classNames({
      [style.basemapWidget]: true,
      [style.show]: show,
      [style.hide]: !show
    })}>
      <BasemapOption
        icon={'/basemaps/default.png'}
        title={'預設地圖'}
        active={defaultBaseMap === 'DEFAULT'}
        onClick={() => {
          if (map) {
            const layer = new WMTSLayer({
              url: 'https://gibs.earthdata.nasa.gov/wmts/epsg4326/best'
            })
            console.log(layer)
            map.add(layer)
          }
        }}
      />
    </div>
  )
}

export default Basemap
