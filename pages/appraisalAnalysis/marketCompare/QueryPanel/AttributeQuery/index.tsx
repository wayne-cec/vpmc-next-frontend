import React from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import {
  Grid, FormControl, InputLabel, Select,
  Checkbox, MenuItem
} from '@mui/material'
import {
  assetTypeSet, transactionTimeSet, buildingTransactionAreaSet,
  landTransactionAreaSet, ageSet
} from '../../../../../lib/marketComapreConst'


export interface IAttributeQuery {
  assetTypeCode: number
  isTransactionTimeFiltered: boolean
  isBuildingAreaFiltered: boolean
  isLandAreaFiltered: boolean
  isAgeFiltered: boolean
  isParkSpaceFiltered: boolean
  isTransactionTimeFosced: boolean
  isBuildingAreaFosced: boolean
  isLandAreaFosced: boolean
  isAgeFosced: boolean
  isParkSpaceFosced: boolean
  isBuildingAreaCheckable: boolean
  isLandAreaCheckable: boolean
  transactionTime?: number
  buildingTransferArea?: number
  landTransferArea?: number
  age?: number
  parkSpaceType?: number
  onAssetTypeChange: (value: number) => void
  onTransactionTimeFilteredChange: () => void
  onTransactionTimeSelect: (value: number) => void
  onBuildingAreaFilteredChange: () => void
  onBuildingAreaSelect: (value: number) => void
  onLandAreaFilteredChange: () => void
  onLandAreaSelect: (value: number) => void
  onAgeFilteredChange: () => void
  onAgeSelect: (value: number) => void
}

