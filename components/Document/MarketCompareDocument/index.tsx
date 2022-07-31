import React, { useState } from 'react'
import style from './index.module.scss'
import {
  Grid
} from '@mui/material'
import moment from 'moment'
import { Data } from '../../../containers/MarketCompareContainer/ResultPanel/ResultTable'

export interface IMarketCompareDocument {
  pid: string
  aprData: Data[]
}

const formatter = new Intl.NumberFormat(undefined, { style: 'decimal' })

const MarketCompareDocument = ({
  pid,
  aprData
}: IMarketCompareDocument) => {

  return (
    <div className={style.MarketCompareDocument} id={pid}>

      <div className={style.Head}>
        <div className={style.Title}>
          <span>市場比較案例篩選</span>
        </div>
        <div className={style.DocInfo}>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <span>日期</span>
            </Grid>
            <Grid item xs={9}>
              <span>{moment(new Date()).format('YYYY-MM-DD HH:mm:ss A')}</span>
            </Grid>
            <Grid item xs={3}>
              <span>作者</span>
            </Grid>
            <Grid item xs={9}>
              <span>{'jimmg35'}</span>
            </Grid>
          </Grid>
        </div>
      </div>

      <div className={style.Body}>
      </div>

      <div className={style.Foot}>
        <span>Copyright © 2022 VPMC 版權所有</span>
        <span>中華誠信資產管理</span>
      </div>

    </div>
  )
}

export default MarketCompareDocument
