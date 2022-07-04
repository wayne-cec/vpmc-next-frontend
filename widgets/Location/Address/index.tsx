import React, { useContext } from 'react'
import style from './index.module.scss'
import { widgetContext } from '../../WidgetExpand'

const Address = () => {
  const { mapView, onShowChange } = useContext(widgetContext)

  const handleSubmit = async () => {

  }

  return (
    <div className={style.countyQuery}>
      <div className={style.queryBtn}
        onClick={handleSubmit}
      >
        查詢
      </div>
    </div>
  )
}

export default Address