const AttributeQuery = (props: IAttributeQuery) => {
  return (
    <div className={classNames({
      [style.attributeQuery]: true,
      [style.divide]: true
    })}>

      <Grid container spacing={2}>

        <Grid item xs={12}>
          <FormControl size='small' fullWidth>
            <InputLabel id="asset-type">資產類型*</InputLabel>
            <Select
              labelId="asset-type"
              label="資產類型"
              id="asset-type-select"
              value={props.assetTypeCode}
              onChange={(event) => {
                props.onAssetTypeChange(Number(event.target.value))
              }}
              size='small'
              fullWidth
            >
              {
                Object.keys(assetTypeSet).map((assetCode, index) => {
                  return <MenuItem
                    key={index}
                    value={assetCode}
                  >{assetTypeSet[Number(assetCode)]}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </Grid>

        {/* 交易時間 */}
        <Grid item xs={2}>
          <Checkbox
            checked={props.isTransactionTimeFiltered}
            onClick={props.onTransactionTimeFilteredChange}
          />
        </Grid>
        <Grid item xs={10}>
          <FormControl size='small' fullWidth>
            {
              props.isTransactionTimeFiltered && !props.isTransactionTimeFosced
                ? <></>
                : <InputLabel id="transaction-time">交易時間</InputLabel>
            }
            <Select
              labelId="transaction-time"
              label="交易時間"
              id="transaction-time-select"
              size='small'
              value={props.isTransactionTimeFiltered ? props.transactionTime : ''}
              disabled={!props.isTransactionTimeFiltered}
              // autoFocus={isTransactionTimeFiltered}
              onChange={(event) => {
                props.onTransactionTimeSelect(Number(event.target.value))
              }}
              fullWidth
            >
              {
                Object.keys(transactionTimeSet).map((assetCode, index) => {
                  return <MenuItem
                    key={index}
                    value={assetCode}
                  >{transactionTimeSet[Number(assetCode)]}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </Grid>

        {/* 建坪面積 */}
        <Grid item xs={2}>
          <Checkbox
            checked={props.isBuildingAreaFiltered}
            onClick={props.onBuildingAreaFilteredChange}
            disabled={!props.isBuildingAreaCheckable}
          />
        </Grid>
        <Grid item xs={10}>
          <FormControl size='small' fullWidth>
            {
              props.isBuildingAreaFiltered && !props.isBuildingAreaFosced
                ? <></>
                : <InputLabel id="building-transfer-area">建坪面積</InputLabel>
            }
            <Select
              labelId="building-transfer-area"
              label="建坪面積"
              id="building-transfer-area-select"
              size='small'
              value={props.isBuildingAreaFiltered ? props.buildingTransferArea : ''}
              onChange={(event) => {
                props.onBuildingAreaSelect(Number(event.target.value))
              }}
              disabled={!props.isBuildingAreaFiltered}
              // autoFocus={isBuildingAreaFiltered}
              fullWidth
            >
              {
                Object.keys(buildingTransactionAreaSet).map((assetCode, index) => {
                  return <MenuItem
                    key={index}
                    value={assetCode}
                  >{buildingTransactionAreaSet[Number(assetCode)]}</MenuItem>
                })
              }
            </Select>
          </FormControl>

        </Grid>

        {/* 地坪面積 */}
        <Grid item xs={2}>
          <Checkbox
            checked={props.isLandAreaFiltered}
            onClick={props.onLandAreaFilteredChange}
            disabled={!props.isLandAreaCheckable}
          />
        </Grid>
        <Grid item xs={10}>
          <FormControl size='small' fullWidth>
            {
              props.isLandAreaFiltered && !props.isLandAreaFosced
                ? <></>
                : <InputLabel id="land-transfer-area">地坪面積</InputLabel>
            }
            <Select
              labelId="land-transfer-area"
              label="地坪面積"
              id="land-transfer-area-select"
              size='small'
              fullWidth
              value={props.isLandAreaFiltered ? props.landTransferArea : ''}
              onChange={(event) => {
                props.onLandAreaSelect(Number(event.target.value))
              }}
              // autoFocus={isLandAreaFiltered}
              disabled={!props.isLandAreaFiltered}
            >
              {
                Object.keys(landTransactionAreaSet).map((assetCode, index) => {
                  return <MenuItem
                    key={index}
                    value={assetCode}
                  >{landTransactionAreaSet[Number(assetCode)]}</MenuItem>
                })
              }
            </Select>
          </FormControl>

        </Grid>

        {/* 屋齡 */}
        <Grid item xs={2}>
          <Checkbox
            checked={props.isAgeFiltered}
            onClick={props.onAgeFilteredChange}
          />
        </Grid>
        <Grid item xs={10}>
          <FormControl size='small' fullWidth>
            {
              props.isAgeFiltered && !props.isAgeFosced
                ? <></>
                : <InputLabel id="age">屋齡</InputLabel>
            }
            <Select
              labelId="age"
              label="屋齡"
              id="age-select"
              size='small'
              value={props.isAgeFiltered ? props.age : ''}
              onChange={(event) => {
                props.onAgeSelect(Number(event.target.value))
              }}
              disabled={!props.isAgeFiltered}
              // autoFocus={isAgeFiltered}
              fullWidth
            >
              {
                Object.keys(ageSet).map((assetCode, index) => {
                  return <MenuItem
                    key={index}
                    value={assetCode}
                  >{ageSet[Number(assetCode)]}</MenuItem>
                })
              }
            </Select>
          </FormControl>

        </Grid>

        {/* 車位類型 */}
        {/* <Grid item xs={2}>
          <Checkbox
            checked={props.isParkSpaceFiltered}
            onClick={() => {
              setisParkSpaceFiltered(prev => !prev)
              setparkSpaceType(0)
              if (props.isLandAreaFiltered) {
                setisLandAreaFiltered(false)
                setisLandAreaCheckable(false)
              } else if (!props.isLandAreaCheckable) {
                setisLandAreaFiltered(true)
                setisLandAreaCheckable(true)
              }

              if (props.isBuildingAreaFiltered) {
                setisBuildingAreaFiltered(false)
                setisBuildingAreaCheckable(false)
              } else if (!props.isBuildingAreaCheckable) {
                setisBuildingAreaFiltered(true)
                setisBuildingAreaCheckable(true)
              }
            }}
          />
        </Grid> */}
        {/* <Grid item xs={10}>
          <FormControl size='small' fullWidth>
            {
              props.isParkSpaceFiltered && !props.isParkSpaceFosced
                ? <></>
                : <InputLabel id="park-space">車位類型</InputLabel>
            }
            <Select
              labelId="park-space"
              label="車位類型"
              id="park-space-select"
              size='small'
              fullWidth
              value={props.isParkSpaceFiltered ? props.parkSpaceType : ''}
              onChange={(event) => {
                setparkSpaceType(Number(event.target.value))
                setisParkSpaceFosced(true)
              }}
              // autoFocus={isParkSpaceFiltered}
              disabled={!props.isParkSpaceFiltered}
            >
              {
                Object.keys(parkSpaceSet).map((assetCode, index) => {
                  return <MenuItem
                    key={index}
                    value={assetCode}
                  >{parkSpaceSet[Number(assetCode)]}</MenuItem>
                })
              }
            </Select>
          </FormControl>

        </Grid> */}

        {/* 使用分區 */}
        {/* <Grid item xs={2}>
          <Checkbox
            checked={isUrbanUsageFiltered}
            onClick={() => {
              setisUrbanUsageFiltered(prev => !prev)
              seturbanLandUse(0)
            }}
          />
        </Grid>
        <Grid item xs={10}>
          <FormControl size='small' fullWidth>
            {
              isUrbanUsageFiltered && !isUrbanUsageFosced
                ? <></>
                : <InputLabel id="land-use">使用分區</InputLabel>
            }
            <Select
              labelId="land-use"
              label="使用分區"
              id="land-use-select"
              size='small'
              fullWidth
              value={isUrbanUsageFiltered ? urbanLandUse : null}
              onChange={(event) => {
                seturbanLandUse(Number(event.target.value))
                setisUrbanUsageFosced(true)
              }}
              // autoFocus={isUrbanUsageFiltered}
              disabled={!isUrbanUsageFiltered}
            >
              {
                Object.keys(urbanUsageSet).map((assetCode, index) => {
                  return <MenuItem
                    key={index}
                    value={assetCode}
                  >{urbanUsageSet[Number(assetCode)]}</MenuItem>
                })
              }
            </Select>
          </FormControl>

        </Grid> */}

      </Grid>
    </div>
  )
}

export default AttributeQuery