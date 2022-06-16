import React from 'react'
import style from './index.module.scss'
import Image from 'next/image'
import classNames from 'classnames'
import moment from 'moment'
import { IMarketCompareResult } from '../../api/prod'
import { Grid } from '@mui/material'

const square = 3.305785

export interface IMarketCompareResultCard extends IMarketCompareResult {
}

const MarketCompareResultCard = (props: IMarketCompareResultCard) => {
  return (
    <div className={style.marketCompareResultCard}>
      <Grid container spacing={0}>
        <Grid xs={2}>
          <span className={style.chip}>
            {moment(new Date(props.transactiontime)).format('YYYY-MM')}
          </span>
        </Grid>
        <Grid xs={1.5}>
          <span className={style.chip}>
            {props.transferFloor}樓
          </span>
        </Grid>
        <Grid xs={2}>
          <span className={style.unitPrice}>
            {
              Math.round((props.unitPrice * square) / 1000) / 10
            }
          </span>
          <span className={style.unit}>萬/坪</span>
        </Grid>
        <Grid xs={2.5}>
          <p className={style.smtext}>
            <span className={style.price}>
              {Math.round(props.priceWithoutParking / 10000)}
            </span>萬
          </p>
          <p className={style.smtext}>{props.roomNumber}房{props.hallNumber}廳/{Math.round(props.buildingTransferArea / square * 10) / 10}坪</p>
        </Grid>
        <Grid xs={2}>
          <p>{props.parkingSpacePrice / 10000}萬<span className={style.xstext}>估</span></p>
          {
            props.parkingSpaceTransferArea === 0
              ? <p className={style.smtext}>無車位</p>
              : <p className={style.smtext}>車位{props.parkingSpaceTransferArea}坪</p>
          }
        </Grid>
        <Grid xs={2}>
          <p className={style.totalPrice}>{Math.round(props.price / 10000)}<span className={style.smtext}>萬</span></p>
        </Grid>

      </Grid>
    </div>
  )
}

export default MarketCompareResultCard