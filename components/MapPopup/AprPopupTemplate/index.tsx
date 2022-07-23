import React from 'react'
import style from './index.module.scss'

export interface IAprPopupTemplate {
  count: number
}

const AprPopupTemplate = (props: IAprPopupTemplate) => {

  return (
    <div className={style.AprPopupTemplate}>
      此處有{props.count}筆交易紀錄
    </div>
  )
}

export default AprPopupTemplate