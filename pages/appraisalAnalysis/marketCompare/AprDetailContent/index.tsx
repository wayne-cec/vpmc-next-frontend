import React from 'react'
import { IDetailAprInfo } from '..'
import style from './index.module.scss'
import moment from 'moment'

const AprDetailContent = (props: IDetailAprInfo) => {
  return (
    <div className={style.aprDetailContent}>
      <div className={style.chipContainer}>
        <span className={style.chip}>{moment(new Date(props.transactiontime)).format('YYYY-MM-DD')}</span>
        <span className={style.chip}>{props.transferFloor}樓</span>
      </div>
      <div className={style.priceContainer}>
        <div className={style.priceChip}></div>
        <div className={style.priceChip}></div>
        <div className={style.priceChip}></div>
      </div>
    </div>
  )
}

export default AprDetailContent
