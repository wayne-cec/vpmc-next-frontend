import React from 'react'
import style from './index.module.scss'
import Image from 'next/image'
import classNames from 'classnames'
import {
  TextField, Select, MenuItem,
  InputLabel, FormControl, Checkbox,
  Grid, Radio
} from '@mui/material'
import MarketCompareResultCard from '../../../../components/MarketCompareResultCard'
import CoordinateSelector from '../../../../components/CoordinateSelector'
import PolygonSketch from '../../../../components/PolygonSketch'
import { PolygonSketchMode } from '../../../../components/PolygonSketch'
import {
  assetTypeSet, transactionTimeSet, buildingTransactionAreaSet,
  landTransactionAreaSet, ageSet
} from '../../../../lib/marketComapreConst'
import { IMarketCompareResult } from '../../../../api/prod'
import { SpatialQueryType } from '..'

export interface IQueryPanel {
  longitude?: number
  latitude?: number
  locatedCounty?: string
  locatedTown?: string
  isSelectorActive: boolean
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
  assetTypeCode: number
  bufferRadius: number
  transactionTime?: number
  buildingTransferArea?: number
  landTransferArea?: number
  age?: number
  parkSpaceType?: number
  polygonGoejson?: string
  filteredResults: IMarketCompareResult[]
  spatialQueryType: SpatialQueryType
  sketchMode: PolygonSketchMode
  onCoordinatorSelectorClick: (value: boolean) => void // (value) => {setisCoordinateSelectorActive(value)}
  onSpatialQueryTypeChange: (value: SpatialQueryType) => void // setspatialQueryType
  onBufferRadiusChange: (value: number) => void // (value) => { setbufferRadius(value) }
  onSketchModeChange: (value: PolygonSketchMode) => void // (value) => {setsketchMode(value)}
  onDraw: () => void // () => {setsketchMode('draw')}
  onClear: () => void // () => {setsketchMode('inactive')}
  onAssetTypeChange: (value: number) => void // (value) => { setassetTypeCode(value) }
  onTransactionTimeFilteredChange: () => void // () => {setisTransactionTimeFiltered(prev => !prev)settransactionTime(1)}
  onTransactionTimeSelect: (value: number) => void //(value) => {settransactionTime(value)setisTransactionTimeFosced(true)}
  onBuildingAreaFilteredChange: () => void //() => {setisBuildingAreaFiltered(prev => !prev)setbuildingTransferArea(0)}
  onBuildingAreaSelect: (value: number) => void //(value) => {setbuildingTransferArea(value)setisBuildingAreaFosced(true)}
  onLandAreaFilteredChange: () => void //() => {setisLandAreaFiltered(prev => !prev)setlandTransferArea(0)}
  onLandAreaSelect: (value: number) => void //(value) => {setlandTransferArea(value)setisLandAreaFosced(true)}
  onAgeFilteredChange: () => void //() => {setisAgeFiltered(prev => !prev)setage(0)}
  onAgeSelect: (value: number) => void //(value) => {setage(value)setisAgeFosced(true)}
  onCustomizeParamBtnClick: () => void //() => {setmsgOpen(true)seterrorTitle('訊息')seterrorContent('自定義參數功能尚未開發')}
  handleFormSubmit: () => void
}

const QueryPanel = (props: IQueryPanel) => {

  return (
    <div className={classNames({
      [style.queryPanel]: true,
      [style.show]: true
    })}>
      <div className={style.filterGroup}>

        <div className={classNames({
          [style.filterSection]: true,
          [style.divide]: true
        })}>
          <CoordinateSelector
            longitude={props.longitude!}
            latitude={props.latitude!}
            locatedCounty={props.locatedCounty!}
            locatedTown={props.locatedTown!}
            active={props.isSelectorActive!}
            enabled={props.spatialQueryType === 'buffer'}
            onClick={() => {
              props.onCoordinatorSelectorClick(!props.isSelectorActive)
            }}
          />
          <Grid container spacing={2}>
            {/* 搜索範圍 */}
            <Grid item xs={2}>
              <Radio
                checked={props.spatialQueryType === 'buffer'}
                onChange={() => {
                  props.onSpatialQueryTypeChange('buffer')
                }}
                value="a"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'A' }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                type='number'
                label="勘估標的距離(m)"
                size='small'
                InputProps={{ inputProps: { min: 0 } }}
                value={props.bufferRadius}
                onChange={(event) => {
                  props.onBufferRadiusChange(
                    Number(event.target.value)
                  )
                }}
                disabled={props.spatialQueryType !== 'buffer'}
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={2}>
              <Radio
                checked={props.spatialQueryType === 'polygon'}
                onChange={() => {
                  props.onSpatialQueryTypeChange('polygon')
                  props.onCoordinatorSelectorClick(false)
                }}
                value="a"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'A' }}
              />
            </Grid>
            <Grid item xs={3}
              className={style.polygonSketchContainer}
            >
              <PolygonSketch
                active={props.spatialQueryType === 'polygon'}
                mode={props.sketchMode}
                onModeChange={props.onSketchModeChange}
                onDraw={props.onDraw}
                onClear={props.onDraw}
              />
            </Grid>
          </Grid>
        </div>

        <div className={classNames({
          [style.filterSection]: true,
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

        <div className={style.controlSet}>
          <div className={style.settingBtn}
            onClick={props.onCustomizeParamBtnClick}
          >
            <Image src={'/aprRegion/setting.png'} width='30px' height='30px' />
            <p>自定義參數</p>
          </div>

          <div className={style.searchBtn}
            onClick={props.handleFormSubmit}
          >
            <Image src={'/aprRegion/search.png'} width='30px' height='30px' />
            <p>查詢</p>
          </div>
        </div>

      </div>
      {
        props.filteredResults && props.filteredResults.length !== 0
          ?
          <div className={style.resultGroup}>
            <p className={style.resultStatus}>共有
              <span className={style.count}>{props.filteredResults.length}</span>
              筆實價登陸紀錄
            </p>
            <div className={style.graphGroup}>
              {
                props.filteredResults.map((result, index) => {
                  return <MarketCompareResultCard
                    key={index}
                    {...result}
                  />
                })
              }
            </div>
          </div>
          : <></>
      }
    </div>
  )
}

export default QueryPanel