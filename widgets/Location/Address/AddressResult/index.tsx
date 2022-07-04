import React, { useContext } from 'react'
import style from './index.module.scss'
import { IAddressInfo } from '..'
import { widgetContext } from '../../../WidgetExpand'
import Point from '@arcgis/core/geometry/Point'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import Collection from '@arcgis/core/core/Collection'
import Graphic from '@arcgis/core/Graphic'
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol'

export const AddressPointLayer = new GraphicsLayer({ id: 'AddressPoint' })

const AddressResult = (props: IAddressInfo) => {
  const { mapView, map } = useContext(widgetContext)
  return (
    <div className={style.addressResult}
      onClick={() => {
        if (!mapView || !map) return
        map.remove(AddressPointLayer)
        const location = new Graphic({
          geometry: new Point({ longitude: props.X, latitude: props.Y }),
          symbol: new PictureMarkerSymbol({
            url: '/aprRegion/mappin.png',
            width: '30px',
            height: '30px'
          })
        })
        mapView.zoom = 16
        mapView.goTo(location)
        AddressPointLayer.graphics = new Collection([location])
        map.add(AddressPointLayer)
      }}
    >
      <span>{props.FULL_ADDR}</span>
    </div>
  )
}

export default AddressResult
