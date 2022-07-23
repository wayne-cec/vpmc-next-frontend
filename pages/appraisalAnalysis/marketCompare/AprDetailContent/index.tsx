import React from 'react'
import style from './index.module.scss'
import moment from 'moment'
import { getAge } from '../../../../lib/calculateAge'
import { Grid } from '@mui/material'
import { buildingTypeDecode } from '../../../../components/CommiteeCard'
import { urbanUsageSet } from '../../../../lib/marketComapreConst'
import calculateArea from '../../../../lib/calculateArea'

const square = 3.305785

export interface IDetailAprInfo {
  transactiontime: string
  completiontime: string
  transferFloor: number
  unitPrice: number
  priceWithoutParking: number
  roomNumber: number
  hallNumber: number
  bathNumber: number
  buildingTransferArea: number
  parkingSpacePrice: number
  parkingSpaceTransferArea: number
  price: number
  landAmount: number
  buildingAmount: number
  parkAmount: number
  buildingType: number
  floor: number
  urbanLandUse: number
  buildingArea: number
  subBuildingArea: number
  belconyArea: number
  landTransferArea: number
  organization: string
}

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
            <span className={style.transferBuildingArea}>{calculateArea(props.buildingTransferArea)}</span>
            <span className={style.transferBuildingAreaUnit}>坪</span>
          </p>
          <p className={style.caption}>
            含車位{calculateArea(props.parkingSpaceTransferArea)}坪
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
            <span className={style.title}>標的:</span>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <span>{props.buildingAmount}建物{props.landAmount}土地{props.parkAmount}車位</span>
          </Grid>

          <Grid item xs={2} className={style.gridContainer}>
            <span className={style.title}>樓層:</span>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <span>{props.transferFloor}/{props.floor}樓</span>
          </Grid>

          <Grid item xs={2} className={style.gridContainer}>
            <span className={style.title}>型態:</span>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <span>{buildingTypeDecode[props.buildingType]}</span>
          </Grid>

          <Grid item xs={2} className={style.gridContainer}>
            <span className={style.title}>分區:</span>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <span>{urbanUsageSet[props.urbanLandUse]}</span>
          </Grid>

        </Grid>
      </div>
      <div className={style.AreaDetailContainer}>

        <div className={style.heading}>
          <span>土地移轉面積</span>
          <span>{calculateArea(props.landTransferArea)}坪</span>
        </div>
        <div className={style.headingSub}>
          <span>主建物面積</span>
          <span>{calculateArea(props.buildingArea)}坪</span>
        </div>
        <div className={style.subInfoContainer}>
          <div className={style.subInfo}>
            <span>附屬建物面積</span>
            <span>{calculateArea(props.subBuildingArea)}坪</span>
          </div>
          <div className={style.subInfo}>
            <span>陽台面積</span>
            <span>{calculateArea(props.belconyArea)}坪</span>
          </div>
        </div>

        {/* <p>{props.subBuildingArea}</p>
        <p>{props.belconyArea}</p> */}
      </div>

    </div>
  )
}

export default AprDetailContent
