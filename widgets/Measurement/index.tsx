// import React from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import Widget from "@arcgis/core/widgets/Widget"
// import * as decorators from "@arcgis/core/core/accessorSupport/decorators"
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import { subclass } from '@arcgis/core/core/accessorSupport/decorators'

interface IMeasurementParam extends __esri.WidgetProperties {

}


@subclass('esri.widgets.Measurement')
class Measurement extends Widget {

  constructor(params?: IMeasurementParam) {
    super(params)
  }

  render () {
    return (
      <div>
        testest
      </div>
    );
  }
}

export default Measurement
