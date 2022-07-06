import React from 'react'
import { IDetailAprInfo } from '..'
import style from './index.module.scss'
import moment from 'moment'
import { getAge } from '../../../../lib/calculateAge'
import { Grid } from '@mui/material'

const square = 3.305785

const AprDetailContent = (props: IDetailAprInfo) => {
  return (
    <div className={style.aprDetailContent}>
      <div className={style.chipContainer}>
        <span className={style.chip}>{moment(new Date(props.transactiontime)).format('YYYY-MM-DD')}</span>
        <span className={style.chip}>{props.transferFloor}樓</span>
      </div>
      <div className={style.priceContainer}>

        {/* 單價 */}
        <div className={style.priceChip}>
          <p>
            <span className={style.unitPrice}>{Math.round((props.unitPrice * square) / 1000) / 10}</span>
            <span className={style.unitPriceUnit}>萬/坪</span>
          </p>
          <p className={style.caption}>
            已扣除車位
          </p>
        </div>

        {/* 坪數 */}
        <div className={style.priceChip}>
          <p>
            <span className={style.transferBuildingArea}>{Math.round((props.buildingTransferArea) / square * 10) / 10}</span>
            <span className={style.transferBuildingAreaUnit}>坪</span>
          </p>
          <p className={style.caption}>
            含車位{Math.round(props.parkingSpaceTransferArea / square * 10) / 10}坪
          </p>
        </div>

        {/* 總價 */}
        <div className={style.priceChip}>
          <p>
            <span className={style.transferBuildingArea}>{Math.round(props.price / 10000 * 10) / 10}</span>
            <span className={style.transferBuildingAreaUnit}>萬</span>
          </p>
          <p className={style.caption}>
            含車位{Math.round(props.parkingSpacePrice / 10000 * 10) / 10}萬
          </p>
        </div>

      </div>
      <div className={style.detailContainer}>
        <Grid container spacing={0}>
          <Grid item xs={2} className={style.gridContainer}>
            <span className={style.title}>格局:</span>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <span>{props.roomNumber}房{props.hallNumber}廳{props.bathNumber}衛</span>
          </Grid>
          <Grid item xs={2} className={style.gridContainer}>
            <span className={style.title}>屋齡:</span>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <span>{getAge(props.completiontime)}年</span>
          </Grid>
          <Grid item xs={2} className={style.gridContainer}>
            <span className={style.title}>樓層:</span>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <span>{props.transferFloor}樓</span>
          </Grid>
        </Grid>
        {/* <p>格局: {props.roomNumber}房{props.hallNumber}廳{props.bathNumber}衛</p>
        <p>屋齡: {getAge(props.completiontime)}</p>
        <p>樓層: {props.transferFloor}樓</p> */}
      </div>
    </div>
  )
}

export default AprDetailContent
